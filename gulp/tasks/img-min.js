module.exports = (gulp, plugins, paths) => () =>
  gulp.src(paths.img)
    .pipe(plugins.imagemin())
    .pipe(gulp.dest(paths.build + 'img'))
