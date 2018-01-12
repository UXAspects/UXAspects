const fs = require('fs');
const webpack = require('webpack');
const gracefulFs = require('graceful-fs');
const { join, resolve } = require('path');
const { NoEmitOnErrorsPlugin } = webpack;
const { CommonsChunkPlugin, UglifyJsPlugin } = webpack.optimize;
const { AngularCompilerPlugin } = require('@ngtools/webpack');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { getPackageMain, getModulePath } = require('module-search');

// Node has a limit to the number of files that can be open - prevent the error
gracefulFs.gracefulify(fs);

const project_dir = process.cwd();

module.exports = {

    entry: {
        main: resolve(project_dir, './docs/main.ts'),
        vendor: resolve(project_dir, './docs/vendor.ts'),
        polyfills: resolve(project_dir, './docs/polyfills.ts')
    },

    output: {
        path: resolve(project_dir, './dist'),
        filename: '[name].js',
        chunkFilename: 'modules/[id].chunk.js'
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    resolveLoader: {
        alias: {
            'code-snippet-loader': resolve(project_dir, './configs/loaders/code-snippet-loader.js')
        }
    },

    module: {
        rules: [{
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
                test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                exclude: /snippets/,
                use: [{
                        loader: '@angular-devkit/build-optimizer/webpack-loader',
                        options: {
                            sourceMap: false
                        }
                    },
                    '@ngtools/webpack'
                ]
            },
            {
                test: /\.less$/,
                include: [join(project_dir, 'docs', 'app'), join(project_dir, 'src', 'components')],
                use: ['to-string-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.less$/,
                exclude: [join(project_dir, 'docs', 'app'), join(project_dir, 'src', 'components')],
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
            minify: {
                caseSensitive: true,
                collapseWhitespace: true,
                keepClosingSlash: true
            },
            cache: true,
            showErrors: true,
            chunks: 'all',
            excludeChunks: [],
            xhtml: true
        }),

        new ExtractTextPlugin('styles.css'),

        new OptimizeCssAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true
                }
            },
            canPrint: true
        }),

        // Copy Assets for CodePen & Plunker
        new CopyWebpackPlugin([{
            from: resolve(project_dir, './docs/app/assets'),
            to: resolve(project_dir, './dist/assets')
        }, {
            from: getPackageMain('@ux-aspects/ux-aspects-ng1'),
            to: resolve(project_dir, './dist/assets/ng1/ux-aspects-ng1.js')
        }, {
            from: getPackageMain('@ux-aspects/ux-aspects'),
            to: resolve(project_dir, './dist/assets/lib/index.js')
        }, {
            from: resolve(getModulePath('@ux-aspects/theme'), 'dist'),
            to: resolve(project_dir, './dist/assets')
        }]),

        // Copy Assets for Showcases
        new CopyWebpackPlugin([{
            from: resolve(project_dir, './docs/app/showcase/list_view'),
            to: join(project_dir, './dist/showcase/list_view')
        },
        {
            from: resolve(project_dir, './docs/app/showcase/charts'),
            to: join(project_dir, './dist/showcase/charts')
        }]),

        new CommonsChunkPlugin({
            name: ['main', 'vendor', 'polyfills']
        }),

        new ProgressPlugin(),

        new NoEmitOnErrorsPlugin(),

        new UglifyJsPlugin({
            extractComments: false,
            sourceMap: false,
            cache: false,
            parallel: true,
            uglifyOptions: {
                output: {
                    ascii_only: true,
                    comments: true
                },
                ecma: 5,
                warnings: false,
                ie8: false,
                compress: true
            }
        }),

        new AngularCompilerPlugin({
            entryModule: './docs/app/app.module#AppModule',
            tsConfigPath: resolve(project_dir, 'tsconfig.json'),
            sourceMap: false
        }),
        
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(require('../package.json').version),
            PRODUCTION: true
        }),
    ]
};