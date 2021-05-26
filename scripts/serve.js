const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const { ngPackagr } = require('ng-packagr');
const webpackConfig = require('../configs/webpack.dev.config');
const {join} = require("path");
const { filter } = require('rxjs/operators');
const { argv, cwd } = require('process');

const compiler = webpack(webpackConfig);
let server;

// build and watch the library
ngPackagr()
    .forProject('src/ng-package.json')
    .withTsConfig('src/tsconfig-build.json')
    .watch()
    .pipe(filter(() => !server))
    .subscribe(() => {
        // Start Webpack after the library has initially compiled
        server = new WebpackDevServer(compiler, {
            https: argv.includes('--https'),
            pfx: join(cwd(), 'configs', 'webpack.docs.dev.pfx'),
            historyApiFallback: true,
            stats: 'minimal',
            overlay: true,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            disableHostCheck: true, // https://github.com/webpack/webpack-dev-server/issues/1604
            watchOptions: {
                aggregateTimeout: 1000,
                ignored: [
                    // we only care about listening the fesm package
                    '**/dist/library/**/*.d.ts',
                    '**/dist/library/esm2015/**'
                ],
            }
        });
        // begin dev server
        server.listen(8080, '127.0.0.1');
});
