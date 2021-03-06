var buster = require('buster-node'),
  metadata = require('../../lib/endpoint/metadata'),
  referee = require('referee'),
  assert = referee.assert;

buster.testCase('metadata', {
  setUp: function () {
    this.mock({});
  },
  'should have endpoint name': function () {
    assert.equals(metadata.name, 'metadata');
  },
  'should have required params': function () {
    assert.equals(metadata.params.required, ['key', 'dataType']);
  },
  'should have optional params': function () {
    assert.equals(metadata.params.optional, []);
  },
  'should return endpoint name and dataType param as path': function () {
    assert.equals(metadata.path({ dataType: 'somedatatype' }), 'metadata/somedatatype');
  },
  'should pass result to callback when success handler is called': function (done) {
    function cb(err, result) {
      assert.isNull(err);
      assert.equals(result.foo, 'bar');
      done();
    }
    metadata.handlers[200]({ foo: 'bar' }, cb);
  }
});
