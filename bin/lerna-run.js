#!/usr/bin/env node

/* eslint no-console: 0 */

"use strict";

var path = require("path");
var fs = require("fs");
var spawn = require("child_process").spawn;
var async = require("async");

var pkg = require("../package.json");
var pkgs = fs.readdirSync(path.resolve("./packages/"));
var each = async.eachSeries;

var args = process.argv.slice(2);

var options = [];
while(/^-.+/.test(args[0])){
  options.push(args.shift());
}

switch(options[0]){
case "--parallel":
  each = async.each;
  break;
case "-v":
case "--version":
  console.log(pkg.name + " v" + pkg.version);
  break;
}
var cmd = args.join(' ');

console.log("command:  " + cmd);
console.log("packages: " + JSON.stringify(pkgs));

if(cmd.length < 1) process.exit(0);

each(pkgs, function(pkg, next){
  var pkgdir = path.resolve("./packages", pkg);
  var _spawn = spawn("sh", ["-c", cmd], {
    cwd: pkgdir,
    stdio: ['pipe', process.stdout, process.stderr],
    env: process.env
  });
  _spawn.on("close", (exitCode) => {
    if (exitCode) {
      process.exit(exitCode);
    }
    next();
  });

}, function(err, res){
  if(err) console.error(err);
});
