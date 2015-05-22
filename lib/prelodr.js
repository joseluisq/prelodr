/**
 * Prelodr v1.0.2
 * https://github.com/quintana-dev/prelodr
 *
 * @author    Jose Luis Quintana <joseluisquintana20@gmail.com>
 * @license   MIT
 */

(function() {
  'use strict'

  if (window.Prelodr) {
    return
  }

  /**
   * Initialize Prelodr
   *
   * @param {HTMLElement} container - Container element for Prelodr. Default is body
   * @param {Object} options - Default options object
   * @constructor
   */
  function Prelodr (container, options) {
    if (!(this instanceof Prelodr)) {
      return new Prelodr(container, options)
    }

    this.isShown = false
    this.isAnimating = false
    this.options = {
      duration: 700,
      prefixClass: 'prelodr',
      show: null,
      hide: null
    }

    if (typeof container === 'object') {
      if (container.nodeName) {
        this.setContainer(container)
        this.setOptions(options)
      } else {
        this.setContainer(document.body)
        this.setOptions(container)
      }
    } else {
      this.container = document.body
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
    var i

    if (b) {
      for (i in b) {
        a[i] = b[i]
      }
    }

    return a
  }

  /**
   * Set the default options
   *
   * @param {Object} options - Options object
   */
  Prelodr.prototype.setOptions = function(options) {
    this.options = merge(this.options, options)
  }

  /**
   * Set container for Prelodr
   *
   * @param {HTMLElement} container - The container for Prelodr.
   */
  Prelodr.prototype.setContainer = function(container) {
    this.container = container
  }

  /**
   * Show the Prelodr
   *
   * @param {String} text - Text for Prelodr
   */
  Prelodr.prototype.in = function(text) {
    var _this = this

    if (_this.isShown && _this.isAnimating) {
      return
    }

    var span = document.createElement('span')
    var spanText = document.createElement('span')
    var progressbar = document.createElement('span')

    _this.element = document.createElement('span')
    spanText.appendChild(document.createTextNode(text))
    span.appendChild(spanText)
    spanText.appendChild(progressbar)

    _this.element.appendChild(span)
    _this.container.appendChild(_this.element)

    _this.element.className = _this.options.prefixClass
    progressbar.className = _this.options.prefixClass + '-progressbar'

    _this.isShown = true
    _this.isAnimating = true

    setTimeout(function() {
      _this.element.className = _this.options.prefixClass + ' ' + _this.options.prefixClass + '-in'

      setTimeout(function() {
        _this.isAnimating = false

        if (_this.options.show) {
          _this.options.show.apply(_this, [_this.element])
        }
      }, _this.options.duration)
    }, 20)
  }

  /**
   * Hide the Prelodr
   */
  Prelodr.prototype.out = function() {
    if (this.isShown) {
      var _this = this
      _this.isShown = false

      if (_this.isAnimating) {
        _this.prepareForHide = true
        _this.interval = setInterval(function() {
          if (!_this.isAnimating) {
            clearInterval(_this.interval)
            _this.prepOut()
          }
        }, 20)
      } else {
        _this.prepOut()
      }
    }
  }

  /**
   * Prepare to hide the Prelodr
   */
  Prelodr.prototype.prepOut = function() {
    var _this = this
    _this.isAnimating = true
    _this.element.className = _this.options.prefixClass + ' ' + _this.options.prefixClass + '-out'

    setTimeout(function() {
      if (_this.options.hide) {
        _this.options.hide.apply(_this, [])
      }

      _this.container.removeChild(_this.element)
      _this.element = null
      _this.isAnimating = false
      _this.isShown = false
      _this.prepareForHide = false
    }, _this.options.duration)
  }

  /**
   * Check if Prelodr is visible
   *
   * @return {Boolean}
   */
  Prelodr.prototype.isVisible = function() {
    return this.isShown
  }

  // jQuery support
  if (window.jQuery) {
    var prelodr
    var fn

    /**
     * jQuery Prelodr
     *
     * @param {Object} options - Options for Prelodr
     * @return {jQuery}
     */
    window.jQuery.fn.prelodr = function(options) {
      if (typeof options === 'string') {
        prelodr = this.data('prelodr')
        fn = prelodr[options]

        if (prelodr && typeof options === 'string' && fn) {
          return fn.apply(prelodr, Array.prototype.slice.call(arguments, 1))
        } else {
          window.jQuery.error('Method ' + options + ' is not supported by jQuery.prelodr.')
        }
      } else {
        prelodr = new Prelodr(this[0], options)
        this.data('prelodr', prelodr)
      }

      return this
    }
  }

  window.Prelodr = Prelodr

})();
