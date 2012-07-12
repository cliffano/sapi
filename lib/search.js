var params = {
  required: ['query', 'location'],
  optional: ['page', 'rows', 'sortBy', 'sensitiveCategories', 'categoryId', 'postcode', 'radius', 'locationTiers', 'suburb', 'state', 'boundingBox', 'content', 'productKeyword']
};

exports.name = 'search';
exports.params = params;
exports.handlers = function (cb) {
  return {
    200: function(result) {
      cb(null, result);    
    }
  }
};