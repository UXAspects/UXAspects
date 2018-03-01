const path = require('path');

module.exports = {
    components: {
        src: path.join(process.cwd(), 'src', 'components', '**', '*.less')
    },
    stylesheets: {
        src: [
            path.join(process.cwd(), 'src', 'styles', '**', '*.less'),
            '!' + path.join(process.cwd(), 'src', 'styles', 'hpe-icons.less'),
        ]
    }
};