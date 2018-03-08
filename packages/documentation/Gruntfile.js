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
    grunt.registerTask('build', ['clean:documentation', 'webpack:documentation', 'compress:documentation']);
    grunt.registerTask('build:hpe', ['clean:documentation-hpe', 'webpack:documentation-hpe', 'compress:documentation-hpe']);
    grunt.registerTask('publish', ['build', 'gh-pages']);

    grunt.registerTask('default', ['build']);
    
};
