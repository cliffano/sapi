var request = require('request'),
  search = require('./search'),
  endpoints = [search];

function _http(method, url, queryStrings, handlers, cb) {

  request({
    method: method,
    uri: url,
    qs: queryStrings
  }, function (err, result) {

    if (err) {
      cb(err);
    } else if (result.statusCode === 403) {
      // TODO: why not return 401 instead for invalid authentication,
      //       to differentiate the error to missing authentication
      if (queryStrings.key) {
        cb(new Error('Authentication failed -  invalid key ' + queryStrings.key));
      } else {
        cb(new Error('SAPI requires authentication - set key to SAPI instance'));
      }
    } else if (handlers[result.statusCode]) {
      handlers[result.statusCode](result); 
    } else {
      cb(new Error('Unexpected status code ' + result.statusCode + ' from SAPI\nResponse body:\n' + result.body));
    }
  });  
}

function Sapi(key, url) {
  this.params = { key: key };
  this.url = (url || 'http://api.sensis.com.au/ob-20110511/test').replace(/\/$/, '');
}

endpoints.forEach(function (endpoint) {

  var params = endpoint.params.required.concat(endpoint.params.optional);

  params.forEach(function (param) {
    Sapi.prototype[param] = function (value) {
      this.params[param] = value;
      return this;
    }
  });

  Sapi.prototype[endpoint.name] = function (cb) {
    _http('get', this.url + '/' + endpoint.name, this.params, endpoint.handlers(cb), cb);
  }
});

module.exports = Sapi;