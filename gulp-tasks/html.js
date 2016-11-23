module.exports = (gulp, plugins, paths) => () =>
  gulp.src(paths.pug)
    .pipe(plugins.plumber())
    .pipe(plugins.pug({
      pretty: true
    }))
    .pipe(plugins.useref())
    // .pipe(plugins.replace('<script src=\"main..min.js\"></script>', ''))
    // .pipe(plugins.replace('<link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css?family=Lobster|PT+Sans&amp;amp;subset=cyrillic\" as=\"style\" onload=\"this.rel=\'stylesheet\'\"><noscript><link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css?family=Lobster|PT+Sans&amp;subset=cyrillic\"></noscript><link rel=\"stylesheet\" href=\"main.css\" as=\"style\" onload=\"this.rel=\'stylesheet\'\"><noscript><link rel=\"stylesheet\" href=\"main.css\"></noscript>', ''))
    .pipe(gulp.dest(paths.dev))
