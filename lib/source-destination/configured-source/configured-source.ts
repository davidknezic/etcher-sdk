/*
 * Copyright 2018 balena.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BlockMap, FilterStream, ReadStream } from 'blockmap';
import { using } from 'bluebird';
import * as _debug from 'debug';
import { DiscardDiskChunk, Disk, ReadResult, WriteResult } from 'file-disk';
import { cloneDeep } from 'lodash';
import { getPartitions } from 'partitioninfo';
import { AsyncFsLike, interact } from 'resin-image-fs';

import { CHUNK_SIZE } from '../../constants';
import { NotCapable } from '../../errors';
import { Metadata } from '../metadata';
import { SourceDestination } from '../source-destination';
import { SourceSource } from '../source-source';
import { configure as legacyConfigure } from './configure';

const debug = _debug('etcher-sdk:configured-source');
const BLOCK_SIZE = 512;

export type ConfigureFunction = (disk: Disk, config: any) => Promise<void>;

export class SourceDisk extends Disk {
	constructor(private source: SourceDestination) {
		super(
			true, // readOnly
			true, // recordWrites
			true, // recordReads
			true, // discardIsZero
		);
	}

	protected async _getCapacity(): Promise<number> {
		// Don't create SourceDisks with sources that do not define a size
		const size = (await this.source.getMetadata()).size;
		if (size === undefined) {
			throw new NotCapable();
		}
		return size;
	}

	protected async _read(
		buffer: Buffer,
		bufferOffset: number,
		length: number,
		fileOffset: number,
	): Promise<ReadResult> {
		return await this.source.read(buffer, bufferOffset, length, fileOffset);
	}

	protected async _write(
		_buffer: Buffer,
		_bufferOffset: number,
		_length: number,
		_fileOffset: number,
	): Promise<WriteResult> {
		throw new Error("Can't write to a SourceDisk");
	}

	protected async _flush(): Promise<void> {
		// noop
	}
}

export class ConfiguredSource extends SourceSource {
	private disk: SourceDisk;
	private configure?: ConfigureFunction;

	constructor(
		// source needs to implement read and createReadStream
		source: SourceDestination,
		private shouldTrimPartitions: boolean,
		private createStreamFromDisk: boolean,
		configure?: ConfigureFunction | 'legacy',
		private config?: any,
	) {
		super(source);
		this.disk = new SourceDisk(source);
		if (configure === 'legacy') {
			this.configure = legacyConfigure;
		} else {
			this.configure = configure;
		}
	}

	private async getBlockmap(): Promise<BlockMap> {
		const imageSize = (await this.source.getMetadata()).size;
		if (imageSize === undefined) {
			throw new NotCapable();
		}
		const blockSize = BLOCK_SIZE;
		const blocks = await this.disk.getRanges(blockSize);
		const mappedBlocksCount =
			blocks.map(b => b.length).reduce((a, b) => a + b, 0) / blockSize;
		const ranges = blocks.map(b => ({
			start: b.offset / blockSize,
			end: (b.offset + b.length) / blockSize - 1,
			checksum: '',
		}));
		const blocksCount = Math.ceil(imageSize / blockSize);
		return new BlockMap({
			blocksCount,
			blockSize,
			imageSize,
			mappedBlocksCount,
			ranges,
		});
	}

	public async canRead(): Promise<boolean> {
		return true;
	}

	public async canCreateReadStream(): Promise<boolean> {
		return true;
	}

	public async canCreateSparseReadStream(): Promise<boolean> {
		return true;
	}

	public async read(
		buffer: Buffer,
		bufferOffset: number,
		length: number,
		sourceOffset: number,
	): Promise<ReadResult> {
		return await this.disk.read(buffer, bufferOffset, length, sourceOffset);
	}

	public async createReadStream(
		...args: any[]
	): Promise<NodeJS.ReadableStream> {
		const imageStream = await this.source.createReadStream(...args);
		const transform = this.disk.getTransformStream();
		imageStream.on('error', (err: Error) => {
			transform.emit('error', err);
		});
		imageStream.pipe(transform);
		return transform;
	}

	private async createSparseReadStreamFromDisk(
		generateChecksums: boolean,
	): Promise<ReadStream> {
		return new ReadStream(
			this.read.bind(this),
			await this.getBlockmap(),
			false,
			generateChecksums,
			0,
			Infinity,
			CHUNK_SIZE,
		);
	}

	private async createSparseReadStreamFromStream(
		generateChecksums: boolean,
	): Promise<FilterStream> {
		const stream = await this.createReadStream();
		const blockMap = await this.getBlockmap();
		const transform = new FilterStream(
			blockMap,
			false,
			generateChecksums,
			CHUNK_SIZE,
		);
		stream.on('error', transform.emit.bind(transform, 'error'));
		stream.pipe(transform);
		return transform;
	}

	public async createSparseReadStream(
		generateChecksums: boolean,
	): Promise<FilterStream | ReadStream> {
		if (this.createStreamFromDisk) {
			return await this.createSparseReadStreamFromDisk(generateChecksums);
		} else {
			return await this.createSparseReadStreamFromStream(generateChecksums);
		}
	}

	protected async _getMetadata(): Promise<Metadata> {
		const metadata = cloneDeep(await this.source.getMetadata());
		metadata.blockMap = await this.getBlockmap();
		metadata.blockmappedSize =
			metadata.blockMap.blockSize * metadata.blockMap.mappedBlocksCount;
		return metadata;
	}

	private async trimPartitions(): Promise<void> {
		const { partitions } = await getPartitions(this.disk, {
			includeExtended: false,
		});
		for (const partition of partitions) {
			try {
				await using(
					interact(this.disk, partition.index),
					async (fs: AsyncFsLike) => {
						if (fs.trimAsync !== undefined) {
							await fs.trimAsync();
						}
					},
				);
			} catch {
				// Unsupported filesystem
			}
		}
		const discards = this.disk.getDiscardedChunks();
		const discardedBytes = discards
			.map((d: DiscardDiskChunk) => d.end - d.start + 1)
			.reduce((a: number, b: number) => a + b, 0);
		// TODO: discarededBytes in metadata ?
		const metadata = await this.getMetadata();
		if (metadata.size !== undefined) {
			const percentage = Math.round((discardedBytes / metadata.size) * 100);
			debug(
				`discarded ${
					discards.length
				} chunks, ${discardedBytes} bytes, ${percentage}% of the image`,
			);
		}
	}

	protected async _open(): Promise<void> {
		await super._open();
		if (this.configure !== undefined) {
			await this.configure(this.disk, this.config);
		}
		if (this.shouldTrimPartitions) {
			await this.trimPartitions();
		}
	}

	protected async _close(): Promise<void> {
		await super._close();
	}
}
