var buster = require('buster'),
  search = require('../../lib/endpoint/search');

buster.testCase('search', {
  'should have endpoint name': function () {
    assert.equals(search.name, 'search');
  },
  'should have required params': function () {
    assert.equals(search.params.required, ['key', 'query', 'location']);
  },
  'should have optional params': function () {
    assert.equals(search.params.optional, ['page', 'rows', 'sortBy', 'sensitiveCategories', 'categoryId', 'postcode', 'radius', 'locationTiers', 'suburb', 'state', 'boundingBox', 'content', 'productKeyword']);
  },
  'should return endpoint name as path': function () {
    assert.equals(search.path(), 'search');
  },
  'should pass result to callback when success handler is called': function (done) {
    function cb(err, result) {
      assert.isNull(err);
      assert.equals(result.foo, 'bar');
      done();
    }
    search.handlers(cb)['200']({ foo: 'bar' });
  },
  'should pass result to callback when search modified handler is called': function (done) {
    function cb(err, result) {
      assert.isNull(err);
      assert.equals(result.foo, 'bar');
      done();
    }
    search.handlers(cb)['206']({ foo: 'bar' });
  },
  'should pass error and result to callback when validation error handler is called': function (done) {
    function cb(err, result) {
      assert.equals(err.message, 'Validation error');
      assert.equals(result.foo, 'bar');
      done();
    }
    search.handlers(cb)['400']({ foo: 'bar' });
  }
});