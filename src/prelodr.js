import Emitus from 'emitus'

export default (options = {}) => {
  const opts = Object.assign({
    container: document.body,
    duration: 750,
    prefixClass: 'prelodr'
  }, options)

  const emitr = Emitus({show, hide})

  init()

  return emitr

  function init () {
    create()
  }

  function create () {
    const container = opts.container
    const element = el()
    const wrapper = el()
    const spanText = el()
    const progressbar = el()

    spanText.appendChild(document.createTextNode('Loading...'))
    wrapper.appendChild(spanText)
    spanText.appendChild(progressbar)
    progressbar.className = `${opts.prefixClass}-progressbar`

    element.className = opts.prefixClass
    element.appendChild(wrapper)
    container.appendChild(element)
  }

  function show () {
  }

  function hide () {
  }

  function el (tag = 'span') {
    return document.createElement(tag)
  }
}
