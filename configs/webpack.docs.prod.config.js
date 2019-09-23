const { DefinePlugin, HashedModuleIdsPlugin } = require('webpack');
const fs = require('fs');
const gracefulFs = require('graceful-fs');
const { join } = require('path');
const { cwd } = require('process');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const rxAlias = require('rxjs/_esm5/path-mapping');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { AngularCompilerPlugin } = require('@ngtools/webpack');
const { CleanCssWebpackPlugin } = require('@angular-devkit/build-angular/src/angular-cli-files/plugins/cleancss-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { ScriptsWebpackPlugin } = require('@angular-devkit/build-angular/src/angular-cli-files/plugins/scripts-webpack-plugin');
const { IndexHtmlWebpackPlugin } = require('@angular-devkit/build-angular/src/angular-cli-files/plugins/index-html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// Node has a limit to the number of files that can be open - prevent the error
gracefulFs.gracefulify(fs);

module.exports = {

    mode: 'production',
    devtool: false,
    stats: 'minimal',

    resolve: {
        extensions: ['.ts', '.js'],
        alias: rxAlias(),
    },

    resolveLoader: {
        alias: {
            'code-snippet-loader': join(cwd(), 'configs', 'loaders', 'code-snippet-loader.js'),
            'markdown-highlighter-loader': join(cwd(), 'configs', 'loaders', 'markdown-highlighter-loader.js')
        }
    },

    entry: {
        main: './docs/main.ts',
        polyfills: './docs/polyfills.ts',
        styles: './docs/styles.less'
    },


    output: {
        path: join(cwd(), 'dist', 'docs'),
        filename: '[name].js',
        chunkFilename: 'modules/[id].chunk.js'
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
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.md$/,
                use: ['html-loader', 'markdown-highlighter-loader']
            },
            {
                test: /\.ts$/,
                exclude: /snippets/,
                use: [
                    {
                        loader: '@angular-devkit/build-optimizer/webpack-loader',
                        options: {
                            sourceMap: false
                        }
                    },
                    '@ngtools/webpack'
                ]
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'cache-loader',
                        options: {
                            cacheDirectory: join(cwd(), 'node_modules\\@angular-devkit\\build-optimizer\\src\\.cache')
                        }
                    },
                    {
                        loader: '@angular-devkit/build-optimizer/webpack-loader',
                        options: {
                            sourceMap: false
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                include: [
                    join(cwd(), 'docs', 'app')
                ],
                use: ['to-string-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.less$/,
                exclude: [
                    join(cwd(), 'docs', 'app'),
                    join(cwd(), 'src', 'components'),
                    join(cwd(), 'src', 'services')
                ],
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
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
                    /dist/,
                    /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                    join(cwd(), 'src', 'ng1', 'plugins'),
                    join(cwd(), 'src', 'ng1', 'external')
                ],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        cacheDirectory: true
                    }
                }
            },
            {
                test: /\.js$/,
                include: [
                    join(cwd(), 'src', 'ng1', 'plugins'),
                    join(cwd(), 'src', 'ng1', 'external')
                ],
                use: 'script-loader'
            },
            {
                test: /\.html$/,
                use: 'ng-cache-loader?prefix=[dir]/[dir]',
                include: /(directives|templates)/
            },
            // Ignore warnings about System.import in Angular
            {
                test: /[\/\\]@angular[\/\\].+\.js$/,
                parser: { system: true }
            }
        ]
    },

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
                vendor: false
            }
        },
        minimizer: [
            new HashedModuleIdsPlugin(),
            new CleanCssWebpackPlugin({
                sourceMap: false,
                test: (file) => /\.(?:css|less)$/.test(file),
            }),
            new TerserPlugin({
                sourceMap: false,
                parallel: true,
                cache: true,
                terserOptions: {
                    ecma: 5,
                    warnings: false,
                    safari10: true,
                    output: {
                        ascii_only: true,
                        comments: false,
                        webkit: true,
                    },
                    compress: ({
                        pure_getters: true,
                        passes: 3,
                        global_defs: {
                            ngDevMode: false,
                        }
                    }),
                }
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },

    plugins: [
        new IndexHtmlWebpackPlugin({
            input: './docs/index.html',
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
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),

        new CopyWebpackPlugin([
            {
                from: join(cwd(), 'docs', 'favicon.ico'),
                to: join(cwd(), 'dist', 'docs', 'favicon.ico')
            },
            {
                from: join(cwd(), 'dist', 'bundles', 'ux-aspects-ux-aspects.umd.js'),
                to: join(cwd(), 'dist', 'docs', 'assets', 'lib', 'index.js')
            },
            {
                from: join(cwd(), 'docs', 'app', 'assets'),
                to: join(cwd(), 'dist', 'docs', 'assets')
            },
            {
                from: join(cwd(), 'src', 'fonts'),
                to: join(cwd(), 'dist', 'docs', 'assets', 'fonts')
            },
            {
                from: join(cwd(), 'docs', 'app', 'showcase', 'list_view', 'dist'),
                to: join(cwd(), 'dist', 'docs', 'showcase', 'list_view', 'dist')
            },
            {
                from: join(cwd(), 'docs', 'app', 'showcase', 'list_view', 'bower_components'),
                to: join(cwd(), 'dist', 'docs', 'showcase', 'list_view', 'bower_components')
            },
            {
                from: join(cwd(), 'docs', 'app', 'showcase', 'charts', 'dist'),
                to: join(cwd(), 'dist', 'docs', 'showcase', 'charts', 'dist')
            },
            {
                from: join(cwd(), 'docs', 'app', 'showcase', 'charts', 'bower_components'),
                to: join(cwd(), 'dist', 'docs', 'showcase', 'charts', 'bower_components')
            },
        ]),

        new AngularCompilerPlugin({
            entryModule: join(cwd(), './docs/app/app.module#AppModule'),
            tsConfigPath: join(cwd(), 'tsconfig-prod.json'),
            sourceMap: false,
            skipCodeGeneration: false,
            nameLazyFiles: false
        }),

        new DefinePlugin({
            VERSION: JSON.stringify(require('../src/package.json').version),
            PRODUCTION: true
        }),

        new ScriptsWebpackPlugin({
            name: 'scripts',
            sourceMap: false,
            filename: `scripts.[hash:20].js`,
            scripts: [
                join('node_modules', 'jquery', 'dist', 'jquery.js'),
                join('node_modules', 'jquery-ui', 'ui', 'version.js'),
                join('node_modules', 'jquery-ui', 'ui', 'widget.js'),
                join('node_modules', 'jquery-ui', 'ui', 'data.js'),
                join('node_modules', 'jquery-ui', 'ui', 'ie.js'),
                join('node_modules', 'jquery-ui', 'ui', 'scroll-parent.js'),
                join('node_modules', 'jquery-ui', 'ui', 'position.js'),
                join('node_modules', 'jquery-ui', 'ui', 'unique-id.js'),
                join('node_modules', 'jquery-ui', 'ui', 'widgets', 'mouse.js'),
                join('node_modules', 'jquery-ui', 'ui', 'widgets', 'sortable.js'),
                join('node_modules', 'bootstrap', 'dist', 'js', 'bootstrap.js'),
                join('node_modules', 'angular', 'angular.js'),
            ],
            basePath: cwd(),
        }),
    ],

    node: false
};