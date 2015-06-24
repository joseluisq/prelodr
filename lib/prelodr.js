/**
 * Prelodr v1.0.3
 * https://github.com/quintana-dev/prelodr
 *
 * @author    Jose Luis Quintana <joseluisquintana20@gmail.com>
 * @license   MIT
 */

"use strict";

(function() {

  if (window.Prelodr) {
    return;
  }

  /**
   * Initialize Prelodr
   *
   * @param {HTMLElement} container - Container element for Prelodr. Default is body
   * @param {Object} options - Default options object
   * @constructor
   */
  function Prelodr(container, options) {
    if (!(this instanceof Prelodr)) {
      return new Prelodr(container, options);
    }

    this.isShown = false;
    this.isAnimating = false;
    this.options = {
      duration: 700,
      prefixClass: "prelodr",
      show: null,
      hide: null
    };

    if (typeof container === "object") {
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
  function merge(a, b) {
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
  Prelodr.prototype.setOptions = function(options) {
    this.options = merge(this.options, options);
  };

  /**
   * Set container for Prelodr
   *
   * @param {HTMLElement} container - The container for Prelodr.
   */
  Prelodr.prototype.setContainer = function(container) {
    this.container = container;
  };

  /**
   * Show the Prelodr
   *
   * @param {String} text - Text for Prelodr
   */
  Prelodr.prototype.in = function(text) {
    var me = this;

    if (me.isShown && me.isAnimating) {
      return;
    }

    var span = document.createElement("span");
    var spanText = document.createElement("span");
    var progressbar = document.createElement("span");

    me.element = document.createElement("span");
    spanText.appendChild(document.createTextNode(text));
    span.appendChild(spanText);
    spanText.appendChild(progressbar);

    me.element.appendChild(span);
    me.container.appendChild(me.element);

    me.element.className = me.options.prefixClass;
    progressbar.className = me.options.prefixClass + "-progressbar";

    me.isShown = true;
    me.isAnimating = true;

    setTimeout(function() {
      me.element.className = me.options.prefixClass + " " + me.options.prefixClass + "-in";

      setTimeout(function() {
        me.isAnimating = false;

        if (me.options.show) {
          me.options.show.apply(me, [me.element]);
        }
      }, me.options.duration);
    }, 20);
  };

  /**
   * Hide the Prelodr
   */
  Prelodr.prototype.out = function() {
    if (this.isShown) {
      var me = this;
      me.isShown = false;

      if (me.isAnimating) {
        me.prepareForHide = true;
        me.interval = setInterval(function() {
          if (!me.isAnimating) {
            clearInterval(me.interval);
            me.prepOut();
          }
        }, 20);
      } else {
        me.prepOut();
      }
    }
  };

  /**
   * Prepare to hide the Prelodr
   */
  Prelodr.prototype.prepOut = function() {
    var me = this;
    me.isAnimating = true;
    me.element.className = me.options.prefixClass + " " + me.options.prefixClass + "-out";

    setTimeout(function() {
      if (me.options.hide) {
        me.options.hide.apply(me, []);
      }

      me.container.removeChild(me.element);
      me.element = null;
      me.isAnimating = false;
      me.isShown = false;
      me.prepareForHide = false;
    }, me.options.duration);
  };

  /**
   * Check if Prelodr is visible
   *
   * @return {Boolean}
   */
  Prelodr.prototype.isVisible = function() {
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
    window.jQuery.fn.prelodr = function(options) {
      if (typeof options === "string") {
        prelodr = this.data("prelodr");
        fn = prelodr[options];

        if (prelodr && typeof options === "string" && fn) {
          return fn.apply(prelodr, Array.prototype.slice.call(arguments, 1));
        } else {
          window.jQuery.error("Method " + options + " is not supported by jQuery.prelodr.");
        }
      } else {
        prelodr = new Prelodr(this[0], options);
        this.data("prelodr", prelodr);
      }

      return this;
    };
  }

  window.Prelodr = Prelodr;

}());
