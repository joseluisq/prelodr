import Prelodr from '../src/prelodr'

const pre = Prelodr()

pre.on('shown', () => {
  console.log('shown!')
})

pre.on('hidden', () => {
  console.log('hidden!')
})
