const gulp = require('gulp'),
  config = require('./gulp/config'),
  paths = config.paths,
  names = config.names,
  plugins = require('gulp-load-plugins')(),
  del = require('del'),
  // critical = require('critical'),
  browserSync = require('browser-sync').create();


function task(name) {
  return require('./gulp/tasks/' + name)(gulp, plugins, paths);
}

const clean = () => del([ paths.build, paths.dev, '.publish' ]);

//
//---------- Dev tasks ------------//
//

function copyFonts() {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest(paths.dev + 'fonts'));
}

function copy() {
  return gulp.src(paths.img)
    .pipe(gulp.dest(paths.dev + 'img'))
}

const cssWatch = gulp.series(task('css'), reload());
const htmlWatch = gulp.series(task('html'), reload());
const jsWatch = gulp.series(task('js'), reload());

function reload() {
  return function(done) {
    browserSync.reload();
    done();
  }
}

function watch() {
  gulp.watch(paths.stylusWatch, cssWatch);
  gulp.watch(paths.pugWatch, htmlWatch);
  gulp.watch(paths.jsWatch, jsWatch);
  gulp.watch(paths.img, copy);
}

// Static server
function serve() {
  browserSync.init({
    server: {
      baseDir: paths.dev,
      index: 'index.html'
    },
    browser: ['chrome', 'google chrome']
  });
}

const spriteConfig = {
  mode : {
    css : {
      render : {
        css : true
      }
    }
  }
};

gulp.task('svg-sprite', () =>
  gulp.src('assets/icons/*.svg')
    .pipe(plugins.svgSprite(spriteConfig))
    .pipe(gulp.dest(paths.dev + 'img'))
);

exports.watch = watch;
exports.clean = clean;
exports.copy = copy;
exports.copyFonts = copyFonts;
exports.serve = serve;

gulp.task('deploy', () =>
  gulp.src(paths.build + '**/*')
    .pipe(plugins.ghPages())
);

const css = task('css');

const dev = gulp.parallel(task('html'), css, task('js'), copy, copyFonts, serve, watch);

gulp.task('build', task('build'));
gulp.task('dev', dev);

// The default task (called when you run `gulp` from cli)
gulp.task('default', dev);