const path = require('path');

module.exports = {
    hpe: {
        src: path.join(process.cwd(), 'src', 'icons', 'hpe', '*.svg'),
        dest: path.join(process.cwd(), 'src', 'fonts'),
        destCss: path.join(process.cwd(), 'src', 'styles'),
        options: {
            font: 'hpe-icons',
            engine: 'node',
            hashes: false,
            stylesheet: 'less',
            htmlDemo: false,
            templateOptions: {
                baseClass: 'hpe-icon',
                classPrefix: 'hpe-',
                mixinPrefix: 'hpe-icon-'
            }
        }
    },
    ux: {
        src: path.join(process.cwd(), 'src', 'icons', 'ux', '*.svg'),
        dest: path.join(process.cwd(), 'src', 'fonts'),
        destCss: path.join(process.cwd(), 'src', 'styles'),
        options: {
            font: 'ux-icons',
            engine: 'node',
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