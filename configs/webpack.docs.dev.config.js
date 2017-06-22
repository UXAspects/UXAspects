var path = require('path');
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

/*
    Define Compilation Options
*/
var docsConfig = {

    entry: {
        app: path.join(process.cwd(), 'docs', 'main.ts'),
        vendor: path.join(process.cwd(), 'docs', 'vendor.ts'),
        polyfills: path.join(process.cwd(), 'docs', 'polyfills.ts')
    },

    output: {
        path: path.join(process.cwd(), 'dist', 'docs'),
        filename: '[name].js',
        chunkFilename: 'modules/[id].chunk.js'
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    resolveLoader: {
        alias: {
            "code-snippet-loader": path.join(process.cwd(), 'configs', 'loaders', 'code-snippet-loader.js')
        }
    },

    devtool: 'none',

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
                test: /\.ts$/,
                exclude: /snippets/,
                use: ['awesome-typescript-loader', 'angular-router-loader', 'angular2-template-loader']
            },
            {
                test: /\.less$/,
                include: [path.join(process.cwd(), 'docs', 'app')],
                use: ['raw-loader', 'less-loader']
            },
            {
                test: /\.less$/,
                exclude: [path.join(process.cwd(), 'docs', 'app'), path.join(process.cwd(), 'src', 'components'), path.join(process.cwd(), 'src', 'services')],
                use: ExtractTextPlugin.extract({
                    use: 'css-loader!less-loader'
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico|otf)$/,
                use: 'file-loader?name=assets/[name].[ext]'
            },

            /*
                Support Code Snippets
            */
            {
                test: /\.html$/,
                use: 'code-snippet-loader',
                include: /(snippets)/
            },
            {
                test: /\.js$/,
                use: 'code-snippet-loader',
                include: /(snippets)/
            },
            {
                test: /\.css$/,
                use: 'code-snippet-loader',
                include: /(snippets)/
            },
            {
                test: /\.ts$/,
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
                    path.join(process.cwd(), 'src', 'ng1', 'plugins'),
                    path.join(process.cwd(), 'src', 'ng1', 'external')
                ],
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
                test: /\.js$/,
                include: [
                    path.join(process.cwd(), 'src', 'ng1', 'plugins'),
                    path.join(process.cwd(), 'src', 'ng1', 'external')
                ],
                use: 'script-loader'
            },
            {
                test: /\.html$/,
                use: "ng-cache-loader?prefix=[dir]/[dir]",
                include: /(directives|templates)/
            }
        ]
    },

    plugins: [

        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            path.resolve(process.cwd(), 'docs')
        ),

        new HtmlWebpackPlugin({
            template: './docs/index.ejs',
            favicon: './docs/favicon.ico'
        }),

        new ExtractTextPlugin("styles.css"),

        new CopyWebpackPlugin([{
            from: path.join(process.cwd(), 'docs', 'app', 'assets'),
            to: path.join(process.cwd(), 'dist', 'docs', 'assets')
        }]),

        new CopyWebpackPlugin([{
                from: path.join(process.cwd(), 'docs', 'app', 'showcase', 'list_view', 'dist'),
                to: path.join(process.cwd(), 'dist', 'docs', 'showcase', 'list_view', 'dist')
            },
            {
                from: path.join(process.cwd(), 'docs', 'app', 'showcase', 'list_view', 'bower_components'),
                to: path.join(process.cwd(), 'dist', 'docs', 'showcase', 'list_view', 'bower_components')
            },
            {
                from: path.join(process.cwd(), 'src', 'fonts'),
                to: path.join(process.cwd(), 'dist', 'docs', 'showcase', 'list_view', 'dist', 'fonts')
            }
        ]),

        new CopyWebpackPlugin([{
            from: path.join(process.cwd(), 'dist'),
            to: path.join(process.cwd(), 'dist', 'docs', 'showcase', 'list_view', 'dist')
        }], {
            ignore: [
                '/docs'
            ]
        }),

        new CopyWebpackPlugin([{
                from: path.join(process.cwd(), 'docs', 'app', 'showcase', 'charts', 'dist'),
                to: path.join(process.cwd(), 'dist', 'docs', 'showcase', 'charts', 'dist')
            },
            {
                from: path.join(process.cwd(), 'docs', 'app', 'showcase', 'charts', 'bower_components'),
                to: path.join(process.cwd(), 'dist', 'docs', 'showcase', 'charts', 'bower_components')
            },
            {
                from: path.join(process.cwd(), 'src', 'fonts'),
                to: path.join(process.cwd(), 'dist', 'docs', 'showcase', 'charts', 'dist', 'fonts')
            }
        ]),

        new CopyWebpackPlugin([{
            from: path.join(process.cwd(), 'dist'),
            to: path.join(process.cwd(), 'dist', 'docs', 'showcase', 'charts', 'dist')
        }], {
            ignore: [
                '/docs'
            ]
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new webpack.DefinePlugin({
            'process.env': {
                'ENV': '"development"'
            }
        }),

        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],

    stats: {
        colors: true,
        reasons: true
    },

    devServer: {
        https: true,
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

module.exports = docsConfig;