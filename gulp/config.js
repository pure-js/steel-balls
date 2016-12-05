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
    jsConcat: ['build/cssrelpreload.js', 'build/loadCSS.js', 'build/load.js', 'build/entry.js', 'build/toggle.js', 'build/anchor-click.js', 'build/fixed-nav.js', 'build/main.js'],
    get js() {
      return this.jsES5.concat(this.jsES6)
    },
    jsWatch: 'src/js/*.js',
    fonts: 'bower_components/font-awesome/fonts/*.*',
    dev: '.tmp/',
    build: 'build/'
  },
  names : {},
  viewports: [{
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
};