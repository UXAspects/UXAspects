const path = require('path');
const process = require('process');

module.exports = {
    fonts: {
        cwd: path.join(process.cwd(), 'src', 'fonts'),
        src: '**',
        dest: path.join(process.cwd(), 'dist', 'fonts'),
        expand: true
    },
    images: {
        cwd: path.join(process.cwd(), 'src', 'img'),
        src: '**',
        dest: path.join(process.cwd(), 'dist', 'img'),
        expand: true
    }
};