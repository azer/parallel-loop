var test = require('prova');
var loop = require("./");

test('calls end function when iteration is done', function (t) {
  var ctr = 0;
  var arr = [];

  loop(10, each, function () {
    t.equal(ctr, 10);
    t.deepEqual(arr, [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
    t.end();
  });

  function each (done, i) {
    t.equal(i, ctr++);
    setTimeout(function () {
      arr.push(i);
      done();
    }, 500 - (i*25));
  }
});

test('works with both sync & async functions', function (t) {
  var ctr = 0;

  loop(10, each, function () {
    t.equal(ctr, 10);
    t.end();
  });

  function each (done, i) {
    t.equal(i, ctr++);
    if (i % 2 == 0) return done();
    setTimeout(done, 50);
  };
});

test('ignores multiple done calls', function (t) {
  var last = 0;
  var acc = 0;

  loop(10, each, function () {
    t.equal(acc, 45);
    t.equal(last, 9);
    t.end();
  });

  function each (done, i) {
    acc += i;
    last = i;

    done();
    done();
    done();
  };
});

test('zero length', function (t) {
  loop(0, each, t.end);

  function each () {
    throw new Error('fail');
  }
});

test('with no callback', function (t) {
  t.plan(5);
  loop(5, function () {
    t.ok(true);
  });
});
