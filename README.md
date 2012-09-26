Sapi [![http://travis-ci.org/cliffano/sapi](https://secure.travis-ci.org/cliffano/sapi.png?branch=master)](http://travis-ci.org/cliffano/sapi)
-----------

Sapi is a [Sensis API](http://developers.sensis.com.au/about) Node.js client.

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

    var sapi = new (require('sapi'))('apikey', 'http://api.sensis.com.au/ob-20110511/test/');

    sapi.proxy('http://user:pass@proxy:8080'); // optional

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
