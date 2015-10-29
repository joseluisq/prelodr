/**
 *  Prelodr Testing
 */
describe('Prelodr', () => {

  let gPrelodr;

  beforeEach(() => gPrelodr = new Prelodr());

  // Basic usage
  describe('initializing', () => {

    it('class should be defined.', () => {
      const prelodr = new Prelodr();
      expect(prelodr).toBeDefined();
    });

  });

  // Callbacks
  describe('callbacks', () => {

    it('show() callback should be called successfully.', (done) => {
      const prelodr = new Prelodr({
        show: () => done()
      });

      prelodr.in('Loading...');
    });

    it('hide() callback should be called successfully.', (done) => {
      const prelodr = new Prelodr({
        hide: () => {
          done();
        }
      });

      prelodr.in('Loading...');
      prelodr.out();
    });

    // in()
    it('should have a method in()', () =>
      expect(gPrelodr.in).toBeDefined());

    // out()
    it('should have a method out()', () =>
      expect(gPrelodr.out).toBeDefined());

    // setOptions()
    it('should have a method setOptions()', () =>
      expect(gPrelodr.setOptions).toBeDefined());

    // setContainer()
    it('should have a method setContainer()', () =>
      expect(gPrelodr.setContainer).toBeDefined());

    // prepOut()
    it('should have a method prepOut()', () =>
      expect(gPrelodr.prepOut).toBeDefined());

    // isVisible()
    it('should have a method isVisible()', () =>
      expect(gPrelodr.isVisible).toBeDefined());

    // isVisible() -> false
    it('isVisible() should be `false`', () => {
      const prelodr = new Prelodr();
      expect(prelodr.isVisible()).toBe(false);
    });

    // isVisible() -> true
    it('isVisible() should be `true`', () => {
      const prelodr = new Prelodr();
      prelodr.in('Starting...');

      setTimeout(() => expect(prelodr.isVisible()).toBe(true), 1200);
    });

  });

  // Chaining support
  describe('chaining support', () => {

    it('a] should be called successfully.', (exit) => {
      const prelodr = new Prelodr();

      prelodr.in('Starting...').out().
              in('Processing...').out().
              in('Finishing...').out((done) => {
                done();
                exit();
              });
    });

    it('b] (with delay) should be called successfully.', (exit) => {
      const prelodr = new Prelodr();

      prelodr.in('Starting...').out().
              in('Processing...').out((done) =>
                setTimeout(() => done(), 1000)).
              in('Finishing...').out((done) => {
                done();
                exit();
              });
    });

  });
});
