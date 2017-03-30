const path = require('path');

module.exports = {

    ng1: {
        options: {
            preserveComments: /(?:^!|@(?:license|preserve|cc_on))/,
            maxLineLen: 0
        },
        src: path.join(process.cwd(), 'dist', 'ng1', 'ux-aspects-ng1.js'),
        dest: path.join(process.cwd(), 'dist', 'ng1', 'ux-aspects-ng1.min.js')
    },

    library: {
        options: {
            preserveComments: /(?:^!|@(?:license|preserve|cc_on))/,
            maxLineLen: 0
        },
        src: path.join(process.cwd(), 'dist', 'lib', 'ux-aspects.js'),
        dest: path.join(process.cwd(), 'dist', 'lib', 'ux-aspects.min.js')
    }

};