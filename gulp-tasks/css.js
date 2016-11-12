module.exports = (gulp, plugins, paths) =>
  function () {
    gulp.src(paths.stylus)
      .pipe(plugins.plumber())
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.stylus({
        compress: true
      }))
      .pipe(plugins.sourcemaps.write(''))
      .pipe(gulp.dest(paths.build));
  }
