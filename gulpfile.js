const gulp = require('gulp'),
  plugins = require('gulp-load-plugins')(),
  webpack = require('webpack-stream'),
  del = require('del'),
  critical = require('critical'),
  browserSync = require('browser-sync').create();

const paths = {
  img: 'assets/**/*.{jpg,png,svg}',
  pug: 'src/index.pug',
  pugWatch: 'src/**/*.pug',
  stylus: 'src/stylesheets/*.styl',
  stylusWatch: 'src/**/*.styl',
  js: ['node_modules/fg-loadcss/src/cssrelpreload.js', 'node_modules/fg-loadcss/src/loadCSS.js', 'src/*.js'],
  jsWatch: 'src/*.js',
  fonts: 'bower_components/font-awesome/fonts/*.*',
  dev: '.tmp/',
  build: 'build/'
};

function getTask(task) {
  return require('./gulp-tasks/' + task)(gulp, plugins, paths);
}

const clean = () => del([ 'build', '.tmp', '.publish' ]);

// Get one .less file and render
gulp.task('html', getTask('html'));
gulp.task('css', getTask('css'));
gulp.task('js', getTask('js'));

gulp.task('css-min', getTask('css-min'));
gulp.task('html-min', getTask('html-min'));
gulp.task('js-min', getTask('js-min'));

function copyFonts() {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest(paths.dev + 'fonts'));
}

function copy() {
  return gulp.src(paths.img)
    .pipe(gulp.dest(paths.dev + 'img'))
}

function copyFontsToBuild() {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest(paths.build + 'fonts'));
}

function copyToBuild() {
  return gulp.src(paths.img)
    .pipe(gulp.dest(paths.build + 'img'));
}

gulp.task('css-watch', gulp.series('css', reload()));
gulp.task('html-watch', gulp.series('html', reload()));
gulp.task('js-watch', gulp.series('js', reload()));

function reload() {
  return function(done) {
    browserSync.reload();
    done();
  }
}

function watch() {
  gulp.watch(paths.stylusWatch, gulp.series('css-watch'));
  gulp.watch(paths.pugWatch, gulp.series('html-watch'));
  gulp.watch(paths.jsWatch, gulp.series('js-watch'));
  gulp.watch(paths.img, gulp.series('copy'));
}

exports.watch = watch;
exports.clean = clean;
exports.copy = copy;
exports.copyFonts = copyFonts;
exports.copyToBuild = copyToBuild;
exports.copyFontsToBuild = copyFontsToBuild;

// Static server
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: paths.dev,
      index: 'index.html'
    },
    browser: ['chrome', 'google chrome']
  });
});

const spriteConfig = {
  mode : {
    css : {
      render : {
        css : true
      }
    }
  }
};

function aboveTheFold() {
  return critical.generate({
    inline: true,
    base: '.tmp/',
    src: 'index.html',
    dest: '.tmp/index-x.html',
    // minify: true,
    dimensions: [{
      height: 500,
      width: 300
    }, {
      height: 900,
      width: 1200
    }]
  });
}

exports.aboveTheFold = aboveTheFold;
gulp.task('critical', aboveTheFold);

gulp.task('svg-sprite', () =>
  gulp.src('assets/icons/*.svg')
    .pipe(plugins.svgSprite(spriteConfig))
    .pipe(gulp.dest(paths.dev + 'img'))
);

gulp.task('webpack', () =>
  gulp.src('src/entry.js')
    .pipe(webpack())
    .pipe(gulp.dest(paths.build + 'js'))
);

const build = gulp.series('js-min', 'css-min', 'html-min', copyToBuild, copyFontsToBuild);

gulp.task('deploy', gulp.series(build, () =>
  gulp.src(paths.build + '**/*')
    .pipe(plugins.ghPages())
));

const dev = gulp.parallel('html', 'css', 'js', copy, copyFonts, 'serve', watch);

gulp.task('build', build);
gulp.task('dev', dev);

// The default task (called when you run `gulp` from cli)
gulp.task('default', dev);