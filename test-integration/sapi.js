var buster = require('buster-node'),
  referee = require('referee'),
  Sapi = require('../lib/sapi'),
  assert = referee.assert;

buster.testCase('sapi - sapi', {
  setUp: function () {
    this.timeout = 5000;
    this.mock({});
  },
  'should error when API key is invalid': function (done) {
    var sapi = new Sapi('someinvalidapikey');
    sapi.query('italian').location('melbourne').search(function (err, result) {
      assert.equals(err.message, 'Authentication failed -  invalid key someinvalidapikey');
      assert.equals(result, undefined);
      done();
    });
  }
});
