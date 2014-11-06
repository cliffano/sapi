var buster = require('buster-node'),
  referee = require('referee'),
  report = require('../../lib/endpoint/report'),
  assert = referee.assert;

buster.testCase('report', {
  setUp: function () {
    this.mock({});
  },
  'should have endpoint name': function () {
    assert.equals(report.name, 'report');
  },
  'should have required params': function () {
    assert.equals(report.params.required, ['key', 'userIp', 'id']);
  },
  'should have optional params': function () {
    assert.equals(report.params.optional, ['userAgent', 'userSessionId', 'content']);
  },
  'should return endpoint name and eventName param as path': function () {
    assert.equals(report.path({ eventName: 'someeventname' }), 'report/someeventname');
  },
  'should pass result to callback when success handler is called': function (done) {
    function cb(err, result) {
      assert.isNull(err);
      assert.equals(result.foo, 'bar');
      done();
    }
    report.handlers[200]({ foo: 'bar' }, cb);
  },
  'should pass result to callback when search modified handler is called': function (done) {
    function cb(err, result) {
      assert.isNull(err);
      assert.equals(result.foo, 'bar');
      done();
    }
    report.handlers[206]({ foo: 'bar' }, cb);
  },
  'should pass error and result to callback when validation error handler is called': function (done) {
    function cb(err, result) {
      assert.equals(err.message, 'Validation error');
      assert.equals(result.foo, 'bar');
      done();
    }
    report.handlers[400]({ foo: 'bar' }, cb);
  }
});
