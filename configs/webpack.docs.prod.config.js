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
const CircularDependencyPlugin = require('circular-dependency-plugin');
const TerserPlugin = require('terser-webpack-plugin');
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
                from: join(cwd(), 'dist', 'library', 'bundles', 'ux-aspects-ux-aspects.umd.js'),
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
                from: join(cwd(), 'src', 'img'),
                to: join(cwd(), 'dist', 'docs', 'assets', 'img')
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

        new CircularDependencyPlugin({
            exclude: /[\\\/]node_modules[\\\/]/
        }),
    ],

    node: false
};