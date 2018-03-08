var path = require('path');
var process = require('process');

module.exports = {
    'documentation': {
        options: {
            archive: path.join(process.cwd(), 'target', 'gh-pages', 'ux-aspects-docs-KEPPEL-<%= package.version %>.tgz'),
            mode: 'tgz'
        },
        files: [
            {
                cwd: path.join(process.cwd(), 'dist', 'keppel'),
                src: ['**'],
                dest: '/',
                expand: true
            }
        ]
    },
    'documentation-hpe': {
        options: {
            archive: path.join(process.cwd(), 'target', 'gh-pages', 'ux-aspects-docs-HPE-<%= package.version %>.tgz'),
            mode: 'tgz'
        },
        files: [
            {
                cwd: path.join(process.cwd(), 'dist', 'hpe'),
                src: ['**'],
                dest: '/',
                expand: true
            }
        ]
    }
};
