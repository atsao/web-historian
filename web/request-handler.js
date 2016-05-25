var path = require('path');
var archive = require('../helpers/archive-helpers');
var http = require('http-request');
var helpers = require('./http-helpers');
// require more modules/folders here!
//genaric functions 
var sendResponse = function(req, res, data, statusCode) {
    statusCode = statusCode || 200;
    // var tempHeaders = helpers.headers;
    var mimeType;

    console.log('req.url: ', req.url);
    console.log('path extname:', path.extname(req.url));

    if (path.extname(req.url) !== '') {
      mimeType = 'text/' + path.extname(req.url).split('.')[1];
    } else {
      mimeType = 'text/html';
    }
    console.log('mimeType:', mimeType);

    res.setHeader("Content-Type", mimeType);
    res.writeHead(statusCode, helpers.headers);
    res.end(data);
}
var methods = {
  'GET': function  (req, res, filePathname) {
    helpers.serveAssets(res, filePathname, function(data){
    // console.log('data', data);
    sendResponse(req, res, data);
    })
  },
  'POST': function (res, data, statusCode, page) {

  }
};

exports.handleRequest = function (req, res, page) {
  // res.end(archive.paths.list);
  console.log("Serving request type " + req.method + " for url " + req.url);

  var fileName = path.basename(req.url) || 'index.html';
  var localDir = __dirname + '/public/';

  console.log('fileName:', fileName);
  console.log('localDir:', localDir);

  var action = methods[req.method];
  if (action) {
    action(req, res, localDir + fileName);

  } else {
    sendResponse(res, "Not Found", 404);
  }
};

