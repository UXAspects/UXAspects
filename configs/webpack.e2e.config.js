const { join } = require('path');
const { AngularCompilerPlugin } = require('@ngtools/webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { IndexHtmlWebpackPlugin } = require('@angular-devkit/build-angular/src/webpack/plugins/index-html-webpack-plugin');
const { cwd } = require('process');
const rxAlias = require('rxjs/_esm5/path-mapping');
const { OptimizeCssWebpackPlugin } = require('@angular-devkit/build-angular/src/webpack/plugins/optimize-css-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {

    mode: 'production',

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
        extensions: ['.ts', '.js'],
        alias: rxAlias()
    },

    performance: {
        hints: false,
    },

    module: {
        rules: [{
            test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
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
            test: /\.html$/,
            use: 'html-loader'
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
        // Ignore warnings about System.import in Angular
        {
            test: /[\/\\]@angular[\/\\].+\.js$/,
            parser: { system: true }
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
        }]
    },

    plugins: [
        new AngularCompilerPlugin({
            mainPath: join(cwd(), 'e2e', 'pages', 'main.ts'),
            tsConfigPath: join(cwd(), 'e2e', 'tsconfig.app.json'),
            sourceMap: false,
            skipCodeGeneration: false,
            nameLazyFiles: false,
        }),

        new IndexHtmlWebpackPlugin({
            input: join(cwd(), 'e2e', 'pages', 'index.html'),
            output: 'index.html',
            entrypoints: [
                'polyfills',
                'styles',
                'main'
            ],
            sri: false
        }),

        new MiniCssExtractPlugin({
            filename: 'styles.css'
        })
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
                vendor: false
            }
        },
        minimizer: [
            new OptimizeCssWebpackPlugin({
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

    devServer: {
        port: 4000,
        historyApiFallback: true,
        stats: 'minimal'
    },

    node: false

};
