const gulp = require('gulp'),
  config = require('./gulp/config'),
  paths = config.paths,
  build = require('./gulp/tasks/build'),
  dev = require('./gulp/tasks/dev'),
  plugins = require('gulp-load-plugins')(),
  del = require('del');

const clean = () => del([ paths.build, paths.dev, '.publish' ]);
exports.clean = clean;

gulp.task('deploy', () =>
  gulp.src(paths.build + '**/*')
    .pipe(plugins.ghPages())
);

gulp.task('build', build);
gulp.task('dev', dev);

// The default task (called when you run `gulp` from cli)
gulp.task('default', dev);
