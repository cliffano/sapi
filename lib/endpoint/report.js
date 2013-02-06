/**
 * Report endpoint name and parameters.
 * Reference: http://developers.sensis.com.au/docs/endpoint_reference/Report
 */
var name = 'report',
  params = {
    required: ['key', 'userIp', 'id'],
    optional: ['userAgent', 'userSessionId', 'content']
  },
  handlers = { 200: _success, 206: _spellChecked, 400: _invalid };

/**
 * Create the endpoint URL path, to be appended to SAPI base URL.
 *
 * @param params {Object}: endpoint parameters constructed from chainable functions
 * @return {String} endpoint path
 */
function path (params) {
  return name + '/' + params.eventName;
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