/**
 * Search endpoint name and parameters.
 * Reference: http://developers.sensis.com.au/docs/endpoint_reference/Search
 */
var name = 'search',
  params = {
    required: ['key', 'query', 'location'],
    optional: ['page', 'rows', 'sortBy', 'sensitiveCategories', 'categoryId', 'postcode', 'radius', 'locationTiers', 'suburb', 'state', 'boundingBox', 'content', 'productKeyword']
  },
  handlers = { 200: _success, 206: _spellChecked, 400: _invalid };
 
/**
 * Create the endpoint URL path, to be appended to SAPI base URL.
 *
 * @param {Object} params: endpoint parameters constructed from chainable functions
 * @return {String} endpoint path
 */
function path (params) {
  return name;
}

// endpoint handlers

function _success(result, cb) {
  cb(null, result);
}

function _spellChecked(result, cb) {
  cb(null, result);    
}

function _invalid(result, cb) {
  cb(new Error('Validation error'), result);    
}

exports.name = name;
exports.params = params;
exports.path = path;
exports.handlers = handlers;