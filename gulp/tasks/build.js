const gulp = require('gulp'),
  config = require('../config'),
  paths = config.paths,
  names = config.names,
  plugins = require('gulp-load-plugins')(),
  del = require('del'),
  critical = require('critical');

module.exports = (gulp, plugins, paths) => gulp.series(cssBuild, htmlBuild, aboveTheFold, task('css-min'), es5Min, es6Min, concat, cleanBuild, task('html-min'), task('img-min'), copyFontsToBuild);

function task(name) {
  return require('./' + name)(gulp, plugins, paths);
}

const cleanBuild = () => del(['build/cssrelpreload.js', 'build/loadCSS.js', 'build/entry.js', 'build/main.js', 'build/toggle.js', 'build/load.js']);

function cssBuild() {
  return gulp.src(paths.stylus)
    .pipe(plugins.stylus({
      'include css': true
    }))
    .pipe(plugins.rename('main.min.css'))
    .pipe(gulp.dest(paths.build))
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
    dimensions: [{
      // Nexus 5X
      width: 412,
      // Lumia 1520
      height: 768
    }, {
      // Nexus 5X - landscape
      width: 732,
      height: 412
    }, {
      // iPad
      width: 768,
      height: 1024
    }, {
      // Nexus 10
      width: 800,
      height: 1280
    }, {
      // Nexus 10 - landscape
      width: 1280,
      height: 800
    }, {
      // PC
      width: 1920,
      height: 1200
    }]
  });
}

function es5Min() {
  return gulp.src(paths.jsES5)
  // .pipe(plugins.uglify())
    .pipe(gulp.dest(paths.build))
}

function es6Min() {
  return gulp.src(paths.jsES6)
    .pipe(plugins.babel({
      presets: ['es2015']
    }))
    // .pipe(plugins.uglify())
    .pipe(gulp.dest(paths.build))
}

function concat() {
  return gulp.src(['build/cssrelpreload.js', 'build/loadCSS.js', 'build/load.js', 'build/entry.js', 'build/main.js', 'build/toggle.js'])
    .pipe(plugins.concat('main.min.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest(paths.build))
}

function copyFontsToBuild() {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest(paths.build + 'fonts'));
}

exports.copyFontsToBuild = copyFontsToBuild;
exports.aboveTheFold = aboveTheFold;
exports.htmlBuild = htmlBuild;
exports.es5Min = es5Min;
exports.es6Min = es6Min;
exports.cleanBuild = cleanBuild;

