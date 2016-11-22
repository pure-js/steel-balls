module.exports = (gulp, plugins, paths) => () =>
  gulp.src(paths.pug)
    .pipe(plugins.plumber())
    .pipe(plugins.pug({
      pretty: true
    }))
    .pipe(plugins.replace('<script src=\"main..min.js\"></script>', ''))
    .pipe(gulp.dest(paths.dev))
