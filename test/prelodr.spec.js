/**
 *  Prelodr Testing
 */
describe('Prelodr', () => {
  const Prelodr = window.Prelodr;
  let xPrelodr;

  beforeEach(() => xPrelodr = new Prelodr());

  // Basic usage
  describe('initializing', () => {
    it('class should be defined.', () => {
      const prelodr = new Prelodr();
      expect(prelodr).toBeDefined();
    });
  });

  // Callbacks
  describe('callbacks', () => {
    it('show() callback should be called successfully.', done => {
      const prelodr = new Prelodr({
        show: () => done()
      });

      prelodr.in('Loading...');
    });

    it('hide() callback should be called successfully.', done => {
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
      expect(xPrelodr.in).toBeDefined());

    // out()
    it('should have a method out()', () =>
      expect(xPrelodr.out).toBeDefined());

    // setOptions()
    it('should have a method setOptions()', () =>
      expect(xPrelodr.setOptions).toBeDefined());

    // setContainer()
    it('should have a method setContainer()', () =>
      expect(xPrelodr.setContainer).toBeDefined());

    // prepOut()
    it('should have a method prepOut()', () =>
      expect(xPrelodr.prepOut).toBeDefined());

    // isVisible()
    it('should have a method isVisible()', () =>
      expect(xPrelodr.isVisible).toBeDefined());

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
    it('a] should be called successfully.', exit => {
      const prelodr = new Prelodr();

      prelodr.in('Starting...').out()
        .in('Processing...').out()
        .in('Finishing...').out(done => {
          done();
          exit();
        });
    });

    it('b] (with delay) should be called successfully.', exit => {
      const prelodr = new Prelodr();

      prelodr.in('Starting...').out()
      .in('Processing...').out(done =>
        setTimeout(() => done(), 1000))
          .in('Finishing...').out(done => {
            done();
            exit();
          });
    });
  });
});
