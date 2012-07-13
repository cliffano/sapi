var bag = require('bagofholding'),
  sandbox = require('sandboxed-module'),
  should = require('should'),
  checks, mocks,
  getbylistingid;

describe('getbylistingid', function () {

  function create(checks, mocks) {
    return sandbox.require('../../lib/getbylistingid', {
      requires: mocks ? mocks.requires : {},
      globals: {}
    });
  }

  beforeEach(function () {
    checks = {};
    mocks = {};
  });

  describe('bar', function () {

    it('should foo when bar', function () {
    });
  });
});
 