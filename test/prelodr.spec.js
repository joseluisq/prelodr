import test from 'tape';
import {jsdom} from 'jsdom';
import Prelodr from '../lib/prelodr';

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;

test('show(pre, el) callback', t => {
  t.plan(2);

  const prelodr = new Prelodr({
    show: (pre, el) => {
      const span = document.createElement('span');

      t.ok(pre, 'First param should be ok by default.');
      t.equal(el.tagName, span.tagName, 'Second param should be equal to span element by default.');
    }
  });

  prelodr.in('Loading...');
});

test('hide(el) callback', t => {
  t.plan(1);

  const prelodr = new Prelodr({
    hide: pre => t.ok(pre, 'First param should be ok.')
  });

  prelodr.in('Loading...').out();
});

test('setOptions(opts) method', t => {
  t.plan(5);

  const prelodr = new Prelodr();
  const opts = {
    duration: 100,
    prefixClass: 'cls'
  };

  prelodr.setOptions(opts);

  t.ok(prelodr.options, 'Options should be ok by default.');
  t.equal(prelodr.options.show, null, 'Options.show should be equal to null by default.');
  t.equal(prelodr.options.hide, null, 'Options.hide should be equal to null by default.');
  t.equal(prelodr.options.duration, opts.duration, 'Options.duration should be equal to default value.');
  t.equal(prelodr.options.prefixClass, opts.prefixClass, 'Options.show should be equal to default value.');
});

test('setContainer(opts) method', t => {
  t.plan(3);

  const prelodr = new Prelodr();
  let container = prelodr.container;

  t.ok(container, 'Options should be ok.');
  t.equal(container.tagName.toLowerCase(), 'body', 'Container tagName should be equal to body tagName.');

  const span = document.createElement('span');
  prelodr.setContainer(span);
  container = prelodr.container;

  t.equal(container.tagName, span.tagName, 'Container tagName should be equal to span element.');
});

test('in(str) method', t => {
  t.plan(1);

  const prelodr = new Prelodr();
  const pre = prelodr.in('Loading...');

  t.ok(pre, 'Returned value should be ok.');
});

test('out(fn) method', t => {
  t.plan(1);

  const prelodr = new Prelodr();

  prelodr.out(pre => {
    t.ok(pre, 'Returned value should be ok.');
  });
});

test('isVisible() method', t => {
  t.plan(2);

  const prelodr = new Prelodr();
  let visible = prelodr.isVisible();

  t.false(visible, 'Returned value should be false by default.');

  prelodr.in('Loading...');
  visible = prelodr.isVisible();

  t.true(visible, 'Returned value should be true.');
});

test('_merge() method', t => {
  t.plan(3);

  const prelodr = new Prelodr();
  const merged = prelodr._merge({one: true}, {two: true});

  t.ok(merged, 'Returned value should be ok.');
  t.true(merged.one, 'First value should be true.');
  t.true(merged.two, 'Second value should be true.');
});

test('_getId() method', t => {
  t.plan(3);

  const prelodr = new Prelodr();
  const one = prelodr._getId();
  const two = prelodr._getId();

  t.ok(one, 'First value should be true.');
  t.ok(two, 'Second value should be true.');
  t.notEqual(one, two, `First and second values shouldn't be equal.`);
});

test('_show() method', t => {
  t.plan(1);

  const prelodr = new Prelodr();
  prelodr._show('Opening...', t.ok(1, 'should be called successfully.'));
});

test('_hide() method', t => {
  t.plan(1);

  const prelodr = new Prelodr();
  prelodr._show('Closing...', t.ok(1, 'should be called successfully.'));
});

test('_prepOut() method', t => {
  t.plan(1);

  const prelodr = new Prelodr();
  prelodr.in('Loading...');
  prelodr._prepOut(t.ok(1, 'should be called successfully.'));
});

test('_queueWalk() method', t => {
  t.plan(1);

  const prelodr = new Prelodr();
  const queue = prelodr._queueWalk();

  t.notOk(queue, `shouldn't be ok by default.`);
});

test('Async and chaining actions', t => {
  t.plan(3);

  const prelodr = new Prelodr();

  prelodr
    .in('Starting...').out(done => {
      t.ok(1, 'Starting action should be called successfully.');
      done();
    })
    .in('Processing...').out(done => {
      t.ok(1, 'Processing action should be called successfully.');
      done();
    })
    .in('Finishing...').out(done => {
      t.ok(1, 'Finishing action should be called successfully.');
      done();
    });
});

// jQuery testing
test('Prelodr jQuery', t => {
  jsdom.env('<!doctype html><html><body></body></html>', [
    require.resolve('../bower_components/jquery/dist/jquery.js')
  ], (err, window) => {
    /* istanbul ignore if */
    if (err) {
      return;
    }

    const $ = window.jQuery;

    global.window = window;
    global.document = window.document;

    $.fn.prelodr = function (options) {
      let fn;
      let prelodr;

      if (typeof options === 'string') {
        prelodr = this.data('prelodr');
        fn = prelodr[options];

        if (prelodr !== 'undefined' && typeof options === 'string' && fn) {
          return fn.apply(prelodr, Array.prototype.slice.call(arguments, 1));
        }
      } else {
        prelodr = new Prelodr(this[0], options);
        this.data('prelodr', prelodr);
      }

      return this;
    };

    t.test('instance', t => {
      t.plan(2);

      const prelodr = $('body').prelodr();

      t.ok(prelodr, 'should be ok by default.');
      t.equal(prelodr.constructor, $, 'should be a jQuery instance.');
    });

    t.test('in(str) callback', t => {
      t.plan(2);

      const pre = $('body').prelodr({
        show: (pre, el) => {
          const span = document.createElement('span');

          t.ok(pre, 'First param should be ok by default.');
          t.equal(el.tagName, span.tagName, 'Second param should be equal to span element by default.');
        }
      });

      pre.prelodr('in', 'Loading...');
    });

    t.test('out(fn) callback', t => {
      t.plan(1);

      const pre = $('body').prelodr({
        hide: pre => t.ok(pre, 'First param should be ok.')
      });

      pre.prelodr('in', 'Loading...').out();
    });

    t.test('Async and chaining actions', t => {
      t.plan(3);

      const pre = $('body').prelodr();

      pre.prelodr('in', 'Starting...');
      pre.prelodr('out', done => {
        t.ok(1, 'Starting action should be called successfully.');
        done();
      });
      pre.prelodr('in', 'Processing...');
      pre.prelodr('out', done => {
        t.ok(1, 'Processing action should be called successfully.');
        done();
      });
      pre.prelodr('in', 'Finishing...');
      pre.prelodr('out', done => {
        t.ok(1, 'Finishing action should be called successfully.');
        done();
      });
    });
  });
});
