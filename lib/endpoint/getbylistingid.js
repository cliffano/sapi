/**
 * Get by Listing ID endpoint name and parameters.
 * Reference: http://developers.sensis.com.au/docs/endpoint_reference/Metadata
 */
var name = 'getByListingId',
  params = {
    required: ['key', 'query'],
    optional: []
  },
  handlers = { 200: _success, 400: _invalid };

/**
 * Create the endpoint URL path, to be appended to SAPI base URL.
 *
 * @param params {Object}: endpoint parameters constructed from chainable functions
 * @return {String} endpoint path
 */
function path (params) {
  return name;
}

// endpoint handlers

function _success(result, cb) {
  cb(null, result);
}

function _invalid(result, cb) {
  cb(new Error('Validation error'), result);    
}

exports.name = name;
exports.params = params;
exports.path = path;
exports.handlers = handlers;