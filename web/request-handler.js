var path = require('path');
var archive = require('../helpers/archive-helpers');
var http = require('http-request');
var helpers = require('./http-helpers');
// require more modules/folders here!
//genaric functions 
var sendResponse = function(res, data, statusCode) {
    statusCode = statusCode || 200;
    res.writeHead(statusCode, helpers.headers);
    res.end(JSON.stringify(data));
}
var methods = {
  'GET': function  (req, res, page) {
    helpers.serveAssets(res, page, function(data){
      console.log('data', data);
    })
    sendResponse(res, {test: true});
  },
  'POST': function (res, data, statusCode, page) {

  }
};

exports.handleRequest = function (req, res, page) {
  // res.end(archive.paths.list);
  console.log("Serving request type " + req.method + " for url " + req.url);
  var action = methods[req.method];
  if (action) {
    action(req, res, '/public/index.html');

  } else {
    sendResponse(res, null, 404);
  }
};

