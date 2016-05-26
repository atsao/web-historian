var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  var results = [];

  fs.readFile(exports.paths.list, 'utf8', function(error, data) {
    // data.split('\n');
    // results.push(data);
    // console.log('RESULTS:', results);
    // callback(results);
    callback(data.split('\n'));
  });

};

exports.isUrlInList = function(url, callbackTrue, callbackFalse){
  return exports.readListOfUrls(function(data) {
    console.log('inside urlinlist', data);
    // console.log('*** LIST:', list);
    if (data.indexOf(url) !== -1) {
      console.log('found');
      return true;
    } else {
      // console.log('write', url);
      // exports.addUrlToList(url);
      return false;
    }
  });
};

exports.addUrlToList = function(url, callback){
  // writeFile
  console.log('before url:', url);
  console.log('path', exports.paths.list);
  fs.writeFile(exports.paths.list, url + '\n', {encoding: 'utf8', flag: 'a'}, function(error, data) {
    callback(data);
  })
};

exports.isUrlArchived = function(url){
  // readFile? in archives folder?
};

exports.downloadUrls = function(){
};
