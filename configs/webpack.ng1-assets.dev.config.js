var path = require('path');
var webpack = require('webpack');

var ng1AssetsConfig = {

    entry: {
        'ux-aspects-ng1': path.join(process.cwd(), 'src', 'ng1', 'ux-aspects-ng1.module.js'),
    },

    output: {
        path: path.join(process.cwd(), 'dist', 'docs', 'assets', 'ng1'),
        filename: '[name].js',
        libraryTarget: 'umd'
    },

    devtool: "none",

    module: {

        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|plugins|external)/,
            enforce: 'pre',
            use: {
                loader: 'jshint-loader',
                options: {
                    emitErrors: false,
                    failOnHint: true
                }
            }
        }, {
            test: /\.js$/,
            exclude: /(node_modules|plugins|external)/,
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
        }, {
            test: /\.html$/,
            use: "ng-cache-loader?prefix=[dir]/[dir]",
            include: /(directives|templates)/
        }, {
            test: /(plugins|external)/,
            exclude: /(node_modules|bower_components)/,
            use: [{
                loader: 'script-loader'
            }, {
                loader: 'uglify-loader',
                options: {
                    compress: {
                        warnings: false,
                    },
                    comments: false
                }
            }]
        }, {
            test: path.join(process.cwd(), 'node_modules', 'webpack-dev-server', 'client'),
            loader: 'null-loader'
        }]
    },

    plugins: [
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]

};

module.exports = ng1AssetsConfig;