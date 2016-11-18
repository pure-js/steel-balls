const gulp = require('gulp'),
  plugins = require('gulp-load-plugins')(),
  webpack = require('webpack-stream'),
  browserSync = require('browser-sync').create();

const paths = {
  img: 'assets/**/*.{jpg,png,svg}',
  pug: 'src/index.pug',
  pugWatch: 'src/**/*.pug',
  stylus: 'src/main.styl',
  stylusWatch: 'src/**/*.styl',
  js: 'src/main.js',
  fonts: 'bower_components/font-awesome/fonts/*.*',
  dev: '.tmp/',
  build: 'build/'
};

function getTask(task) {
  return require('./gulp-tasks/' + task)(gulp, plugins, paths);
}

// Get one .less file and render
gulp.task('html', getTask('html'));
gulp.task('css', getTask('css'));
gulp.task('js', getTask('js'));

gulp.task('html-min', getTask('html-min'));
gulp.task('css-min', getTask('css-min'));
gulp.task('js-min', getTask('js-min'));

gulp.task('copy', ['copy-fonts'], () =>
  gulp.src(paths.img)
    .pipe(gulp.dest(paths.dev + 'img'))
);

gulp.task('copy-fonts', () =>
  gulp.src(paths.fonts)
    .pipe(gulp.dest(paths.dev + 'fonts'))
);

gulp.task('copy-to-build', ['copy-fonts-to-build'], () =>
  gulp.src(paths.img)
    .pipe(gulp.dest(paths.build + 'img'))
);

gulp.task('copy-fonts-to-build', () =>
  gulp.src(paths.fonts)
    .pipe(gulp.dest(paths.build + 'fonts'))
);

gulp.task('css-watch', ['css'], reload());
gulp.task('html-watch', ['html'], reload());
gulp.task('js-watch', ['js'], reload());

function reload() {
  return function(done) {
    browserSync.reload();
    done();
  }
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

  gulp.watch(paths.stylusWatch, ['css-watch']);
  gulp.watch(paths.pugWatch, ['html-watch']);
  gulp.watch(paths.js, ['js-watch']);
  gulp.watch(paths.img, ['copy']);
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

gulp.task('deploy', ['build'], () =>
  gulp.src(paths.build + '**/*')
    .pipe(plugins.ghPages())
);

// The default task (called when you run `gulp` from cli)
gulp.task('build', ['html-min', 'css-min', 'js-min', 'copy-to-build']);
gulp.task('dev', ['html', 'css', 'js', 'copy', 'serve']);
gulp.task('default', ['dev']);
