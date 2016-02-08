/* global describe it */

"use strict";

var assert = require("chai").assert;
var exec = require("child_process").execSync;

describe("lerna-run", function(){
  var res = exec("./bin/lerna-run.js node run.js").toString();

  it("should run serial", function(){
    assert.match(res, /BAR\nFOO/);
    assert.notMatch(res, /FOO\nBAR/);
  });
});

describe("lerna-run --parallel", function(){
  var res = exec("./bin/lerna-run.js --parallel node run.js").toString();

  it("should run parallel", function(){
    assert.notMatch(res, /BAR\nFOO/);
    assert.match(res, /FOO\nBAR/);
  });
});
