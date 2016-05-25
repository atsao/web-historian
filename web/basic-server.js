var http = require("http");
var handler = require("./request-handler");
var initialize = require("./initialize.js");
var parser = require('url');

// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
initialize();

var port = 8080;
var ip = "127.0.0.1";
//route obj
var routes = {
  '/': handler.handleRequest
};
var server = http.createServer( function (request, response) {

  var route = parser.parse(request.url).pathname;
  if (routes[route]) {
    routes[route](request, response, page);
  }
});

if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log("Listening on http://" + ip + ":" + port);
}

