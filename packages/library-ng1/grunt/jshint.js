module.exports = {
    options: {
        jshintrc: true,
        reporterOutput: 'jshint.log'
    },
    library: [
        './src/directives/**/*.js',
        './src/services/**/*.js',
        './src/ux-aspects-ng1.module.js'
    ]
};