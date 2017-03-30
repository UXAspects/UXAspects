const path = require('path');

module.exports = {
    styles: {
        files: [{
            expand: true,
            cwd: path.join(process.cwd(), 'dist', 'styles'),
            src: ['*.css', '!*.min.css'],
            dest: path.join(process.cwd(), 'dist', 'styles'),
            ext: '.min.css'
        }]
    }
};