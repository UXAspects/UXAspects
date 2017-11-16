const { readFileSync } = require('fs');
const { join } = require('path');
const webpack = require('webpack');
const { NamedModulesPlugin, NoEmitOnErrorsPlugin } = webpack;
const { CommonsChunkPlugin } = webpack.optimize;
const { AngularCompilerPlugin } = require('@ngtools/webpack');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const project_dir = process.cwd();

/*
    Define Compilation Options
*/
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

    devtool: 'none',

    resolve: {
        extensions: ['.ts', '.js']
    },

    resolveLoader: {
        alias: {
            'code-snippet-loader': join(project_dir, 'configs', 'loaders', 'code-snippet-loader.js')
        }
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                use: 'raw-loader',
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
                exclude: /snippets/,
                use: '@ngtools/webpack'
            },
            {
                test: /\.less$/,
                include: [join(project_dir, 'docs', 'app')],
                use: ['raw-loader', 'less-loader']
            },
            {
                test: /\.less$/,
                exclude: [
                    join(project_dir, 'docs', 'app'),
                    join(project_dir, 'src', 'components'),
                    join(project_dir, 'src', 'services')
                ],
                use: ExtractTextPlugin.extract({
                    use: 'css-loader!less-loader'
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
                use: 'script-loader'
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

        new CopyWebpackPlugin([{
                from: join(project_dir, 'docs', 'app', 'assets'),
                to: join(project_dir, 'dist', 'docs', 'assets')
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
            to: join(project_dir, 'dist', 'docs', 'showcase', 'charts', 'dist')
        }, {
            from: join(project_dir, 'dist'),
            to: join(project_dir, 'dist', 'docs', 'showcase', 'list_view', 'dist')
        }], {
            ignore: [
                '/docs'
            ]
        }),

        new CommonsChunkPlugin({
            name: ['main', 'vendor', 'polyfills']
        }),

        new NamedModulesPlugin({}),

        new AngularCompilerPlugin({
            mainPath: join(project_dir, 'docs', 'main.ts'),
            tsConfigPath: join(project_dir, 'tsconfig.json'),
            sourceMap: false,
            skipCodeGeneration: true,
            hostReplacementPaths: {
                'environments\\environment.ts': 'environments\\environment.ts'
            }
        }),

        new ProgressPlugin(),

        new NoEmitOnErrorsPlugin(),
    ],

    stats: {
        colors: true,
        reasons: true
    },    

    devServer: {
        https: {
            pfx: readFileSync(join(project_dir, 'configs', 'webpack.docs.dev.pfx'))
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