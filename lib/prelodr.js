/**
 * Prelodr v1.0.4
 * http://git.io/prelodr
 *
 * @author    José Luis Quintana | quintana.io
 * @license   MIT
 */

(function () {
  'use strict';

  if (window.Prelodr) {
    return;
  }

  /**
   * Queu class
   *
   * @constructor
   */
  function Queu () {
    if (!(this instanceof Queu)) {
      return new Queu();
    }

    this.queue = [];
    this.offset = 0;
  }

  /**
   * Get length
   * @return {Number} - Length
   */
  Queu.prototype.getLength = function () {
    return (this.queue.length - this.offset);
  };

  /**
   * Checks if empty
   * @return {Boolean} - True is empty and false is not.
   */
  Queu.prototype.isEmpty = function () {
    return (this.queue.length === 0);
  };

  /**
   * Add item to queue
   * @param  {Object|String|number} - item Item for queue
   */
  Queu.prototype.add = function (item) {
    this.queue.push(item);
    this.offset += 1;
  };

  /**
   * Remove the first element
   * @return {Object|String|number} - Return the item
   */
  Queu.prototype.shift = function () {
    var item = null;

    if (this.queue.length) {
      item = this.queue.shift();
    }

    return item;
  };

  /**
   * Remove the last element
   * @return {Object|String|number} - Return the item
   */
  Queu.prototype.pop = function () {
    var item = null;

    if (this.queue.length) {
      item = this.queue.pop();
    }

    return item;
  };

  /**
   * Get last item
   * @return {object|string|number} - Last item
   */
  Queu.prototype.last = function () {
    return (this.queue.length > 0 ? this.queue[this.queue.length - 1] : null);
  };

  /**
   * Get first item
   * @return {object|string|number} - First item
   */
  Queu.prototype.first = function () {
    return (this.queue.length > 0 ? this.queue[0] : null);
  };

  /**
   * Prelodr class
   *
   * @param {HTMLElement} container - Container element for Prelodr.
   * Default is body
   * @param {Object} options - Default options object
   * @constructor
   */
  function Prelodr (container, options) {
    if (!(this instanceof Prelodr)) {
      return new Prelodr(container, options);
    }

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
        this.setContainer(document.body);
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
  function merge (a, b) {
    var i;

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
  Prelodr.prototype.setOptions = function (options) {
    this.options = merge(this.options, options);
  };

  /**
   * Set container for Prelodr
   *
   * @param {HTMLElement} container - The container for Prelodr.
   */
  Prelodr.prototype.setContainer = function (container) {
    this.container = container;
  };

  /**
   * Get ramdom string id
   * @return {String} - String Id
   */
  function getId () {
    return Math.random().toString(36).slice(2);
  }

  /**
   * Create and show preloader elements
   * @param  {Prelodr} me - Prelodr object
   * @param  {String} text - Text for prelodr
   * @param  {Function} cb - Callback
   */
  function show (me, text, cb) {
    var span = document.createElement('span');
    var spanText = document.createElement('span');
    var progressbar = document.createElement('span');

    me.element = document.createElement('span');
    spanText.appendChild(document.createTextNode(text));
    span.appendChild(spanText);
    spanText.appendChild(progressbar);

    me.element.appendChild(span);
    me.container.appendChild(me.element);

    me.element.className = me.options.prefixClass;
    progressbar.className = me.options.prefixClass + '-progressbar';

    setTimeout(function () {
      var cls = me.options.prefixClass + ' ' + me.options.prefixClass + '-in';

      me.element.className = cls;

      setTimeout(function () {
        me.isShown = true;
        me.isAnimating = false;

        if (me.options.show) {
          me.options.show.apply(me, [me.element]);
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
  function hide (me, cb) {
    if (me.isShown) {
      me.isShown = false;

      if (me.isAnimating) {
        me.interval = setInterval(function () {
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
  function queueWalk (me) {
    var one = me.queu.first();

    if (one && one.is === 'in') {
      one.fn(function () {
        me.queu.shift();
        me.isStart = false;

        var next = me.queu.first();

        if (next && next.is === 'out') {
          me.queu.shift();

          next.fn(function () {
            queueWalk(me);
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
  Prelodr.prototype.in = function (text) {
    var me = this;
    var obj = {
      id: getId(),
      is: 'in',
      fn: function (cb) {
        show(me, text, cb);
      }
    };

    this.queu.add(obj);

    if (!me.isStart) {
      me.isStart = true;
      queueWalk(me);
    }

    return this;
  };

  /**
   * Hide the Prelodr
   * @return {Prelodr} - Prelodr object
   */
  Prelodr.prototype.out = function (fn) {
    var me = this;

    this.queu.add({
      id: getId(),
      is: 'out',
      fn: function (cb) {
        if (fn && typeof fn === 'function') {
          fn(function () {
            hide(me, cb);
          });
        } else {
          hide(me, cb);
        }
      }
    });

    if (!this.isStart) {
      var one = this.queu.first();

      if (one && one.is === 'out') {
        one.fn(function () {
          me.queu.shift();
          queueWalk(me);
        });
      }
    }

    return this;
  };

  /**
   * Prepare to hide the Prelodr
   * @param  {Function} cb Callback
   */
  Prelodr.prototype.prepOut = function (cb) {
    var me = this;
    var cls = me.options.prefixClass + ' ' + me.options.prefixClass + '-out';

    me.isAnimating = true;
    me.element.className = cls;

    setTimeout(function () {
      if (me.options.hide) {
        me.options.hide.apply(me, []);
      }

      me.container.removeChild(me.element);
      me.element = null;
      me.isAnimating = false;
      me.isShown = false;

      if (cb) {
        cb();
      }
    }, me.options.duration);
  };

  /**
   * Check if Prelodr is visible
   *
   * @return {Boolean}
   */
  Prelodr.prototype.isVisible = function () {
    return this.isShown;
  };

  // jQuery support
  if (window.jQuery) {
    var prelodr;
    var fn;

    /**
     * jQuery Prelodr
     *
     * @param {Object} options - Options for Prelodr
     * @return {jQuery}
     */
    window.jQuery.fn.prelodr = function (options) {
      if (typeof options === 'string') {
        prelodr = this.data('prelodr');
        fn = prelodr[options];

        if (prelodr && typeof options === 'string' && fn) {
          return fn.apply(prelodr, Array.prototype.slice.call(arguments, 1));
        } else {
          var str = 'Method ' + options;
          str += ' is not supported by jQuery.prelodr.';

          window.jQuery.error(str);
        }
      } else {
        prelodr = new Prelodr(this[0], options);
        this.data('prelodr', prelodr);
      }

      return this;
    };
  }

  window.Prelodr = Prelodr;

}());
