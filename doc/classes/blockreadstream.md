[etcher-sdk](../README.md) > [BlockReadStream](../classes/blockreadstream.md)

# Class: BlockReadStream

## Hierarchy

 `Readable`

**↳ BlockReadStream**

## Implements

* `ReadableStream`

## Index

### Constructors

* [constructor](blockreadstream.md#constructor)

### Properties

* [bytesRead](blockreadstream.md#bytesread)
* [chunkSize](blockreadstream.md#chunksize)
* [end](blockreadstream.md#end)
* [maxRetries](blockreadstream.md#maxretries)
* [readable](blockreadstream.md#readable)
* [source](blockreadstream.md#source)
* [defaultMaxListeners](blockreadstream.md#defaultmaxlisteners)

### Methods

* [__read](blockreadstream.md#__read)
* [_read](blockreadstream.md#_read)
* [addListener](blockreadstream.md#addlistener)
* [emit](blockreadstream.md#emit)
* [eventNames](blockreadstream.md#eventnames)
* [getMaxListeners](blockreadstream.md#getmaxlisteners)
* [isPaused](blockreadstream.md#ispaused)
* [listenerCount](blockreadstream.md#listenercount)
* [listeners](blockreadstream.md#listeners)
* [on](blockreadstream.md#on)
* [once](blockreadstream.md#once)
* [pause](blockreadstream.md#pause)
* [pipe](blockreadstream.md#pipe)
* [prependListener](blockreadstream.md#prependlistener)
* [prependOnceListener](blockreadstream.md#prependoncelistener)
* [push](blockreadstream.md#push)
* [read](blockreadstream.md#read)
* [removeAllListeners](blockreadstream.md#removealllisteners)
* [removeListener](blockreadstream.md#removelistener)
* [resume](blockreadstream.md#resume)
* [setEncoding](blockreadstream.md#setencoding)
* [setMaxListeners](blockreadstream.md#setmaxlisteners)
* [tryRead](blockreadstream.md#tryread)
* [unpipe](blockreadstream.md#unpipe)
* [unshift](blockreadstream.md#unshift)
* [wrap](blockreadstream.md#wrap)
* [listenerCount](blockreadstream.md#listenercount-1)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new BlockReadStream**(source: *[File](file.md)*, bytesRead?: *`number`*, end?: *`number`*, chunkSize?: *`number`*, maxRetries?: *`number`*): [BlockReadStream](blockreadstream.md)

*Overrides Readable.__constructor*

*Defined in [block-read-stream.ts:31](https://github.com/balena-io-modules/etcher-sdk/blob/5821ce5/lib/block-read-stream.ts#L31)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| source | [File](file.md) | - |
| `Default value` bytesRead | `number` | 0 |
| `Default value` end | `number` |  Infinity |
| `Default value` chunkSize | `number` |  CHUNK_SIZE |
| `Default value` maxRetries | `number` | 5 |

**Returns:** [BlockReadStream](blockreadstream.md)

___

## Properties

<a id="bytesread"></a>

### `<Private>` bytesRead

**● bytesRead**: *`number`*

*Defined in [block-read-stream.ts:35](https://github.com/balena-io-modules/etcher-sdk/blob/5821ce5/lib/block-read-stream.ts#L35)*

___
<a id="chunksize"></a>

### `<Private>` chunkSize

**● chunkSize**: *`number`*

*Defined in [block-read-stream.ts:31](https://github.com/balena-io-modules/etcher-sdk/blob/5821ce5/lib/block-read-stream.ts#L31)*

___
<a id="end"></a>

### `<Private>` end

**● end**: *`number`*

*Defined in [block-read-stream.ts:36](https://github.com/balena-io-modules/etcher-sdk/blob/5821ce5/lib/block-read-stream.ts#L36)*

___
<a id="maxretries"></a>

### `<Private>` maxRetries

**● maxRetries**: *`number`*

*Defined in [block-read-stream.ts:38](https://github.com/balena-io-modules/etcher-sdk/blob/5821ce5/lib/block-read-stream.ts#L38)*

___
<a id="readable"></a>

###  readable

**● readable**: *`boolean`*

*Inherited from Readable.readable*

*Defined in /node_modules/@types/node/index.d.ts:3718*

___
<a id="source"></a>

### `<Private>` source

**● source**: *[File](file.md)*

*Defined in [block-read-stream.ts:34](https://github.com/balena-io-modules/etcher-sdk/blob/5821ce5/lib/block-read-stream.ts#L34)*

___
<a id="defaultmaxlisteners"></a>

### `<Static>` defaultMaxListeners

**● defaultMaxListeners**: *`number`*

*Inherited from EventEmitter.defaultMaxListeners*

*Defined in /node_modules/@types/node/index.d.ts:715*

___

## Methods

<a id="__read"></a>

### `<Private>` __read

▸ **__read**(): `Promise`<`void`>

*Defined in [block-read-stream.ts:68](https://github.com/balena-io-modules/etcher-sdk/blob/5821ce5/lib/block-read-stream.ts#L68)*

**Returns:** `Promise`<`void`>

___
<a id="_read"></a>

###  _read

▸ **_read**(): `void`

*Overrides Readable._read*

*Defined in [block-read-stream.ts:93](https://github.com/balena-io-modules/etcher-sdk/blob/5821ce5/lib/block-read-stream.ts#L93)*

**Returns:** `void`

___
<a id="addlistener"></a>

###  addListener

▸ **addListener**(event: *`string`*, listener: *`Function`*): `this`

▸ **addListener**(event: *"close"*, listener: *`function`*): `this`

▸ **addListener**(event: *"data"*, listener: *`function`*): `this`

▸ **addListener**(event: *"end"*, listener: *`function`*): `this`

▸ **addListener**(event: *"readable"*, listener: *`function`*): `this`

▸ **addListener**(event: *"error"*, listener: *`function`*): `this`

*Inherited from Readable.addListener*

*Overrides EventEmitter.addListener*

*Defined in /node_modules/@types/node/index.d.ts:3741*

Event emitter The defined events on documents including:

1.  close
2.  data
3.  end
4.  readable
5.  error

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` |
| listener | `Function` |

**Returns:** `this`

*Inherited from Readable.addListener*

*Overrides EventEmitter.addListener*

*Defined in /node_modules/@types/node/index.d.ts:3742*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "close" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.addListener*

*Overrides EventEmitter.addListener*

*Defined in /node_modules/@types/node/index.d.ts:3743*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "data" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.addListener*

*Overrides EventEmitter.addListener*

*Defined in /node_modules/@types/node/index.d.ts:3744*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "end" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.addListener*

*Overrides EventEmitter.addListener*

*Defined in /node_modules/@types/node/index.d.ts:3745*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "readable" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.addListener*

*Overrides EventEmitter.addListener*

*Defined in /node_modules/@types/node/index.d.ts:3746*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "error" |
| listener | `function` |

**Returns:** `this`

___
<a id="emit"></a>

###  emit

▸ **emit**(event: *`string` \| `symbol`*, ...args: *`any`[]*): `boolean`

▸ **emit**(event: *"close"*): `boolean`

▸ **emit**(event: *"data"*, chunk: *`Buffer` \| `string`*): `boolean`

▸ **emit**(event: *"end"*): `boolean`

▸ **emit**(event: *"readable"*): `boolean`

▸ **emit**(event: *"error"*, err: *`Error`*): `boolean`

*Inherited from Readable.emit*

*Overrides EventEmitter.emit*

*Defined in /node_modules/@types/node/index.d.ts:3748*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |
| `Rest` args | `any`[] |

**Returns:** `boolean`

*Inherited from Readable.emit*

*Overrides EventEmitter.emit*

*Defined in /node_modules/@types/node/index.d.ts:3749*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "close" |

**Returns:** `boolean`

*Inherited from Readable.emit*

*Overrides EventEmitter.emit*

*Defined in /node_modules/@types/node/index.d.ts:3750*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "data" |
| chunk | `Buffer` \| `string` |

**Returns:** `boolean`

*Inherited from Readable.emit*

*Overrides EventEmitter.emit*

*Defined in /node_modules/@types/node/index.d.ts:3751*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "end" |

**Returns:** `boolean`

*Inherited from Readable.emit*

*Overrides EventEmitter.emit*

*Defined in /node_modules/@types/node/index.d.ts:3752*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "readable" |

**Returns:** `boolean`

*Inherited from Readable.emit*

*Overrides EventEmitter.emit*

*Defined in /node_modules/@types/node/index.d.ts:3753*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "error" |
| err | `Error` |

**Returns:** `boolean`

___
<a id="eventnames"></a>

###  eventNames

▸ **eventNames**(): (`string` \| `symbol`)[]

*Inherited from EventEmitter.eventNames*

*Overrides EventEmitter.eventNames*

*Defined in /node_modules/@types/node/index.d.ts:728*

**Returns:** (`string` \| `symbol`)[]

___
<a id="getmaxlisteners"></a>

###  getMaxListeners

▸ **getMaxListeners**(): `number`

*Inherited from EventEmitter.getMaxListeners*

*Overrides EventEmitter.getMaxListeners*

*Defined in /node_modules/@types/node/index.d.ts:725*

**Returns:** `number`

___
<a id="ispaused"></a>

###  isPaused

▸ **isPaused**(): `boolean`

*Inherited from Readable.isPaused*

*Defined in /node_modules/@types/node/index.d.ts:3725*

**Returns:** `boolean`

___
<a id="listenercount"></a>

###  listenerCount

▸ **listenerCount**(type: *`string` \| `symbol`*): `number`

*Inherited from EventEmitter.listenerCount*

*Overrides EventEmitter.listenerCount*

*Defined in /node_modules/@types/node/index.d.ts:729*

**Parameters:**

| Name | Type |
| ------ | ------ |
| type | `string` \| `symbol` |

**Returns:** `number`

___
<a id="listeners"></a>

###  listeners

▸ **listeners**(event: *`string` \| `symbol`*): `Function`[]

*Inherited from EventEmitter.listeners*

*Overrides EventEmitter.listeners*

*Defined in /node_modules/@types/node/index.d.ts:726*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` \| `symbol` |

**Returns:** `Function`[]

___
<a id="on"></a>

###  on

▸ **on**(event: *`string`*, listener: *`Function`*): `this`

▸ **on**(event: *"close"*, listener: *`function`*): `this`

▸ **on**(event: *"data"*, listener: *`function`*): `this`

▸ **on**(event: *"end"*, listener: *`function`*): `this`

▸ **on**(event: *"readable"*, listener: *`function`*): `this`

▸ **on**(event: *"error"*, listener: *`function`*): `this`

*Inherited from Readable.on*

*Overrides EventEmitter.on*

*Defined in /node_modules/@types/node/index.d.ts:3755*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` |
| listener | `Function` |

**Returns:** `this`

*Inherited from Readable.on*

*Overrides EventEmitter.on*

*Defined in /node_modules/@types/node/index.d.ts:3756*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "close" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.on*

*Overrides EventEmitter.on*

*Defined in /node_modules/@types/node/index.d.ts:3757*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "data" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.on*

*Overrides EventEmitter.on*

*Defined in /node_modules/@types/node/index.d.ts:3758*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "end" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.on*

*Overrides EventEmitter.on*

*Defined in /node_modules/@types/node/index.d.ts:3759*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "readable" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.on*

*Overrides EventEmitter.on*

*Defined in /node_modules/@types/node/index.d.ts:3760*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "error" |
| listener | `function` |

**Returns:** `this`

___
<a id="once"></a>

###  once

▸ **once**(event: *`string`*, listener: *`Function`*): `this`

▸ **once**(event: *"close"*, listener: *`function`*): `this`

▸ **once**(event: *"data"*, listener: *`function`*): `this`

▸ **once**(event: *"end"*, listener: *`function`*): `this`

▸ **once**(event: *"readable"*, listener: *`function`*): `this`

▸ **once**(event: *"error"*, listener: *`function`*): `this`

*Inherited from Readable.once*

*Overrides EventEmitter.once*

*Defined in /node_modules/@types/node/index.d.ts:3762*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` |
| listener | `Function` |

**Returns:** `this`

*Inherited from Readable.once*

*Overrides EventEmitter.once*

*Defined in /node_modules/@types/node/index.d.ts:3763*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "close" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.once*

*Overrides EventEmitter.once*

*Defined in /node_modules/@types/node/index.d.ts:3764*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "data" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.once*

*Overrides EventEmitter.once*

*Defined in /node_modules/@types/node/index.d.ts:3765*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "end" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.once*

*Overrides EventEmitter.once*

*Defined in /node_modules/@types/node/index.d.ts:3766*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "readable" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.once*

*Overrides EventEmitter.once*

*Defined in /node_modules/@types/node/index.d.ts:3767*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "error" |
| listener | `function` |

**Returns:** `this`

___
<a id="pause"></a>

###  pause

▸ **pause**(): `this`

*Inherited from Readable.pause*

*Defined in /node_modules/@types/node/index.d.ts:3723*

**Returns:** `this`

___
<a id="pipe"></a>

###  pipe

▸ **pipe**<`T`>(destination: *`T`*, options?: *`undefined` \| `object`*): `T`

*Inherited from Readable.pipe*

*Overrides internal.pipe*

*Defined in /node_modules/@types/node/index.d.ts:3726*

**Type parameters:**

#### T :  `WritableStream`
**Parameters:**

| Name | Type |
| ------ | ------ |
| destination | `T` |
| `Optional` options | `undefined` \| `object` |

**Returns:** `T`

___
<a id="prependlistener"></a>

###  prependListener

▸ **prependListener**(event: *`string`*, listener: *`Function`*): `this`

▸ **prependListener**(event: *"close"*, listener: *`function`*): `this`

▸ **prependListener**(event: *"data"*, listener: *`function`*): `this`

▸ **prependListener**(event: *"end"*, listener: *`function`*): `this`

▸ **prependListener**(event: *"readable"*, listener: *`function`*): `this`

▸ **prependListener**(event: *"error"*, listener: *`function`*): `this`

*Inherited from Readable.prependListener*

*Overrides EventEmitter.prependListener*

*Defined in /node_modules/@types/node/index.d.ts:3769*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` |
| listener | `Function` |

**Returns:** `this`

*Inherited from Readable.prependListener*

*Overrides EventEmitter.prependListener*

*Defined in /node_modules/@types/node/index.d.ts:3770*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "close" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.prependListener*

*Overrides EventEmitter.prependListener*

*Defined in /node_modules/@types/node/index.d.ts:3771*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "data" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.prependListener*

*Overrides EventEmitter.prependListener*

*Defined in /node_modules/@types/node/index.d.ts:3772*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "end" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.prependListener*

*Overrides EventEmitter.prependListener*

*Defined in /node_modules/@types/node/index.d.ts:3773*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "readable" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.prependListener*

*Overrides EventEmitter.prependListener*

*Defined in /node_modules/@types/node/index.d.ts:3774*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "error" |
| listener | `function` |

**Returns:** `this`

___
<a id="prependoncelistener"></a>

###  prependOnceListener

▸ **prependOnceListener**(event: *`string`*, listener: *`Function`*): `this`

▸ **prependOnceListener**(event: *"close"*, listener: *`function`*): `this`

▸ **prependOnceListener**(event: *"data"*, listener: *`function`*): `this`

▸ **prependOnceListener**(event: *"end"*, listener: *`function`*): `this`

▸ **prependOnceListener**(event: *"readable"*, listener: *`function`*): `this`

▸ **prependOnceListener**(event: *"error"*, listener: *`function`*): `this`

*Inherited from Readable.prependOnceListener*

*Overrides EventEmitter.prependOnceListener*

*Defined in /node_modules/@types/node/index.d.ts:3776*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` |
| listener | `Function` |

**Returns:** `this`

*Inherited from Readable.prependOnceListener*

*Overrides EventEmitter.prependOnceListener*

*Defined in /node_modules/@types/node/index.d.ts:3777*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "close" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.prependOnceListener*

*Overrides EventEmitter.prependOnceListener*

*Defined in /node_modules/@types/node/index.d.ts:3778*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "data" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.prependOnceListener*

*Overrides EventEmitter.prependOnceListener*

*Defined in /node_modules/@types/node/index.d.ts:3779*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "end" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.prependOnceListener*

*Overrides EventEmitter.prependOnceListener*

*Defined in /node_modules/@types/node/index.d.ts:3780*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "readable" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.prependOnceListener*

*Overrides EventEmitter.prependOnceListener*

*Defined in /node_modules/@types/node/index.d.ts:3781*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "error" |
| listener | `function` |

**Returns:** `this`

___
<a id="push"></a>

###  push

▸ **push**(chunk: *`any`*, encoding?: *`undefined` \| `string`*): `boolean`

*Inherited from Readable.push*

*Defined in /node_modules/@types/node/index.d.ts:3730*

**Parameters:**

| Name | Type |
| ------ | ------ |
| chunk | `any` |
| `Optional` encoding | `undefined` \| `string` |

**Returns:** `boolean`

___
<a id="read"></a>

###  read

▸ **read**(size?: *`undefined` \| `number`*): `any`

*Inherited from Readable.read*

*Defined in /node_modules/@types/node/index.d.ts:3721*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` size | `undefined` \| `number` |

**Returns:** `any`

___
<a id="removealllisteners"></a>

###  removeAllListeners

▸ **removeAllListeners**(event?: *`string` \| `symbol`*): `this`

*Inherited from EventEmitter.removeAllListeners*

*Overrides EventEmitter.removeAllListeners*

*Defined in /node_modules/@types/node/index.d.ts:723*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` event | `string` \| `symbol` |

**Returns:** `this`

___
<a id="removelistener"></a>

###  removeListener

▸ **removeListener**(event: *`string`*, listener: *`Function`*): `this`

▸ **removeListener**(event: *"close"*, listener: *`function`*): `this`

▸ **removeListener**(event: *"data"*, listener: *`function`*): `this`

▸ **removeListener**(event: *"end"*, listener: *`function`*): `this`

▸ **removeListener**(event: *"readable"*, listener: *`function`*): `this`

▸ **removeListener**(event: *"error"*, listener: *`function`*): `this`

*Inherited from Readable.removeListener*

*Overrides EventEmitter.removeListener*

*Defined in /node_modules/@types/node/index.d.ts:3783*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | `string` |
| listener | `Function` |

**Returns:** `this`

*Inherited from Readable.removeListener*

*Overrides EventEmitter.removeListener*

*Defined in /node_modules/@types/node/index.d.ts:3784*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "close" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.removeListener*

*Overrides EventEmitter.removeListener*

*Defined in /node_modules/@types/node/index.d.ts:3785*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "data" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.removeListener*

*Overrides EventEmitter.removeListener*

*Defined in /node_modules/@types/node/index.d.ts:3786*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "end" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.removeListener*

*Overrides EventEmitter.removeListener*

*Defined in /node_modules/@types/node/index.d.ts:3787*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "readable" |
| listener | `function` |

**Returns:** `this`

*Inherited from Readable.removeListener*

*Overrides EventEmitter.removeListener*

*Defined in /node_modules/@types/node/index.d.ts:3788*

**Parameters:**

| Name | Type |
| ------ | ------ |
| event | "error" |
| listener | `function` |

**Returns:** `this`

___
<a id="resume"></a>

###  resume

▸ **resume**(): `this`

*Inherited from Readable.resume*

*Defined in /node_modules/@types/node/index.d.ts:3724*

**Returns:** `this`

___
<a id="setencoding"></a>

###  setEncoding

▸ **setEncoding**(encoding: *`string`*): `void`

*Inherited from Readable.setEncoding*

*Defined in /node_modules/@types/node/index.d.ts:3722*

**Parameters:**

| Name | Type |
| ------ | ------ |
| encoding | `string` |

**Returns:** `void`

___
<a id="setmaxlisteners"></a>

###  setMaxListeners

▸ **setMaxListeners**(n: *`number`*): `this`

*Inherited from EventEmitter.setMaxListeners*

*Overrides EventEmitter.setMaxListeners*

*Defined in /node_modules/@types/node/index.d.ts:724*

**Parameters:**

| Name | Type |
| ------ | ------ |
| n | `number` |

**Returns:** `this`

___
<a id="tryread"></a>

### `<Private>` tryRead

▸ **tryRead**(buffer: *`Buffer`*): `Promise`<`ReadResult`>

*Defined in [block-read-stream.ts:47](https://github.com/balena-io-modules/etcher-sdk/blob/5821ce5/lib/block-read-stream.ts#L47)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| buffer | `Buffer` |

**Returns:** `Promise`<`ReadResult`>

___
<a id="unpipe"></a>

###  unpipe

▸ **unpipe**<`T`>(destination?: *[T]()*): `void`

*Inherited from Readable.unpipe*

*Defined in /node_modules/@types/node/index.d.ts:3727*

**Type parameters:**

#### T :  `WritableStream`
**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` destination | [T]() |

**Returns:** `void`

___
<a id="unshift"></a>

###  unshift

▸ **unshift**(chunk: *`any`*): `void`

*Inherited from Readable.unshift*

*Defined in /node_modules/@types/node/index.d.ts:3728*

**Parameters:**

| Name | Type |
| ------ | ------ |
| chunk | `any` |

**Returns:** `void`

___
<a id="wrap"></a>

###  wrap

▸ **wrap**(oldStream: *`ReadableStream`*): `Readable`

*Inherited from Readable.wrap*

*Defined in /node_modules/@types/node/index.d.ts:3729*

**Parameters:**

| Name | Type |
| ------ | ------ |
| oldStream | `ReadableStream` |

**Returns:** `Readable`

___
<a id="listenercount-1"></a>

### `<Static>` listenerCount

▸ **listenerCount**(emitter: *`EventEmitter`*, event: *`string` \| `symbol`*): `number`

*Inherited from EventEmitter.listenerCount*

*Defined in /node_modules/@types/node/index.d.ts:714*

**Parameters:**

| Name | Type |
| ------ | ------ |
| emitter | `EventEmitter` |
| event | `string` \| `symbol` |

**Returns:** `number`

___

