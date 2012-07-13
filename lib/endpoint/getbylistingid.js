/**
 * Get by Listing ID endpoint name and parameters.
 * Reference: http://developers.sensis.com.au/docs/endpoint_reference/Metadata
 **/
var name = 'getByListingId',
  params = {
    required: ['key', 'query'],
    optional: []
  };

/**
 * getbylistingid#path -> String
 * - params (Object): endpoint parameters constructed from chainable functions
 *
 * Create the endpoint URL path, to be appended to SAPI base URL.
 **/
function path (params) {
  return name;
}

/**
 * getbylistingid#handlers -> Object
 * - cb (Function): standard cb(err, result) callback
 *
 * Set up endpoint success and error handlers.
 **/
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