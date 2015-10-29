// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html

module.exports = function (config) {
  config.set({
    // enable / disable watching file and executing tests
    // whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      // jQuery
      'bower_components/jquery/dist/jquery.js',
      'bower_components/jasmine-jquery/lib/jasmine-jquery.js',
      // Babel browser polyfill
      'node_modules/babel-core/browser-polyfill.js',

      // Testing files
      'lib/{,*/}*.js',
      'test/{,*/}*.test.js'
    ],

    exclude: [],
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],
    reporters: [
      'coverage',
      'spec'
    ],
    preprocessors: {
      'lib/{,*/}*.js': ['coverage'],
      'test/{,*/}*.test.js': ['babel']
    },
    coverageReporter: {
      type : 'lcovonly',
      dir : 'test/coverage/',
      subdir: '.',
      file : 'lcov.info'
    },
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-coverage',
      'karma-spec-reporter',
      'karma-babel-preprocessor'
    ],
    singleRun: false,
    colors: true,
    logLevel: config.LOG_INFO
  });
};
