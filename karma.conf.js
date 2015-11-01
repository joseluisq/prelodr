module.exports = function (config) {
  config.set({
    autoWatch: true,
    basePath: './',
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    files: [
      'node_modules/babel-polyfill/dist/polyfill.min.js',
      './bower_components/jquery/dist/jquery.min.js',
      'dist/{,*/}*.js',
      'test/{,*/}*.spec.js'
    ],
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-coverage',
      'karma-spec-reporter',
      'karma-babel-preprocessor'
    ],
    preprocessors: {
      'dist/{,*/}*.js': ['coverage'],
      'test/{,*/}*.spec.js': ['babel']
    },
    reporters: [
      'spec',
      'coverage'
    ],
    coverageReporter: {
      type: 'lcovonly',
      dir: 'test/coverage/',
      subdir: '.',
      file: 'lcov.info'
    },
    exclude: [],
    port: 8080,
    singleRun: false,
    colors: true,
    logLevel: config.LOG_INFO
  });
};
