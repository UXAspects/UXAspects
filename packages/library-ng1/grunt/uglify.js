module.exports = {
    library: {
        options: {
            preserveComments: /(?:^!|@(?:license|preserve|cc_on))/,
            maxLineLen: 0
        },
        src: './dist/ux-aspects-ng1.js',
        dest: './dist/ux-aspects-ng1.min.js'
    }
};