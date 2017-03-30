const path = require('path');

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
    },
    less: {
        cwd: path.join(process.cwd(), 'src', 'styles'),
        src: '**',
        dest: path.join(process.cwd(), 'dist', 'less'),
        expand: true
    },
    ng1: {
        cwd: path.join(process.cwd(), 'dist', 'styles'),
        src: '**',
        dest: path.join(process.cwd(), 'dist', 'docs', 'assets', 'css'),
        expand: true
    },
    styles: {
        cwd: path.join(process.cwd(), 'dist', 'ng1'),
        src: '**',
        dest: path.join(process.cwd(), 'dist', 'docs', 'assets', 'ng1'),
        expand: true
    }
};