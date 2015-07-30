module.exports = function (grunt) {
  'use strict';

  require('time-grunt')(grunt);
  require('jit-grunt')(grunt);

  var pkg = grunt.file.readJSON('package.json');
  var config = {
    dist: 'dist',
    examples: 'examples',
    src: 'lib',
    test: 'test',
    banner: '/*! <%= pkg.name.charAt(0).toUpperCase()' +
      '+ pkg.name.slice(1) %> ' +
      'v<%= pkg.version %> | <%= pkg.license %> | (c) ' +
      '<%= grunt.template.today(\'' +
      'yyyy\') %> <%= pkg.author %> */\n'
  };

  grunt.initConfig({
    config: config,
    pkg: pkg,
    watch: {
      js: {
        files: [
          '<%= config.src %>/{,*/}*.js',
          'Gruntfile.js'
        ],
        tasks: ['eslint'],
        options: {
          livereload: true
        }
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.examples %>/{,*/}*.html'
        ]
      }
    },
    connect: {
      options: {
        port: 7000,
        open: true,
        livereload: 35729,
        hostname: '127.0.0.1'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              connect.static('css'),
              connect.static('lib'),
              connect.static(config.examples),
              connect.static('bower_components')
            ];
          }
        }
      }
    },
    eslint: {
      options: {
        useEslintrc: true
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= config.src %>/{,*/}*.js'
        ]
      }
    },
    uglify: {
      options: {
        banner: '<%= config.banner %>'
      },
      dist: {
        files: {
          '<%= config.dist %>/<%= pkg.name.toLowerCase() %>.min.js': ['<%= config.src %>/<%= pkg.name.toLowerCase() %>.js']
        }
      }
    },
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    }
  });

  // Server Tasks
  grunt.registerTask('serve', 'Start the server and preview your app. --remote-access to allow remote access', function () {
    if (grunt.option('remote-access')) {
      grunt.config.set('connect.options.hostname', '0.0.0.0');
    }

    grunt.task.run([
      'connect:livereload',
      'watch'
    ]);
  });

  // Build Tasks
  grunt.registerTask('build', function () {
    grunt.task.run([
      'uglify:dist'
    ]);
  });

  // Build Test
  grunt.registerTask('test', function () {
    grunt.task.run([
      'karma'
    ]);
  });
};
