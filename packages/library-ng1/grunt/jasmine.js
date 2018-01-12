const { resolve } = require('path');
const { getModulePath } = require('module-search');

module.exports = {
    library: {
        src: './dist/ux-aspects-ng1.js',
        options: {
            specs: './src/**/*.spec.js',
            polyfills: [
                resolve(getModulePath('core-js'), 'client/core.js')
            ],
            vendor: [
                resolve(getModulePath('jquery'), 'dist/jquery.js'),
                resolve(getModulePath('jquery-ui'), 'ui/unique-id.js'),
                resolve(getModulePath('bootstrap'), 'dist/js/bootstrap.js'),
                resolve(getModulePath('moment'), 'moment.js'),
                resolve(getModulePath('angular'), 'angular.js'),
                resolve(getModulePath('angular-mocks'), 'angular-mocks.js')
            ],
            keepRunner: true,
            display: 'none',
            summary: true
        }
    }
};