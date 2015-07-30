/**
 *  Prelodr jQuery Testing
 */
describe('Prelodr (jQuery)', function () {
  'use strict';

  // Basic usage
  describe('initializing', function () {

    it('should be a jQuery instance.', function () {
      var $prelodr = $('body').prelodr();
      expect($prelodr.constructor).toBe($);
    });

  });

  // Callbacks
  describe('callbacks', function () {

    it('show() callback should be called successfully.', function (done) {
      var $prelodr = $('body').prelodr({
        show: function () {
          done();
        }
      });

      $prelodr.prelodr('in', 'Loading...');
    });

    it('hide() callback should be called successfully.', function (done) {
      var $prelodr = $('body').prelodr({
        hide: function () {
          done();
        }
      });

      $prelodr.prelodr('in', 'Loading...');
      $prelodr.prelodr('out');
    });

  });

  // Chaining support
  describe('chaining support', function () {

    it('a] should be called successfully.', function (exit) {
      var $prelodr = $('body').prelodr();

      $prelodr.prelodr('in', 'Loading...');
      $prelodr.prelodr('out');

      $prelodr.prelodr('in', 'Processing...');
      $prelodr.prelodr('out');

      $prelodr.prelodr('in', 'Finishing...');
      $prelodr.prelodr('out', function (done) {
        done();
        exit();
      });
    });

    it('b] (with delay) should be called successfully.', function (exit) {
      var $prelodr = $('body').prelodr();

      $prelodr.prelodr('in', 'Loading...');
      $prelodr.prelodr('out');

      $prelodr.prelodr('in', 'Processing...');
      $prelodr.prelodr('out', function (done) {
        setTimeout(function () {
          done();
        }, 1000);
      });

      $prelodr.prelodr('in', 'Finishing...');
      $prelodr.prelodr('out', function (done) {
        done();
        exit();
      });
    });

  });
});
