/*! Prelodr v1.0.4 | MIT (c) 2015 José Luis Quintana */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _typeof(obj) { return obj && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Queu class
 * Simple javascript Queue class implementation
 */

var Queu = (function () {

  /**
   * Constructor function
   * @constructor
   */

  function Queu() {
    _classCallCheck(this, Queu);

    this.queue = [];
    this.offset = 0;
  }

  /**
   * Get length
   * @return {Number} - Length
   */

  _createClass(Queu, [{
    key: 'getLength',
    value: function getLength() {
      return this.queue.length - this.offset;
    }

    /**
     * Checks if empty
     * @return {Boolean} - True is empty and false is not.
     */

  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      return this.queue.length === 0;
    }

    /**
     * Add item to queue
     * @param  {Object|String|number} - item Item for queue
     */

  }, {
    key: 'add',
    value: function add(item) {
      this.queue.push(item);
      this.offset += 1;
    }

    /**
     * Remove the first element
     * @return {Object|String|number} - Return the item
     */

  }, {
    key: 'shift',
    value: function shift() {
      var item = null;

      if (this.queue.length) {
        item = this.queue.shift();
      }

      return item;
    }

    /**
     * Remove the last element
     * @return {Object|String|number} - Return the item
     */

  }, {
    key: 'pop',
    value: function pop() {
      var item = null;

      if (this.queue.length) {
        item = this.queue.pop();
      }

      return item;
    }

    /**
     * Get last item
     * @return {object|string|number} - Last item
     */

  }, {
    key: 'last',
    value: function last() {
      return this.queue.length > 0 ? this.queue[this.queue.length - 1] : null;
    }

    /**
     * Get first item
     * @return {object|string|number} - First item
     */

  }, {
    key: 'first',
    value: function first() {
      return this.queue.length > 0 ? this.queue[0] : null;
    }
  }]);

  return Queu;
})();

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

var Prelodr = (function () {

  /**
   * Constructor class
   * @param {HTMLElement} container - Container element for Prelodr.
   * Default is body
   * @param {Object} options - Default options object
   * @constructor
   */

  function Prelodr(container, options) {
    _classCallCheck(this, Prelodr);

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

    if ((typeof container === 'undefined' ? 'undefined' : _typeof(container)) === 'object') {
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

  _createClass(Prelodr, [{
    key: 'merge',
    value: function merge(a, b) {
      var i = undefined;

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

  }, {
    key: 'setOptions',
    value: function setOptions(options) {
      this.options = this.merge(this.options, options);
    }

    /**
     * Set container for Prelodr
     *
     * @param {HTMLElement} container - The container for Prelodr.
     */

  }, {
    key: 'setContainer',
    value: function setContainer(container) {
      this.container = container;
    }

    /**
     * Get ramdom string id
     * @return {String} - String Id
     */

  }, {
    key: 'getId',
    value: function getId() {
      return Math.random().toString(36).slice(2);
    }

    /**
     * Create and show preloader elements
     * @param  {Prelodr} me - Prelodr object
     * @param  {String} text - Text for prelodr
     * @param  {Function} cb - Callback
     */

  }, {
    key: 'show',
    value: function show(me, text, cb) {
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

  }, {
    key: 'hide',
    value: function hide(me, cb) {
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

  }, {
    key: 'queueWalk',
    value: function queueWalk(me) {
      var _this = this;

      var one = me.queu.first();

      if (one && one.is === 'in') {
        one.fn(function () {
          me.queu.shift();
          me.isStart = false;

          var next = me.queu.first();

          if (next && next.is === 'out') {
            me.queu.shift();

            next.fn(function () {
              _this.queueWalk(me);
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

  }, {
    key: 'in',
    value: function _in(text) {
      var _this2 = this;

      var obj = {
        id: this.getId(),
        is: 'in',
        fn: function fn(cb) {
          return _this2.show(_this2, text, cb);
        }
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

  }, {
    key: 'out',
    value: function out(_fn) {
      var _this3 = this;

      this.queu.add({
        id: this.getId(),
        is: 'out',
        fn: function fn(cb) {
          if (_fn && typeof _fn === 'function') {
            _fn(function () {
              _this3.hide(_this3, cb);
            });
          } else {
            _this3.hide(_this3, cb);
          }
        }
      });

      if (!this.isStart) {
        var one = this.queu.first();

        if (one && one.is === 'out') {
          one.fn(function () {
            _this3.queu.shift();
            _this3.queueWalk(_this3);
          });
        }
      }

      return this;
    }

    /**
     * Prepare to hide the Prelodr
     * @param  {Function} cb Callback
     */

  }, {
    key: 'prepOut',
    value: function prepOut(cb) {
      var _this4 = this;

      var cls = this.options.prefixClass + ' ' + this.options.prefixClass + '-out';

      this.isAnimating = true;
      this.element.className = cls;

      setTimeout(function () {
        if (_this4.options.hide) {
          _this4.options.hide(_this4, []);
        }

        _this4.container.removeChild(_this4.element);
        _this4.element = null;
        _this4.isAnimating = false;
        _this4.isShown = false;

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

  }, {
    key: 'isVisible',
    value: function isVisible() {
      return this.isShown;
    }
  }]);

  return Prelodr;
})();

// jQuery

(function () {
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Prelodr;
  } else if (typeof define === 'function' && define.amd) {
    define([], function () {
      return Prelodr;
    });
  } else {
    window.Prelodr = Prelodr;

    if (window.jQuery) {
      window.jQuery.fn.prelodr = function (options) {
        var fn = undefined;
        var prelodr = undefined;

        if (typeof options === 'string') {
          prelodr = this.data('prelodr');
          fn = prelodr[options];

          if (prelodr !== 'undefined' && typeof options === 'string' && fn) {
            return fn.apply(prelodr, Array.prototype.slice.call(arguments, 1));
          }

          var str = 'Method ' + options + ' is not supported by jQuery.prelodr.';
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