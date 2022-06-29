const { join } = require('path');
const { cwd } = require('process');

module.exports = {
    'fonts': {
        cwd: join(cwd(), 'src', 'fonts'),
        src: '**',
        dest: join(cwd(), 'dist', 'library', 'fonts'),
        expand: true
    },
    'images': {
        cwd: join(cwd(), 'src', 'img'),
        src: '**',
        dest: join(cwd(), 'dist', 'library', 'img'),
        expand: true
    },
    'css': {
        cwd: join(cwd(), 'dist', 'library', 'styles'),
        src: '**',
        dest: join(cwd(), 'dist', 'docs', 'assets', 'css'),
        expand: true
    },
    'npm_ux-aspects_tgz': {
        cwd: join(cwd(), 'dist', 'library'),
        src: 'ux-aspects-ux-aspects-*.*.*.tgz',
        dest: join(cwd(), 'target', 'npm'),
        expand: true,
        rename: path => join(path, 'ux-aspects-ux-aspects.tgz')
    },
    'md': {
        cwd: cwd(),
        src: ['README.md', 'LICENSE.md'],
        dest: join(cwd(), 'dist', 'library/')
    }
};
