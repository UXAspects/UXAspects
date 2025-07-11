const path = require('path');
const configLoader = require('load-grunt-config');

module.exports = function (grunt) {
  require('time-grunt')(grunt);

  configLoader(grunt, {
    configPath: path.join(process.cwd(), 'grunt'),
    jitGrunt: {
      staticMappings: {
        usebanner: 'grunt-banner',
      },
    },
  });

  // Register Tasks
  grunt.registerTask('library', ['clean:library', 'execute:build-library']);
  grunt.registerTask('styles', ['execute:less', 'usebanner:styles']);
  grunt.registerTask('assets', ['copy:fonts', 'copy:images', 'copy:css', 'copy:md']);
  grunt.registerTask('assets:library', ['copy:fonts', 'copy:images', 'copy:md']);
  grunt.registerTask('iconset', ['execute:iconset', 'webfont']);
  grunt.registerTask('minify', ['cssmin:styles']);

  grunt.registerTask('package:ux-aspects', ['run:package-library']);

  grunt.registerTask('package:ux-aspects-docs', ['run:package-docs-library']);

  // build:documentation: build and package the documentation site.
  grunt.registerTask('build:documentation', [
    'clean:documentation',
    'execute:build-documentation',
    'compress:documentation',
  ]);

  // build:library: build and package the npm lib and the npm docs lib.
  grunt.registerTask('build:library', [
    'clean',
    'library',
    'styles',
    'minify',
    'assets:library',
    'package:ux-aspects',
    'package:ux-aspects-docs',
  ]);

  // build: build and package for all targets.
  grunt.registerTask('build', ['build:library', 'build:documentation']);

  // default: build and package for all targets.
  grunt.registerTask('default', ['build']);

  // a quick build for local development
  grunt.registerTask('build:local-registry', [
    'clean',
    'clean:documentation',
    'execute:build-documentation',
    'compress:documentation',
    'library',
    'styles',
    'minify',
    'assets:library',
  ]);
};
