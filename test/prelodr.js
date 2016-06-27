import test from 'tape'
import { jsdom } from 'jsdom'
import Prelodr from '../src/prelodr'

global.document = jsdom('<!doctype html><html><body></body></html>')
global.window = document.defaultView

test('show(pre, el) callback', t => {
  t.plan(2)

  const prelodr = Prelodr()

  prelodr.on('show', (pre, el) => {
    const span = document.createElement('span')

    t.ok(pre, 'First param should be ok by default.')
    t.equal(el.tagName, span.tagName, 'Second param should be equal to span element by default.')
  })

  prelodr.show('Loading...')
})
