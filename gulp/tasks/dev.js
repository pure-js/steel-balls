const gulp = require('gulp'),
  config = require('../config'),
  paths = config.paths,
  names = config.names,
  plugins = require('gulp-load-plugins')(),
  browserSync = require('browser-sync').create();

module.exports = gulp.parallel(html, css, js, copy, copyFonts, serve, watch);

function html() {
  return gulp.src(paths.pugDev)
    .pipe(plugins.plumber())
    .pipe(plugins.pug({
      pretty: true
    }))
    .pipe(plugins.rename('index.html'))
    .pipe(gulp.dest(paths.dev));
}

function css() {
  return gulp.src(paths.stylus)
    .pipe(plugins.plumber())
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.stylus({
      'compress': false,
      'include css': true
    }))
    .pipe(plugins.sourcemaps.write(''))
    .pipe(gulp.dest(paths.dev));
}

function js() {
  return gulp.src(paths.jsES6)
    .pipe(plugins.plumber())
    .pipe(gulp.dest(paths.dev));
}

function copy() {
  return gulp.src(paths.img)
    .pipe(gulp.dest(paths.dev + 'img'))
}

function copyFonts() {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest(paths.dev + 'fonts'));
}

// Static server
function serve() {
  browserSync.init({
    server: {
      baseDir: paths.dev,
      index: 'index.html'
    },
    browser: ['chrome', 'google chrome']
  });
}

function reload() {
  return function browserReload(done) {
    browserSync.reload();
    done();
  }
}

function watch() {
  gulp.watch(paths.stylusWatch, gulp.series(css, reload()));
  gulp.watch(paths.pugWatch, gulp.series(html, reload()));
  gulp.watch(paths.jsWatch, gulp.series(js, reload()));
  gulp.watch(paths.img, copy);
}

const spriteConfig = {
  mode : {
    css : {
      render : {
        css : true
      }
    }
  }
};

function svgSprite() {
  return gulp.src('assets/icons/*.svg')
    .pipe(plugins.svgSprite(spriteConfig))
    .pipe(gulp.dest(paths.dev + 'img'));
}
