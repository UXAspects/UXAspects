const { resolve } = require('path');
const configLoader = require('load-grunt-config');
const { cwd } = require('process');

module.exports = function (grunt) {

    // measures the time each task takes
    require('time-grunt')(grunt);

    // Initiailize Grunt with Configuration
    configLoader(grunt, {
        configPath: resolve(cwd(), 'grunt'),
        jitGrunt: true
    });

    grunt.registerTask('styles', ['less', 'cssmin']);
    grunt.registerTask('develop', ['webfont', 'less', 'copy', 'watch']);
    grunt.registerTask('build', ['clean', 'webfont', 'styles', 'copy']);
    grunt.registerTask('default', ['build']);
};