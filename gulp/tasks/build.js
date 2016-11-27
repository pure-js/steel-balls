const gulp = require('gulp'),
  config = require('../config'),
  paths = config.paths,
  names = config.names,
  plugins = require('gulp-load-plugins')(),
  del = require('del'),
  critical = require('critical');

module.exports = gulp.series(cssBuild, htmlBuild, aboveTheFold, cssMin, es5Min, es6Min, concat, cleanBuild, htmlMin, imgMin, copyFontsToBuild);

function cssBuild() {
  return gulp.src(paths.stylus)
    .pipe(plugins.stylus({
      'include css': true
    }))
    .pipe(plugins.rename('main.min.css'))
    .pipe(gulp.dest(paths.build));
}

function htmlBuild() {
  return gulp.src(paths.pugBuild)
    .pipe(plugins.pug())
    .pipe(plugins.rename('index.html'))
    .pipe(gulp.dest(paths.build));
}

function aboveTheFold() {
  return critical.generate({
    inline: true,
    base: 'build/',
    src: 'index.html',
    dest: 'build/index.html',
    minify: true,
    dimensions: config.viewports
  });
}

function cssMin() {
  return gulp.src(paths.stylus)
    .pipe(plugins.stylus({
      'compress': true,
      'include css': true
    }))
    .pipe(plugins.uncss({
      html: ['build/index.html']
    }))
    .pipe(plugins.cssnano())
    .pipe(plugins.rename('main.min.css'))
    .pipe(gulp.dest(paths.build));
}

function es5Min() {
  return gulp.src(paths.jsES5)
    .pipe(gulp.dest(paths.build))
}

function es6Min() {
  return gulp.src(paths.jsES6)
    .pipe(plugins.babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(paths.build));
}

function concat() {
  return gulp.src(['build/cssrelpreload.js', 'build/loadCSS.js', 'build/load.js', 'build/entry.js', 'build/main.js', 'build/toggle.js'])
    .pipe(plugins.concat('main.min.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest(paths.build));
}

function cleanBuild() {
  return del(['build/cssrelpreload.js', 'build/loadCSS.js', 'build/entry.js', 'build/main.js', 'build/toggle.js', 'build/load.js']);
}

function htmlMin() {
  return gulp.src('build/index.html')
    .pipe(plugins.htmlmin({
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeComments: true,
      removeOptionalTags: true
    }))
    .pipe(gulp.dest(paths.build));
}

function imgMin() {
  return gulp.src(paths.img)
    .pipe(plugins.imagemin())
    .pipe(gulp.dest(paths.build + 'img'));
}

function copyFontsToBuild() {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest(paths.build + 'fonts'));
}