/**
 * http://developers.sensis.com.au/docs/endpoint_reference/Metadata
 **/
var name = 'getByListingId',
  params = {
    required: ['query'],
    optional: []
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