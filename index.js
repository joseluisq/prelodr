import Seqr from 'seqr'
import Emitus from 'emitus'

export default function prelodr (options = {}) {
  let defaults = Object.assign(
    {
      container: document.body,
      duration: 750,
      zIndex: 100,
      auto: false,
      text: 'Loading...',
      prefixClass: 'prelodr'
    },
    options
  )

  const emitter = Emitus({
    show,
    hide,
    setText,
    getElement,
    setPrefixClass,
    setDuration,
    setZIndex
  })

  const seqr = Seqr()
  let cls = getClasses()

  const wrapper = el()
  wrapper.className = `${cls.prefix} ${cls.hide}`
  wrapper.innerHTML = `<span><span><span class="${cls.text}">${defaults.text}</span><span class="${cls.progressbar}"></span></span></span>`

  const spanText = find(`.${cls.text}`)
  const spanProgressbar = find(`.${cls.progressbar}`)

  defaults.container.appendChild(wrapper)

  if (defaults.auto) show(defaults.text)

  setZIndex(defaults.zIndex)

  return emitter

  function show (str) {
    seqr.then(done => {
      setText(str)

      wrapper.classList.remove(cls.hide)

      setTimeout(() => {
        spanText.classList.add(cls.in)
        wrapper.classList.add(cls.in)
      }, 10)

      setTimeout(() => {
        emitter.emit('shown')
        done()
      }, defaults.duration)
    })

    return emitter
  }

  function hide (fn) {
    seqr.then(done => {
      spanText.classList.remove(cls.in)
      wrapper.classList.remove(cls.in)

      setTimeout(() => {
        wrapper.classList.add(cls.hide)

        if (fn) fn(done)
        else done()

        emitter.emit('hidden')
      }, defaults.duration)
    })

    return emitter
  }

  function setText (str) {
    if (!str && defaults.text) str = defaults.text

    defaults.text = str
    spanText.innerHTML = str

    return emitter
  }

  function getElement () {
    return wrapper
  }

  function setDuration (duration) {
    defaults.duration = duration
  }

  function setZIndex (zindex) {
    defaults.zIndex = zindex
    wrapper.style.zIndex = zindex
  }

  function setPrefixClass (prefix) {
    defaults.prefixClass = prefix
    updateClasses()
  }

  function updateClasses () {
    const from = cls

    cls = getClasses()
    replaceClass(wrapper, from.prefix, cls.prefix)
    replaceClass(spanText, from.text, cls.text)
    replaceClass(spanProgressbar, from.progressbar, cls.progressbar)
  }

  function getClasses () {
    return {
      prefix: defaults.prefixClass,
      in: `${defaults.prefixClass}-in`,
      hide: `${defaults.prefixClass}-hide`,
      text: `${defaults.prefixClass}-text`,
      progressbar: `${defaults.prefixClass}-progressbar`
    }
  }

  function el (tag = 'span') {
    return document.createElement(tag)
  }

  function find (q) {
    return wrapper.querySelector(q)
  }

  function replaceClass (elem, from, to) {
    elem.classList.remove(from)
    elem.classList.add(to)
  }
}
