const path = require('path');
const configLoader = require('load-grunt-config');

module.exports = function(grunt) {
    require('time-grunt')(grunt);

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
    grunt.registerTask('webpack_import_cert', ['run:webpack_import_cert']);
    grunt.registerTask('lint', ['tslint:library', 'tslint:documentation', 'stylelint', 'tslint:e2e']);
    grunt.registerTask('library', ['clean:library', 'execute:ngpackagr']);
    grunt.registerTask('styles', ['clean:styles', 'execute:less']);
    grunt.registerTask('assets', ['copy:fonts', 'copy:images', 'copy:css', 'copy:md']);
    grunt.registerTask('assets:library', ['copy:fonts', 'copy:images', 'copy:md']);
    grunt.registerTask('iconset', ['execute:iconset', 'webfont']);
    grunt.registerTask('minify', ['cssmin:styles']);

    // e2e: run the protractor tests
    grunt.registerTask('e2e', ['tslint:e2e', 'clean:e2e', 'execute:protractor']);

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

    // grunt.registerTask('package:ux-aspects', [
    //     'run:npm_pack_ux-aspects',
    //     'copy:npm_ux-aspects_tgz',
    //     'copy:artifactory_ux-aspects_tgz',
    //     'clean:ux-aspects_tgz'
    // ]);

    // grunt.registerTask('package:ux-aspects_bower', ['compress:bower']);

    // grunt.registerTask('package:ux-aspects-docs', [
    //     'run:npm_pack_ux-aspects-docs',
    //     'copy:npm_ux-aspects-docs_tgz',
    //     'copy:artifactory_ux-aspects-docs_tgz',
    //     'clean:ux-aspects-docs_tgz'
    // ]);

    // grunt.registerTask('package:release:ux-aspects', [
    //     'run:npm_pack_ux-aspects',
    //     'copy:staging_ux-aspects_tgz',
    //     'clean:ux-aspects_tgz'
    // ]);

    // grunt.registerTask('package:release:ux-aspects-docs', [
    //     'run:npm_pack_ux-aspects-docs',
    //     'copy:staging_ux-aspects-docs_tgz',
    //     'clean:ux-aspects-docs_tgz'
    // ]);

    grunt.registerTask('build:documentation', [
        'tslint:documentation',
        'clean:documentation',
        'execute:webpack_documentation'
    ]);

    // compile: build the library and documentation into `dist`.
    grunt.registerTask('compile', [
        'clean',
        'lint',
        'library',
        'iconset',
        'styles',
        'build:documentation',
        'minify',
        'assets'
    ]);

    // package: compress the dist output for all targets into the `target` directory.
    grunt.registerTask('package', ['package:ux-aspects', 'package:ux-aspects-docs', 'compress:documentation']);

    // build: build and package for all targets.
    grunt.registerTask('build', ['compile', 'package']);

    // build:library: build and package the npm lib and the npm docs lib.
    grunt.registerTask('build:library', [
        'clean',
        'lint',
        'library',
        'iconset',
        'styles',
        'minify',
        'assets:library',
        'package:ux-aspects',
        'package:ux-aspects-docs'
    ]);

    // default: build and package for all targets.
    grunt.registerTask('default', ['build']);
};
