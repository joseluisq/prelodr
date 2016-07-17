const test = require('tape')
const jsdom = require('jsdom').jsdom
const Prelodr = require('../src/prelodr')

global.document = jsdom('<!doctype html><html><body></body></html>')
global.window = document.defaultView

test('Test suite', t => {
  t.plan(2)

  const pre = Prelodr()

  pre.on('shown', () => t.ok(pre, 'when prelodr is shown.'))
  pre.on('hidden', () => t.ok(pre, 'when prelodr is hidden.'))

  pre
    .show('Loading...')
    .hide()
})
