var path = require('path');
var configLoader = require('load-grunt-config');

module.exports = function(grunt) {
    // measures the time each task takes
    require('time-grunt')(grunt);

    // Initiailize Grunt with Configuration
    configLoader(grunt, {
        configPath: path.join(process.cwd(), 'grunt'),
        jitGrunt: {
            staticMappings: {
                usebanner: 'grunt-banner',
                protractor: 'grunt-protractor-runner',
                makeReport: 'grunt-istanbul'
            }
        }
    });

    // Register Tasks
    grunt.registerTask('lint', ['tslint:library', 'tslint:documentation', 'jshint:ng1', 'stylelint', 'tslint:e2e']);
    grunt.registerTask('library', ['clean:library', 'run:angular_components_build', 'run:webpack_ng1']);
    grunt.registerTask('styles', ['clean:styles', 'execute:less']);
    grunt.registerTask('scripts', ['execute:iconset']);
    grunt.registerTask('assets', ['copy:fonts', 'copy:images', 'copy:ng1', 'copy:styles', 'copy:md']);
    grunt.registerTask('assets:library', ['copy:fonts', 'copy:images', 'copy:md']);
    grunt.registerTask('iconset', ['webfont']);
    grunt.registerTask('minify', ['uglify:ng1', 'cssmin:styles']);
    grunt.registerTask('licenses', ['execute:licenses', 'usebanner:ng1']);
    grunt.registerTask('test', ['build:library', 'jasmine:ng1']);
    grunt.registerTask('webpack_import_cert', ['run:webpack_import_cert']);

    grunt.registerTask('package:ux-aspects', [
        'run:npm_pack_ux-aspects',
        'copy:npm_ux-aspects_tgz',
        'copy:artifactory_ux-aspects_tgz',
        'clean:ux-aspects_tgz'
    ]);

    grunt.registerTask('package:ux-aspects_bower', ['compress:bower']);

    grunt.registerTask('package:ux-aspects-docs', [
        'run:npm_pack_ux-aspects-docs',
        'copy:npm_ux-aspects-docs_tgz',
        'copy:artifactory_ux-aspects-docs_tgz',
        'clean:ux-aspects-docs_tgz'
    ]);

    grunt.registerTask('package:release:ux-aspects', [
        'run:npm_pack_ux-aspects',
        'copy:staging_ux-aspects_tgz',
        'clean:ux-aspects_tgz'
    ]);

    grunt.registerTask('package:release:ux-aspects-docs', [
        'run:npm_pack_ux-aspects-docs',
        'copy:staging_ux-aspects-docs_tgz',
        'clean:ux-aspects-docs_tgz'
    ]);

    grunt.registerTask('build:documentation', [
        'tslint:documentation',
        'clean:documentation',
        'run:documentation_build'
    ]);

    // e2e: run the protractor tests
    grunt.registerTask('e2e', ['tslint:e2e', 'clean:e2e', 'execute:protractor']);

    // compile: build the library and documentation into `dist`.
    grunt.registerTask('compile', [
        'clean',
        'lint',
        'library',
        'scripts',
        'iconset',
        'styles',
        'licenses',
        'build:documentation',
        'minify',
        'assets',
        'execute:shim'
    ]);

    // package: compress the dist output for all targets into the `target` directory.
    grunt.registerTask('package', [
        'package:ux-aspects',
        'package:ux-aspects_bower',
        'package:ux-aspects-docs',
        'compress:documentation'
    ]);

    // package:release: update version to the release and
    grunt.registerTask('package:release', [
        'run:npm_setversion_release',
        'package:release:ux-aspects',
        'package:release:ux-aspects-docs'
    ]);

    // build: build and package for all targets.
    grunt.registerTask('build', ['compile', 'package']);

    // build:library: build and package the npm lib, npm docs lib, and bower lib.
    grunt.registerTask('build:library', [
        'clean',
        'lint',
        'library',
        'scripts',
        'iconset',
        'styles',
        'minify',
        'assets:library',
        'licenses',
        'execute:shim',
        'package:ux-aspects',
        'package:ux-aspects_bower',
        'package:ux-aspects-docs'
    ]);

    // default: run dev environment
    grunt.registerTask('default', ['build']);
};
