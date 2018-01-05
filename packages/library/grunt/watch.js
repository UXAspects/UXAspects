module.exports = {
    options: {
        atBegin: true
    },
    library: {
        files: ['src/**', '!node_modules/**'],
        tasks: ['run:build_library']
    }
};
