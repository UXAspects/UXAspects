module.exports = {
    options: {
        atBegin: true,
    },
    library: {
        files: ['./src/**/*.ts', './src/**/*.less', './src/**/*.html'],
        tasks: ['run:build_library']
    }
};
