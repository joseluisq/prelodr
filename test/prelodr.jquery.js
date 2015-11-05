/**
 *  Prelodr jQuery Testing
 */
describe('Prelodr (jQuery)', () => {
  // Basic usage
  describe('initializing', () => {
    it('should be a jQuery instance.', () => {
      const $prelodr = $('body').prelodr();
      expect($prelodr.constructor).toBe($);
    });
  });

  // Callbacks
  describe('callbacks', () => {
    it('show() callback should be called successfully.', done => {
      const $prelodr = $('body').prelodr({
        show: () => {
          done();
        }
      });

      $prelodr.prelodr('in', 'Loading...');
    });

    it('hide() callback should be called successfully.', done => {
      const $prelodr = $('body').prelodr({
        hide: () => done()
      });

      $prelodr.prelodr('in', 'Loading...');
      $prelodr.prelodr('out');
    });
  });

  // Chaining support
  describe('chaining support', () => {
    it('a] should be called successfully.', exit => {
      const $prelodr = $('body').prelodr();

      $prelodr.prelodr('in', 'Loading...');
      $prelodr.prelodr('out');

      $prelodr.prelodr('in', 'Processing...');
      $prelodr.prelodr('out');

      $prelodr.prelodr('in', 'Finishing...');
      $prelodr.prelodr('out', done => {
        done();
        exit();
      });
    });

    it('b] (with delay) should be called successfully.', exit => {
      const $prelodr = $('body').prelodr();

      $prelodr.prelodr('in', 'Loading...');
      $prelodr.prelodr('out');

      $prelodr.prelodr('in', 'Processing...');
      $prelodr.prelodr('out', done => setTimeout(() => done(), 1000));

      $prelodr.prelodr('in', 'Finishing...');
      $prelodr.prelodr('out', done => {
        done();
        exit();
      });
    });

  });
});
