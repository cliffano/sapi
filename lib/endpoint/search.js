/**
 * Search endpoint name and parameters.
 * Reference: http://developers.sensis.com.au/docs/endpoint_reference/Search
 **/
var name = 'search',
  params = {
    required: ['key', 'query', 'location'],
    optional: ['page', 'rows', 'sortBy', 'sensitiveCategories', 'categoryId', 'postcode', 'radius', 'locationTiers', 'suburb', 'state', 'boundingBox', 'content', 'productKeyword']
  };

/**
 * search#path -> String
 * - params (Object): endpoint parameters constructed from chainable functions
 *
 * Create the endpoint URL path, to be appended to SAPI base URL.
 **/
function path (params) {
  return name;
}

/**
 * search#handlers -> Object
 * - cb (Function): standard cb(err, result) callback
 *
 * Set up endpoint success and error handlers.
 **/
function handlers(cb) {
  return {
    200: function (result) {
      cb(null, result);    
    },
    206: function (result) {
      cb(null, result);    
    },
    400: function (result) {
      cb(new Error('Validation error'), result);    
    }
  };
}

exports.name = name;
exports.params = params;
exports.path = path;
exports.handlers = handlers;