module.exports = {
    options: {
        atBegin: true
    },
    assets: {
        files: ['src/fonts', 'src/img'],
        tasks: ['assets']
    },
    iconset: {
        files: ['src/icons'],
        tasks: ['iconset']
    },
    styles: {
        files: ['src/styles'],
        tasks: ['styles']
    },
    library: {
        files: ['src/**', '!src/{fonts,icons,img,ng1,test}/**', '!node_modules/**'],
        tasks: ['lint', 'run:build_library']
    }
};
