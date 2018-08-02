const { join } = require('path');
const { cwd } = require('process');

module.exports = {
    'fonts': {
        cwd: join(cwd(), 'src', 'fonts'),
        src: '**',
        dest: join(cwd(), 'dist', 'fonts'),
        expand: true
    },
    'images': {
        cwd: join(cwd(), 'src', 'img'),
        src: '**',
        dest: join(cwd(), 'dist', 'img'),
        expand: true
    },
    'ng1': {
        cwd: join(cwd(), 'dist', 'styles'),
        src: '**',
        dest: join(cwd(), 'dist', 'docs', 'assets', 'css'),
        expand: true
    },
    'styles': {
        cwd: join(cwd(), 'dist', 'ng1'),
        src: '**',
        dest: join(cwd(), 'dist', 'docs', 'assets', 'ng1'),
        expand: true
    },
    'npm_tgz': {
        cwd: join(cwd(), 'dist'),
        src: 'ux-aspects-ux-aspects-*.*.*.tgz',
        dest: join(cwd(), 'target', 'npm'),
        expand: true
    },
    'npm_docs_tgz': {
        cwd: cwd(),
        src: 'ux-aspects-ux-aspects-docs-*.*.*.tgz',
        dest: join(cwd(), 'target', 'npm'),
        expand: true
    },
    'md': {
        cwd: cwd(),
        src: ['README.md', 'LICENSE.md'],
        dest: join(cwd(), 'dist/')
    }
};