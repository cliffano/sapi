var bag = require('bagofrequest'),
  buster = require('buster-node'),
  referee = require('referee'),
  Sapi = require('../lib/sapi'),
  assert = referee.assert;

buster.testCase('sapi', {
  setUp: function () {
    this.mock({});
  },
  'should set key and default url when url is not provided': function () {
    var sapi = new Sapi('somekey');
    assert.equals(sapi.params.key, 'somekey');
    assert.equals(sapi.url, 'http://api.sensis.com.au/ob-20110511/test');
  },
  'should set optional key and url when provided': function () {
    var sapi = new Sapi('somekey', { url: 'http://someurl' });
    assert.equals(sapi.params.key, 'somekey');
    assert.equals(sapi.url, 'http://someurl');
  },
  'should pass authentication failed error to callback when result has status code 403 and key is provided': function (done) {
    var mockRequest = function (method, url, opts, cb) {
      opts.handlers[403]({ statusCode: 403 }, cb);
    };
    this.stub(bag, 'request', mockRequest);
    var sapi = new Sapi('somekey');  
    sapi.search(function cb(err, result) {
      assert.equals(err.message, 'Authentication failed -  invalid key somekey');
      assert.equals(result, undefined);
      done();
    });
  },
  'should pass authentication required error to callback when result has status code 403 and key is not provided': function (done) {
    var mockRequest = function (method, url, opts, cb) {
      opts.handlers[403]({ statusCode: 403 }, cb);
    };
    this.stub(bag, 'request', mockRequest);
    var sapi = new Sapi();  
    sapi.search(function cb(err, result) {
      assert.equals(err.message, 'Authentication required - set API key in Sapi constructor');
      assert.equals(result, undefined);
      done();
    });
  },
  'should construct params when parameter functions are chained': function (done) {
    var mockRequest = function (method, url, opts, cb) {
      assert.equals(opts.queryStrings.query, 'somequery');
      assert.equals(opts.queryStrings.location, 'somelocation');
      opts.handlers[200]({ statusCode: 200 }, cb);
    };
    this.stub(bag, 'request', mockRequest);
    var sapi = new Sapi('somekey');  
    sapi.query('somequery').location('somelocation').search(function cb(err, result) {
      assert.isNull(err);
      assert.equals(result.statusCode, 200);
      done();
    });
  }
});
