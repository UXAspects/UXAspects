const package = require('./package.json');

module.exports = function (grunt) {

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
        }

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-usebanner');

    grunt.registerTask('default', ['clean', 'jshint', 'webpack', 'uglify', 'usebanner']);

};