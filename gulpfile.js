const gulp = require('gulp'),
  config = require('./gulp/config'),
  paths = config.paths,
  build = require('./gulp/tasks/build'),
  dev = require('./gulp/tasks/dev'),
  del = require('del');

const clean = () => del([ paths.build, paths.dev, '.publish' ]);
exports.clean = clean;

gulp.task('build', build);
gulp.task('dev', dev);

// The default task (called when you run `gulp` from cli)
gulp.task('default', dev);
