import IndexHtmlWebpackPlugin from '@angular-devkit/build-angular/src/webpack/plugins/index-html-webpack-plugin';
import { AngularWebpackPlugin } from '@ngtools/webpack';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { join } from 'path';
import { cwd } from 'process';
import TerserPlugin from 'terser-webpack-plugin';
import linkerPlugin from '@angular/compiler-cli/linker/babel';

export default {
    mode: 'production',

    resolve: {
        extensions: ['.ts', '.js', '.mjs'],
    },

    entry: {
        main: join(cwd(), 'e2e', 'pages', 'main.ts'),
        polyfills: join(cwd(), 'e2e', 'pages', 'polyfills.ts'),
        styles: join(cwd(), 'e2e', 'pages', 'styles.css'),
    },

    output: {
        path: join(cwd(), 'e2e', 'dist'),
        filename: '[name].js',
    },

    performance: {
        hints: false,
    },

    module: {
        rules: [
            {
                test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                use: [
                    {
                        loader: '@angular-devkit/build-optimizer/webpack-loader',
                        options: {
                            sourceMap: false,
                        },
                    },
                    '@ngtools/webpack',
                ],
            },
            {
                test: /\.[cm]?js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        compact: false,
                        plugins: [linkerPlugin],
                    },
                },
            },
            {
                test: /\.html$/,
                use: 'html-loader',
            },

            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name: 'assets/[name].[ext]',
                        },
                    },
                ],
            },

            {
                test: /\.less$/,
                include: join(cwd(), 'e2e', 'pages', 'app'),
                use: ['raw-loader', 'less-loader'],
            },

            {
                test: /\.css$/,
                exclude: join(cwd(), 'e2e', 'pages', 'app'),
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },

            {
                test: /\.css$/,
                include: join(cwd(), 'e2e', 'pages', 'app'),
                use: 'raw-loader',
            },

            // Ignore warnings about System.import in Angular
            {
                test: /[\/\\]@angular[\/\\].+\.js$/,
                parser: { system: true },
            },
            {
                test: /\.m?js/,
                resolve: {
                    fullySpecified: false
                }
            },
        ],
    },

    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                default: {
                    chunks: 'async',
                    minChunks: 2,
                    priority: 10,
                },
                common: {
                    name: 'common',
                    chunks: 'async',
                    minChunks: 2,
                    enforce: true,
                    priority: 5,
                },
                vendors: false,
                vendor: false,
            },
        },
        minimizer: [
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            svgo: false,
                            calc: false,
                            cssDeclarationSorter: false,
                        },
                    ],
                },
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
                    compress: {
                        pure_getters: true,
                        passes: 3,
                        global_defs: {
                            ngDevMode: false,
                        },
                    },
                },
            }),
        ],
    },

    plugins: [
        new AngularWebpackPlugin({
            tsconfig: join(cwd(), 'e2e', 'tsconfig.app.json'),
        }),

        new IndexHtmlWebpackPlugin({
            indexPath: join(cwd(), 'e2e', 'pages', 'index.html'),
            outputPath: 'index.html',
            entrypoints: ['polyfills', 'styles', 'main'],
            noModuleEntrypoints: [],
            moduleEntrypoints: [],
            sri: false,
        }),

        new MiniCssExtractPlugin({
            filename: 'styles.css',
        }),
    ],

    devServer: {
        port: 4000,
        historyApiFallback: true,
        stats: 'minimal',
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    },

    node: false,
};
