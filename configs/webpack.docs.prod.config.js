const fs = require('fs');
const webpack = require('webpack');
const gracefulFs = require('graceful-fs');
const { join } = require('path');
const { NoEmitOnErrorsPlugin } = webpack;
const { CommonsChunkPlugin, UglifyJsPlugin } = webpack.optimize;
const { AngularCompilerPlugin } = require('@ngtools/webpack');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// Node has a limit to the number of files that can be open - prevent the error
gracefulFs.gracefulify(fs);

const project_dir = process.cwd();

module.exports = {

    entry: {
        main: join(project_dir, 'docs', 'main.ts'),
        vendor: join(project_dir, 'docs', 'vendor.ts'),
        polyfills: join(project_dir, 'docs', 'polyfills.ts')
    },

    output: {
        path: join(project_dir, 'dist', 'docs'),
        filename: '[name].js',
        chunkFilename: 'modules/[id].chunk.js'
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    resolveLoader: {
        alias: {
            'code-snippet-loader': join(project_dir, 'configs', 'loaders', 'code-snippet-loader.js')
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

            /*
                Angular 1 Rules
            */
            {
                test: /\.js$/,
                exclude: [
                    /node_modules/,
                    /snippets/,
                    join(project_dir, 'src', 'ng1', 'plugins'),
                    join(project_dir, 'src', 'ng1', 'external')
                ],
                use: {
                    loader: 'babel-loader',
                    query: {
                        cacheDirectory: true,
                        presets: [
                            ['env', {
                                modules: false
                            }]
                        ]
                    }
                }
            },
            {
                test: /\.js$/,
                include: [
                    join(project_dir, 'src', 'ng1', 'plugins'),
                    join(project_dir, 'src', 'ng1', 'external')
                ],
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

        new CopyWebpackPlugin([{
                from: join(project_dir, 'docs', 'app', 'assets'),
                to: join(project_dir, 'dist', 'docs', 'assets')
            },
            {
                from: join(project_dir, 'src', 'fonts'),
                to: join(project_dir, 'dist', 'docs', 'assets', 'fonts')
            },
            {
                from: join(project_dir, 'dist', 'bundles', 'ux-aspects.umd.js'),
                to: join(project_dir, 'dist', 'docs', 'assets', 'lib', 'index.js')
            },
            {
                from: join(project_dir, 'dist', 'ng1'),
                to: join(project_dir, 'dist', 'docs', 'assets', 'ng1')
            },
            {
                from: join(project_dir, 'dist', 'styles'),
                to: join(project_dir, 'dist', 'docs', 'assets', 'css')
            },
            {
                from: join(project_dir, 'docs', 'app', 'showcase', 'list_view', 'dist'),
                to: join(project_dir, 'dist', 'docs', 'showcase', 'list_view', 'dist')
            },
            {
                from: join(project_dir, 'docs', 'app', 'showcase', 'list_view', 'bower_components'),
                to: join(project_dir, 'dist', 'docs', 'showcase', 'list_view', 'bower_components')
            },
            {
                from: join(project_dir, 'src', 'fonts'),
                to: join(project_dir, 'dist', 'docs', 'showcase', 'list_view', 'dist', 'fonts')
            },
            {
                from: join(project_dir, 'docs', 'app', 'showcase', 'charts', 'dist'),
                to: join(project_dir, 'dist', 'docs', 'showcase', 'charts', 'dist')
            },
            {
                from: join(project_dir, 'docs', 'app', 'showcase', 'charts', 'bower_components'),
                to: join(project_dir, 'dist', 'docs', 'showcase', 'charts', 'bower_components')
            },
            {
                from: join(project_dir, 'src', 'fonts'),
                to: join(project_dir, 'dist', 'docs', 'showcase', 'charts', 'dist', 'fonts')
            }
        ]),

        new CopyWebpackPlugin([{
                from: join(project_dir, 'dist'),
                to: join(project_dir, 'dist', 'docs', 'showcase', 'list_view', 'dist')
            },
            {
                from: join(project_dir, 'dist'),
                to: join(project_dir, 'dist', 'docs', 'showcase', 'charts', 'dist')
            }
        ], {
            ignore: [
                '/docs'
            ]
        }),

        new CommonsChunkPlugin({
            name: ['main', 'vendor', 'polyfills']
        }),

        new ProgressPlugin(),

        new NoEmitOnErrorsPlugin(),

        new UglifyJsPlugin({
            test: /(main|polyfills|vendor).js$/i,
            extractComments: false,
            sourceMap: false,
            cache: false,
            parallel: true,
            uglifyOptions: {
                output: {
                    ascii_only: true,
                    comments: false
                },
                ecma: 5,
                warnings: false,
                ie8: false,
                compress: true
            }
        }),

        new AngularCompilerPlugin({
            entryModule: './docs/app/app.module#AppModule',
            tsConfigPath: join(project_dir, 'tsconfig.json'),
            sourceMap: false,
            hostReplacementPaths: {
                'environments\\environment.ts': 'environments\\environment.prod.ts'
            }
        }),
    ]
};