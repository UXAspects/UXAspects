const { cwd } = require('process');
const { resolve } = require('path');
const configLoader = require('load-grunt-config');

module.exports = function(grunt) {

    configLoader(grunt, {
        configPath: resolve(cwd(), 'grunt'),
        jitGrunt: true
    });

    grunt.registerTask('build', ['clean', 'copy:uxa', 'copy:hpe', 'less:hpe']);
    grunt.registerTask('bower', ['build', 'compress:bower']);

    grunt.registerTask('default', ['build']);
};
