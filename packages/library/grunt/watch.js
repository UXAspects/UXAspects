module.exports = {
    options: {
        atBegin: true,
    },
    library: {
        files: ['./src/**/*.ts', './src/**/*.less', './src/**/*.html', '!node_modules/**'],
        tasks: ['develop:library']
    }
};
