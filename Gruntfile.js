module.exports = function(grunt) {
  'use strict'

  require('time-grunt')(grunt)
  require('jit-grunt')(grunt)

  var pkg = grunt.file.readJSON('package.json')
  var config = {
    dist: 'dist',
    examples: 'examples',
    src: 'lib',
    test: 'test',
    banner: '/*! <%= pkg.name.charAt(0).toUpperCase() + pkg.name.slice(1) %> ' +
      'v<%= pkg.version %> | (c) <%= grunt.template.today("yyyy") %>' +
      '<%= pkg.author %> | <%= pkg.license %> */\n'
  }

  grunt.initConfig({
    config: config,
    pkg: pkg,
    watch: {
      js: {
        files: ['<%= config.src %>/{,*/}*.js'],
        tasks: ['jscs'],
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
          middleware: function(connect) {
            return [
              connect.static(config.examples),
              connect.static('bower_components'),
              function(req, res, next) {
                if (req.url === ('/' + config.src + '/' + pkg.name.toLowerCase() + '.js')) {
                  res.setHeader('content-type', 'text/javascript')
                  res.end(grunt.file.read(config.src + '/' + pkg.name.toLowerCase() + '.js', 'utf-8'))
                }

                if (req.url === ('/bower_components/jquery/dist/jquery.js')) {
                  res.setHeader('content-type', 'text/javascript')
                  res.end(grunt.file.read('bower_components/jquery/dist/jquery.js', 'utf-8'))
                }

                if (req.url === ('/css/' + pkg.name.toLowerCase() + '.css')) {
                  res.setHeader('content-type', 'text/css')
                  res.end(grunt.file.read('css/' + pkg.name.toLowerCase() + '.css', 'utf-8'))
                } else {
                  return next()
                }
              }
            ]
          }
        }
      }
    },
    jscs: {
      options: {
        config: '.jscsrc',
        fix: true,
        verbose: true,
        requireCurlyBraces: ['if'],
        reporter: require('jscs-stylish').path
      },
      all: [
        'Gruntfile.js',
        'src/{,*/}*.js',
        '<%= config.test %>/spec/{,*/}*.js'
      ]
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
    }
  })

  // Server Tasks
  grunt.registerTask('serve', 'Start the server and preview your app. --remote-access to allow remote access', function() {
    if (grunt.option('remote-access')) {
      grunt.config.set('connect.options.hostname', '0.0.0.0')
    }

    grunt.task.run([
      'connect:livereload',
      'watch'
    ])
  })

  // Build Tasks
  grunt.registerTask('build', function() {
    grunt.task.run([
      'uglify:dist'
    ])
  })
}
