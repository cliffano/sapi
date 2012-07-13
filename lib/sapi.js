var request = require('request'),
  search = require('./endpoint/search'),
  getByListingId = require('./endpoint/getbylistingid'),
  report = require('./endpoint/report'),
  metadata = require('./endpoint/metadata'),
  endpoints = [search, getByListingId, report, metadata];

/** internal
 * sapi#_http(method, url, qs, handlers, cb)
 * - method (String): http method
 * - url (String): Jenkins URL without query string
 * - proxy (String): proxy server URL in format http://user:pass@host:port
 * - qs (Object): object containing URL query strings with format { name: value }
 * - handlers (Object): response handlers with format { statuscode: handlerfunction }
 * - cb (Function): standard cb(err, result) callback
 *
 * Sends a HTTP request to a SAPI URL and handle the following errors:
 * - request error
 * - authentication error
 * - unexpected status error
 **/
function _http(method, url, proxy, queryStrings, handlers, cb) {

  var params = {
    method: method,
    uri: url,
    qs: queryStrings
  };

  // use environment variable http_proxy if proxy is not set via Sapi#proxy
  if (proxy || process.env.http_proxy) {
    params.proxy = proxy || process.env.http_proxy;
  }

  request(params, function (err, result) {
    if (err) {
      cb(err);
    } else if (result.statusCode === 403) {
      // SAPI does not differentiate required authentication and failed authentication
      // since both return status code 403, need to check key param existence to differentiate the two
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

/**
 * class Sapi
 * - key (String): Sensis API key, apply here http://developers.sensis.com.au/docs/getting_started/Apply_for_an_API_key
 * - url (String): Sensis API base URL - http://developers.sensis.com.au/docs/using_endpoints
 **/
function Sapi(key, url) {
  this.params = { key: key };
  this.url = (url || 'http://api.sensis.com.au/ob-20110511/test').replace(/\/$/, '');
}

/**
 * Sapi#proxy(String) -> Object
 * - proxy (String): proxy server URL in format http://user:pass@host:port
 *
 * Set proxy server URL, used to connect to SAPI service.
 **/
Sapi.prototype.proxy = function (proxy) {
  this.proxy = proxy;
  return this;
}

endpoints.forEach(function (endpoint) {

  var params = endpoint.params.required.concat(endpoint.params.optional);

  params.forEach(function (param) {
    /**
     * Sapi#endpointparam(value) -> Object
     * - value (String): parameter value
     *
     * Chainable function for each parameter.
     * Usage pattern: sapi.param1().param2().param3().end();
     * The idea here is to allow the construction of 0...* parameters before calling the endpoint.
     **/
    Sapi.prototype[param] = function (value) {
      this.params[param] = value;
      return this;
    }
  });

  /**
   * Sapi#endpointname(cb)
   * - cb (Function): standard cb(err, result) callback
   *
   * End function for each endpoint that makes http request to SAPI.
   **/
  Sapi.prototype[endpoint.name] = function _endpoint(cb) {
    _http('get', this.url + '/' + endpoint.path(this.params), this.params, endpoint.handlers(cb), cb);
  }
});

module.exports = Sapi;