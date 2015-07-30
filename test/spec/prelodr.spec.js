/**
 *  Prelodr Testing
 */
describe('Prelodr', function () {
  'use strict';

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

  });

  // Chaining support
  describe('chaining support', function () {

    it('a] should be called successfully.', function (exit) {
      var prelodr3 = new Prelodr();

      prelodr3.in('Starting...').out().
              in('Processing...').out().
              in('Finishing...').out(function (done) {
                done();
                exit();
              });
    });

    it('b] (with delay) should be called successfully.', function (exit) {
      var prelodr3 = new Prelodr();

      prelodr3.in('Starting...').out().
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
