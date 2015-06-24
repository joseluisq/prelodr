"use strict";

var fs = require("fs");
var jsdom = require("mocha-jsdom");
var expect = require("chai").expect;

describe("Prelodr (jQuery)", function() {
  var $;

  this.timeout(15000);

  jsdom({
    src: [
      fs.readFileSync("node_modules/jquery/dist/jquery.js", "utf-8"),
      fs.readFileSync("lib/prelodr.js", "utf-8")
    ]
  });

  before(function() {
    $ = global.window.jQuery;
    document.body.innerHTML = fs.readFileSync("test/test.html", "utf-8");
  });

  it("class should be a jQuery instance.", function() {
    var $element = $("body").prelodr();
    expect($element).to.be.instanceof($);
  });

  it("show() callback should be called successfully.", function(done) {
    var $element = $("body").prelodr({
      show: function() {
        done();
      }
    });

    $element.prelodr("in", "Loading...");
    expect($element).to.be.instanceof($);
  });

  it("hide() callback should be called successfully.", function(done) {
    var $element = $("body").prelodr({
      hide: function() {
        done();
      }
    });

    $element.prelodr("in", "Loading...");
    $element.prelodr("out");
    expect($element).to.be.instanceof($);
  });

  it("isVisible() should return \"true\" by default.", function(done) {
    var $element = $("body").prelodr({
      hide: function() {
        done();
      }
    });

    $element.prelodr("in", "Processing...");
    expect($element.prelodr("isVisible")).to.be.true;
    $element.prelodr("out");
  });

});
