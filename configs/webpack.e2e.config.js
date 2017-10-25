var path = require('path');
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

    entry: path.join(process.cwd(), 'e2e/pages/main.ts'),

    output: {
        path: path.join(process.cwd(), 'e2e', 'dist'),
        filename: 'app.js'
    },

    resolve: {
        extensions: ['.js', '.ts']
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['awesome-typescript-loader?configFileName=./e2e/tsconfig.json', 'angular2-template-loader']
            },

            {
                test: /\.html$/,
                use: 'html-loader',
                exclude: /(directives|templates|snippets)/
            },

            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico|otf)$/,
                use: 'file-loader?name=assets/[name].[ext]'
            },

            {
                test: /\.less$/,
                include: path.join(process.cwd(), 'e2e', 'pages', 'app'),
                use:  ['raw-loader', 'less-loader']
            },
           
            {
                test: /\.css$/,
                exclude: path.join(process.cwd(), 'e2e', 'pages', 'app'),
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                })
            },
            
            {
                test: /\.css$/,
                include: path.join(process.cwd(), 'e2e', 'pages', 'app'),
                use: 'raw-loader'
            }
        ]
    },

     plugins: [

        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            path.resolve(process.cwd(), './e2e/pages')
        ),

        new HtmlWebpackPlugin({
            template: './e2e/pages/index.ejs'
        }),

        new ExtractTextPlugin("styles.css"),
     ],

     devServer: {
        historyApiFallback: true,
        stats: {
            colors: true,
            reasons: true
        },
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    }

};