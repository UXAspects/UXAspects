const { join } = require('path');
const { ContextReplacementPlugin } = require('webpack');
const project_dir = process.cwd();

module.exports = {

    entry: join(project_dir, 'src', 'index.ts'),

    output: {
        path: join(project_dir, 'dist', 'docs', 'assets', 'lib'),
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
            }, {
                test: /\.ts$/,
                use: [{
                    loader: 'awesome-typescript-loader',
                    options: {
                        configFileName: join(project_dir, 'src', 'tsconfig-build.json')
                    },
                }, {
                    loader: 'angular2-template-loader'
                }]
            }, {
                test: /\.less$/,
                use: ['raw-loader', 'less-loader']
            }, {
                test: join(project_dir, 'node_modules', 'webpack-dev-server', 'client'),
                loader: 'null-loader'
            }
        ]
    },

    plugins: [
        new ContextReplacementPlugin(
            /(.+)?angular(\\|\/)core(.+)?/,
            join(project_dir, 'docs')
        ),
    ]
};