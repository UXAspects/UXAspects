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
                src: ['**'],
                dest: '/',
                expand: true
            },
            {
                src: ['bower.json', 'README.md'],
                dest: '/'
            }
        ]
    }
};
