module.exports = {
  paths: {
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
  },
  names : {}
};