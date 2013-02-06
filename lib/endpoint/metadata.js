/**
 * Metadata endpoint name and parameters.
 * Reference: http://developers.sensis.com.au/docs/endpoint_reference/Metadata
 */
var name = 'metadata',
  params = {
    required: ['key', 'dataType'],
    optional: []
  },
  handlers = { 200: _success };

/**
 * Create the endpoint URL path, to be appended to SAPI base URL.
 *
 * @param params {Object}: endpoint parameters constructed from chainable functions
 * @return {String} endpoint path
 */
function path (params) {
  return name + '/' + params.dataType;
}

// endpoint handlers

function _success(result, cb) {
  cb(null, result);
}

exports.name = name;
exports.params = params;
exports.path = path;
exports.handlers = handlers;