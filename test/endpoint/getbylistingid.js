var buster = require('buster-node'),
  getbylistingid = require('../../lib/endpoint/getbylistingid'),
  referee = require('referee'),
  assert = referee.assert;

buster.testCase('getbylistingid', {
  'should have endpoint name': function () {
    assert.equals(getbylistingid.name, 'getByListingId');
  },
  'should have required params': function () {
    assert.equals(getbylistingid.params.required, ['key', 'query']);
  },
  'should have optional params': function () {
    assert.equals(getbylistingid.params.optional, []);
  },
  'should return endpoint name as path': function () {
    assert.equals(getbylistingid.path(), 'getByListingId');
  },
  'should pass result to callback when success handler is called': function (done) {
    function cb(err, result) {
      assert.isNull(err);
      assert.equals(result.foo, 'bar');
      done();
    }
    getbylistingid.handlers[200]({ foo: 'bar' }, cb);
  },
  'should pass error and result to callback when validation error handler is called': function (done) {
    function cb(err, result) {
      assert.equals(err.message, 'Validation error');
      assert.equals(result.foo, 'bar');
      done();
    }
    getbylistingid.handlers[400]({ foo: 'bar' }, cb);
  }
});
