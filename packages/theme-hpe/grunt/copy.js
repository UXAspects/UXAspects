const { cwd } = require('process');
const { resolve } = require('path'); 
const { getModulePath } = require('module-search');

module.exports = {
    uxa: {
        cwd: resolve(getModulePath('@ux-aspects/theme'), 'dist'),
        src: ['img/*', 'fonts/*', 'styles/*'],
        dest: 'dist/',
        expand: true
    },
    hpe: {
        cwd: resolve(getModulePath('ux-aspects-hpe')),
        src: ['img/*', 'fonts/*', 'styles/*'],
        dest: 'dist/',
        expand: true
    }
};
