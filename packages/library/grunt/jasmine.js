const path = require('path');
const process = require('process');

module.exports = {
    ng1: {
        src: path.join(process.cwd(), 'dist', 'ng1', 'ux-aspects-ng1.js'),
        options: {
            specs: path.join(process.cwd(), 'src', 'ng1', '**', '*.spec.js'),
            polyfills: [
                path.join(process.cwd(), 'node_modules', 'core-js', 'client', 'core.js'),
            ],
            vendor: [
                path.join(process.cwd(), 'node_modules', 'jquery', 'dist', 'jquery.js'),
                path.join(process.cwd(), 'node_modules', 'jquery-ui', 'ui', 'unique-id.js'),
                path.join(process.cwd(), 'node_modules', 'bootstrap', 'dist', 'js', 'bootstrap.js'),
                path.join(process.cwd(), 'node_modules', 'moment', 'moment.js'),
                path.join(process.cwd(), 'node_modules', 'angular', 'angular.js'),
                path.join(process.cwd(), 'node_modules', 'angular-mocks', 'angular-mocks.js'),
            ],
            keepRunner: true,
            display: 'none',
            summary: true
        }
    }
};