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
    grunt.registerTask('lint', ['tslint:documentation']);
    grunt.registerTask('webpack-cert', ['run:webpack-cert']);

    grunt.registerTask('develop', ['webpack-dev-server:documentation']);
    grunt.registerTask('build', ['clean:documentation', 'webpack:documentation']);
    grunt.registerTask('releasebuild', ['build', 'compress:gh-pages']);
    grunt.registerTask('publish', ['build', 'gh-pages']);

    grunt.registerTask('default', ['build']);
    
};
