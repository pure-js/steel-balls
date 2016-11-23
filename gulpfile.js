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
  stylus: 'src/stylesheets/main.styl',
  stylusWatch: 'src/**/*.styl',
  jsES5: ['node_modules/fg-loadcss/src/cssrelpreload.js', 'node_modules/fg-loadcss/src/loadCSS.js'],
  jsES6: ['src/*.js'],
  get js() {
    return this.jsES5.concat(this.jsES6)
  },
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

function htmlBuild() {
  return gulp.src(paths.pug)
    .pipe(plugins.pug())
    .pipe(gulp.dest(paths.build));
}

function cssBuild() {
  return gulp.src(paths.stylus)
    .pipe(plugins.stylus({
      'include css': true
    }))
    .pipe(gulp.dest(paths.build))
}

function aboveTheFold() {
  return critical.generate({
    inline: true,
    base: 'build/',
    src: 'index.html',
    dest: 'build/index.html',
    minify: true,
    dimensions: [{
      // Nexus 5X
      width: 412,
      // Lumia 1520
      height: 768
    }, {
      // Nexus 5X - landscape
      width: 732,
      height: 412
    }, {
      // iPad
      width: 768,
      height: 1024
    }, {
      // Nexus 10
      width: 800,
      height: 1280
    }, {
      // Nexus 10 - landscape
      width: 1280,
      height: 800
    }, {
      // PC
      width: 1920,
      height: 1200
    }]
  });
}

function es5Min() {
  return gulp.src(paths.jsES5)
    // .pipe(plugins.uglify())
    .pipe(gulp.dest(paths.build))
}

function es6Min() {
  return gulp.src(paths.jsES6)
    .pipe(plugins.babel({
      presets: ['es2015']
    }))
    // .pipe(plugins.uglify())
    .pipe(gulp.dest(paths.build))
}

function concat() {
  return gulp.src('build/*.js')
    .pipe(plugins.concat('main.min.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest(paths.build))
}

// Dev
exports.watch = watch;
exports.clean = clean;
exports.copy = copy;
exports.copyFonts = copyFonts;

// Build
exports.copyToBuild = copyToBuild;
exports.copyFontsToBuild = copyFontsToBuild;
exports.aboveTheFold = aboveTheFold;
exports.htmlBuild = htmlBuild;
exports.es5Min = es5Min;
exports.es6Min = es6Min;

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

const build = gulp.series(cssBuild, htmlBuild, aboveTheFold, 'css-min', es5Min, es6Min, concat, 'html-min', copyToBuild, copyFontsToBuild);

gulp.task('deploy', () =>
  gulp.src(paths.build + '**/*')
    .pipe(plugins.ghPages())
);

const dev = gulp.parallel('html', 'css', 'js', copy, copyFonts, 'serve', watch);

gulp.task('build', build);
gulp.task('dev', dev);

// The default task (called when you run `gulp` from cli)
gulp.task('default', dev);