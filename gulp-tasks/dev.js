module.exports = (gulp, plugins, paths) => () =>
  gulp.src(paths.stylus)
    .pipe(plugins.plumber())
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.stylus({
      'compress': false,
      'include css': true
    }))
    .pipe(plugins.sourcemaps.write(''))
    .pipe(gulp.dest(paths.dev))
