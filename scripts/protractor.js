const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const launcher = require('protractor/built/launcher');
const config = require('../configs/webpack.e2e.config');
const { exec } = require('child_process');

exec('ngcc --properties es2015 browser module main --first-only --create-ivy-entry-points', { stdio: 'inherit' }, err => {

    if (err) {
        throw new Error(err);
    }

    const compiler = webpack(config);
    compiler.hooks.done.tap('Protractor', () => launcher.init('./e2e/protractor.config.js'));

    const server = new webpackDevServer(compiler, config.devServer);

    server.listen(config.devServer.port, err => {
        if (err) {
            return err;
        }
    });
});
