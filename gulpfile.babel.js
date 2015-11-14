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

const reload = browserSync.reload;
const banner = `/*! ${pkg.name.charAt(0).toUpperCase()}${pkg.name.slice(1)} v${pkg.version} | ${pkg.license} (c) ${new Date().getFullYear()} ${pkg.author.name} */
`;
const opts = {
  destDir: 'dist',
  examplesDir: 'examples',
  jsSrc: 'lib/{,*/}*.js',
  htmlSrc: 'examples/{,*/}*.html',
  sassSrc: 'scss/{,*/}*.scss'
};

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
      baseDir: [
        opts.destDir,
        opts.examplesDir,
        'bower_components'
      ]
    }
  });
});

// Sass task
gulp.task('sass', () => {
  const pipe = gulp.src(opts.sassSrc)
    // Prevent pipe breaking
    .pipe(plumber())
    // Compile sass
    .pipe(sass({includePaths: ['scss']}))
    // Inject banner
    .pipe(header(banner))
    // Write expanded css
    .pipe(gulp.dest(opts.destDir))
    // Minify
    .pipe(minifyCss())
    // Rename to min file
    .pipe(rename({
      suffix: '.min'
    }))
    // Write Minified file
    .pipe(gulp.dest(opts.destDir))
    // Inject into browsers
    .pipe(reload({stream: true}));

  return pipe;
});

gulp.task('js', () => {
  const pipe = gulp.src(opts.jsSrc)
    // Prevent pipe breaking
    .pipe(plumber())
    // Babel transpiler
    .pipe(babel())
    // Inject banner
    .pipe(header(banner))
    // Write expanded js
    .pipe(gulp.dest(opts.destDir))
    // Minify
    .pipe(uglify())
    // Inject banner
    .pipe(header(banner))
    // Rename to min file
    .pipe(rename({
      suffix: '.min'
    }))
    // Write Minified file
    .pipe(gulp.dest(opts.destDir))
    // Inject into browsers
    .pipe(reload({stream: true}));

  return pipe;
});

gulp.task('html', () => {
  const pipe = gulp.src(opts.htmlSrc)
    // Inject into browsers
    .pipe(reload({stream: true}));

  return pipe;
});

// Listen task
gulp.task('listen', [
  'sass',
  'js',
  'html',
  'browser-sync'
], () => {
  gulp.watch(opts.sassSrc, ['sass']);
  gulp.watch(opts.jsSrc, ['js']);
  gulp.watch(opts.htmlSrc, ['html']);
});

// Watch task
gulp.task('watch', ['listen']);

// Default task
gulp.task('default', ['sass', 'js']);
