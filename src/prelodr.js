/*
 * Prelodr v1.0.0
 * Release: 12/05/2015
 * Author: Jose Luis Quintana <joseluisquintana20@gmail.com>
 * https://github.com/quintana-dev/Prelodr
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

    this.isVisible = false
    this.isAnimate = false
    this.options = {
      classPrefix: 'prelodr',
      zIndex: 777,
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
   * @param {String} str    Text for Prelodr
   * @access public
   */
  Prelodr.prototype.in = function (str) {
    if (!this.isVisible && !this.isAnimate) {
      var self = this
      var span = document.createElement('span')
      var txt = document.createElement('span')
      var material = document.createElement('span')

      this.element = document.createElement('span')
      this.isVisible = true
      txt.appendChild(document.createTextNode(str))
      span.appendChild(txt)
      txt.appendChild(material)

      this.element.appendChild(span)
      this.container.appendChild(this.element)

      this.element.className = this.options.classPrefix
      material.className = this.options.classPrefix + '-progressbar'

      setTimeout(function () {
        self.element.className = self.options.classPrefix + ' ' + self.options.classPrefix + '-in'

        if (self.options.show) {
          self.options.show.apply(self, [self.element])
        }

        self.isAnimate = false
      }, 100)
    }
  }

  /**
   * Hide the Prelodr
   * @access public
   */
  Prelodr.prototype.out = function () {
    if (this.isVisible && !this.isAnimate) {
      this.element.className = this.options.classPrefix + ' ' + this.options.classPrefix + '-out'
      this.isAnimate = true

      var self = this
      setTimeout(function () {
        self.container.removeChild(self.element)
        self.element = null

        if (self.options.hide) {
          self.options.hide.apply(self, [])
        }

        self.isAnimate = false
        self.isVisible = false
      }, 400)
    }
  }

  /**
   * Check if Prelodr is visible
   * @access public
   * @return boolean
   */
  Prelodr.prototype.isVisible = function () {
    return this.isVisible
  }

  window.Prelodr = Prelodr

})()
