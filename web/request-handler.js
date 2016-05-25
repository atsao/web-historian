var path = require('path');
var archive = require('../helpers/archive-helpers');
var http = require('http-request');
var helpers = require('./http-helpers');
// require more modules/folders here!
//genaric functions 
var sendResponse = function(request, response, data, statusCode) {
    statusCode = statusCode || 200;
    // var tempHeaders = helpers.headers;
    var mimeType;

    // console.log('request.url: ', request.url);
    // console.log('path extname:', path.extname(request.url));

    if (path.extname(request.url) !== '') {
      mimeType = 'text/' + path.extname(request.url).split('.')[1];
    } else {
      mimeType = 'text/html';
    }

    // console.log('mimeType:', mimeType);

    response.setHeader("Content-Type", mimeType);
    response.writeHead(statusCode, helpers.headers);
    response.end(data);
}
var methods = {
  'GET': function  (request, response, pathname) {
    var fileName = path.basename(request.url) || 'index.html';
    var fullPath = pathname + '/' + fileName;

    helpers.serveAssets(response, fullPath, function(data){
      // console.log('data', data);
      sendResponse(request, response, data);
    });
  },
  'POST': function (request, response) {
    console.log("POST!");
    // archive.readListOfUrls();
    // console.log('request.url:', request.url);
    // archive.isUrlInList(request.url);

    var body = '';

    request.on('data', function(chunk) {
      // console.log('le chunk:', chunk);
      body += chunk;
      console.log('body:', body);
      console.log('body type:', typeof body);
      archive.isUrlInList(JSON.parse(body).url);
    });

    request.on('end', function(data) {
      console.log('end of POST')
      response.writeHead(302);
      response.end();

    });


  }
};

var getPathname = function(request) {
  var fileName = path.basename(request.url) || 'index.html';
  var localDir = __dirname + '/public/';
  var filePathname = localDir + fileName;
};


exports.handleRequest = function(pathname) {
  var pathname = pathname;

  return function (request, response) {
    // response.end(archive.paths.list);
    console.log("Serving request type " + request.method + " for url " + request.url);

    var action = methods[request.method];
    if (action) {
      action(request, response, pathname);

    } else {
      sendResponse(response, "Not Found", 404);
    }
  };
};
