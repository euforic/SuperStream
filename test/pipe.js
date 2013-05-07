
var Stream = require('..');

describe('Stream.pipe( Stream )', function(){
  it('should pipe a String to dest Stream', function(done){
    var src = new Stream();
    var dest = new Stream();
    dest.on('data', function (data){
      data.should.be.a('string');
      data.should.eql('test');
      done();
    });
    src.pipe(dest);
    src.write('test');
  });
  it('should pipe a Number to dest Stream', function(done){
    var src = new Stream();
    var dest = new Stream();
    dest.on('data', function (data){
      data.should.be.a('number');
      data.should.eql(12);
      done();
    });
    src.pipe(dest);
    src.write(12);
  });
  it('should pipe an Object to dest Stream', function(done){
    var src = new Stream();
    var dest = new Stream();
    dest.on('data', function (data){
      data.should.be.a('object');
      data.should.eql({test:'test'});
      done();
    });
    src.pipe(dest);
    src.write({test:'test'});
  });
  it('should pipe an Array to dest Stream', function(done){
    var src = new Stream();
    var dest = new Stream();
    dest.on('data', function (data){
      data.should.be.an.instanceOf(Array);
      data.should.eql([1,2,3]);
      done();
    });
    src.pipe(dest);
    src.write([1,2,3]);
  });
});