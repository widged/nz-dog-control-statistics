#!/usr/bin/env node

var http = require('http');
var fs = require('fs');
var path = require('path')

module.exports = function(url, cb) {
  let dest = 'downloaded/' + path.basename(url)
  var file = fs.createWriteStream(dest);
  var request = http.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close((typeof cb === "function") ? cb : undefined);
      // close() is async, call cb after close completes.
    });
  }).on('error', function(err) { // Handle errors
    fs.unlink(dest); // Delete the file async. (But we don't check the result)
    if (typeof cb === "function") cb(err.message);
  });
};
