var path = require('path');
var webpack = require('webpack');

module.exports = {

    entry: path.join(process.cwd(), 'src', 'index.ts'),

    output: {
        path: path.join(process.cwd(), 'dist', 'lib'),
        filename: 'index.js',
        libraryTarget: 'umd'
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    externals: [
        /^@angular\//,
        /^rxjs\//
    ],

    module: {
        rules: [{
                test: /\.html$/,
                use: 'raw-loader'
            },
            {
                test: /\.ts$/,
                use: [{
                    loader: 'awesome-typescript-loader',
                    options: {
                        configFileName: path.join(process.cwd(), 'src', 'tsconfig-build.json')
                    },
                }, {
                    loader: 'angular2-template-loader'
                }]
            },
            {
                test: /\.less$/,
                use: ['raw-loader', 'less-loader']
            }
        ]
    },

    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            path.resolve(process.cwd(), 'docs')
        )
    ]
};