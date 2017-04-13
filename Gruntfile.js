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
                'usebanner': 'grunt-banner'
            }
        }
    });

    // Register Tasks
    grunt.registerTask('cleanup', ['clean:library', 'clean:documentation', 'clean:ng1', 'clean:styles', 'clean:fonts', 'clean:images', 'clean:less', 'clean:licenses']);
    grunt.registerTask('lint', ['tslint:library', 'tslint:documentation', 'jshint:ng1']);
    grunt.registerTask('library', ['clean:library', 'webpack:library', 'webpack:ng1']);
    grunt.registerTask('styles', ['clean:styles', 'less:styles']);
    grunt.registerTask('scripts', ['execute:iconset']);
    grunt.registerTask('assets', ['copy:fonts', 'copy:images', 'copy:less', 'copy:ng1', 'copy:styles']);
    grunt.registerTask('iconset', ['webfont:iconset']);
    grunt.registerTask('minify', ['uglify:ng1', 'cssmin:styles']);
    grunt.registerTask('licenses', ['execute:licenses', 'usebanner:ng1']);
    grunt.registerTask('test', ['build', 'jasmine:ng1']);
    grunt.registerTask('server', ['documentation:build', 'connect:documentation']);
    grunt.registerTask('selenium', ['documentation:build', 'connect:selenium']);

    grunt.registerTask('documentation:serve', ['iconset', 'styles', 'library', 'webpack-dev-server:documentation']);
    grunt.registerTask('documentation:build', ['tslint:documentation', 'clean:documentation', 'webpack:documentation']);

    // Tasks with larger chains of events
    grunt.registerTask('build', ['cleanup', 'lint', 'scripts', 'iconset', 'styles', 'library', 'documentation:build', 'minify', 'assets', 'licenses']);

    // default task will run dev environment
    grunt.registerTask('default', ['documentation:serve']);
    
};