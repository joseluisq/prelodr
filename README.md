# Prelodr
[![](https://img.shields.io/bower/v/prelodr.svg?style=flat-square)](https://github.com/quintana-dev/prelodr#install) [![](https://img.shields.io/npm/v/prelodr.svg?style=flat-square)](https://www.npmjs.com/package/prelodr) [![Build Status](http://img.shields.io/travis/quintana-dev/prelodr.svg?style=flat-square)](https://travis-ci.org/quintana-dev/prelodr) [![Inline docs](http://inch-ci.org/github/quintana-dev/prelodr.svg?branch=master&style=flat-square&v1)](http://inch-ci.org/github/quintana-dev/prelodr)

> A simple Material preloader inspired in Google Inbox.

![image](http://g.recordit.co/0Uc5Bih5Tk.gif)

[View demo](http://codepen.io/joseluisq/full/rVeyXY)

## Install

**Bower**

```sh
$ bower install --save prelodr
```

**Npm**

```sh
$ npm install prelodr
```

## Usage

```js
var prelodr = new Prelodr()

// Show prelodr
prelodr.in('Loading...')

// Hide prelodr
prelodr.out()
```

#### jQuery

```js
$('body').prelodr({
  prefixClass: 'prelodr',
  show: function(){
    console.log('Show callback')
  },
  hide: function(){
    console.log('Hide callback')
  }
})

// Show prelodr
$('body').prelodr('in', 'Processing...')

// Hide prelodr
$('body').prelodr('out')
```

## Options

  * `duration` : Timing for show and hide transition.
  * `prefixClass` : Prefix class for prelodr. Default is `prelodr` class.
  * `show` : Callback when prelodr is shown.
  * `hide` : Callback when prelodr is hidden.

## Methods

#### Prelodr.in(text)
Show the prelodr.

* `text` *{String}* : Text for prelodr.

#### Prelodr.out()
Hide the prelodr.

#### Prelodr.setOptions(options)
* `options` *{Object}* : The custom options.

#### Prelodr.setContainer(element)
* `element` *{HTML Element}* : The element container. Default is `document.body`.

#### Prelodr.isVisible()
* Checks if Prelodr is visible (boolean).

## License
MIT License 
