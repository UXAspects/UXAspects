const path = require('path');

module.exports = {
    styles: {
        options: {
            // generate source maps
            map: {inline: false},
            // rtlcss options
            opts: {
                clean: false
            },
            // rtlcss plugins
            plugins: [],
            // save unmodified files
            saveUnmodified: true
        },
        expand: true,
        cwd: path.join(process.cwd(), 'dist', 'library', 'styles'),
        src: ['*.css', '!*.min.css', '!*-rtl.css'],
        dest: path.join(process.cwd(), 'dist', 'library', 'styles'),
        ext: '-rtl.css'
    }
};
