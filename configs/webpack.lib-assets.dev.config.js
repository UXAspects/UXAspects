const { join } = require('path');
const { cwd } = require('process');
const { ContextReplacementPlugin } = require('webpack');

module.exports = {

    mode: 'production',

    entry: join(cwd(), 'src', 'index.ts'),

    output: {
        path: join(cwd(), 'dist', 'docs', 'assets', 'lib'),
        filename: 'index.js',
        libraryTarget: 'umd'
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    externals: [
        /^@angular\//,
        /^rxjs\//,
        /^angular-split/
    ],

    module: {
        rules: [{
            test: /\.html$/,
            use: 'raw-loader'
        }, {
            test: /\.ts$/,
            use: [{
                loader: 'awesome-typescript-loader',
                options: {
                    configFileName: join(cwd(), 'src', 'tsconfig-build.json')
                },
            }, {
                loader: 'angular2-template-loader'
            }]
        }, {
            test: /\.less$/,
            use: ['raw-loader', 'less-loader']
        }
        ]
    },

    plugins: [
        new ContextReplacementPlugin(
            /(.+)?angular(\\|\/)core(.+)?/,
            join(cwd(), 'docs')
        )
    ]
};