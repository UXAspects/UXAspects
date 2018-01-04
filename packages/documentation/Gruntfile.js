var path = require('path');
var process = require('process');
var configLoader = require('load-grunt-config');

module.exports = function (grunt) {

    // measures the time each task takes
    require('time-grunt')(grunt);

    // Initialize Grunt with Configuration
    configLoader(grunt, {
        configPath: path.join(process.cwd(), 'grunt'),
        jitGrunt: {
            staticMappings: {
                'webpack-dev-server': 'grunt-webpack'
            }
        }
    });
    
    // Register Tasks
    grunt.registerTask('lint', ['tslint:documentation', 'stylelint:components']);
    grunt.registerTask('webpack-cert', ['run:webpack-cert']);

    grunt.registerTask('dev', ['webpack-dev-server:documentation']);
    grunt.registerTask('build', ['clean:documentation', 'webpack:documentation']);
    grunt.registerTask('releasebuild', ['build', 'compress:gh-pages']);
    grunt.registerTask('publish', ['build', 'gh-pages']);

    // default task will run dev environment
    grunt.registerTask('default', ['dev']);
    
};
