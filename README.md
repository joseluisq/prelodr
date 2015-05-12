# Prelodr
[![](https://img.shields.io/npm/v/prelodr.svg?style=flat-square)](https://www.npmjs.com/package/prelodr) [![Build Status](http://img.shields.io/travis/quintana-dev/prelodr.svg?style=flat-square)](https://travis-ci.org/quintana-dev/prelodr) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard) [![Inline docs](http://inch-ci.org/github/quintana-dev/prelodr.svg?branch=master&style=flat-square)](http://inch-ci.org/github/quintana-dev/prelodr)

> A simple Material preloader inspired in Google Inbox.

![image](https://cloud.githubusercontent.com/assets/1700322/7597187/61eb5620-f8b7-11e4-9e91-621a163f7574.png)

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

// Show preloader
prelodr.in('Loading...')
```

## Options

  * `classPrefix` : Prefix class for prelodr. Default is `prelodr` class.
  * `zIndex` : Prelodr stack order.
  * `show` : Callback when prelodr is shown.
  * `hide` : Callback when prelodr is hidden.

## Methods

#### Prelodr.in(text)
Show the preloader

* `text` *String* - Title for prelodr.


#### Prelodr.out()
Hide the prelodr

## License
MIT License 
