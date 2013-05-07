
var Stream = require('..');

describe('Stream()', function(){
  it('should create new Stream instance', function(){
    var x = new Stream();
    x.should.be.an.instanceof(Stream);
  });
});

describe('Stream( Object )', function(){
  it('should create Stream mixin with existing object', function(){
    var x = {test:'a'};
    Stream(x);
    x.should.have.ownProperty('test');
    x.should.have.ownProperty('readable');
    x.should.have.ownProperty('writable');
    x.should.have.ownProperty('write');
    x.should.have.ownProperty('push');
    x.should.have.ownProperty('pause');
    x.should.have.ownProperty('resume');
    x.should.have.ownProperty('pipe');
  });
});
