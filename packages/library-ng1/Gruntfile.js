const { resolve } = require('path');
const configLoader = require('load-grunt-config');
const { cwd } = require('process');

module.exports = function(grunt) {

    // measures the time each task takes
    require('time-grunt')(grunt);

    // Initiailize Grunt with Configuration
    configLoader(grunt, {
        configPath: resolve(cwd(), 'grunt'),
        jitGrunt: {
            staticMappings: {
                'usebanner': 'grunt-banner'
            }
        }
    });

    grunt.registerTask('develop', ['webpack:develop']);
    grunt.registerTask('build', ['clean', 'jshint', 'webpack:build', 'uglify', 'usebanner']);
    grunt.registerTask('test', ['default', 'jasmine']);
    grunt.registerTask('default', ['build']);

};