#!/usr/bin/env node

/* eslint no-console: 0 */

"use strict";

var path = require("path");
var fs = require("fs");
var spawn = require("child_process").spawn;
var async = require("async");

var pkgs = fs.readdirSync(path.resolve("./packages/"));
var each = async.eachSeries;

var args = process.argv.slice(2);
if(args[0] === "--parallel"){
  each = async.each;
  args.shift();
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
  })
  _spawn.on("close", next);

}, function(err, res){
  if(err) console.error(err);
});
