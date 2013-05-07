
var Stream = require('..');

describe('stream.write( data )', function(){

  it('should write a String to the Stream', function(done){
    var src = new Stream();
    src.on('data', function (data){
      data.should.be.a('string');
      data.should.eql('string-test');
      done();
    });
    src.write('string-test');
  });

  it('should write a Number to the Stream', function(done){
    var src = new Stream();
    src.on('data', function (data){
      data.should.be.a('number');
      data.should.eql(12);
      done();
    });
    src.write(12);
  });

  it('should write an Object to the Stream', function(done){
    var src = new Stream();
    src.on('data', function (data){
      data.should.be.a('object');
      data.should.eql({'test':'test'});
      done();
    });
    src.write({'test':'test'});
  });

  it('should write an Array to the Stream', function(done){
    var src = new Stream();
    src.on('data', function (data){
      data.should.be.an.instanceOf(Array);
      data.should.eql([1,2,3]);
      done();
    });
    src.write([1,2,3]);
  });
});