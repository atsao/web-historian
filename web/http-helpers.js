var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  // 'Content-Type': "text/html"
};

exports.serveAssets = function(response, asset, callback) {

  fs.exists(asset, function(exists) {
    if (exists) {
      fs.readFile(asset, function(error, contents) {
        if (!error) {
          // response.end(contents);
          callback(contents);
        } else {
          console.error(error);
        }
      });
    } else {
      response.writeHead(404, {'Content-Type': 'text/html'});
      response.end(contents);
    }
  })


};

  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

// As you progress, keep thinking about what helper functions you can put here!
