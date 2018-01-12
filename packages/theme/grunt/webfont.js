module.exports = {
    icons: {
        src: './src/icons/*.svg',
        dest: './src/fonts',
        destCss: './src/styles',
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