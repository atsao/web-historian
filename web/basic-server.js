var http = require("http");
var handler = require("./request-handler");
var initialize = require("./initialize.js");
var parser = require('url');
var archive = require('../helpers/archive-helpers');

// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
initialize();

var port = 8080;
var ip = "127.0.0.1";

//route obj
var routes = {
  '/': handler.handleRequest(archive.paths.siteAssets),
  '/styles.css': handler.handleRequest(archive.paths.siteAssets),
  '/www.google.com': handler.handleRequest(archive.paths.archivedSites)
};

var server = http.createServer( function (request, response) {
  console.log("Serving request type before router " + request.method + " for url " + request.url);
  var route = routes[parser.parse(request.url).pathname];

  if (route) {
    route(request, response);
  } else {
    response.writeHead(404, {'Content-Type': 'text/html'});
    response.end("not found");
  }
});

if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log("Listening on http://" + ip + ":" + port);
}

