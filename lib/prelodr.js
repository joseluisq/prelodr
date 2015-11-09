/**
 * Prelodr v1.0.5
 * http://git.io/prelodr
 *
 * @author    José Luis Quintana | quintana.io
 * @license   MIT
 */

/**
 * Prelodr class
 */
class Prelodr {

  /**
   * Constructor class
   * @param {HTMLElement} container - Container element for Prelodr.
   * Default is body
   * @param {Object} options - Default options object
   * @constructor
   */
  constructor(container, options) {
    this.queu = {
      queue: [],
      offset: 0,
      add: function (el) {
        this.queue.push(el);
        this.offset += 1;
      },
      shift: function () {
        let el = null;

        if (this.queue.length > 0) {
          el = this.queue.shift();
        }

        return el;
      },
      first: function () {
        let el = null;

        if (this.queue.length > 0) {
          el = this.queue[0];
        }

        return el;
      }
    };
    this._interval = 0;
    this.isShown = false;
    this.isAnimating = false;
    this.isStart = false;
    this.options = {
      duration: 750,
      prefixClass: 'prelodr',
      show: null,
      hide: null
    };

    if (typeof container === 'object') {
      if (container.nodeName) {
        this.setContainer(container);
        this.setOptions(options);
      } else {
        this.setContainer(window.document.body);
        this.setOptions(container);
      }
    } else {
      this.container = window.document.body;
    }
  }

  /**
   * Set the default options
   *
   * @param {Object} options - Options object
   */
  setOptions(options) {
    this.options = this._merge(this.options, options);
  }

  /**
   * Marge two hash objects
   *
   * @param {Object} a - First object
   * @param {Object} b - Second object
   * @return {Object}
   */
  _merge(a, b) {
    let i;

    if (b) {
      for (i in b) {
        if (b && b[i]) {
          a[i] = b[i];
        }
      }
    }

    return a;
  }

  /**
   * Set container for Prelodr
   *
   * @param {HTMLElement} container - The container for Prelodr.
   */
  setContainer(container) {
    this.container = container;
  }

  /**
   * Get ramdom string id
   * @return {String} - String Id
   */
  _getId() {
    return Math.random().toString(36).slice(2);
  }

  /**
   * Create and show preloader elements
   * @param  {Prelodr} me - Prelodr object
   * @param  {String} text - Text for prelodr
   * @param  {Function} cb - Callback
   */
  _show(text, cb) {
    this.wrapper = window.document.createElement('span');

    const spanText = window.document.createElement('span');
    const progressbar = window.document.createElement('span');

    spanText.appendChild(window.document.createTextNode(text));
    this.wrapper.appendChild(spanText);
    spanText.appendChild(progressbar);
    progressbar.className = `${this.options.prefixClass}-progressbar`;

    if (!this.element) {
      this.element = window.document.createElement('span');
      this.element.className = this.options.prefixClass;
      this.container.appendChild(this.element);
    }

    this.element.appendChild(this.wrapper);

    setTimeout(() => {
      const cls = `${this.options.prefixClass} ${this.options.prefixClass}-in`;
      this.wrapper.children[0].className = `${this.options.prefixClass}-in`;
      this.element.className = cls;

      setTimeout(() => {
        this.isShown = true;
        this.isAnimating = false;
        this.queu.shift();

        if (this.options.show) {
          this.options.show(this, this.element);
        }

        if (cb) {
          cb();
        }
      }, this.options.duration);
    }, 10);
  }

  /**
   * Hide prelodr elements
   * @param  {Prelodr} me - Prelodr object
   * @param  {Function} cb - Callback
   */
  _hide(cb) {
    if (this.isShown) {
      this.isShown = false;
      this._prepOut(cb);
    }
  }

  /**
   * Walk queue
   * @param  {Queu} queu - Queu object
   */
  _queueWalk() {
    const one = this.queu.first();

    if (one && one.is === 'in') {
      this.isShown = true;

      one.fn(() => {
        const next = this.queu.first();
        this.isStart = false;

        if (next && next.is === 'out') {
          next.fn(() => {
            this._queueWalk();
          });
        }
      });
    }
  }

  /**
   * Show the Prelodr
   * @param  {String} text - Text for prelodr
   * @return {Prelodr} - Prelodr object
   */
  in(text) {
    const obj = {
      id: this._getId(),
      is: 'in',
      fn: cb => this._show(text, cb)
    };

    this.queu.add(obj);

    if (!this.isStart) {
      this.isStart = true;
      this._queueWalk();
    }

    return this;
  }

  /**
   * Hide the Prelodr
   * @return {Prelodr} - Prelodr object
   */
  out(fn) {
    this.queu.add({
      id: this._getId(),
      is: 'out',
      fn: cb => {
        if (fn && typeof fn === 'function') {
          fn(() => {
            this._hide(cb);
          });
        } else {
          this._hide(cb);
        }
      }
    });

    if (!this.isStart) {
      const one = this.queu.first();

      if (one && one.is === 'out') {
        one.fn(this._queueWalk);
      }
    }

    return this;
  }

  /**
   * Prepare to hide the Prelodr
   * @param  {Function} cb Callback
   */
  _prepOut(cb) {
    this.isAnimating = true;
    this.queu.shift();

    const el = this.queu.first();
    this.wrapper.children[0].className = '';

    setTimeout(() => {
      if (this.options.hide) {
        this.options.hide(this, []);
      }

      if (el) {
        this.element.removeChild(this.wrapper);
      } else {
        const cls = `${this.options.prefixClass} ${this.options.prefixClass}-out`;
        this.element.className = cls;

        setTimeout(() => {
          this.container.removeChild(this.element);
          this.element = null;
        }, this.options.duration / 1.5);
      }

      this.isAnimating = false;
      this.isShown = false;

      if (cb) {
        cb();
      }
    }, this.options.duration);
  }

  /**
   * Check if Prelodr is visible
   *
   * @return {Boolean}
   */
  isVisible() {
    return this.isShown;
  }

}

(() => {
  /* istanbul ignore else */
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = Prelodr;
  /* istanbul ignore else */
  } else if (typeof define === 'function' && define.amd) {
    define([], () => {
      return Prelodr;
    });
  } else {
    window.Prelodr = Prelodr;

    if (window.jQuery) {
      window.jQuery.fn.prelodr = function (options) {
        let fn;
        let prelodr;

        if (typeof options === 'string') {
          prelodr = this.data('prelodr');
          fn = prelodr[options];

          if (prelodr !== 'undefined' && typeof options === 'string' && fn) {
            return fn.apply(prelodr, Array.prototype.slice.call(arguments, 1));
          }

          const str = `Method ${options} is not supported by jQuery.prelodr.`;
          window.jQuery.error(str);
        } else {
          prelodr = new window.Prelodr(this[0], options);
          this.data('prelodr', prelodr);
        }

        return this;
      };
    }
  }
})();
