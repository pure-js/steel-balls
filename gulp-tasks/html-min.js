module.exports = (gulp, plugins, paths) => () =>
  gulp.src('build/index.html')
    // .pipe(plugins.pug())
    // .pipe(plugins.inlineSource({
    //   rootpath: 'build'
    // }))
    .pipe(plugins.replace('<script src=\"cssrelpreload.js\" inline=\"\"></script><script src=\"loadCSS.js\" inline=\"\"></script><script src=\"main.js\"></script>', ''))
    .pipe(plugins.htmlmin({
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeComments: true,
      removeOptionalTags: true,
      minifyURLs: true
    }))
    .pipe(gulp.dest(paths.build))
