const gulp = require('gulp'),
  plugins = require('gulp-load-plugins')(),
  webpack = require('webpack-stream'),
  ghPages = require('gulp-gh-pages'),
  browserSync = require('browser-sync').create();

const paths = {
  img: 'assets/*.{jpg,png}',
  pug: 'src/index.pug',
  stylus: 'src/main.styl',
  stylusWatch: 'src/**/*.styl',
  js: 'src/main.js',
  fonts: 'bower_components/font-awesome/fonts/*.*',
  build: 'build/'
};

function getTask(task) {
  return require('./gulp-tasks/' + task)(gulp, plugins, paths);
}

// Get one .less file and render
gulp.task('css', getTask('css'));
gulp.task('html', getTask('html'));
gulp.task('js', getTask('js'));

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.stylusWatch, ['css']);
  gulp.watch(paths.pug, ['html']);
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.img, ['copy']);
});

gulp.task('copy', ['copy-fonts'], () =>
  gulp.src(paths.img)
    .pipe(gulp.dest(paths.build + 'img'))
);

gulp.task('copy-fonts', () =>
  gulp.src(paths.fonts)
    .pipe(gulp.dest(paths.build + 'fonts'))
);

// Static server
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: 'build',
      index: 'index.html'
    },
    browser: 'google chrome'
  });
});

gulp.task('webpack', () =>
  gulp.src('src/entry.js')
    .pipe(webpack())
    .pipe(gulp.dest(paths.build + 'js'))
);

gulp.task('deploy', ['build'], () =>
  gulp.src(paths.build + '**/*')
    .pipe(ghPages())
);

// The default task (called when you run `gulp` from cli)
gulp.task('build', ['html', 'css', 'js', 'copy']);
gulp.task('dev', ['build', 'watch', 'serve']);
gulp.task('default', ['dev']);
