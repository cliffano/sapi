/**
 * Search endpoint name and parameters.
 * Reference: http://developers.sensis.com.au/docs/endpoint_reference/Search
 */
var name = 'search',
  params = {
    required: ['key', 'query', 'location'],
    optional: ['page', 'rows', 'sortBy', 'sensitiveCategories', 'categoryId', 'postcode', 'radius', 'locationTiers', 'suburb', 'state', 'boundingBox', 'content', 'productKeyword']
  };

/**
 * Create the endpoint URL path, to be appended to SAPI base URL.
 *
 * @param {Object} params: endpoint parameters constructed from chainable functions
 * @return {String} endpoint path
 */
function path (params) {
  return name;
}

/**
 * Set up endpoint success and error handlers.
 *
 * @param {Function} cb: standard cb(err, result) callback
 * @return {Object} status handlers
 */
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