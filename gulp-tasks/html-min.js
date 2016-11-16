module.exports = (gulp, plugins, paths) => () =>
  gulp.src(paths.pug)
    .pipe(plugins.pug())
    .pipe(plugins.htmlmin({
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    }))
    .pipe(gulp.dest(paths.build))
