var path = require('path');
var process = require('process');

module.exports = {
    bower: {
        options: {
            archive: path.join(process.cwd(), 'target', 'bower', 'ux-aspects-<%= package.version %>.tgz'),
            mode: 'tgz'
        },
        files: [
            {
                cwd: path.join(process.cwd(), 'dist'),
                src: ['**', '!docs/**'],
                dest: '/',
                expand: true
            },
            {
                src: ['bower.json'],
                dest: '/'
            }
        ]
    },
    documentation: {
        options: {
            archive: path.join(process.cwd(), 'target', 'docs', 'ux-aspects-docs-<%= package.version %>.tar.gz'),
            mode: 'tgz'
        },
        files: [
            {
                cwd: path.join(process.cwd(), 'dist', 'docs'),
                src: ['**'],
                dest: '/',
                expand: true
            }
        ]
    }
};
