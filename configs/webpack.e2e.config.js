const {
    IndexHtmlWebpackPlugin,
} = require('@angular-devkit/build-angular/src/webpack/plugins/index-html-webpack-plugin');
const { AngularWebpackPlugin } = require('@ngtools/webpack');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { join } = require('path');
const { cwd } = require('process');
const rxAlias = require('rxjs/_esm5/path-mapping');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',

    resolve: {
        extensions: ['.ts', '.js'],
        alias: rxAlias(),
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
                        minified: false,
                        compact: false,
                        cacheDirectory: true,
                    },
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
