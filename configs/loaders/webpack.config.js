var path = require('path');

module.exports = {
    entry: './test.js',
    output: {
        filename: 'app.js'   
    },

    resolveLoader: {
        alias: {
            "code-snippet-loader": path.join(__dirname, 'code-snippet-loader.js')
        }
    },
};