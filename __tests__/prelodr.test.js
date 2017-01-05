/* global global, test, expect */

import { jsdom } from 'jsdom'
import Prelodr from '../src/prelodr'

global.document = jsdom('<!doctype html><html><body></body></html>')
global.window = document.defaultView

test('event handling', () => {
  const pre = Prelodr()

  pre.on('shown', () => expect(1).toBeDefined())
  pre.on('hidden', () => expect(1).toBeDefined())

  pre
    .show('Loading...')
    .hide()

  pre.setDuration(1000)
  pre.setText('Completing...')
  pre.setPrefixClass('prelodr2')
  pre.setZIndex(20)

  expect(pre.getElement()).toBeDefined()
})

test('chaining support', () => {
  const pre = Prelodr()

  pre.on('shown', () => expect(1).toBeDefined())
  pre.on('hidden', () => expect(1).toBeDefined())

  pre
    .show('<b>Finishing</b>...')
    .hide(done => {
      setTimeout(() => {
        expect(done).toBeFunction()
        done()
      }, 2000)
    })
})
