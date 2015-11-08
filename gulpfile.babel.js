import browserSync from 'browser-sync';
import gulp from 'gulp';
import sass from 'gulp-sass';
import babel from 'gulp-babel';
import plumber from 'gulp-plumber';
import header from 'gulp-header';
import rename from 'gulp-rename';
import minifyCss from 'gulp-minify-css';
import uglify from 'gulp-uglify';
import pkg from './package.json';

const banner = `/*! ${pkg.name.charAt(0).toUpperCase()}${pkg.name.slice(1)} v${pkg.version} | ${pkg.license} (c) ${new Date().getFullYear()} ${pkg.author.name} */
`;

const reload = browserSync.reload;

// Browser-sync task
gulp.task('browser-sync', () => {
  browserSync({
    options: {
      notify: false,
      background: true,
      watchOptions: {
        ignored: ''
      }
    },
    server: {
      files: [
        'examples/{,*/}*.html',
        'css/{,*/}*.css'
      ],
      baseDir: [
        './dist',
        './css',
        './examples'
      ],
      routes: {
        '/': './examples',
        '/dist': './dist',
        '/css': './css',
        '/bower_components': './bower_components'
      }
    }
  });
});

// Sass task
gulp.task('sass', () => {
  return gulp.src('scss/{,*/}*.{scss,sass}')
    // Prevent pipe breaking
    .pipe(plumber())

    // Compile sass
    .pipe(sass({includePaths: ['scss']}))

    // Inject banner
    .pipe(header(banner))

    // Write expanded css
    .pipe(gulp.dest('css'))

    // Minify
    .pipe(minifyCss())

    // Rename to min file
    .pipe(rename({
      suffix: '.min'
    }))

    // Write Minified file
    .pipe(gulp.dest('css'))

    // Inject into browsers
    .pipe(reload({stream: true}));
});

gulp.task('js', () => {
  return gulp.src('lib/{,*/}*.js')
    // Prevent pipe breaking
    .pipe(plumber())

    // Babel transpiler
    .pipe(babel())

    // Inject banner
    .pipe(header(banner))

    // Write expanded js
    .pipe(gulp.dest('dist'))

    // Minify
    .pipe(uglify())

    // Inject banner
    .pipe(header(banner))

    // Rename to min file
    .pipe(rename({
      suffix: '.min'
    }))

    // Write Minified file
    .pipe(gulp.dest('dist'))

    // Inject into browsers
    .pipe(reload({stream: true}));
});

gulp.task('html', () => {
  return gulp.src('examples/{,*/}*.html')
    // Inject into browsers
    .pipe(reload({stream: true}));
});

// Listen task
gulp.task('listen', [
  'sass',
  'js',
  'html',
  'browser-sync'
], () => {
  gulp.watch('scss/{,*/}*.{scss,sass}', ['sass']);
  gulp.watch('lib/{,*/}*.js', ['js']);
  gulp.watch('examples/{,*/}*.html', ['html']);
});

// Watch task
gulp.task('watch', ['listen']);

// Default task
gulp.task('default', ['sass', 'js']);
