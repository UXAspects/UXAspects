var path = require('path');
var configLoader = require('load-grunt-config');

module.exports = function (grunt) {

    // measures the time each task takes
    require('time-grunt')(grunt);

    // Initiailize Grunt with Configuration
    configLoader(grunt, {
        configPath: path.join(process.cwd(), 'grunt'),
        jitGrunt: {
            staticMappings: {
                'webpack-dev-server': 'grunt-webpack',
                'usebanner': 'grunt-banner',
                'protractor': 'grunt-protractor-runner',
                'makeReport': 'grunt-istanbul'
            }
        }
    });

    // Register Tasks
    grunt.registerTask('cleanup', ['clean']);
    grunt.registerTask('lint', ['tslint:library', 'tslint:documentation', 'jshint:ng1', 'stylelint', 'tslint:e2e']);
    grunt.registerTask('library', ['clean:library', 'run:build_library', 'webpack:ng1']);
    grunt.registerTask('styles', ['clean:styles', 'execute:less']);
    grunt.registerTask('scripts', ['execute:iconset']);
    grunt.registerTask('assets', ['copy:fonts', 'copy:images', 'copy:ng1', 'copy:styles', 'copy:md']);
    grunt.registerTask('assets:library', ['copy:fonts', 'copy:images', 'copy:md']);
    grunt.registerTask('iconset', ['webfont:iconset']);
    grunt.registerTask('minify', ['uglify:ng1', 'cssmin:styles']);
    grunt.registerTask('licenses', ['execute:licenses', 'usebanner:ng1']);
    grunt.registerTask('test', ['build', 'jasmine:ng1']);
    grunt.registerTask('server', ['documentation:build', 'connect:documentation']);
    grunt.registerTask('webpack_import_cert', ['run:webpack_import_cert']);
    grunt.registerTask('package:library', ['run:npm_pack', 'copy:npm_tgz', 'clean:npm_tgz']);
    grunt.registerTask('package:library_bower', ['compress:bower']);
    grunt.registerTask('package:docs', ['run:npm_pack_docs', 'copy:npm_docs_tgz', 'clean:npm_docs_tgz']);

    grunt.registerTask('documentation:serve', ['library', 'iconset', 'styles', 'webpack-dev-server:documentation']);
    grunt.registerTask('documentation:build', ['tslint:documentation', 'clean:documentation', 'run:build_documentation_production']);

    grunt.registerTask('e2e', ['tslint:e2e', 'clean:e2e', 'webpack:e2e', 'ts:e2e', 'run:e2e', 'makeReport']);

    // Tasks with larger chains of events
    grunt.registerTask('build', ['cleanup', 'lint', 'library', 'scripts', 'iconset', 'styles', 'documentation:build', 'minify', 'assets', 'licenses', 'execute:shim', 'package:library', 'package:library_bower', 'package:docs']);
    grunt.registerTask('build:library', ['cleanup', 'lint', 'library', 'scripts', 'iconset', 'styles', 'minify', 'assets:library', 'licenses', 'execute:shim', 'package:library', 'package:library_bower']);
    grunt.registerTask('releasebuild', ['build']);

    // default task will run dev environment
    grunt.registerTask('default', ['documentation:serve']);

};