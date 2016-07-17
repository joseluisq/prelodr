const Emitus = require('emitus')
const Seqr = require('seqr')

module.exports = (options = {}) => {
  const opts = Object.assign({
    container: document.body,
    duration: 750,
    prefixClass: 'prelodr'
  }, options)

  const emitr = Emitus({show, hide, text})
  const queue = Seqr()

  const element = el()
  const wrapper = el()
  const progressbar = el()
  const spanText = el()
  const textNode = document.createTextNode('')
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
    queue
      .then(done => {
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

  function hide () {
    queue
      .then(done => {
        spanText.classList.remove(clsIn)
        element.classList.remove(clsIn)

        setTimeout(() => {
          element.classList.add(clsHide)
          emitr.emit('hidden')
          done()
        }, opts.duration)
      })

    return emitr
  }

  function text (str = 'Loading...') {
    textNode.textContent = str
  }

  function el (tag = 'span') {
    return document.createElement(tag)
  }
}
