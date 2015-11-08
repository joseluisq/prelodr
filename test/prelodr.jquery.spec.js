import test from 'tape';
import {jsdom} from 'jsdom';
import Queu from '../lib/queu';
import Prelodr from '../lib/prelodr';

test('Prelodr jQuery', t => {
  jsdom.env('<!doctype html><html><body></body></html>', [
    require.resolve('../bower_components/jquery/dist/jquery.js'),
  ], (err, window) => {
    if (err) {
      return;
    }

    global.Queu = Queu;
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

        const str = `Method ${options} is not supported by jQuery.prelodr.`;
        $.error(str);
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
