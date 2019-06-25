const path = require('path');
const fs = require('fs');

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
                path.join(process.cwd(), 'dist', 'library', 'styles', 'ux-aspects.css'),
                path.join(process.cwd(), 'dist', 'library', 'styles', 'ux-aspects.min.css')
            ]
        }
    }

};