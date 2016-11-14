module.exports = (gulp, plugins, paths) =>
  function () {
    gulp.src(paths.pug)
      .pipe(plugins.plumber())
      .pipe(plugins.pug())
      .pipe(plugins.htmlmin({
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      }))
      .pipe(gulp.dest(paths.build))
  }
