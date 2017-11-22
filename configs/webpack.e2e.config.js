const { join } = require('path');
const webpack = require('webpack');
const { NoEmitOnErrorsPlugin } = webpack;
const { CommonsChunkPlugin, UglifyJsPlugin } = webpack.optimize;
const { AngularCompilerPlugin } = require('@ngtools/webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const project_dir = process.cwd();

module.exports = {

    entry: {
        main: join(project_dir, 'e2e', 'pages', 'main.ts'),
        vendor: join(project_dir, 'e2e', 'pages', 'vendor.ts'),
        polyfills: join(project_dir, 'e2e', 'pages', 'polyfills.ts')
    },

    output: {
        path: join(project_dir, 'e2e', 'dist'),
        filename: '[name].js'
    },

    resolve: {
        extensions: ['.js', '.ts']
    },

    module: {
        rules: [{
                test: /\.ts$/,
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
                test: /\.html$/,
                use: 'raw-loader'
            },

            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico|otf)$/,
                use: 'file-loader?name=assets/[name].[ext]'
            },

            {
                test: /\.less$/,
                include: join(project_dir, 'e2e', 'pages', 'app'),
                use: ['raw-loader', 'less-loader']
            },

            {
                test: /\.css$/,
                exclude: join(project_dir, 'e2e', 'pages', 'app'),
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                })
            },

            {
                test: /\.css$/,
                include: join(project_dir, 'e2e', 'pages', 'app'),
                use: 'raw-loader'
            },
            
            {
              test: /\.js$|\.ts$/,
              use: {
                loader: 'istanbul-instrumenter-loader',
                options: { esModules: true }
              },
              enforce: 'post',
              exclude: [
                /node_modules/,
                /ng1/,
                /e2e\\pages/,
                /\.e2e-spec\.ts$/,
                /\.po\.spec\.ts$/
              ]
            }
        ]
    },

    plugins: [

        new CommonsChunkPlugin({
            name: ['main', 'vendor', 'polyfills']
        }),

        new AngularCompilerPlugin({
            mainPath: join(project_dir, 'e2e', 'pages', 'main.ts'),
            tsConfigPath: join(project_dir, 'e2e', 'tsconfig-app.json'),
            sourceMap: false,
            skipCodeGeneration: true
        }),

        new NoEmitOnErrorsPlugin(),

        new HtmlWebpackPlugin({
            template: './e2e/pages/index.ejs'
        }),

        new ExtractTextPlugin('styles.css'),

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
    ],

    devServer: {
        historyApiFallback: true,
        stats: {
            colors: true,
            reasons: true
        },
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }

};