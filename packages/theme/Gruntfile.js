const { join } = require('path');
const { getModulePath } = require('module-search');
const NpmImportPlugin = require("less-plugin-npm-import");

module.exports = function (grunt) {

    grunt.initConfig({

        clean: {
            theme: ['./dist']
        },

        webfont: {
            icons: {
                src: './src/icons/*.svg',
                dest: './src/fonts',
                destCss: './src/styles',
                options: {
                    font: 'hpe-icons',
                    engine: 'node',
                    hashes: false,
                    stylesheet: 'less',
                    htmlDemo: false,
                    templateOptions: {
                        baseClass: 'hpe-icon',
                        classPrefix: 'hpe-',
                        mixinPrefix: 'hpe-icon-'
                    }
                }
            }
        },

        less: {
            theme: {
                options: {
                    plugins: [
                        new NpmImportPlugin({prefix: '~'})
                    ]
                },
                files: {
                    './dist/css/ux-aspects.css': './src/styles/ux-aspects.less'
                }
            }
        },

        cssmin: {
            theme: {
                files: {
                    './dist/css/ux-aspects.min.css': ['./dist/css/ux-aspects.css']
                }
            }
        },

        copy: {

            fonts: {
                files: [{
                    expand: true,
                    cwd: './src',
                    src: ['./fonts/**'],
                    dest: './dist/'
                }]
            },

            images: {
                files: [{
                    expand: true,
                    cwd: './src',
                    src: ['./img/**'],
                    dest: './dist/'
                }]
            },

            styles: {
                files: [{
                    expand: true,
                    cwd: './src',
                    src: ['./styles/**'],
                    dest: './dist/'
                }]
            }
        },

        watch: {
            scripts: {
                files: ['./src/styles/**/*.less'],
                tasks: ['styles', 'copy:styles'],
                options: {
                    spawn: false,
                },
            },
        },

    });

    grunt.loadTasks(getGruntTasks('grunt-contrib-clean'));
    grunt.loadTasks(getGruntTasks('grunt-webfont'));
    grunt.loadTasks(getGruntTasks('grunt-contrib-less'));
    grunt.loadTasks(getGruntTasks('grunt-contrib-cssmin'));
    grunt.loadTasks(getGruntTasks('grunt-contrib-copy'));
    grunt.loadTasks(getGruntTasks('grunt-contrib-watch'));

    grunt.registerTask('styles', ['less', 'cssmin']);
    grunt.registerTask('default', ['clean', 'webfont', 'styles', 'copy']);

};

// support lerna's hoisting
function getGruntTasks(taskId) {
    return join(getModulePath(taskId), 'tasks');
}