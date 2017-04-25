const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry: './app/app.ts',

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js'
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    module: {

        rules: [{
                test: /\.ts$/,
                use: 'awesome-typescript-loader'
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader!less-loader'
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico|otf)$/,
                use: 'file-loader?name=assets/[name].[ext]'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        cacheDirectory: true,
                        presets: [
                            ["es2015", {
                                "modules": false
                            }]
                        ]
                    }
                }
            },
            {
                test: /(plugins|external)/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'script-loader'
                }]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
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