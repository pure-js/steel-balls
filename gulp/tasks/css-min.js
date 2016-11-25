module.exports = (gulp, plugins, paths) => () =>
  gulp.src(paths.stylus)
    .pipe(plugins.stylus({
      'compress': true,
      'include css': true
    }))
    .pipe(plugins.uncss({
      html: ['build/index.html']
      // ignore: ['.hidden']
    }))
    .pipe(plugins.cssnano())
    .pipe(plugins.rename('main.min.css'))
    .pipe(gulp.dest(paths.build))
