const package = require('../package.json');

module.exports = {
    library: {
        options: {
            position: 'top',
            banner: `/* \n* ${ package.name } - v${ package.version } \n* © Copyright ${ new Date().getFullYear() } EntIT Software LLC, a Micro Focus company\n*/`,
            linebreak: true
        },
        files: {
            src: [
                './dist/ux-aspects-ng1.js',
                './dist/ux-aspects-ng1.min.js',
            ]
        }
    }
};