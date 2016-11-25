const pre = require('../src/prelodr')()

pre.on('shown', () => {
  console.log('shown!')
})

pre.on('hidden', () => {
  console.log('hidden!')
})

const btn = document.getElementById('btn-preloadr')

btn.addEventListener('click', () =>
  pre
    .show('Initializing...').hide()
    .show('Processing...').hide()
    .show('Finishing...').hide()
, false)
