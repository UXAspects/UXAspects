const { join } = require('path');
const process = require('process');
const configLoader = require('load-grunt-config');

module.exports = function (grunt) {

    // measures the time each task takes
    require('time-grunt')(grunt);

    // Initiailize Grunt with Configuration
    configLoader(grunt, {
        configPath: join(process.cwd(), 'grunt'),
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
    grunt.registerTask('cleanup', ['clean:library', 'clean:styles', 'clean:fonts', 'clean:images', 'clean:less', 'clean:licenses']);
    grunt.registerTask('lint', ['tslint:library', 'stylelint:components', /* 'tslint:e2e' */]);
    grunt.registerTask('library', ['clean:library', 'run:build_library']);
    grunt.registerTask('licenses', ['execute:licenses']);
    grunt.registerTask('e2e', ['clean:e2e', 'webpack:e2e', 'ts:e2e', 'run:e2e', 'makeReport']);

    // Tasks with larger chains of events
    grunt.registerTask('dev', ['cleanup', 'lint', 'watch']);
    grunt.registerTask('build', ['cleanup', 'lint', 'library', 'licenses', 'execute:shim', /* 'test' */]);
    grunt.registerTask('releasebuild', ['build', 'compress:bower']);

    grunt.registerTask('default', ['build']);
    
};
