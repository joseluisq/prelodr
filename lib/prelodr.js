/**
 * Queu class
 * Simple javascript Queue class implementation
 */
class Queu {

  /**
   * Constructor function
   * @constructor
   */
  constructor() {
    this.queue = [];
    this.offset = 0;
  }

  /**
   * Get length
   * @return {Number} - Length
   */
  getLength() {
    return (this.queue.length - this.offset);
  }

  /**
   * Checks if empty
   * @return {Boolean} - True is empty and false is not.
   */
  isEmpty() {
    return (this.queue.length === 0);
  }

  /**
   * Add item to queue
   * @param  {Object|String|number} - item Item for queue
   */
  add(item) {
    this.queue.push(item);
    this.offset += 1;
  }

  /**
   * Remove the first element
   * @return {Object|String|number} - Return the item
   */
  shift() {
    let item = null;

    if (this.queue.length) {
      item = this.queue.shift();
    }

    return item;
  }

  /**
   * Remove the last element
   * @return {Object|String|number} - Return the item
   */
  pop() {
    let item = null;

    if (this.queue.length) {
      item = this.queue.pop();
    }

    return item;
  }

  /**
   * Get last item
   * @return {object|string|number} - Last item
   */
  last() {
    return (this.queue.length > 0 ? this.queue[this.queue.length - 1] : null);
  }

  /**
   * Get first item
   * @return {object|string|number} - First item
   */
  first() {
    return (this.queue.length > 0 ? this.queue[0] : null);
  }

}

/**
 * Prelodr v1.0.4
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
    this.queu = new Queu();
    this.isShown = false;
    this.isAnimating = false;
    this.isStart = false;
    this.options = {
      duration: 700,
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
      this.container = document.body;
    }
  }

  /**
   * Marge two hash objects
   *
   * @param {Object} a - First object
   * @param {Object} b - Second object
   * @return {Object}
   */
  merge(a, b) {
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
   * Set the default options
   *
   * @param {Object} options - Options object
   */
  setOptions(options) {
    this.options = this.merge(this.options, options);
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
  getId() {
    return Math.random().toString(36).slice(2);
  }

  /**
   * Create and show preloader elements
   * @param  {Prelodr} me - Prelodr object
   * @param  {String} text - Text for prelodr
   * @param  {Function} cb - Callback
   */
  show(me, text, cb) {
    const span = document.createElement('span');
    const spanText = document.createElement('span');
    const progressbar = document.createElement('span');

    me.element = document.createElement('span');
    spanText.appendChild(document.createTextNode(text));
    span.appendChild(spanText);
    spanText.appendChild(progressbar);

    me.element.appendChild(span);
    me.container.appendChild(me.element);

    me.element.className = me.options.prefixClass;
    progressbar.className = `${me.options.prefixClass}-progressbar`;

    setTimeout(() => {
      const cls = `${me.options.prefixClass} ${me.options.prefixClass}-in`;

      me.element.className = cls;

      setTimeout(() => {
        me.isShown = true;
        me.isAnimating = false;

        if (me.options.show) {
          me.options.show(me, [me.element]);
        }

        if (cb) {
          cb();
        }
      }, me.options.duration);
    }, 20);
  }

  /**
   * Hide prelodr elements
   * @param  {Prelodr} me - Prelodr object
   * @param  {Function} cb - Callback
   */
  hide(me, cb) {
    if (me.isShown) {
      me.isShown = false;

      if (me.isAnimating) {
        me.interval = setInterval(() => {
          if (!me.isAnimating) {
            clearInterval(me.interval);
            me.prepOut(cb);
          }
        }, 20);
      } else {
        me.prepOut(cb);
      }
    }
  }

  /**
   * Walk queue
   * @param  {Queu} queu - Queu object
   */
  queueWalk(me) {
    const one = me.queu.first();

    if (one && one.is === 'in') {
      one.fn(() => {
        me.queu.shift();
        me.isStart = false;

        const next = me.queu.first();

        if (next && next.is === 'out') {
          me.queu.shift();

          next.fn(() => {
            this.queueWalk(me);
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
      id: this.getId(),
      is: 'in',
      fn: cb => this.show(this, text, cb)
    };

    this.queu.add(obj);

    if (!this.isStart) {
      this.isStart = true;
      this.queueWalk(this);
    }

    return this;
  }

  /**
   * Hide the Prelodr
   * @return {Prelodr} - Prelodr object
   */
  out(fn) {
    this.queu.add({
      id: this.getId(),
      is: 'out',
      fn: cb => {
        if (fn && typeof fn === 'function') {
          fn(() => {
            this.hide(this, cb);
          });
        } else {
          this.hide(this, cb);
        }
      }
    });

    if (!this.isStart) {
      const one = this.queu.first();

      if (one && one.is === 'out') {
        one.fn(() => {
          this.queu.shift();
          this.queueWalk(this);
        });
      }
    }

    return this;
  }

  /**
   * Prepare to hide the Prelodr
   * @param  {Function} cb Callback
   */
  prepOut(cb) {
    const cls = `${this.options.prefixClass} ${this.options.prefixClass}-out`;

    this.isAnimating = true;
    this.element.className = cls;

    setTimeout(() => {
      if (this.options.hide) {
        this.options.hide(this, []);
      }

      this.container.removeChild(this.element);
      this.element = null;
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

// jQuery

(() => {
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Prelodr;
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
