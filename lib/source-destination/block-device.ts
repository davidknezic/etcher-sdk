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

import { delay, promisify } from 'bluebird';
import { Drive as DrivelistDrive } from 'drivelist';
import { ReadResult, WriteResult } from 'file-disk';
import { unmountDisk } from 'mountutils';
import { platform } from 'os';

import {
	BlockWriteStream,
	ProgressBlockWriteStream,
} from '../block-write-stream';
import { clean } from '../diskpart';
import { AdapterSourceDestination } from '../scanner/adapters/adapter';
import {
	ProgressSparseWriteStream,
	SparseWriteStream,
} from '../sparse-stream/sparse-write-stream';

import { File } from './file';
import { Metadata } from './metadata';

/**
 * @summary Time, in milliseconds, to wait before unmounting on success
 */
const UNMOUNT_ON_SUCCESS_TIMEOUT_MS = 2000;
const DEFAULT_BLOCK_SIZE = 512;
const WIN32_FIRST_BYTES_TO_KEEP = 64 * 1024;
const USE_ALIGNED_IO = platform() === 'win32' || platform() === 'darwin';

const unmountDiskAsync = promisify(unmountDisk);

export class BlockDevice extends File implements AdapterSourceDestination {
	public emitsProgress = false;

	constructor(private drive: DrivelistDrive, private unmountOnSuccess = false) {
		super(drive.raw, File.OpenFlags.WriteDevice);
		this.blockSize = drive.blockSize || DEFAULT_BLOCK_SIZE;
	}

	get isSystem(): boolean {
		return this.drive.isSystem;
	}

	get raw(): string {
		return this.drive.raw;
	}

	get device(): string {
		return this.drive.device;
	}

	get devicePath(): string | null {
		return this.drive.devicePath;
	}

	get description(): string {
		return this.drive.description;
	}

	get mountpoints(): Array<{ path: string }> {
		return this.drive.mountpoints;
	}

	get size(): number | null {
		return this.drive.size;
	}

	protected async _getMetadata(): Promise<Metadata> {
		return {
			size: this.drive.size || undefined,
		};
	}

	public async canWrite(): Promise<boolean> {
		return !this.drive.isReadOnly;
	}

	public async canCreateWriteStream(): Promise<boolean> {
		return !this.drive.isReadOnly;
	}

	public async canCreateSparseWriteStream(): Promise<boolean> {
		return !this.drive.isReadOnly;
	}

	public async createWriteStream(): Promise<BlockWriteStream> {
		const stream = new ProgressBlockWriteStream(
			this,
			platform() === 'win32' ? WIN32_FIRST_BYTES_TO_KEEP : 0,
		);
		stream.on('finish', stream.emit.bind(stream, 'done'));
		return stream;
	}

	public async createSparseWriteStream(): Promise<SparseWriteStream> {
		const stream = new ProgressSparseWriteStream(
			this,
			platform() === 'win32' ? WIN32_FIRST_BYTES_TO_KEEP : 0,
		);
		stream.on('finish', stream.emit.bind(stream, 'done'));
		return stream;
	}

	protected async _open(): Promise<void> {
		if (platform() !== 'win32') {
			await unmountDiskAsync(this.drive.device);
		}
		await clean(this.drive.device);
		await super._open();
	}

	protected async _close(): Promise<void> {
		await super._close();
		// Closing a file descriptor on a drive containing mountable
		// partitions causes macOS to mount the drive. If we try to
		// unmount too quickly, then the drive might get re-mounted
		// right afterwards.
		if (this.unmountOnSuccess) {
			await delay(UNMOUNT_ON_SUCCESS_TIMEOUT_MS);
			await unmountDiskAsync(this.drive.device);
		}
	}

	private offsetIsAligned(offset: number): boolean {
		return offset % this.blockSize === 0;
	}

	private alignOffsetBefore(offset: number): number {
		return Math.floor(offset / this.blockSize) * this.blockSize;
	}

	private alignOffsetAfter(offset: number): number {
		return Math.ceil(offset / this.blockSize) * this.blockSize;
	}

	private async alignedRead(
		buffer: Buffer,
		bufferOffset: number,
		length: number,
		sourceOffset: number,
	): Promise<ReadResult> {
		const start = this.alignOffsetBefore(sourceOffset);
		const end = this.alignOffsetAfter(sourceOffset + length);
		const alignedBuffer = Buffer.allocUnsafe(end - start);
		const { bytesRead } = await super.read(
			alignedBuffer,
			0,
			alignedBuffer.length,
			start,
		);
		const offset = sourceOffset - start;
		alignedBuffer.copy(buffer, bufferOffset, offset, offset + length);
		return { buffer, bytesRead: Math.min(length, bytesRead - offset) };
	}

	public async read(
		buffer: Buffer,
		bufferOffset: number,
		length: number,
		sourceOffset: number,
	): Promise<ReadResult> {
		if (
			USE_ALIGNED_IO &&
			!(this.offsetIsAligned(sourceOffset) && this.offsetIsAligned(length))
		) {
			return await this.alignedRead(buffer, bufferOffset, length, sourceOffset);
		} else {
			return await super.read(buffer, bufferOffset, length, sourceOffset);
		}
	}

	private async alignedWrite(
		buffer: Buffer,
		bufferOffset: number,
		length: number,
		fileOffset: number,
	): Promise<WriteResult> {
		const start = this.alignOffsetBefore(fileOffset);
		const end = this.alignOffsetAfter(fileOffset + length);
		const alignedBuffer = Buffer.allocUnsafe(end - start);
		await super.read(alignedBuffer, 0, alignedBuffer.length, start);
		const offset = fileOffset - start;
		buffer.copy(alignedBuffer, offset, bufferOffset, length);
		await super.write(alignedBuffer, 0, alignedBuffer.length, start);
		return { buffer, bytesWritten: length };
	}

	public async write(
		buffer: Buffer,
		bufferOffset: number,
		length: number,
		fileOffset: number,
	): Promise<WriteResult> {
		if (
			USE_ALIGNED_IO &&
			!(this.offsetIsAligned(fileOffset) && this.offsetIsAligned(length))
		) {
			return await this.alignedWrite(buffer, bufferOffset, length, fileOffset);
		} else {
			return await super.write(buffer, bufferOffset, length, fileOffset);
		}
	}
}
