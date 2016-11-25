module.exports = (gulp, plugins, paths) => () =>
  // TODO: add variable
  gulp.src('build/index.html')
    // .pipe(plugins.pug())
    // .pipe(plugins.inlineSource({
    //   rootpath: 'build'
    // }))
    .pipe(plugins.htmlmin({
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeComments: true,
      removeOptionalTags: true
      // minifyURLs: true
    }))
    .pipe(gulp.dest(paths.build))
