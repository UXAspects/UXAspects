var path = require('path');
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

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
                include: [path.join(process.cwd(), 'docs', 'app'), path.join(process.cwd(), 'src', 'components')],
                use: ['raw-loader', 'less-loader']
            },
            {
                test: /\.less$/,
                exclude: [path.join(process.cwd(), 'docs', 'app'), path.join(process.cwd(), 'src', 'components')],
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
                use: 'raw-loader',
                include: /(snippets)/
            },
            {
                test: /\.js$/,
                use: 'raw-loader',
                include: /(snippets)/
            },
            {
                test: /\.css$/,
                use: 'raw-loader',
                include: /(snippets)/
            },
            {
                test: /\.ts$/,
                use: 'raw-loader',
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
            template: './docs/index.html'
        }),

        new ExtractTextPlugin("styles.css"),

        new CopyWebpackPlugin([{
            from: path.join(process.cwd(), 'docs', 'app', 'assets'),
            to: path.join(process.cwd(), 'dist', 'docs', 'assets')
        }]),

        new CopyWebpackPlugin([{
            from: path.join(process.cwd(), 'src', 'fonts'),
            to: path.join(process.cwd(), 'dist', 'docs', 'assets', 'fonts')
        }]),

        new CopyWebpackPlugin([{
            from: path.join(process.cwd(), 'dist', 'lib'),
            to: path.join(process.cwd(), 'dist', 'docs', 'assets', 'lib')
        }]),

        new CopyWebpackPlugin([{
            from: path.join(process.cwd(), 'dist', 'ng1'),
            to: path.join(process.cwd(), 'dist', 'docs', 'assets', 'ng1')
        }]),

        new CopyWebpackPlugin([{
            from: path.join(process.cwd(), 'dist', 'styles'),
            to: path.join(process.cwd(), 'dist', 'docs', 'assets', 'css')
        }]),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            comments: false
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new webpack.DefinePlugin({
            'process.env': {
                'ENV': '"production"'
            }
        })
    ]
};