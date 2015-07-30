/**
 *  Prelodr Testing
 */
describe('Prelodr', function () {
  'use strict';

  var prelodrGlobal;

  beforeEach(function () {
    // Initialize the Prelodr
    prelodrGlobal = new Prelodr();
  });

  // Basic usage
  describe('initializing', function () {

    it('class should be defined.', function () {
      var prelodr = new Prelodr();
      expect(prelodr).toBeDefined();
    });

  });

  // Callbacks
  describe('callbacks', function () {

    it('show() callback should be called successfully.', function (done) {
      var prelodr = new Prelodr({
        show: function () {
          done();
        }
      });

      prelodr.in('Loading...');
    });

    it('hide() callback should be called successfully.', function (done) {
      var prelodr = new Prelodr({
        hide: function () {
          done();
        }
      });

      prelodr.in('Loading...');
      prelodr.out();
    });

    // in()
    it('should have a method in()', function () {
      expect(prelodrGlobal.in).toBeDefined();
    });

    // out()
    it('should have a method out()', function () {
      expect(prelodrGlobal.out).toBeDefined();
    });

    // setOptions()
    it('should have a method setOptions()', function () {
      expect(prelodrGlobal.setOptions).toBeDefined();
    });

    // setContainer()
    it('should have a method setContainer()', function () {
      expect(prelodrGlobal.setContainer).toBeDefined();
    });

    // prepOut()
    it('should have a method prepOut()', function () {
      expect(prelodrGlobal.prepOut).toBeDefined();
    });

    // isVisible()
    it('should have a method isVisible()', function () {
      expect(prelodrGlobal.isVisible).toBeDefined();
    });

    // isVisible() -> false
    it('isVisible() should be `false`', function () {
      var prelodr = new Prelodr();
      expect(prelodr.isVisible()).toBe(false);
    });

    // isVisible() -> true
    it('isVisible() should be `true`', function () {
      var prelodr = new Prelodr();
      prelodr.in('Starting...');

      setTimeout(function () {
        expect(prelodr.isVisible()).toBe(true);
      }, 1200);
    });

  });

  // Chaining support
  describe('chaining support', function () {

    it('a] should be called successfully.', function (exit) {
      var prelodr = new Prelodr();

      prelodr.in('Starting...').out().
              in('Processing...').out().
              in('Finishing...').out(function (done) {
                done();
                exit();
              });
    });

    it('b] (with delay) should be called successfully.', function (exit) {
      var prelodr = new Prelodr();

      prelodr.in('Starting...').out().
              in('Processing...').out(function (done) {
                setTimeout(function () {
                  done();
                }, 1000);
              }).
              in('Finishing...').out(function (done) {
                done();
                exit();
              });
    });

  });
});
