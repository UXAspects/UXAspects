const { readFileSync } = require('fs');
const { cwd } = require('process');
const { resolve } = require('path');
const webpack = require('webpack');
const { NamedModulesPlugin, NoEmitOnErrorsPlugin } = webpack;
const { CommonsChunkPlugin } = webpack.optimize;
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { getPackageMain, getModulePath } = require('module-search');
const Jarvis = require('webpack-jarvis');

/*
    Define Compilation Options
*/
module.exports = {

    entry: {
        main: resolve(cwd(), './docs/main.ts'),
        vendor: resolve(cwd(), './docs/vendor.ts'),
        polyfills: resolve(cwd(), './docs/polyfills.ts')
    },

    output: {
        path: resolve(cwd(), 'dist'),
        filename: '[name].js',
        chunkFilename: 'modules/[id].chunk.js'
    },

    devtool: 'none',

    resolve: {
        extensions: ['.ts', '.js']
    },

    resolveLoader: {
        alias: {
            'code-snippet-loader': resolve(cwd(), './configs/loaders/code-snippet-loader.js')
        }
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                use: 'html-loader',
                exclude: /(directives|templates|snippets)/
            },
            {
                test: /\.css$/,
                exclude: /snippets/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                })
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            },
            {
                test: /\.md$/,
                use: ['html-loader', 'markdown-code-highlight-loader']
            },
            {
                test: /\.ts$/,
                exclude: /(snippets|wrapper)/,
                use: ['awesome-typescript-loader', 'angular-router-loader', 'angular2-template-loader']
            },
            {
                test: /\.ts$/,
                include: /wrapper/,
                use: ['awesome-typescript-loader']
            },
            {
                test: /\.less$/,
                include: [resolve(cwd(), './docs/app')],
                use: ['to-string-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.less$/,
                exclude: [
                    resolve(cwd(), './docs/app'),
                    resolve(cwd(), './src/components'),
                    resolve(cwd(), './src/services')
                ],
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'less-loader']
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico|otf|mp4|mp3)$/,
                use: 'file-loader?name=assets/[name].[ext]'
            },

            /*
                Support Code Snippets
            */
            {
                test: /\.(html|js|css|ts)$/,
                use: 'code-snippet-loader',
                include: /(snippets)/
            },

            {
                test: /\.txt$/,
                use: 'raw-loader',
                include: /(templates)/
            },
            {
                test: /\.html$/,
                use: 'ng-cache-loader?prefix=[dir]/[dir]',
                include: /(directives|templates)/
            }
        ]
    },

    plugins: [

        new HtmlWebpackPlugin({
            template: './docs/index.ejs',
            favicon: './docs/favicon.ico',
            hash: false,
            inject: true,
            compile: true,
            minify: false,
            cache: true,
            showErrors: true,
            chunks: 'all',
            excludeChunks: [],
            xhtml: true
        }),

        new ExtractTextPlugin('styles.css'),

        // Copy Assets for CodePen & Plunker
        new CopyWebpackPlugin([{
            from: resolve(cwd(), './docs/app/assets'),
            to: resolve(cwd(), './dist/assets')
        }, {
            from: getPackageMain('@ux-aspects/ux-aspects-ng1'),
            to: resolve(cwd(), './dist/assets/ng1/ux-aspects-ng1.js')
        }, {
            from: getPackageMain('@ux-aspects/ux-aspects'),
            to: resolve(cwd(), './dist/assets/lib/index.js')
        }, {
            from: resolve(getModulePath('@ux-aspects/theme'), 'dist'),
            to: resolve(cwd(), './dist/assets')
        }, {
            from: resolve(getModulePath('@ux-aspects/theme'), 'dist/fonts/**'),
            to: resolve(cwd(), './dist/assets'),
            flatten: true
        }], {
            copyUnmodified: true
        }),

        // Copy Assets for Showcases
        new CopyWebpackPlugin([{
            from: resolve(cwd(), './docs/app/showcase/list_view'),
            to: resolve(cwd(), './dist/showcase/list_view')
        },
        {
            from: resolve(cwd(), './docs/app/showcase/charts'),
            to: resolve(cwd(), './dist/showcase/charts')
        }], {
            copyUnmodified: true
        }),

        new CommonsChunkPlugin({
            name: ['main', 'vendor', 'polyfills']
        }),

        new NamedModulesPlugin({}),

        new webpack.ContextReplacementPlugin(
            /(.+)?angular(\\|\/)core(.+)?/,
            resolve(cwd(), 'docs')
        ),

        new ProgressPlugin(),

        new NoEmitOnErrorsPlugin(),

        new webpack.DefinePlugin({
            VERSION: JSON.stringify(require('../package.json').version),
            PRODUCTION: false
        }),

        new Jarvis({
            port: 1337
        })
    ],

    stats: {
        colors: true,
        reasons: true
    },    

    devServer: {
        https: {
            pfx: readFileSync(resolve(cwd(), './configs/webpack.dev.pfx'))
        },
        historyApiFallback: true,
        stats: {
            colors: true,
            reasons: true
        },
        overlay: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
};