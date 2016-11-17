module.exports = (gulp, plugins, paths) => () =>
  gulp.src(paths.js)
    .pipe(plugins.plumber())
    .pipe(plugins.rename('main.min.js'))
    .pipe(gulp.dest(paths.dev))
