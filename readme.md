# Prelodr
[![](https://img.shields.io/bower/v/prelodr.svg?style=flat-square)](https://github.com/quintana-dev/prelodr#install) [![](https://img.shields.io/npm/v/prelodr.svg?style=flat-square)](https://www.npmjs.com/package/prelodr) [![Build Status](http://img.shields.io/travis/quintana-dev/prelodr.svg?style=flat-square)](https://travis-ci.org/quintana-dev/prelodr) [![Coverage Status](https://img.shields.io/coveralls/quintana-dev/prelodr.svg?style=flat-square)](https://coveralls.io/github/quintana-dev/prelodr?branch=master) [![devDependency Status](https://david-dm.org/quintana-dev/prelodr/dev-status.svg?style=flat-square)](https://david-dm.org/quintana-dev/prelodr#info=devDependencies)

> A simple Material preloader inspired in Google Inbox.

[![Prelodr preview](https://cloud.githubusercontent.com/assets/1700322/11434023/c12a2918-9493-11e5-943b-eef39f3420e5.gif)](http://cdpn.io/rVeyXY)

[View demo](http://codepen.io/joseluisq/full/rVeyXY)

## Install
#### Bower

```sh
$ bower install prelodr --save
```

#### Npm

```sh
$ npm install prelodr --save-dev
```

#### CDN
Hosted by [jsDelivr](https://www.jsdelivr.com/)

```html
<!-- Latest compiled and minified prelodr.js -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/prelodr/latest/prelodr.min.js">
```

## Usage

```js
var prelodr = new Prelodr();

// a) Show prelodr
prelodr.in('Loading...');

// b) Hide prelodr
prelodr.out();
```

### Setup
Constructor supports two params, `container` (it should be a `HTMLElement`, by default is `document.body`)
and `options` (simple hash object). It's also possible to pass a `options` or `container` only.

```js
// 1) Passing container param only
var prelodr = new Prelodr(document.getElementById('mycontainer'));
prelodr.in('Passing container...');
```

```js
// 2) Passing a container and options
var prelodr2 = new Prelodr(document.getElementById('mycontainer'), {
  prefixClass: 'mypreloader'
});
prelodr2.in('Passing container and options...');
```

```js
// 3) Passing container or options params only
var prelodr3 = new Prelodr({
  prefixClass: 'mypreloader'
});
prelodr3.in('Passing options only...');

```

### Async and chaining support
`out(fn)` method supports an optional (fn) callback function.

```js
var prelodr = new Prelodr();

// Step 1
prelodr.in('Initializing...')
       .out(function(done){

          console.info(' 1 second delay... ');
          setTimeout(function(){
            done();
          }, 1000);

       })

      // Step 2
       .in('Processing...')
       .out(function(done){

          console.info(' 2 seconds delay... ');
          setTimeout(function(){
            done();
          }, 3000);

       })

      // Step 3
       .in('Closing...').out();
```

### jQuery support

```js
$('body').prelodr({
  prefixClass: 'prelodr',
  show: function(){
    console.log('Show callback')
  },
  hide: function(){
    console.log('Hide callback')
  }
});

// a) Show prelodr
$('body').prelodr('in', 'Processing...');

// b) Hide prelodr
$('body').prelodr('out');
```

## Options
- `duration` : Timing for show and hide transition.
- `prefixClass` : Prefix class for prelodr. Default is `prelodr` class.
- `show` : Callback when prelodr is shown.
- `hide` : Callback when prelodr is hidden.

## Methods
### Prelodr.in(text)
Show the prelodr.
- `text` _{String}_ : Text for prelodr.

### Prelodr.out(fn)
Hide the prelodr.
- `fn` _{Function}_ : (Optional) Callback function

### Prelodr.setOptions(options)
- `options` _{Object}_ : The custom options.

### Prelodr.setContainer(element)
- `element` _{HTML Element}_ : The element container. Default is `document.body`.

### Prelodr.isVisible()
- Checks if Prelodr is visible (boolean).

## Changelog
Check out the [changelog](https://github.com/quintana-dev/prelodr/releases)

## Contributions
If you would like to contribute [pull requests](https://github.com/quintana-dev/prelodr/pulls) and [issues](https://github.com/quintana-dev/prelodr/issues) will be welcome! Feature requests are welcome. Please before sending some feature requests make sure provide as much detail and context as possible.

## License
MIT license

© 2015 [José Luis Quintana](http://quintana.io)
