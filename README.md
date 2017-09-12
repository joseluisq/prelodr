# Prelodr [![Build Status](https://travis-ci.org/joseluisq/prelodr.svg?branch=master)](https://travis-ci.org/joseluisq/prelodr) [![Coverage Status](https://coveralls.io/repos/github/joseluisq/prelodr/badge.svg?branch=master)](https://coveralls.io/github/joseluisq/prelodr?branch=master) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/) [![CDNJS version](https://img.shields.io/cdnjs/v/prelodr.svg)](https://cdnjs.com/libraries/prelodr)
> A simple Material preloader inspired by Google Inbox.

[![Prelodr preview](https://cloud.githubusercontent.com/assets/1700322/11434023/c12a2918-9493-11e5-943b-eef39f3420e5.gif)](http://cdpn.io/rVeyXY)

:tada: View demo on [Codepen](http://codepen.io/joseluisq/full/rVeyXY)

For React style check out [react-prelodr](https://github.com/joseluisq/react-prelodr).

## Install

[Yarn](https://github.com/yarnpkg/)

```sh
yarn add prelodr --dev
```

[NPM](https://www.npmjs.com/)

```sh
npm install prelodr --save-dev
```

### CDN
The UMD and style files are also available on [unpkg](https://unpkg.com):

```html
<link href="https://unpkg.com/prelodr/dist/prelodr.min.css">
<script src="https://unpkg.com/prelodr/dist/prelodr.min.js"></script>
```

Available on [JSDelivr](https://www.jsdelivr.com/)

```html
<link href="https://cdn.jsdelivr.net/npm/prelodr@latest/dist/prelodr.min.css">
<script src="https://cdn.jsdelivr.net/npm/prelodr@latest/dist/prelodr.min.js"></script>
```
Available on [cdnjs](https://cdnjs.com/libraries/prelodr)

```html
<link href="https://cdnjs.cloudflare.com/ajax/libs/prelodr/2.1.1/prelodr.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/prelodr/2.1.1/prelodr.min.js"></script>
```

You can use the library via `window.prelodr`.

## Usage

```js
const pre = require('prelodr')()

// a) Show prelodr
pre.show('Loading...')

// b) Hide prelodr
pre.hide()
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
- `container` : Container element to append the preloader.
- `zIndex` : `zindex` style value.
- `auto` : If it's `true` preloader shows automaticatly. Default `false`
- `duration` : Timing for show and hide transition.
- `text`: Default showing text.
- `prefixClass` : Prefix class for prelodr. Default is `prelodr` class.

## Methods

### Prelodr.show(text)
Show the prelodr.
- `text` _{String}_ : Text for prelodr.

### Prelodr.hide(fn)
Hide the prelodr.
- `fn` _{Function}_ : (Optional) Callback function

### Prelodr.setPrefixClass(prefix)
- `options` _{String}_ : Set the prefix class.

### Prelodr.setDuration(miliseconds)
- `miliseconds` _{Number}_ : Set the transition timing

### Prelodr.setZIndex(zindex)
- `zindex` _{Number}_ : Set the `zindex` style value.

### Prelodr.getElement()
Return the _{HTMLElement}_ object.

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

© 2017 [José Luis Quintana](http://git.io/joseluisq)
