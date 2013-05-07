


/**
 * Module dependencies.
 */

var Emitter;

try {
  Emitter = require('events').EventEmitter;
} catch(e) {
  Emitter = require('emitter');
}

/**
 * noop
 */

var noop = function(){};

/**
 * expose Stream
 */

module.exports = Stream;

/**
 * Initialize a new `Stream` or create Stream mixin with
 * the given object
 *
 * @api public
 */

function Stream(obj) {
  if (obj) { return mixin(obj); }
  if (!(this instanceof Stream)){ return new Stream(); }
}

/**
 * inherit from event emitter
 */

Stream.prototype.__proto__ = Emitter.prototype;

/**
 * Mixin the Stream properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Stream.prototype) {
    obj[key] = Stream.prototype[key];
  }
  return obj;
}

/**
 * indexOf polyfill
 *
 * @param  {Array} arr
 * @param  {Object} obj
 * @return {Number}
 * @api private
 */

function index(arr, obj){
  var indexOf = [].indexOf;
  if (indexOf) { return arr.indexOf(obj); }
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) { return i; }
  }
  return -1;
}

/**
 * stream readable state
 * @type {Boolean}
 */

Stream.prototype.readable = true;

/**
 * stream writable state
 * @type {Boolean}
 */

Stream.prototype.writable = true;

/**
 * write data to the `Stream`
 * @param  {Object|Array|String|Buffer} data
 * @return {Stream}
 */

Stream.prototype.write = function (data) {
  if (this.paused) {
    this._queue.push(data);
    return this;
  }

  if (this._transform !== noop) {
    this._transform(data, function (_data){
      this.emit(_data);
    });
    return this;
  }

  this.emit('data', data);
  return this;
};

/**
 * push data to the `Stream` if called from inside `_transform`
 * emits transformed data in `data` event
 *
 * @param  {Object|Array|String|Buffer} data
 * @return {Stream}
 * @api public
 */

Stream.prototype.push = function (data) {
  if ( arguments.callee.caller === this._transform) { return this.emit('data', data); }
  this.write(data);
  return this;
};

/**
 * pause `Stream` reads and writes
 *
 * @return {Stream}
 * @api public
 */

Stream.prototype.pause = function () {
  this.paused = true;
  this.readable = false;
  this._queue = this._queue || [];
  this.emit('pause');
  return this;
};


/**
 * `_write` function to be overridden
 */

Stream.prototype._write = noop;

/**
 * `_transform` function to be overridden
 */

Stream.prototype._transform = noop;

/**
 * resume `Stream` reads and writes
 *
 * @return {[type]} [description]
 * @api public
 */

Stream.prototype.resume = function () {
  var self = this;

  self.paused = false;
  self.emit('resume');

  if (self._queue) {
    self._queue.forEach(function(entry){
      if (self._transform !== noop) {
        return self._transform(entry, function (data){
          self.emit(data);
        });
      }
      self.emit('data', entry);
    });
  }
  self.readable = true;
};

/**
 * write data from one `Stream` to another
 *
 * @param  {Stream} dest
 * @param  {Object} options
 * @return {Stream} dest stream
 * @api public
 */

Stream.prototype.pipe = function (dest, options) {
  var source = this;

  function ondata (chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  function ondrain () {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  var didOnEnd = false;
  function onend () {
    if (didOnEnd) return;
    didOnEnd = true;
    dest.end();
  }

  function onclose () {
    if (didOnEnd) return;
    didOnEnd = true;
    if (typeof dest.destroy === 'function') dest.destroy();
  }

  function onerror (err) {
    cleanup();
    if (this.listeners('error').length === 0) {
      throw err; // Unhandled stream error in pipe.
    }
  }

  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    dest.removeListener('end', cleanup);

    source.removeListener('close', onclose);
    dest.removeListener('close', cleanup);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);
  }

  source.on('data', ondata); dest.on('drain', ondrain);
  if ((!options || options.end !== false)) {
    source.on('end', onend); source.on('close', onclose);
  }
  source.on('error', onerror); dest.on('error', onerror);
  source.on('end', cleanup); source.on('close', cleanup);
  dest.on('end', cleanup); dest.on('close', cleanup);

  dest.emit('pipe', source);

  return dest;
};
