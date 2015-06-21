<img align="right" src="https://raw.github.com/cliffano/sapi/master/avatar.jpg" alt="Avatar"/>

[![Build Status](https://img.shields.io/travis/cliffano/sapi.svg)](http://travis-ci.org/cliffano/sapi)
[![Dependencies Status](https://img.shields.io/david/cliffano/sapi.svg)](http://david-dm.org/cliffano/sapi)
[![Coverage Status](https://img.shields.io/coveralls/cliffano/sapi.svg)](https://coveralls.io/r/cliffano/sapi?branch=master)
[![Published Version](https://img.shields.io/npm/v/sapi.svg)](http://www.npmjs.com/package/sapi)
<br/>
[![npm Badge](https://nodei.co/npm/sapi.png)](http://npmjs.org/package/sapi)

Sapi
----

Sapi is a [Sensis API](http://developers.sensis.com.au/about) node.js client.

This is handy when you want to use [Sensis API](http://developers.sensis.com.au/about) service from a Node.js application. Sapi module provides a chainable interface to set the endpoint parameters.

Tested with Sensis API version ob-20110511.

Installation
------------

    npm install sapi

or as a dependency in package.json file:

    "dependencies": {
      "sapi": "x.y.z"
    }

Usage
-----

    var Sapi = require('sapi'),
      sapi = new Sapi('apikey', {
        url: 'http://api.sensis.com.au/ob-20110511/test/',
        proxy: 'http://user:pass@proxy:8080'
      });

You can [apply for Sensis API key](http://developers.sensis.com.au/docs/getting_started/Apply_for_an_API_key) from Sensis Developer Centre.

Parameters can then be chained to an endpoint:

    sapi
      .param1('value1')
      .param2('value2')
      .param3('value3')
      .endpoint(function (err, result) {
        ...
      });

Search for restaurants in Melbourne:

    sapi
      .query('restaurants')
      .location('Melbourne')
      .search(function (err, result) {
        ...
      });

Get listing details by ID:

    sapi
      .query('12345')
      .getByListingId(function (err, result) {
        ...
      });

Retrieve categories metadata:

    sapi
      .dataType('categories')
      .metadata(function (err, result) {
        ...
      });

Send report events:

    sapi
      .userIp('192.1.2.3')
      .id('VyY2UiOi')
      .content('(03) 1234 5678')
      .report(function (err, result) {
        ...
      });

Endpoints
---------

Check out Sensis API documentation for further details of the [endpoints](http://developers.sensis.com.au/docs/using_endpoints), a list of parameters, and response message structure:

* [Search](http://developers.sensis.com.au/docs/endpoint_reference/Search)
* [Get by Listing ID](http://developers.sensis.com.au/docs/endpoint_reference/Get_by_Listing_ID)
* [Report](http://developers.sensis.com.au/docs/endpoint_reference/Report)
* [Metadata](http://developers.sensis.com.au/docs/endpoint_reference/Metadata)

Colophon
--------

[Developer's Guide](http://cliffano.github.io/developers_guide.html#nodejs)

Build reports:

* [Code complexity report](http://cliffano.github.io/sapi/complexity/plato/index.html)
* [Unit tests report](http://cliffano.github.io/sapi/test/buster.out)
* [Test coverage report](http://cliffano.github.io/sapi/coverage/buster-istanbul/lcov-report/lib/index.html)
* [Integration tests report](http://cliffano.github.io/sapi/test-integration/buster.out)
* [API Documentation](http://cliffano.github.io/sapi/doc/dox-foundation/index.html)

Articles:

* [Sapi, A Node.js Client For Sensis API](http://blog.cliffano.com/2012/07/15/sapi-a-node-js-client-for-sensis-api/)
