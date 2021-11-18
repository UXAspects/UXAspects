const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const { ngPackagr } = require('ng-packagr');
const { join } = require('path');
const { argv, cwd } = require('process');
const express = require('express');
const https = require('https');
const { existsSync, readFileSync } = require('fs');
const cors = require('cors');
const webpackConfig = require('../configs/webpack.dev.config.js');


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

serveDocumentation();
buildAndWatchAngularLibrary();
servePlunkerAssets();

async function serveDocumentation() {
    const config = await webpackConfig();
    const compiler = webpack(config);

    // Start Webpack after the library has initially compiled
    const server = new WebpackDevServer({
        ...config.devServer,
        port: wdsPort,
        host: '127.0.0.1',
    }, compiler);

    // begin dev server
    server.startCallback(() => {
        console.log(`Documentation site is now available at http://localhost:${ wdsPort }`);
    });
}

function buildAndWatchAngularLibrary() {
    // build and watch the Angular library for Plunker
    ngPackagr()
        .forProject('src/ng-package.json')
        .withTsConfig('src/tsconfig-build.json')
        .watch()
        .subscribe();
}

function servePlunkerAssets() {
    // start a very basic express server to access the plunker library
    const plunkerServer = express();
    plunkerServer.use(cors());

    const uxAspectsLibrary = join(cwd(), 'dist', 'library', 'fesm2015', 'ux-aspects-ux-aspects.js');
    if (existsSync(uxAspectsLibrary)) {
        plunkerServer.get('/assets/lib/index.js', (_, res) =>
            res.sendFile(uxAspectsLibrary)
        );
    }

    plunkerServer.get('/assets/lib/ux-aspects-micro-focus.js', (_, res) =>
        res.sendFile(join(cwd(), 'dist', 'library', 'fesm2015', 'micro-focus-ux-aspects.js'))
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
