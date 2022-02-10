const path = require('path');
const configLoader = require('load-grunt-config');

module.exports = function (grunt) {
    require('time-grunt')(grunt);

    configLoader(grunt, {
        configPath: path.join(process.cwd(), 'grunt'),
        jitGrunt: {
            staticMappings: {
                usebanner: 'grunt-banner',
                protractor: 'grunt-protractor-runner'
            }
        }
    });

    // Register Tasks
    grunt.registerTask('lint', ['execute:lint-library', 'execute:lint-documentation', 'execute:lint-e2e', 'stylelint']);
    grunt.registerTask('library', ['clean:library', 'execute:build-library']);
    grunt.registerTask('styles', ['clean:styles', 'execute:less', 'usebanner:styles']);
    grunt.registerTask('assets', ['copy:fonts', 'copy:images', 'copy:css', 'copy:md']);
    grunt.registerTask('assets:library', ['copy:fonts', 'copy:images', 'copy:md']);
    grunt.registerTask('iconset', ['execute:iconset', 'webfont']);
    grunt.registerTask('minify', ['cssmin:styles']);

    grunt.registerTask('package:ux-aspects', [
        'run:npm_pack_ux-aspects',
        'copy:npm_ux-aspects_tgz',
        'execute:package_artifactory_ux-aspects'
    ]);

    grunt.registerTask('package:ux-aspects-docs', [
        'run:npm_pack_ux-aspects-docs',
        'copy:npm_ux-aspects-docs_tgz',
        'execute:package_artifactory_ux-aspects-docs'
    ]);

    // build:documentation: build and package the documentation site.
    grunt.registerTask('build:documentation', [
        'clean:documentation',
        'execute:build-documentation',
        'compress:documentation'
    ]);

    // build:library: build and package the npm lib and the npm docs lib.
    grunt.registerTask('build:library', [
        'clean',
        'library',
        'styles',
        'minify',
        'assets:library',
        'package:ux-aspects',
        'package:ux-aspects-docs'
    ]);

    // build: build and package for all targets.
    grunt.registerTask('build', ['build:library', 'build:documentation']);

    // default: build and package for all targets.
    grunt.registerTask('default', ['build']);
};
