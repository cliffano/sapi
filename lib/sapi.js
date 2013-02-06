var bag = require('bagofholding'),
  search = require('./endpoint/search'),
  getByListingId = require('./endpoint/getbylistingid'),
  report = require('./endpoint/report'),
  metadata = require('./endpoint/metadata'),
  endpoints = [search, getByListingId, report, metadata];

/**
 * class Sapi
 *
 * @param {String} key: Sensis API key, apply for the key here http://developers.sensis.com.au/docs/getting_started/Apply_for_an_API_key
 * @param {Object} opts: optional
 * - url: optional Sensis API base URL, defaults to http://developers.sensis.com.au/docs/using_endpoints
 * - proxy: optional proxy server URL in format http://user:pass@host:port, if custom URL is not specified then http_proxy will be used if exists
 */
function Sapi(key, opts) {
  opts = opts || {};

  this.params = { key: key };
  this.url = (opts.url || 'http://api.sensis.com.au/ob-20110511/test').replace(/\/$/, '');
  this.opts = {
    proxy: opts.proxy || process.env.http_proxy,
    handlers: {
      403: function (result, cb) {
        // SAPI does not differentiate required authentication and failed authentication
        // since both return status code 403, need to check key param existence to differentiate the two
        if (key) {
          cb(new Error('Authentication failed -  invalid key ' + queryStrings.key));
        } else {
          cb(new Error('SAPI requires authentication - set API key in Sapi constructor'));
        }
      }
    }
  };
}

endpoints.forEach(function (endpoint) {

  var params = endpoint.params.required.concat(endpoint.params.optional);

  params.forEach(function (param) {
    /**
     * Chainable function for each parameter.
     * Usage pattern: sapi.param1().param2().param3().end();
     * The idea here is to allow the construction of 0...* parameters before calling the endpoint.
     *
     * @param {String} value: parameter value
     */
    Sapi.prototype[param] = function (value) {
      this.params[param] = value;
      return this;
    };
  });

  /**
   * End function for each endpoint that makes http request to SAPI.
   *
   * @param {Function} cb: standard cb(err, result) callback
   */
  Sapi.prototype[endpoint.name] = function (cb) {
    bag.http.request('get', this.url + '/' + endpoint.path(this.params), this._proxy, this.params, endpoint.handlers(cb), cb);
  };
});

module.exports = Sapi;
