const { join } = require('path');
const { AngularCompilerPlugin } = require('@ngtools/webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ScriptsWebpackPlugin } = require('@angular-devkit/build-angular/src/angular-cli-files/plugins/scripts-webpack-plugin');
const { IndexHtmlWebpackPlugin } = require('@angular-devkit/build-angular/src/angular-cli-files/plugins/index-html-webpack-plugin');
const { cwd } = require('process');
const rxAlias = require('rxjs/_esm5/path-mapping');

module.exports = {

    mode: 'development',

    entry: {
        main: join(cwd(), 'e2e', 'pages', 'main.ts'),
        polyfills: join(cwd(), 'e2e', 'pages', 'polyfills.ts'),
        styles: join(cwd(), 'e2e', 'pages', 'styles.css')
    },

    output: {
        path: join(cwd(), 'e2e', 'dist'),
        filename: '[name].js'
    },

    resolve: {
        extensions: ['.js', '.ts'],
        alias: rxAlias()
    },

    module: {
        rules: [{
                test: /\.ts$/,
                use: '@ngtools/webpack'
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
                include: join(cwd(), 'e2e', 'pages', 'app'),
                use: ['raw-loader', 'less-loader']
            },

            {
                test: /\.css$/,
                exclude: join(cwd(), 'e2e', 'pages', 'app'),
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },

            {
                test: /\.css$/,
                include: join(cwd(), 'e2e', 'pages', 'app'),
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
            },
            // Ignore warnings about System.import in Angular
            {
                test: /[\/\\]@angular[\/\\].+\.js$/,
                parser: { system: true }
            }
        ]
    },

    plugins: [

        new AngularCompilerPlugin({
            mainPath: join(cwd(), 'e2e', 'pages', 'main.ts'),
            tsConfigPath: join(cwd(), 'e2e', 'tsconfig.app.json'),
            sourceMap: false,
            skipCodeGeneration: true
        }),

        new ScriptsWebpackPlugin({
            name: 'scripts',
            sourceMap: false,
            filename: `scripts.js`,
            scripts: [
                join('node_modules', 'jquery', 'dist', 'jquery.min.js'),
                join('node_modules', 'jquery-ui', 'ui', 'version.js'),
                join('node_modules', 'jquery-ui', 'ui', 'widget.js'),
                join('node_modules', 'jquery-ui', 'ui', 'data.js'),
                join('node_modules', 'jquery-ui', 'ui', 'ie.js'),
                join('node_modules', 'jquery-ui', 'ui', 'scroll-parent.js'),
                join('node_modules', 'jquery-ui', 'ui', 'position.js'),
                join('node_modules', 'jquery-ui', 'ui', 'unique-id.js'),
                join('node_modules', 'jquery-ui', 'ui', 'widgets', 'mouse.js'),
                join('node_modules', 'jquery-ui', 'ui', 'widgets', 'sortable.js'),
                join('node_modules', 'bootstrap', 'dist', 'js', 'bootstrap.min.js'),
                join('node_modules', 'angular', 'angular.min.js'),
            ],
            basePath: cwd(),
        }),

        new IndexHtmlWebpackPlugin({
            input: './e2e/pages/index.html',
            output: 'index.html',
            entrypoints: [
                'scripts',
                'polyfills',
                'styles',
                'main'
            ],
            sri: false
        }),

        new MiniCssExtractPlugin({
            filename: 'styles.css'
        }),
    ],

    optimization: {
        noEmitOnErrors: true,
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                default: {
                    chunks: 'async',
                    minChunks: 2,
                    priority: 10
                },
                common: {
                    name: 'common',
                    chunks: 'async',
                    minChunks: 2,
                    enforce: true,
                    priority: 5
                },
                vendors: false,
                vendor: {
                    name: 'vendor',
                    chunks: 'initial',
                    enforce: true
                }
            }
        }
    },

    devServer: {
        port: 4000,
        historyApiFallback: true,
        stats: {
            colors: true,
            reasons: true
        }
    }

};