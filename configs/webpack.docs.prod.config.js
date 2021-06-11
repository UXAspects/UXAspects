const {
    IndexHtmlWebpackPlugin,
} = require('@angular-devkit/build-angular/src/webpack/plugins/index-html-webpack-plugin');
const { BuildOptimizerWebpackPlugin } = require('@angular-devkit/build-optimizer');
const { AngularWebpackPlugin } = require('@ngtools/webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const fs = require('fs');
const gracefulFs = require('graceful-fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { join } = require('path');
const { cwd } = require('process');
const rxAlias = require('rxjs/_esm5/path-mapping');
const TerserPlugin = require('terser-webpack-plugin');
const { DefinePlugin } = require('webpack');

const CssLoader = {
    loader: 'css-loader',
    options: {
        esModule: false,
    },
};

// Node has a limit to the number of files that can be open - prevent the error
gracefulFs.gracefulify(fs);

module.exports = {
    mode: 'production',
    devtool: false,
    stats: 'minimal',
    target: ['web', 'es5'],

    resolve: {
        extensions: ['.ts', '.js'],
        alias: rxAlias(),
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
        publicPath: './',
        filename: '[name].js',
        chunkFilename: 'modules/[id].chunk.js',
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /snippets/,
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
                test: /\.js$/,
                loader: '@angular-devkit/build-optimizer/webpack-loader',
                options: {
                    sourceMap: false,
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
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.less$/,
                include: [join(cwd(), 'docs', 'app')],
                use: ['to-string-loader', CssLoader, 'less-loader'],
            },
            {
                test: /\.less$/,
                exclude: [join(cwd(), 'docs', 'app'), join(cwd(), 'src', 'components'), join(cwd(), 'src', 'services')],
                use: [MiniCssExtractPlugin.loader, CssLoader, 'less-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico|otf|mp4|mp3|vtt)$/,
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
                include: /snippets/,
                use: 'code-snippet-loader',
            },
            {
                test: /\.txt$/,
                include: /templates/,
                use: 'raw-loader',
            },
            // Ignore warnings about System.import in Angular
            {
                test: /[\/\\]@angular[\/\\].+\.js$/,
                parser: { system: true },
            },

            // Downlevel Angular Packages
            {
                test: /[\/\\]@angular[\/\\].+\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    targets: ['chrome 84', 'ie 11'],
                                    modules: false,
                                    exclude: ['transform-typeof-symbol'], // 'transform-typeof-symbol' generates slower code
                                },
                            ],
                        ],
                        plugins: [['@babel/plugin-transform-spread', { loose: true }]],
                        inputSourceMap: false,
                        babelrc: false,
                        configFile: false,
                        minified: false, // handled by TerserPlugin
                        compact: false,
                        cacheDirectory: true,
                    },
                },
            },
        ],
    },

    optimization: {
        runtimeChunk: 'single',
        moduleIds: 'deterministic',
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
                            ngI18nClosureMode: false,
                            ngJitMode: false,
                        },
                    },
                },
            }),
        ],
    },

    plugins: [
        new IndexHtmlWebpackPlugin({
            indexPath: './docs/index.html',
            outputPath: 'index.html',
            entrypoints: ['polyfills', 'styles', 'main'],
            noModuleEntrypoints: [],
            moduleEntrypoints: [],
            sri: false,
        }),

        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),

        new CopyWebpackPlugin({
            patterns: [
                {
                    from: join(cwd(), 'docs', 'favicon.ico'),
                    to: join(cwd(), 'dist', 'docs', 'favicon.ico'),
                },
                {
                    from: join(cwd(), 'dist', 'library', 'bundles', 'ux-aspects-ux-aspects.umd.js'),
                    to: join(cwd(), 'dist', 'docs', 'assets', 'lib', 'index.js'),
                },
                {
                    from: join(cwd(), 'docs', 'app', 'assets'),
                    to: join(cwd(), 'dist', 'docs', 'assets'),
                },
                {
                    from: join(cwd(), 'dist', 'library', 'styles'),
                    to: join(cwd(), 'dist', 'docs', 'assets', 'css'),
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
            tsconfig: join(cwd(), 'tsconfig-prod.json'),
        }),

        new BuildOptimizerWebpackPlugin(),

        new DefinePlugin({
            VERSION: JSON.stringify(require('../src/package.json').version),
            PRODUCTION: true,
        }),
    ],

    node: false,
};
