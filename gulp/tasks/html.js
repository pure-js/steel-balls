module.exports = (gulp, plugins, paths) => () =>
  gulp.src(paths.pugDev)
    .pipe(plugins.plumber())
    .pipe(plugins.pug({
      pretty: true
    }))
    .pipe(plugins.rename('index.html'))
    .pipe(gulp.dest(paths.dev))
