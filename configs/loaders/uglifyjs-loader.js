const { minify } = require('uglify-js');

module.exports = function (source) {

    if (this.cacheable) {
        this.cacheable();
    }

    const result = minify(source, {
        compress: {
            warnings: false
        },
        sourceMap: false
    });

    return result.code;
};