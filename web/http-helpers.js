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

exports.serveAssets = function(res, asset, callback) {
  // var temp =[];
  // console.log('calling serveAssets')
  // //use fs readFile or createReadStream
  // fs.readFile(asset, function(err, data) {
  //   if (err) {
  //     throw err;
  //   }
  //   temp.push(data);
  //   callback(temp);
  // });
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

  //callback does something with asset or data
  // write response body of the asset

  fs.exists(asset, function(exists) {
    if (exists) {
      fs.readFile(asset, function(error, contents) {
        if (!error) {
          // res.end(contents);
          callback(contents);
        } else {
          console.error(error);
        }
      });
    } else {
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.end(contents);
    }
  })


};

  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

// As you progress, keep thinking about what helper functions you can put here!
