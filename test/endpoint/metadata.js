var bag = require('bagofholding'),
  sandbox = require('sandboxed-module'),
  should = require('should'),
  checks, mocks,
  metadata;

describe('metadata', function () {

  function create(checks, mocks) {
    return sandbox.require('../../lib/endpoint/metadata', {
      requires: mocks ? mocks.requires : {},
      globals: {}
    });
  }

  beforeEach(function () {
    checks = {};
    mocks = {};
    metadata = create(checks, mocks);
  });

  describe('name', function () {

    it('should have endpoint name', function () {
      metadata.name.should.equal('metadata');
    });
  });

  describe('params', function () {

    it('should have required params', function () {
      should.exist(metadata.params.required);
    });

    it('should have optional params', function () {
      should.exist(metadata.params.optional);
    });
  });

  describe('path', function () {

    it('should return endpoint name and dataType param as path', function () {
      metadata.path({ dataType: 'somedatatype' }).should.equal('metadata/somedatatype');
    });
  });

  describe('handlers', function () {

    it('should pass result to callback when success handler is called', function (done) {
      function cb(err, result) {
        checks.handler_err = err;
        checks.handler_result = result;
        done();
      }
      metadata.handlers(cb)['200']({ foo: 'bar' });
      should.not.exist(checks.handler_err);
      checks.handler_result.foo.should.equal('bar');
    });
  });
});
 