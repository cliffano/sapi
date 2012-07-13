var bag = require('bagofholding'),
  sandbox = require('sandboxed-module'),
  should = require('should'),
  checks, mocks,
  report;

describe('report', function () {

  function create(checks, mocks) {
    return sandbox.require('../../lib/endpoint/report', {
      requires: mocks ? mocks.requires : {},
      globals: {}
    });
  }

  beforeEach(function () {
    checks = {};
    mocks = {};
    report = create(checks, mocks);
  });

  describe('name', function () {

    it('should have endpoint name', function () {
      report.name.should.equal('report');
    });
  });

  describe('params', function () {

    it('should have required params', function () {
      should.exist(report.params.required);
    });

    it('should have optional params', function () {
      should.exist(report.params.optional);
    });
  });

  describe('path', function () {

    it('should return endpoint name and eventName param as path', function () {
      report.path({ eventName: 'someeventname' }).should.equal('report/someeventname');
    });
  });

  describe('handlers', function () {

    it('should pass result to callback when success handler is called', function (done) {
      function cb(err, result) {
        checks.handler_err = err;
        checks.handler_result = result;
        done();
      }
      report.handlers(cb)['200']({ foo: 'bar' });
      should.not.exist(checks.handler_err);
      checks.handler_result.foo.should.equal('bar');
    });
  });
});
 