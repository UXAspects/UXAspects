const { join } = require('path');
const { cwd } = require('process');
const { IgnorePlugin } = require('webpack');

module.exports = {

    mode: 'production',

    entry: {
        'ux-aspects-ng1': join(cwd(), 'src', 'ng1', 'ux-aspects-ng1.module.js'),
    },

    output: {
        path: join(cwd(), 'dist', 'ng1'),
        filename: '[name].js',
        libraryTarget: 'umd'
    },

    resolveLoader: {
        alias: {
            'uglifyjs-loader': join(cwd(), 'configs', 'loaders', 'uglifyjs-loader.js')
        }
    },

    devtool: 'none',

    module: {

        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|plugins|external)/,
            use: {
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                    presets: [
                        ['env', {
                            'modules': false
                        }]
                    ]
                }
            }
        }, {
            test: /\.html$/,
            use: 'ng-cache-loader?prefix=[dir]/[dir]',
            include: /(directives|templates)/
        }, {
            test: /(plugins|external)/,
            exclude: /(node_modules|bower_components)/,
            use: ['script-loader', 'uglifyjs-loader']
        }]
    },

    plugins: [
        new IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]

};