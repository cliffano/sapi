sapi [![http://travis-ci.org/cliffano/sapi](https://secure.travis-ci.org/cliffano/sapi.png?branch=master)](http://travis-ci.org/cliffano/sapi)
-----------

[Sensis API](http://developers.sensis.com.au/about) Node.js client

Installation
------------

    npm install sapi

or as a dependency in package.json file:

    "dependencies": {
      "sapi": "x.y.z"
    }

Usage
-----

    var sapi = require('sapi'),
      s = new sapi('key', 'http://sapi/version/env/');

    s.query('restaurant').location('222 Lonsdale St, Melbourne, VIC 3000').search(function (err, result) {
      if (err) {
        console.error(err);
      } else {
        console.log(require('util').inspect(result));
      }
    });