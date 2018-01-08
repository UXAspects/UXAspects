const { join, resolve } = require('path');
const package = require('./package.json');
const { getModulePath } = require('module-search');

module.exports = function(grunt) {

    grunt.initConfig({

        clean: {
            library: ['./dist']
        },

        jshint: {
            options: {
                jshintrc: true,
                reporterOutput: 'jshint.log'
            },
            library: [
                './src/directives/**/*.js',
                './src/services/**/*.js',
                './src/ux-aspects-ng1.module.js'
            ]
        },

        webpack: {
            library: require('./webpack.config')
        },

        uglify: {
            library: {
                options: {
                    preserveComments: /(?:^!|@(?:license|preserve|cc_on))/,
                    maxLineLen: 0
                },
                src: './dist/ux-aspects-ng1.js',
                dest: './dist/ux-aspects-ng1.min.js'
            }
        },

        usebanner: {
            library: {
                options: {
                    position: 'top',
                    banner: `/* \n* ${ package.name } - v${ package.version } \n* © Copyright ${ new Date().getFullYear() } EntIT Software LLC, a Micro Focus company\n*/`,
                    linebreak: true
                },
                files: {
                    src: [
                        './dist/ux-aspects-ng1.js',
                        './dist/ux-aspects-ng1.min.js',
                    ]
                }
            }
        },

        jasmine: {
            library: {
                src: './dist/ux-aspects-ng1.js',
                options: {
                    specs: './src/**/*.spec.js',
                    polyfills: [
                        resolve(getModulePath('core-js'), 'client/core.js')
                    ],
                    vendor: [
                        resolve(getModulePath('jquery'), 'dist/jquery.js'),
                        resolve(getModulePath('jquery-ui'), 'ui/unique-id.js'),
                        resolve(getModulePath('bootstrap'), 'dist/js/bootstrap.js'),
                        resolve(getModulePath('moment'), 'moment.js'),
                        resolve(getModulePath('angular'), 'angular.js'),
                        resolve(getModulePath('angular-mocks'), 'angular-mocks.js')
                    ],
                    keepRunner: true,
                    display: 'none',
                    summary: true
                }
            }
        }

    });

    grunt.loadTasks(getGruntTasks('grunt-contrib-clean'));
    grunt.loadTasks(getGruntTasks('grunt-contrib-jshint'));
    grunt.loadTasks(getGruntTasks('grunt-contrib-uglify'));
    grunt.loadTasks(getGruntTasks('grunt-contrib-jasmine'));
    grunt.loadTasks(getGruntTasks('grunt-webpack'));
    grunt.loadTasks(getGruntTasks('grunt-usebanner'));

    grunt.registerTask('default', ['clean', 'jshint', 'webpack', 'uglify', 'usebanner']);
    grunt.registerTask('test', ['default', 'jasmine']);

}

function getGruntTasks(taskId) {
    return join(getModulePath(taskId), 'tasks');
}