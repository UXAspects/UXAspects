const webpack = require('webpack');

async function getDocumentationConfig() {
    return {
        resolveLoader: {
            alias: {
                'code-snippet-loader': './configs/loaders/code-snippet-loader.js',
                'markdown-highlighter-loader': './configs/loaders/markdown-highlighter-loader.js',
            },
        },
        module: {
            rules: [
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
                    type: 'asset/source'
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
                }
            ],
        },
        plugins: [
            new webpack.DefinePlugin({
                VERSION: JSON.stringify(require('../../src/package.json').version),
                PRODUCTION: false,
            }),
        ]
    };
}

module.exports = {
    getDocumentationConfig,
};
