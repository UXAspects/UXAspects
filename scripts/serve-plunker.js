const webpack = require('webpack');
const { join } = require('path');
const { argv, cwd } = require('process');
const express = require('express');
const https = require('https');
const { readFileSync } = require('fs');
const cors = require('cors');
const webpackConfig = require('../configs/webpack.css-assets.dev.config');

/**
 * This script will:
 *
 * 1) Run Webpack Dev Server to host the documentation site
 * 2) Build and Watch the Angular Library
 * 3) Start an express server to host all plunker assets on https
 *    (this means we don't rely on webpack to build our plunker Angular bundle we can use the proper tool ng-packagr,
 *     however we still rely on Webpack to build the library for our documentation site as it is much quicker)
 */

const wdsPort = parseInt(argv[2]) || 8080;
const plunkerPort = wdsPort + 10;

serveCssAssets();
servePlunkerAssets();

function serveCssAssets() {
    const compiler = webpack(webpackConfig);

    compiler.watch({}, (err, stats) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }));
    });
}

function servePlunkerAssets() {
    // start a very basic express server to access the plunker library
    const plunkerServer = express();
    plunkerServer.use(cors());

    const uxAspectsLibrary = join(cwd(), 'dist', 'library', 'fesm2015', 'ux-aspects-ux-aspects.mjs');

    plunkerServer.get('/assets/lib/ux-aspects-ux-aspects.mjs', (_, res) =>
        res.sendFile(uxAspectsLibrary)
    );

    plunkerServer.get('/assets/lib/ux-aspects-micro-focus.js', (_, res) =>
        res.sendFile(join(cwd(), 'dist', 'library', 'fesm2015', 'micro-focus-ux-aspects.mjs'))
    );

    // serve the contents of the docs assets folder
    plunkerServer.use('/assets', express.static(join('dist', 'docs', 'assets')));

    https
        .createServer(
            {
                pfx: readFileSync(join(cwd(), 'configs', 'webpack.docs.dev.pfx')),
            },
            plunkerServer
        )
        .listen(plunkerPort, () => console.info(`Serving plunker assets at https://localhost:${ plunkerPort }`));
}
