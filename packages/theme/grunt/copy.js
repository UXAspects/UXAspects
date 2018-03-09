module.exports = {

    fonts: {
        files: [{
            expand: true,
            cwd: './src',
            src: ['./fonts/**'],
            dest: './dist/'
        }]
    },

    images: {
        files: [{
            expand: true,
            cwd: './src',
            src: ['./img/**'],
            dest: './dist/'
        }]
    },

    styles: {
        files: [{
            expand: true,
            cwd: './src',
            src: ['./styles/**'],
            dest: './dist/'
        }]
    }
};