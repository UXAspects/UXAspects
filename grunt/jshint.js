const path = require('path');

module.exports = {
    options: {
        jshintrc: true,
        reporterOutput: 'jshint.log'
    },
    ng1: [
        path.join(process.cwd(), 'src', 'ng1', 'directives', '**', '*.js'),
        path.join(process.cwd(), 'src', 'ng1', 'services', '**', '*.js'),
        path.join(process.cwd(), 'src', 'ng1', 'ux-aspects-ng1.module.js')
    ]
}