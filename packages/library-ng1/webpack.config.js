const { resolve } = require('path');
const { IgnorePlugin } = require('webpack');

module.exports = {

    stats: 'minimal',

    entry: './src/ux-aspects-ng1.module.js',

    output: {
        path: resolve('./dist'),
        filename: 'ux-aspects-ng1.js',
        libraryTarget: 'umd'
    },

    module: {

        rules: [{
                test: /\.js$/,
                exclude: /(node_modules|plugins|external)/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        cacheDirectory: true,
                        presets: [
                            ['env', { modules: false }]
                        ]
                    }
                }
            },
            {
                test: /\.html$/,
                use: 'ng-cache-loader?prefix=[dir]/[dir]'
            },
            {
                test: /(plugins|external)/,
                exclude: /node_modules/,
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
            }
        ]
    },

    plugins: [
        new IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
};