module.exports = (gulp, plugins, paths) =>
  function () {
    gulp.src(paths.stylus)
      .pipe(plugins.plumber())
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.stylus({
        'compress': true,
        'include css': true
      }))
      .pipe(plugins.uncss({
        html: ['build/index.html'],
        ignore: ['.hidden']
      }))
      .pipe(plugins.cssnano())
      .pipe(plugins.sourcemaps.write(''))
      .pipe(gulp.dest(paths.build));
  }
