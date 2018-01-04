const path = require('path');

module.exports = {
    iconset: {
        src: path.join(process.cwd(), 'src', 'icons', '*.svg'),
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
    }
};