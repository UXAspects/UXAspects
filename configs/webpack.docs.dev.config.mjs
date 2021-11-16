import { IndexHtmlWebpackPlugin } from '@angular-devkit/build-angular/src/webpack/plugins/index-html-webpack-plugin.js';
import { AngularWebpackPlugin } from '@ngtools/webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import fs from 'fs';
import gracefulFs from 'graceful-fs';
import { join } from 'path';
import { cwd } from 'process';
import webpack from 'webpack';
import ProgressPlugin from 'webpack/lib/ProgressPlugin.js';
import linkerPlugin from '@angular/compiler-cli/linker/babel';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const CssLoaderWithSourceMap = {
    loader: 'css-loader',
    options: {
        sourceMap: true,
        esModule: false,
    },
};

const LessLoaderWithSourceMap = {
    loader: 'less-loader',
    options: {
        sourceMap: true,
    },
};

// Node has a limit to the number of files that can be open - prevent the error
gracefulFs.gracefulify(fs);

export default {
    mode: 'development',
    devtool: false,
    target: ['web', 'es5'],

    resolve: {
        extensions: ['.ts', '.js', '.mjs'],
    },

    resolveLoader: {
        alias: {
            'code-snippet-loader': join(cwd(), 'configs', 'loaders', 'code-snippet-loader.js'),
            'markdown-highlighter-loader': join(cwd(), 'configs', 'loaders', 'markdown-highlighter-loader.js'),
        },
    },

    entry: {
        main: './docs/main.ts',
        polyfills: './docs/polyfills.ts',
        styles: './docs/styles.less',
    },

    output: {
        path: join(cwd(), 'dist', 'docs'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: 'modules/[id].chunk.js',
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /snippets/,
                use: '@ngtools/webpack',
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
                exclude: /(directives|templates|snippets)/,
                use: 'html-loader',
            },
            {
                test: /\.css$/,
                exclude: /snippets/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.less$/,
                include: [join(cwd(), 'docs', 'app')],
                use: ['to-string-loader', CssLoaderWithSourceMap, LessLoaderWithSourceMap],
            },
            {
                test: /\.less$/,
                exclude: [join(cwd(), 'docs', 'app'), join(cwd(), 'src', 'components'), join(cwd(), 'src', 'services')],
                use: ['style-loader', CssLoaderWithSourceMap, LessLoaderWithSourceMap],
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico|otf|mp4|mp3|vtt)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                        },
                    },
                ],
            },
            {
                test: /\.md$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: { esModule: false },
                    },
                    'markdown-highlighter-loader',
                ],
            },

            /*
                Support Code Snippets
            */
            {
                test: /\.(html|js|css|ts)$/,
                include: /(snippets)/,
                use: 'code-snippet-loader',
            },

            {
                test: /\.txt$/,
                include: /(templates)/,
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
                    fullySpecified: false,
                },
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
                defaultVendors: false,
                vendor: {
                    name: 'vendor',
                    chunks: 'initial',
                    enforce: true,
                },
            },
        },
    },

    plugins: [
        new IndexHtmlWebpackPlugin({
            indexPath: './docs/index.html',
            outputPath: 'index.html',
            entrypoints: [
                ['polyfills', true],
                ['styles', true],
                ['main', true],
                ['common', true],
                ['vendor', true],
                ['runtime', true],
            ],
            noModuleEntrypoints: [],
            moduleEntrypoints: [],
            sri: false,
        }),

        new CopyWebpackPlugin({
            patterns: [
                {
                    from: join(cwd(), 'docs', 'favicon.ico'),
                    to: join(cwd(), 'dist', 'docs', 'favicon.ico'),
                },
                {
                    from: join(cwd(), 'docs', 'app', 'assets'),
                    to: join(cwd(), 'dist', 'docs', 'assets'),
                },
                {
                    from: join(cwd(), 'src', 'fonts'),
                    to: join(cwd(), 'dist', 'docs', 'assets', 'fonts'),
                },
                {
                    from: join(cwd(), 'src', 'img'),
                    to: join(cwd(), 'dist', 'docs', 'assets', 'img'),
                },
            ],
        }),

        new AngularWebpackPlugin({
            tsconfig: join(cwd(), 'tsconfig.json'),
        }),

        new webpack.DefinePlugin({
            VERSION: JSON.stringify(require('../src/package.json').version),
            PRODUCTION: false,
        }),

        new ProgressPlugin(),
    ],

    node: false,
};
