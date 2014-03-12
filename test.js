var loop = require("./");

it('calls end function when iteration is done', function(done){
  var ctr = 0;
  var arr = [];

  loop(10, each, function () {
    expect(ctr).to.equal(10);
    expect(arr).to.deep.equal([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
    done();
  });

  function each (done, i) {
    expect(i).to.equal(ctr++);
    setTimeout(function () {
      arr.push(i);
      done();
    }, 500 - (i*25));
  }
});

it('works with both sync & async functions', function(done){
  var ctr = 0;

  loop(10, each, function () {
    expect(ctr).to.equal(10);
    done();
  });

  function each (done, i) {
    expect(i).to.equal(ctr++);
    if (i % 2 == 0) return done();
    setTimeout(done, 50);
  };
});

it('ignores multiple done calls', function(done){
  var last = 0;
  var acc = 0;

  loop(10, each, function () {
    expect(acc).to.equal(45);
    expect(last).to.equal(9);
    done();
  });

  function each (done, i) {
    acc += i;
    last = i;

    done();
    done();
    done();
  };
});
