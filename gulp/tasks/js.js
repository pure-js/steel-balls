module.exports = (gulp, plugins, paths) => () =>
  gulp.src(paths.jsES6)
    .pipe(plugins.plumber())
    .pipe(gulp.dest(paths.dev))
