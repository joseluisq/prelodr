  /**
  * Prelodr v1.0.1
  * Release: 19/05/2015
  * Author: Jose Luis Quintana <joseluisquintana20@gmail.com>
  * https://github.com/quintana-dev/prelodr
  * MIT Licence
  */

(function () {
  'use strict'

  if (window.Prelodr) {
    return
  }

  /**
  * Initialize Prelodr
  *
  * @param {HTMLElement} container   Container element for Prelodr. Default is body
  * @param {Object} options          Default options object
  * @access public
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
  * @param {Object} a    First object
  * @param {Object} b    Second object
  * @access private
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
  * @param {Object} options    Options object
  * @access public
  */
  Prelodr.prototype.setOptions = function (options) {
    this.options = merge(this.options, options)
  }

  /**
  * Set container for Prelodr
  * @param {HTMLElement} container    The container for Prelodr.
  * @access public
  */
  Prelodr.prototype.setContainer = function (container) {
    this.container = container
  }

  /**
  * Show the Prelodr
  * @param {String} text    Text for Prelodr
  * @access public
  */
  Prelodr.prototype.in = function (text) {
    if (!this.isShown && !this.isAnimating) {
      var self = this
      var span = document.createElement('span')
      var spanText = document.createElement('span')
      var material = document.createElement('span')

      this.element = document.createElement('span')
      spanText.appendChild(document.createTextNode(text))
      span.appendChild(spanText)
      spanText.appendChild(material)

      this.element.appendChild(span)
      this.container.appendChild(this.element)

      this.element.className = this.options.prefixClass
      material.className = this.options.prefixClass + '-progressbar'

      this.isShown = true
      this.isAnimating = true

      setTimeout(function () {
        self.element.className = self.options.prefixClass + ' ' + self.options.prefixClass + '-in'

        setTimeout(function () {
          if (self.options.show) {
            self.options.show.apply(self, [self.element])
          }

          self.isAnimating = false
        }, self.options.duration)

      }, 20)
    }
  }

  /**
  * Hide the Prelodr
  * @access public
  */
  Prelodr.prototype.out = function () {
    if (this.isShown) {
      var self = this
      this.isShown = false

      if (this.isAnimating) {
        this.prepareForHide = true
        this.interval = setInterval(function () {
          if (!self.isAnimating) {
            clearInterval(self.interval)
            self.prepOut()
          }
        }, 20)
      } else {
        this.prepOut()
      }
    }
  }

  /**
  * Prepare to hide the Prelodr
  * @access public
  */
  Prelodr.prototype.prepOut = function () {
    var self = this
    this.isAnimating = true
    this.element.className = this.options.prefixClass + ' ' + this.options.prefixClass + '-out'

    setTimeout(function () {
      if (self.options.hide) {
        self.options.hide.apply(self, [])
      }

      self.container.removeChild(self.element)
      self.element = null
      self.isAnimating = false
      self.isShown = false
      self.prepareForHide = false
    }, this.options.duration)
  }

  /**
  * Check if Prelodr is visible
  * @access public
  * @return boolean
  */
  Prelodr.prototype.isVisible = function () {
    return this.isShown
  }

  window.Prelodr = Prelodr

  // jQuery support
  if (window.jQuery) {
    var prelodr, fn

    /**
    * jQuery Prelodr
    * @param {Object} options    Text for Prelodr
    * @access public
    * @return boolean
    */
    window.jQuery.fn.prelodr = function (options) {
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

})()
