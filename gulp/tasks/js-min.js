module.exports = (gulp, plugins, paths) => () =>
  gulp.src(paths.js)
    // .pipe(plugins.concat('main.min.js'))
    // .pipe(plugins.babel({
    //   presets: ['es2015']
    // }))
    // .pipe(plugins.uglify())
    .pipe(gulp.dest(paths.build))
