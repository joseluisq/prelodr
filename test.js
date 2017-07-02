import test from 'ava'
import Prelodr from './'
import { JSDOM } from 'jsdom'

const { window } = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`)

global.document = window.document

test.cb('event handling', t => {
  t.plan(3)

  const pre = Prelodr()

  pre.on('shown', () => {
    t.pass()
  })
  pre.on('hidden', () => {
    t.pass()
    t.end()
  })

  pre.show('Loading...').hide()

  pre.setDuration(1000)
  pre.setText('Completing...')
  pre.setPrefixClass('prelodr2')
  pre.setZIndex(20)

  t.truthy(pre.getElement())
})

test.cb('chaining support', t => {
  t.plan(3)

  const pre = Prelodr()

  pre.on('shown', () => {
    t.pass()
  })
  pre.on('hidden', () => {
    t.pass()
    t.end()
  })

  pre.show('<b>Finishing</b>...').hide(done => {
    t.truthy(done)

    setTimeout(() => {
      done()
    }, 2000)
  })
})

test.cb('auto display', t => {
  t.plan(3)

  const pre = Prelodr({
    auto: true
  })

  pre.on('shown', () => {
    t.pass()
  })
  pre.on('hidden', () => {
    t.pass()
    t.end()
  })

  pre.show('<b>Completing</b>...').hide()
})
