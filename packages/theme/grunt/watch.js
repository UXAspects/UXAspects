module.exports = {
    styles: {
        files: ['./src/styles/**/*.less'],
        tasks: ['styles', 'copy:styles'],
        options: {
            spawn: false,
        },
    },
};