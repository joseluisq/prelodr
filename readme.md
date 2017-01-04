# Prelodr [![Build Status](https://travis-ci.org/joseluisq/prelodr.svg?branch=master)](https://travis-ci.org/joseluisq/prelodr) [![Coverage Status](https://coveralls.io/repos/github/joseluisq/prelodr/badge.svg?branch=master)](https://coveralls.io/github/joseluisq/prelodr?branch=master) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
> A simple Material preloader inspired in Google Inbox.

[![Prelodr preview](https://cloud.githubusercontent.com/assets/1700322/11434023/c12a2918-9493-11e5-943b-eef39f3420e5.gif)](http://cdpn.io/rVeyXY)

[View demo](http://codepen.io/joseluisq/full/rVeyXY)

For React style check out [react-prelodr](https://github.com/joseluisq/react-prelodr).

## Install

#### CommonJS

```sh
npm install prelodr --save-dev
```

#### AMD

```js
requirejs(['prelodr'], Prelodr => {

})
```

#### Browser

##### Bower
```sh
bower install prelodr --save
```

##### CDN
The UMD and style files are also available on [unpkg](https://unpkg.com):

```html
<link href="https://unpkg.com/prelodr/dist/prelodr.min.css">
<script src="https://unpkg.com/prelodr/dist/prelodr.min.js"></script>
```

Also available on [JSDelivr](https://www.jsdelivr.com/)

```html
<link href="https://cdn.jsdelivr.net/prelodr/latest/prelodr.min.css">
<script src="https://cdn.jsdelivr.net/prelodr/latest/prelodr.min.js"></script>
```

You can use the library via `window.Prelodr`.

## Usage

```js
const pre = require('prelodr')()

// a) Show prelodr
pre.show('Loading...')

// b) Hide prelodr
pre.hide()
```

### Setup
Constructor supports two params, `container` (it should be a `HTMLElement`, by default is `document.body`)
and `options` (simple hash object). It's also possible to pass a `options` or `container` only.

```js
// 1) Passing container param only
const pre = Prelodr(document.getElementById('mycontainer'))
pre.show('Passing container...')
```

```js
// 2) Passing a container and options
const pre = Prelodr(document.getElementById('mycontainer'), {
  prefixClass: 'mypreloader'
})
pre.show('Passing container and options...')
```

```js
// 3) Passing container or options params only
const pre = Prelodr({
  prefixClass: 'mypreloader'
})
pre.show('Passing options only...')
```

### Async and chaining support
`show(fn)` method supports an optional (fn) callback function.

```js
const pre = Prelodr()

// Step 1
pre
  .show('Initializing...')
  .hide(done => {
    console.log(' 1 second delay... ')
    setTimeout(() => {
      done()
    }, 1000)
  })

// Step 2
pre
  .show('Processing...')
  .hide(done => {
    console.log(' 2 seconds delay... ')
    setTimeout(() => {
      done()
    }, 3000)
  })

// Step 3
pre
  .show('Closing...')
  .hide()
```

## Options
- `duration` : Timing for show and hide transition.
- `prefixClass` : Prefix class for prelodr. Default is `prelodr` class.

## Methods

### Prelodr.show(text)
Show the prelodr.
- `text` _{String}_ : Text for prelodr.

### Prelodr.hide(fn)
Hide the prelodr.
- `fn` _{Function}_ : (Optional) Callback function

### Prelodr.setOptions(options)
- `options` _{Object}_ : The custom options.

### Prelodr.setContainer(element)
- `element` _{HTML Element}_ : The element container. Default is `document.body`.

## Events

### Prelodr.on('shown', fn)
Event when prelodr is shown.

### Prelodr.on('hidden', fn)
Event when prelodr is hidden.

## Changelog
Check out the [changelog](https://github.com/joseluisq/prelodr/releases)

## Contributions
If you would like to contribute [pull requests](https://github.com/joseluisq/prelodr/pulls) and [issues](https://github.com/joseluisq/prelodr/issues) will be welcome! Feature requests are welcome too. Please before sending some feature requests make sure provide as much detail and context as possible.

## License
MIT license

© 2017 [José Luis Quintana](http://quintana.io)
