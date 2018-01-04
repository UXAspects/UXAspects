var path = require('path');
var process = require('process');
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
    grunt.registerTask('cleanup', ['clean:library', 'clean:ng1', 'clean:styles', 'clean:fonts', 'clean:images', 'clean:less', 'clean:licenses']);
    grunt.registerTask('lint', ['tslint:library', 'jshint:ng1', 'stylelint:components', /* 'tslint:e2e' */]);
    grunt.registerTask('library', ['clean:library', 'run:build_library', 'webpack:ng1']);
    grunt.registerTask('styles', ['clean:styles', 'execute:less']);
    grunt.registerTask('assets', ['clean:fonts', 'clean:images', 'copy:fonts', 'copy:images']);
    grunt.registerTask('iconset', ['webfont:iconset']);
    grunt.registerTask('minify', ['uglify:ng1', 'cssmin:styles']);
    grunt.registerTask('licenses', ['execute:licenses', 'usebanner:ng1']);
    grunt.registerTask('test', ['jasmine:ng1']);
    grunt.registerTask('e2e', ['clean:e2e', 'webpack:e2e', 'ts:e2e', 'run:e2e', 'makeReport']);

    // Tasks with larger chains of events
    grunt.registerTask('dev', ['cleanup', 'lint', 'concurrent:dev']);
    grunt.registerTask('build', ['cleanup', 'lint', 'library', 'iconset', 'styles', 'minify', 'assets', 'licenses', 'execute:shim', /* 'test' */]);
    grunt.registerTask('releasebuild', ['build', 'compress:bower']);

    grunt.registerTask('default', ['dev']);
    
};
