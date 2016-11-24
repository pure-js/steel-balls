const gulp = require('gulp'),
  plugins = require('gulp-load-plugins')(),
  del = require('del'),
  critical = require('critical'),
  browserSync = require('browser-sync').create();

const paths = {
  img: 'assets/**/*.{jpg,png,svg}',
  pugDev: 'src/index-dev.pug',
  pugBuild: 'src/index-build.pug',
  pugWatch: 'src/**/*.pug',
  stylus: 'src/stylesheets/main.styl',
  stylusWatch: 'src/**/*.styl',
  jsES5: ['node_modules/fg-loadcss/src/cssrelpreload.js', 'node_modules/fg-loadcss/src/loadCSS.js'],
  jsES6: ['src/js/*.js'],
  get js() {
    return this.jsES5.concat(this.jsES6)
  },
  jsWatch: 'src/js/*.js',
  fonts: 'bower_components/font-awesome/fonts/*.*',
  dev: '.tmp/',
  build: 'build/'
};

function task(name) {
  return require('./gulp-tasks/' + name)(gulp, plugins, paths);
}

const clean = () => del([ 'build', '.tmp', '.publish' ]);

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

function copyFontsToBuild() {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest(paths.build + 'fonts'));
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


//
//--------------- Build tasks --------------//
//

const cleanBuild = () => del(['build/cssrelpreload.js', 'build/loadCSS.js', 'build/entry.js', 'build/main.js', 'build/toggle.js', 'build/load.js']);

function htmlBuild() {
  return gulp.src(paths.pugBuild)
    .pipe(plugins.pug())
    .pipe(plugins.rename('index.html'))
    .pipe(gulp.dest(paths.build));
}

function cssBuild() {
  return gulp.src(paths.stylus)
    .pipe(plugins.stylus({
      'include css': true
    }))
    .pipe(plugins.rename('main.min.css'))
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
  return gulp.src(['build/cssrelpreload.js', 'build/loadCSS.js', 'build/load.js', 'build/entry.js', 'build/main.js', 'build/toggle.js'])
    .pipe(plugins.concat('main.min.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest(paths.build))
}

exports.copyFontsToBuild = copyFontsToBuild;
exports.aboveTheFold = aboveTheFold;
exports.htmlBuild = htmlBuild;
exports.es5Min = es5Min;
exports.es6Min = es6Min;
exports.cleanBuild = cleanBuild;

const build = gulp.series(cssBuild, htmlBuild, aboveTheFold, task('css-min'), es5Min, es6Min, concat, cleanBuild, task('html-min'), task('img-min'), copyFontsToBuild);

gulp.task('build', build);
gulp.task('dev', dev);

// The default task (called when you run `gulp` from cli)
gulp.task('default', dev);