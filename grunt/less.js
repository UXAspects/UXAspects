const path = require('path');

module.exports = {
    styles: {
        src: path.join(process.cwd(), 'src', 'styles', 'ux-aspects.less'),
        dest: path.join(process.cwd(), 'dist', 'styles', 'ux-aspects.css')
    }
};