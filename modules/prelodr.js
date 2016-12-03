/* global module */

import Seqr from 'seqr'
import Emitus from 'emitus'

module.exports = (options = {}) => {
  const opts = Object.assign({
    container: document.body,
    duration: 750,
    prefixClass: 'prelodr'
  }, options)

  const seqr = Seqr()
  const emitr = Emitus({show, hide, text})

  const element = el()
  const wrapper = el()
  const progressbar = el()
  const spanText = el()
  const textNode = el()
  const clsIn = `${opts.prefixClass}-in`
  const clsHide = `${opts.prefixClass}-hide`

  spanText.appendChild(textNode)
  wrapper.appendChild(spanText)
  spanText.appendChild(progressbar)
  element.appendChild(wrapper)
  element.className = opts.prefixClass
  progressbar.className = `${opts.prefixClass}-progressbar`
  element.classList.add(clsHide)
  opts.container.appendChild(element)

  return emitr

  function show (str) {
    seqr.then(done => {
      text(str)

      element.classList.remove(clsHide)

      setTimeout(() => {
        spanText.classList.add(clsIn)
        element.classList.add(clsIn)
      }, 10)

      setTimeout(() => {
        emitr.emit('shown')
        done()
      }, opts.duration)
    })

    return emitr
  }

  function hide (fn) {
    seqr.then(done => {
      spanText.classList.remove(clsIn)
      element.classList.remove(clsIn)

      setTimeout(() => {
        element.classList.add(clsHide)

        if (fn) fn(done)
        else done()

        emitr.emit('hidden')
      }, opts.duration)
    })

    return emitr
  }

  function text (str = 'Loading...') {
    textNode.innerHTML = str
  }

  function el (tag = 'span') {
    return document.createElement(tag)
  }
}
