
var Stream = require('..');

describe('stream._transform( data, callback )', function(){

  it('should transform a String', function(done){
    var src = new Stream();
    src._transform = function(data){
      data = data + '-test';
      this.push(data);
    };
    src.on('data', function (data){
      data.should.be.a('string');
      data.should.eql('string-test');
      done();
    });
    src.write('string');
  });

  it('should transform a Number', function(done){
    var src = new Stream();
    src._transform = function(data){
      data = data + 10;
      this.push(data);
    };
    src.on('data', function (data){
      data.should.be.a('number');
      data.should.eql(22);
      done();
    });
    src.write(12);
  });

  it('should transform an Object', function(done){
    var src = new Stream();
    src._transform = function(data){
      data.test = 'updated';
      this.push(data);
    };
    src.on('data', function (data){
      data.should.be.a('object');
      data.should.eql({test:'updated'});
      done();
    });
    src.write({test:'test'});
  });

  it('should transform an Array', function(done){
    var src = new Stream();
    src._transform = function(data){
      data.push(4,5,6);
      this.push(data);
    };
    src.on('data', function (data){
      data.should.be.an.instanceOf(Array);
      data.should.eql([1,2,3,4,5,6]);
      done();
    });
    src.write([1,2,3]);
  });
});