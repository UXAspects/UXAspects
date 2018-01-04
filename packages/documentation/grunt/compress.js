var path = require('path');
var process = require('process');

module.exports = {
    'gh-pages': {
        options: {
            archive: path.join(process.cwd(), 'target', 'gh-pages', 'ux-aspects-docs-<%= package.version %>.tgz'),
            mode: 'tgz'
        },
        files: [
            {
                cwd: path.join(process.cwd(), 'dist'),
                src: ['**'],
                dest: '/',
                expand: true
            }
        ]
    }
};
