const path = require('path');
const package = require(path.join(process.cwd(), 'package.json'));

module.exports = {

    ng1: {
        options: {
            position: 'top',
            banner: `/* \n* ${ package.name } - v${ package.version } \n* © Copyright ${ new Date().getFullYear() } EntIT Software LLC, a Micro Focus company\n*/`,
            linebreak: true
        },
        files: {
            src: [
                path.join(process.cwd(), 'dist', 'ng1', 'ux-aspects-ng1.js'),
                path.join(process.cwd(), 'dist', 'ng1', 'ux-aspects-ng1.min.js'),
                path.join(process.cwd(), 'dist', 'styles', 'ux-aspects.css'),
                path.join(process.cwd(), 'dist', 'styles', 'ux-aspects.min.css'),
                path.join(process.cwd(), 'dist', 'lib', 'ux-aspects.js'),
                path.join(process.cwd(), 'dist', 'lib', 'ux-aspects.min.js')
            ]
        }
    }
};