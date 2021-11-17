import webpack from 'webpack';
import { cwd } from 'process';
import { DedupeModuleResolvePlugin } from '@angular-devkit/build-angular/src/webpack/plugins/dedupe-module-resolve-plugin.js';
import PostcssCliResources from '@angular-devkit/build-angular/src/webpack/plugins/postcss-cli-resources.js';
import postcssImports from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { AngularWebpackPlugin } from '@ngtools/webpack';
import { createRequire } from 'module';
import { join } from 'path';
import linkerPlugin from '@angular/compiler-cli/linker/babel';
import { IndexHtmlWebpackPlugin } from '@angular-devkit/build-angular/src/webpack/plugins/index-html-webpack-plugin.js';
// import { getCommonConfig } from '@angular-devkit/build-angular/src/webpack/configs/common.js';

const require = createRequire(import.meta.url);

// const options = {
//
// }
//
// const config = getCommonConfig({
//     tsConfigPath: 'tsconfig.json',
//     root: cwd(),
//
// });

export default {
    mode: 'development',
    devtool: false,
    profile: false,
    target: ['web', 'es2015'],
    context: cwd(),
    resolve: {
        roots: [cwd()],
        extensions: ['.ts', '.tsx', '.mjs', '.js'],
        symlinks: true,
        mainFields: ['es2020', 'es2015', 'browser', 'module', 'main'],
        conditionNames: ['es2020', 'es2015'],
    },
    resolveLoader: {
        symlinks: true,
        alias: {
            'code-snippet-loader': './configs/loaders/code-snippet-loader.js',
            'markdown-highlighter-loader': './configs/loaders/markdown-highlighter-loader.js',
        },
    },
    entry: {
        main: ['./docs/main.ts'],
        polyfills: ['./docs/polyfills.ts'],
        styles: ['./docs/styles.less'],
    },
    output: {
        uniqueName: 'ux-aspects',
        clean: true,
        path: join(cwd(), 'dist', 'docs'),
        publicPath: '',
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    performance: {
        hints: false,
    },
    module: {
        rules: [
            {
                // Mark files inside `rxjs/add` as containing side effects.
                // If this is fixed upstream and the fixed version becomes the minimum
                // supported version, this can be removed.
                test: /[/\\]rxjs[/\\]add[/\\].+\.js$/,
                sideEffects: true,
            },
            {
                test: /\.[cm]?jsx?$/,
                enforce: 'pre',
                loader: 'source-map-loader',
                options: {},
            },

            // Style Processing
            {
                test: /\.less$/,
                rules: [
                    // Setup processing rules for global and component styles
                    {
                        oneOf: [
                            // Component styles are all styles except defined global styles
                            {
                                exclude: [join(cwd(), 'docs', 'styles.less')],
                                use: [
                                    {
                                        loader: 'postcss-loader',
                                        options: {
                                            postcssOptions: postcssOptionsCreator(true, false),
                                        },
                                    }
                                ],
                                type: 'asset/source',
                            },
                            // Global styles are only defined global styles
                            {
                                include: [join(cwd(), 'docs', 'styles.less')],
                                use: [
                                    {
                                        loader: MiniCssExtractPlugin.loader,
                                    },
                                    {
                                        loader: 'css-loader',
                                        options: {
                                            url: false,
                                            sourceMap: true,
                                        },
                                    },
                                    {
                                        loader: 'postcss-loader',
                                        options: {
                                            postcssOptions: postcssOptionsCreator(false, true),
                                            sourceMap: true,
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        use: [
                            {
                                loader: 'less-loader',
                                options: {
                                    sourceMap: true,
                                    lessOptions: {
                                        javascriptEnabled: true,
                                    },
                                },
                            }
                        ]
                    }
                ],
            },
            {
                test: /\.css$/,
                rules: [
                    // Setup processing rules for global and component styles
                    {
                        oneOf: [
                            // Component styles are all styles except defined global styles
                            {
                                exclude: [/snippets/],
                                use: [
                                    {
                                        loader: 'postcss-loader',
                                        options: {
                                            postcssOptions: postcssOptionsCreator(true, false),
                                        },
                                    }
                                ],
                                type: 'asset/source',
                            },
                        ],
                    }
                ],
            },
            {
                test: /\.[jt]sx?$/,
                exclude: /snippets/,
                use: '@ngtools/webpack'
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
                test: /\.m?js/,
                resolve: {
                    fullySpecified: false,
                },
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
        ],
        strictExportPresence: true
    },
    cache: {
        type: 'filesystem',
        maxMemoryGenerations: 1
    },
    experiments: {
        syncWebAssembly: true,
        asyncWebAssembly: true,
    },
    infrastructureLogging: {
        level: 'error'
    },
    optimization: {
        minimizer: [],
        moduleIds: 'deterministic',
        chunkIds: 'named',
        emitOnErrors: false,
        runtimeChunk: 'single',
        splitChunks: {
            maxAsyncRequests: Infinity,
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
                defaultVendors: {
                    name: 'vendor',
                    enforce: true,
                    test: /[\\/]node_modules[\\/]/,
                },
            },
        },
    },
    node: false,
    stats: {
        all: false,
        colors: true,
        hash: true,
        timings: true,
        chunks: true,
        builtAt: true,
        warnings: true,
        errors: true,
        assets: true,
        cachedAssets: true,
        ids: true,
        entrypoints: true,
    },
    plugins: [
        new DedupeModuleResolvePlugin({ verbose: true }),
        new webpack.ProgressPlugin(),
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(require('../src/package.json').version),
            PRODUCTION: false,
        }),
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
        new AngularWebpackPlugin({
            tsconfig: './tsconfig.json',
            jitMode: false,
            emitNgModuleScope: false,
            inlineStyleFileExtension: 'less',
        }),
        new MiniCssExtractPlugin({ filename: '[name].css' })
    ]
};

function postcssOptionsCreator(inlineSourcemaps, extracted) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const optionGenerator = (loader) => ({
        map: inlineSourcemaps ? {
                inline: true,
                annotation: false,
            }
            : undefined,
        plugins: [
            postcssImports({
                resolve: (url) => (url.startsWith('~') ? url.substr(1) : url),
                load: (filename) => {
                    return new Promise((resolve, reject) => {
                        loader.fs.readFile(filename, (err, data) => {
                            if (err) {
                                reject(err);

                                return;
                            }

                            const content = data.toString();
                            resolve(content);
                        });
                    });
                },
            }),
            PostcssCliResources.default({
                baseHref: './',
                deployUrl: '',
                loader,
                filename: () => '[name].[ext]',
                emitFile: true,
                extracted,
            }),
            postcssPresetEnv({
                browsers: 'last 2 versions',
                autoprefixer: true,
                stage: 3,
            }),
        ],
    });
    // postcss-loader fails when trying to determine configuration files for data URIs
    optionGenerator.config = false;

    return optionGenerator;
}
