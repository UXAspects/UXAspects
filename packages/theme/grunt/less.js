const NpmImportPlugin = require("less-plugin-npm-import");

module.exports = {
    theme: {
        options: {
            plugins: [
                new NpmImportPlugin({prefix: '~'})
            ]
        },
        files: {
            './dist/css/ux-aspects.css': './src/styles/ux-aspects.less'
        }
    }
};