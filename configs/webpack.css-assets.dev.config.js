var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

var cssAssetsConfig = {

    entry: path.join(process.cwd(), 'src', 'styles', 'index.js'),

    output: {
        path: path.join(process.cwd(), 'dist', 'docs', 'assets', 'css'),
        filename: 'index.js'
    },

    module: {
        rules: [{
            test: /\.css$/,
            include: [path.join(process.cwd(), 'src')],
            use: ExtractTextPlugin.extract({
                use: 'css-loader'
            })
        }, {
            test: /\.less$/,
            include: [path.join(process.cwd(), 'src')],
            use: ExtractTextPlugin.extract({
                use: 'css-loader!less-loader'
            })
        }, {
            test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico|otf)$/,
            use: 'file-loader?name=[name].[ext]'
        }]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'ux-aspects.css',
            allChunks: true
        })
    ]

};

module.exports = cssAssetsConfig;
