/**
 * http://developers.sensis.com.au/docs/endpoint_reference/Report
 **/
var name = 'report',
  params = {
    required: ['userIp', 'id'],
    optional: ['userAgent', 'userSessionId', 'content']
  };

function path (params) {
  return name + '/' + params.eventName;
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