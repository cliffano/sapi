var bag = require('bagofholding'),
  sandbox = require('sandboxed-module'),
  should = require('should'),
  checks, mocks,
  metadata;

describe('metadata', function () {

  function create(checks, mocks) {
    return sandbox.require('../../lib/metadata', {
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
 