/**
 * Report endpoint name and parameters.
 * Reference: http://developers.sensis.com.au/docs/endpoint_reference/Report
 */
var name = 'report',
  params = {
    required: ['key', 'userIp', 'id'],
    optional: ['userAgent', 'userSessionId', 'content']
  };

/**
 * Create the endpoint URL path, to be appended to SAPI base URL.
 *
 * @param params {Object}: endpoint parameters constructed from chainable functions
 * @return {String} endpoint path
 */
function path (params) {
  return name + '/' + params.eventName;
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