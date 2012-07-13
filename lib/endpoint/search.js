/**
 * http://developers.sensis.com.au/docs/endpoint_reference/Search
 **/
var name = 'search',
  params = {
    required: ['query', 'location'],
    optional: ['page', 'rows', 'sortBy', 'sensitiveCategories', 'categoryId', 'postcode', 'radius', 'locationTiers', 'suburb', 'state', 'boundingBox', 'content', 'productKeyword']
  };

function path (params) {
  return name;
}

function handlers(cb) {
  return {
    200: function (result) {
      cb(null, result);    
    }
  }
}

exports.name = name;
exports.params = params;
exports.path = path;
exports.handlers = handlers;