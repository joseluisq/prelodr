import Emitus from 'emitus'

export default (options = {}) => {
  const opts = Object.assign({
    container: document.body,
    duration: 750,
    prefixClass: 'prelodr'
  }, options)

  const emitr = Emitus({show, hide})

  return emitr

  function show () {
  }

  function hide () {
  }
}
