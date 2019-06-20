var path = require('path');
var process = require('process');

module.exports = {
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
