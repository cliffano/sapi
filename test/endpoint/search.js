var bag = require('bagofholding'),
  sandbox = require('sandboxed-module'),
  should = require('should'),
  checks, mocks,
  search;

describe('search', function () {

  function create(checks, mocks) {
    return sandbox.require('../../lib/endpoint/search', {
      requires: mocks ? mocks.requires : {},
      globals: {}
    });
  }

  beforeEach(function () {
    checks = {};
    mocks = {};
    search = create(checks, mocks);
  });

  describe('name', function () {

    it('should have endpoint name', function () {
      search.name.should.equal('search');
    });
  });

  describe('params', function () {

    it('should have required params', function () {
      should.exist(search.params.required);
    });

    it('should have optional params', function () {
      should.exist(search.params.optional);
    });
  });

  describe('path', function () {

    it('should return endpoint name as path', function () {
      search.path().should.equal('search');
    });
  });

  describe('handlers', function () {

    it('should pass result to callback when success handler is called', function (done) {
      function cb(err, result) {
        checks.handler_err = err;
        checks.handler_result = result;
        done();
      }
      search.handlers(cb)['200']({ foo: 'bar' });
      should.not.exist(checks.handler_err);
      checks.handler_result.foo.should.equal('bar');
    });

    it('should pass result to callback when search modified handler is called', function (done) {
      function cb(err, result) {
        checks.handler_err = err;
        checks.handler_result = result;
        done();
      }
      search.handlers(cb)['206']({ foo: 'bar' });
      should.not.exist(checks.handler_err);
      checks.handler_result.foo.should.equal('bar');
    });

    it('should pass error and result to callback when validation error handler is called', function (done) {
      function cb(err, result) {
        checks.handler_err = err;
        checks.handler_result = result;
        done();
      }
      search.handlers(cb)['400']({ foo: 'bar' });
      checks.handler_err.message.should.equal('Validation error');
      checks.handler_result.foo.should.equal('bar');
    });
  });
});
 