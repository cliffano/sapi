var bag = require('bagofholding'),
  _jscov = require('../lib/sapi'),
  sandbox = require('sandboxed-module'),
  should = require('should'),
  checks, mocks,
  sapi;

describe('sapi', function () {

  function create(checks, mocks) {
    return sandbox.require('../lib/sapi', {
      requires: mocks ? mocks.requires : {},
      globals: mocks ? mocks.globals : {}
    });
  }

  beforeEach(function () {
    checks = {};
    mocks = {};
  });

  describe('sapi', function () {

    it('should set key and default url when url is not provided', function () {
      sapi = new (create(checks, mocks))('somekey');
      sapi.params.key.should.equal('somekey');
      sapi.url.should.equal('http://api.sensis.com.au/ob-20110511/test');
    });

    it('should set specified key and url when provided', function () {
      sapi = new (create(checks, mocks))('somekey', 'http://someurl');
      sapi.params.key.should.equal('somekey');
      sapi.url.should.equal('http://someurl');
    });

    it('should pass error to callback when an error occurs while sending request', function (done) {
      mocks.request_err = new Error('someerror');
      mocks.requires = {
        request: bag.mock.request(checks, mocks)
      };
      sapi = new (create(checks, mocks))();
      sapi.search(function cb(err, result) {
        checks.sapi_http_err = err;
        checks.sapi_http_result = result;
        done();
      });
      checks.sapi_http_err.message.should.equal('someerror');
      should.not.exist(checks.sapi_http_result);
    });

    it('should pass authentication failed error to callback when result has status code 403 and key is provided', function (done) {
      mocks.request_result = { statusCode: 403 };
      mocks.requires = {
        request: bag.mock.request(checks, mocks)
      };
      sapi = new (create(checks, mocks))('somekey');
      sapi.search(function cb(err, result) {
        checks.sapi_http_err = err;
        checks.sapi_http_result = result;
        done();
      });
      checks.sapi_http_err.message.should.equal('Authentication failed -  invalid key somekey');
      should.not.exist(checks.sapi_http_result);
    });

    it('should pass authentication required error to callback when result has status code 403 and key is not provided', function (done) {
      mocks.request_result = { statusCode: 403 };
      mocks.requires = {
        request: bag.mock.request(checks, mocks)
      };
      sapi = new (create(checks, mocks))();
      sapi.search(function cb(err, result) {
        checks.sapi_http_err = err;
        checks.sapi_http_result = result;
        done();
      });
      checks.sapi_http_err.message.should.equal('SAPI requires authentication - set key to SAPI instance');
      should.not.exist(checks.sapi_http_result);
    });

    it('should pass error with status code and body to callback when request responds with unexpected status code', function (done) {
      mocks.request_result = { statusCode: 503, body: 'unexpectedbody' };
      mocks.requires = {
        request: bag.mock.request(checks, mocks)
      };
      sapi = new (create(checks, mocks))('somekey');
      sapi.search(function cb(err, result) {
        checks.sapi_http_err = err;
        checks.sapi_http_result = result;
        done();
      });
      checks.sapi_http_err.message.should.equal('Unexpected status code 503 from SAPI\nResponse body:\nunexpectedbody');
      should.not.exist(checks.sapi_http_result);
    });

    it('should construct params when parameter functions are chained', function (done) {
      mocks.request_result = { statusCode: 403 };
      mocks.requires = {
        request: bag.mock.request(checks, mocks)
      };
      sapi = new (create(checks, mocks))('somekey');
      sapi.query('somequery').location('somelocation').search(function cb(err, result) {
        done();
      });
      checks.request_opts.qs.query.should.equal('somequery');
      checks.request_opts.qs.location.should.equal('somelocation');
    });

    it('should pass result to custom handler callback', function (done) {
      mocks.request_result = { statusCode: 200, body: '{ "foo": "bar" }' };
      mocks.requires = {
        request: bag.mock.request(checks, mocks)
      };
      sapi = new (create(checks, mocks))('somekey');
      sapi.search(function cb(err, result) {
        checks.sapi_http_err = err;
        checks.sapi_http_result = result;
        done();
      });
      should.not.exist(checks.sapi_http_err);
      checks.sapi_http_result.foo.should.equal('bar');
    });
  });

  describe('proxy', function () {

    it('should set proxy', function () {
      sapi = new (create(checks, mocks))('somekey');
      sapi.proxy('http://someproxy');
      sapi._proxy.should.equal('http://someproxy');
    });

    it('should allow chainable proxy setting', function () {
      sapi = new (create(checks, mocks))('somekey').proxy('http://someproxy');
      sapi._proxy.should.equal('http://someproxy');
    });

    it('should set environment variable http_proxy as proxy when it is not set via proxy function', function (done) {
      mocks.process_env = { http_proxy: 'http://someproxy' };
      mocks.request_result = { statusCode: 403 };
      mocks.requires = {
        request: bag.mock.request(checks, mocks)
      };
      mocks.globals = {
        process: bag.mock.process(checks, mocks)
      };
      sapi = new (create(checks, mocks))('somekey');
      sapi.search(function cb(err, result) {
        done();
      });
      checks.request_opts.proxy.should.equal('http://someproxy');
    });    
  });
});
 