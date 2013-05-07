
# SuperStream
The Voltron of node style streams

[![Build Status](https://secure.travis-ci.org/euforic/SuperStream.png)](http://travis-ci.org/euforic/SuperStream)
[![NPM version](https://badge.fury.io/js/superstream.png)](https://npmjs.org/package/superstream)

__Work in progress__

## Features
  - Stream mixin support
  - Read, Write and Transform support
  - Stream any data type

## Stream( )
Create new stream instance

```js
// new Stream(); can also be used
var stream = Stream();
```

## Stream( object )
Create stream mixin from existing object. Conflicting properties will be overwritten with `Stream` property.
```js
var obj = {};
Stream(obj);
```

## stream.write( data, callback )
```js
// TODO add docs
```

## stream._write( data, callback ) _NOT-IMPLEMENTED-YET_
```js
// TODO add docs
```

## stream.push( data )
```js
// TODO add docs
```

## stream._read( size ) _NOT-IMPLEMENTED-YET_
```js
// TODO add docs
```

## stream.unshift( data ) _NOT-IMPLEMENTED-YET_

```js
// TODO add docs
```

## stream._transform( data, callback )
```js
// TODO add docs
```
## stream._flush( callback ) _NOT-IMPLEMENTED-YET_
```js
// TODO add docs
```

## stream.pipe( destination, [options] )
```js
// TODO add docs
```

## stream.unpipe( Stream ) _NOT-IMPLEMENTED-YET_
```js
// TODO add docs
```

## stream.pause()
```js
stream.pause();
```

## stream.resume()
```js
stream.resume();
```

## stream.end( data, callback ) _NOT-IMPLEMENTED-YET_
```js
// TODO add docs
```
## Events

### `readable` _NOT-IMPLEMENTED-YET_
When there is data ready to be consumed, this event will fire.
When this event emits, call the read() method to consume the data.

### `data`
Emitted on data being written to the `Stream`.
Note that adding a 'data' event listener will switch the Readable stream into "old mode", where data is emitted as soon as it is available, rather than waiting for you to call read() to consume it

### `error`
Emitted if there was an error receiving data.

### `end` _NOT-IMPLEMENTED-YET_
Emitted when the stream has received an EOF (FIN in TCP terminology). Indicates that no more 'data' events will happen.

### `drain` _NOT-IMPLEMENTED-YET_
Emitted when the stream's write queue empties and it's safe to write without buffering again. Listen for it when stream.write() returns false.

### `finish` _NOT-IMPLEMENTED-YET_
When end() is called and there are no more chunks to write, this event is emitted.

### `pipe` _NOT-IMPLEMENTED-YET_
Emitted when the stream is passed to a readable stream's pipe method.

### `unpipe` _NOT-IMPLEMENTED-YET_
Emitted when a previously established pipe() is removed using the source Readable stream's unpipe() method.

## License

MIT