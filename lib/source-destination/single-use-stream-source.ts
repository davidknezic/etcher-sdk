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

import { SourceDestination } from './source-destination';

import { NotCapable } from '../errors';
import { StreamLimiter } from '../stream-limiter';

export class SingleUseStreamSource extends SourceDestination {
	private used = false;

	constructor(private stream: NodeJS.ReadableStream) {
		super();
	}

	public async canCreateReadStream(): Promise<boolean> {
		return !this.used;
	}

	public async createReadStream(
		_emitProgress = false,
		start = 0,
		end?: number,
	): Promise<NodeJS.ReadableStream> {
		if (this.used) {
			throw new NotCapable('Single use source stream already used');
		}
		if (start !== 0) {
			throw new NotCapable("Can't seek in a single use stream");
		}
		let stream = this.stream;
		if (end !== undefined) {
			stream = new StreamLimiter(stream, end + 1);
		}
		this.used = true;
		return stream;
	}
}
