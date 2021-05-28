const path = require('path');

module.exports = {
    ux: {
        src: path.join(process.cwd(), 'src', 'icons', 'ux', '*.svg'),
        dest: path.join(process.cwd(), 'src', 'fonts'),
        destCss: path.join(process.cwd(), 'src', 'styles'),
        options: {
            font: 'ux-icons',
            engine: 'node',
            types: ['woff', 'ttf'],
            hashes: false,
            stylesheet: 'less',
            htmlDemo: false,
            templateOptions: {
                baseClass: 'ux-icon',
                classPrefix: 'ux-icon-',
                mixinPrefix: 'ux-icon-mixin-'
            }
        }
    }
};
