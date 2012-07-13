var bag = require('bagofholding'),
  sandbox = require('sandboxed-module'),
  should = require('should'),
  checks, mocks,
  getbylistingid = require('../../lib/endpoint/getbylistingid');

describe('getbylistingid', function () {

  function create(checks, mocks) {
    return sandbox.require('../../lib/endpoint/getbylistingid', {
      requires: mocks ? mocks.requires : {},
      globals: {}
    });
  }

  beforeEach(function () {
    checks = {};
    mocks = {};
  });

  describe('name', function () {

    it('should have endpoint name', function () {
      getbylistingid.name.should.equal('getByListingId');
    });
  });

  describe('params', function () {

    it('should have required params', function () {
      should.exist(getbylistingid.params.required);
    });

    it('should have optional params', function () {
      should.exist(getbylistingid.params.optional);
    });
  });

  describe('path', function () {

    it('should return endpoint name as path', function () {
      getbylistingid.path().should.equal('getByListingId');
    });
  });

  describe('handlers', function () {

    it('should pass result to callback when success handler is called', function () {
      function cb(err, result) {
        checks.handler_err = err;
        checks.handler_result = result;
      }
      getbylistingid.handlers(cb)['200']({ foo: 'bar' });
      should.not.exist(checks.handler_err);
      checks.handler_result.foo.should.equal('bar');
    });
  });
});
 