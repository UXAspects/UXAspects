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
    grunt.registerTask('lint', ['tslint:library', 'stylelint:components']);
    grunt.registerTask('library', ['clean:library', 'run:build_library', 'execute:patch-dist-package', 'copy:readme']);
    grunt.registerTask('shim', ['clean:shim', 'execute:shim']);
    grunt.registerTask('licenses', ['clean:licenses', 'execute:licenses']);
    grunt.registerTask('e2e', ['clean:e2e', 'webpack:e2e', 'ts:e2e', 'copy:webdriver', 'rename:webdriver', 'run:e2e', 'makeReport']);

    // Tasks with larger chains of events
    grunt.registerTask('develop', ['watch']);
    grunt.registerTask('build', ['clean:dist', 'clean:package', 'lint', 'library', 'licenses', 'shim']);
    grunt.registerTask('pack', ['run:npm-pack-dist', 'copy:dist-package', 'clean:dist-package']);
    grunt.registerTask('releasebuild', ['build', 'compress:bower']);

    grunt.registerTask('default', ['build']);
    
};