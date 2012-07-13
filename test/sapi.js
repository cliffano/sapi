var bag = require('bagofholding'),
  sandbox = require('sandboxed-module'),
  should = require('should'),
  checks, mocks,
  sapi;

describe('sapi', function () {

  function create(checks, mocks) {
    return sandbox.require('../lib/sapi', {
      requires: mocks ? mocks.requires : {},
      globals: {}
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
        checks.sapi_search_err = err;
        checks.sapi_search_result = result;
        done();
      });
      checks.sapi_search_err.message.should.equal('someerror');
      should.not.exist(checks.sapi_search_result);
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
  });
});
 