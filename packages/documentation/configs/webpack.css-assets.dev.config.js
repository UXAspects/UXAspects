const { join } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const project_dir = process.cwd();

module.exports = {

    entry: join(project_dir, 'src', 'styles', 'index.js'),

    output: {
        path: join(project_dir, 'dist', 'docs', 'assets', 'css'),
        filename: 'index.js'
    },

    module: {
        rules: [{
            test: /\.css$/,
            include: [join(project_dir, 'src')],
            use: ExtractTextPlugin.extract({
                use: 'css-loader'
            })
        }, {
            test: /\.less$/,
            include: [join(project_dir, 'src')],
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
