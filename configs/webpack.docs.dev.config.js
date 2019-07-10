const { DefinePlugin } = require('webpack');
const fs = require('fs');
const gracefulFs = require('graceful-fs');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const { join } = require('path');
const { cwd } = require('process');
const rxAlias = require('rxjs/_esm5/path-mapping');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { AngularCompilerPlugin } = require('@ngtools/webpack');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const { IndexHtmlWebpackPlugin } = require('@angular-devkit/build-angular/src/angular-cli-files/plugins/index-html-webpack-plugin');

const CssLoaderWithSourceMap = {
    loader: 'css-loader',
    options: {
        sourceMap: true,
    }
};

const LessLoaderWithSourceMap = {
    loader: 'less-loader',
    options: {
        sourceMap: true,
    }
};

// Node has a limit to the number of files that can be open - prevent the error
gracefulFs.gracefulify(fs);

module.exports = {

    mode: 'development',
    devtool: false,

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
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.md$/,
                use: ['html-loader', 'markdown-highlighter-loader']
            },
            {
                test: /\.ts$/,
                exclude: /snippets/,
                use: '@ngtools/webpack'
            },
            {
                test: /\.less$/,
                include: [
                    join(cwd(), 'docs', 'app')
                ],
                use: ['to-string-loader', CssLoaderWithSourceMap, LessLoaderWithSourceMap]
            },
            {
                test: /\.less$/,
                exclude: [
                    join(cwd(), 'docs', 'app'),
                    join(cwd(), 'src', 'components'),
                    join(cwd(), 'src', 'services')
                ],
                use: ['style-loader', CssLoaderWithSourceMap, LessLoaderWithSourceMap]
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
                vendor: {
                    name: 'vendor',
                    chunks: 'initial',
                    enforce: true
                }
            }
        }
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

        new CopyWebpackPlugin([
            {
                from: join(cwd(), 'docs', 'favicon.ico'),
                to: join(cwd(), 'dist', 'docs', 'favicon.ico')
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
            tsConfigPath: join(cwd(), 'tsconfig.json'),
            sourceMap: false,
            skipCodeGeneration: true,
            nameLazyFiles: true
        }),

        new DefinePlugin({
            VERSION: JSON.stringify(require('../src/package.json').version),
            PRODUCTION: false
        }),

        new ProgressPlugin(),

        new CircularDependencyPlugin({
            exclude: /[\\\/]node_modules[\\\/]/
        })
    ],

    devServer: {
        historyApiFallback: true,
        stats: 'minimal',
        overlay: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    },

    node: false
};