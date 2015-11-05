import chai from 'chai';
import jsdom from 'jsdom';
import Queu from '../lib/queu';
import Prelodr from '../lib/prelodr';

const assert = chai.assert;
const expect = chai.expect;

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.Queu = Queu;

describe('Prelodr', () => {
  // Basic usage
  describe('Definition', () => {
    it('class should be instanced successfully.', () => {
      const prelodr = new Prelodr();
      expect(prelodr).to.be.an.instanceof(Prelodr);
    });
  });

  // Callbacks
  describe('Callbacks', () => {
    it('show() callback should be called successfully.', done => {
      const prelodr = new Prelodr({
        show: (pre, el) => {
          const element = document.createElement('span');

          expect(pre).not.to.be.null;
          assert.equal(el.tagName, element.tagName);
          expect(pre).to.be.an.instanceof(Prelodr);
          done();
        }
      });

      prelodr.in('Loading...');
    });

    it('hide() callback should be called successfully.', done => {
      const prelodr = new Prelodr({
        hide: pre => {
          expect(pre).not.to.be.null;
          expect(pre).to.be.an.instanceof(Prelodr);
          done();
        }
      });

      prelodr.in('Loading...');
      prelodr.out();
    });
  });

  // Methods
  describe('Methods', () => {
    const prelodr = new Prelodr();

    // setOptions()
    it('setOptions()', () => {
      const opts = {
        duration: 100,
        prefixClass: 'cls'
      };

      prelodr.setOptions(opts);
      assert.isNotNull(prelodr.options);
      assert.isObject(prelodr.options);
      expect(prelodr.options).to.include.keys('hide');
      expect(prelodr.options).to.include.keys('show');
      assert.equal(prelodr.options.duration, 100);
      assert.equal(prelodr.options.prefixClass, 'cls');
    });

    // setContainer()
    it('setContainer()', () => {
      let container = prelodr.container;
      expect(container).to.not.be.null;
      assert.equal(container.tagName.toLowerCase(), 'body');

      const element = document.createElement('span');
      prelodr.setContainer(element);
      container = prelodr.container;
      assert.equal(container.tagName, element.tagName);
    });

    // in()
    it('in()', () => {
      const pre = prelodr.in('Loading...');
      expect(pre).not.to.be.null;
      expect(pre).to.be.an.instanceof(Prelodr);
    });

    // isVisible()
    it('isVisible() : true', () => {
      const visibility = prelodr.isVisible();
      expect(visibility).not.to.be.ok;
      expect(visibility).to.be.false;
    });

    // merge()
    it('_merge()', () => {
      const three = prelodr._merge({one: 1}, {two: 2});

      assert.isNotNull(prelodr.options);
      assert.isObject(prelodr.options);
      expect(three).to.include.keys('one');
      expect(three).to.include.keys('two');
    });

    // _getId()
    it('_getId()', () => {
      const one = prelodr._getId();
      const two = prelodr._getId();

      assert.isString(one);
      assert.isString(two);
      assert.notEqual(one, two);
    });

    // _show()
    it('_show()', done => {
      prelodr._show('Showing...', done);
    });

    // _hide()
    it('_hide()', done => {
      prelodr._hide(done);
    });

    // _queueWalk()
    it('_queueWalk()', () => {
      const one = prelodr._queueWalk();
      assert.isUndefined(one);
    });

    // _prepOut()
    it('_prepOut()', done => {
      prelodr.in('Loading...');
      prelodr._prepOut(() => {
        done();
      });
    });

    // out()
    it('out()', done => {
      prelodr.out(pre => {
        expect(pre).not.to.be.null;
        expect(pre).to.be.an.instanceof(Function);
        done();
      });
    });
  });

  // Async and chaining support
  describe('Async and chaining support', () => {
    //
    it('a) should be called successfully.', exit => {
      const prelodr = new Prelodr();

      prelodr.in('Starting...').out()
        .in('Processing...').out()
        .in('Finishing...').out(done => {
          done();
          exit();
        });
    });

    it('b) (with delay) should be called successfully.', exit => {
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
