const { join } = require('path');
const { cwd } = require('process');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

    mode: 'production',

    entry: {
        'ux-aspects': join(cwd(), 'docs', 'styles', 'ux-aspects.js'),
        'hpe-icons': join(cwd(), 'docs', 'styles', 'hpe-icons.js')
    },

    output: {
        path: join(cwd(), 'dist', 'docs', 'assets', 'css'),
        filename: '[name].js'
    },

    module: {
        rules: [{
            test: /\.css$/,
            include: [join(cwd(), 'src')],
            use: [MiniCssExtractPlugin.loader, 'css-loader']
        }, {
            test: /\.less$/,
            include: [join(cwd(), 'src')],
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
        }, {
            test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico|otf)$/,
            use: 'file-loader?name=[name].[ext]'
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ]

};
