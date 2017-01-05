/* eslint-disable no-console */

import Prelodr from './prelodr'

const pre = Prelodr({
  text: 'Preloading...',
  auto: true
})

pre.on('shown', () => {
  console.log('shown!')
})

pre.on('hidden', () => {
  console.log('hidden!')
})

const btn = document.getElementById('btn-preloadr')

btn.addEventListener('click', () => {
  pre
    .show('Initializing...').hide()
    .show('Processing...').hide()
    .show('<b>Finishing...</b>').hide()
}, false)

pre.hide()
