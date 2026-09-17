/*
 * Copyright 2015-2026 Micro Focus or one of its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
  grunt.registerTask('assets', [
    'copy:fonts',
    'copy:bootstrap_fonts',
    'copy:images',
    'copy:css',
    'copy:md',
    'copy:bootstrap_license',
  ]);
  grunt.registerTask('assets:library', [
    'copy:fonts',
    'copy:bootstrap_fonts',
    'copy:images',
    'copy:md',
    'copy:bootstrap_license',
  ]);
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
