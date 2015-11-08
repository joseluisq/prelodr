/*! Prelodr v1.0.5 | MIT (c) 2015 José Luis Quintana */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
      this.container = window.document.body;
    }
  }

  /**
   * Set the default options
   *
   * @param {Object} options - Options object
   */

  _createClass(Prelodr, [{
    key: 'setOptions',
    value: function setOptions(options) {
      this.options = this._merge(this.options, options);
    }

    /**
     * Marge two hash objects
     *
     * @param {Object} a - First object
     * @param {Object} b - Second object
     * @return {Object}
     */

  }, {
    key: '_merge',
    value: function _merge(a, b) {
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
    key: '_getId',
    value: function _getId() {
      return Math.random().toString(36).slice(2);
    }

    /**
     * Create and show preloader elements
     * @param  {Prelodr} me - Prelodr object
     * @param  {String} text - Text for prelodr
     * @param  {Function} cb - Callback
     */

  }, {
    key: '_show',
    value: function _show(text, cb) {
      var _this = this;

      var span = window.document.createElement('span');
      var spanText = window.document.createElement('span');
      var progressbar = window.document.createElement('span');

      this.element = window.document.createElement('span');
      spanText.appendChild(window.document.createTextNode(text));
      span.appendChild(spanText);
      spanText.appendChild(progressbar);

      this.element.appendChild(span);
      this.container.appendChild(this.element);

      this.element.className = this.options.prefixClass;
      progressbar.className = this.options.prefixClass + '-progressbar';

      setTimeout(function () {
        var cls = _this.options.prefixClass + ' ' + _this.options.prefixClass + '-in';

        _this.element.className = cls;

        setTimeout(function () {
          _this.isShown = true;
          _this.isAnimating = false;

          if (_this.options.show) {
            _this.options.show(_this, _this.element);
          }

          if (cb) {
            cb();
          }
        }, _this.options.duration);
      }, 20);
    }

    /**
     * Hide prelodr elements
     * @param  {Prelodr} me - Prelodr object
     * @param  {Function} cb - Callback
     */

  }, {
    key: '_hide',
    value: function _hide(cb) {
      var _this2 = this;

      if (this.isShown) {
        this.isShown = false;

        if (this.isAnimating) {
          this.interval = setInterval(function () {
            if (!_this2.isAnimating) {
              clearInterval(_this2.interval);
              _this2._prepOut(cb);
            }
          }, 20);
        } else {
          this._prepOut(cb);
        }
      }
    }

    /**
     * Walk queue
     * @param  {Queu} queu - Queu object
     */

  }, {
    key: '_queueWalk',
    value: function _queueWalk() {
      var _this3 = this;

      var one = this.queu.first();

      if (one && one.is === 'in') {
        this.isShown = true;

        one.fn(function () {
          _this3.queu.shift();
          _this3.isStart = false;

          var next = _this3.queu.first();

          if (next && next.is === 'out') {
            _this3.queu.shift();

            next.fn(function () {
              _this3._queueWalk();
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
      var _this4 = this;

      var obj = {
        id: this._getId(),
        is: 'in',
        fn: function fn(cb) {
          return _this4._show(text, cb);
        }
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

  }, {
    key: 'out',
    value: function out(_fn) {
      var _this5 = this;

      this.queu.add({
        id: this._getId(),
        is: 'out',
        fn: function fn(cb) {
          if (_fn && typeof _fn === 'function') {
            _fn(function () {
              _this5._hide(cb);
            });
          } else {
            _this5._hide(cb);
          }
        }
      });

      if (!this.isStart) {
        var one = this.queu.first();

        if (one && one.is === 'out') {
          one.fn(function () {
            _this5.queu.shift();
            _this5._queueWalk();
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
    key: '_prepOut',
    value: function _prepOut(cb) {
      var _this6 = this;

      var cls = this.options.prefixClass + ' ' + this.options.prefixClass + '-out';

      this.isAnimating = true;
      this.element.className = cls;

      setTimeout(function () {
        if (_this6.options.hide) {
          _this6.options.hide(_this6, []);
        }

        _this6.container.removeChild(_this6.element);
        _this6.element = null;
        _this6.isAnimating = false;
        _this6.isShown = false;

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

(function () {
  if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && _typeof(module.exports) === 'object') {
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