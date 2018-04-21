const { join } = require('path');
const { IgnorePlugin } = require('webpack');
const project_dir = process.cwd();

module.exports = {

    entry: {
        'ux-aspects-ng1': join(project_dir, 'src', 'ng1', 'ux-aspects-ng1.module.js'),
    },

    output: {
        path: join(project_dir, 'dist', 'ng1'),
        filename: '[name].js',
        libraryTarget: 'umd'
    },

    resolveLoader: {
        alias: {
            'uglifyjs-loader': join(project_dir, 'configs', 'loaders', 'uglifyjs-loader.js')
        }
    },

    devtool: 'none',

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