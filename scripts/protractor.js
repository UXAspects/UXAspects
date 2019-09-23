const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const launcher = require('protractor/built/launcher');
const config = require('../configs/webpack.e2e.config');

const compiler = webpack(config);

compiler.hooks.done.tap('Protractor', () => launcher.init('./e2e/protractor.config.js'));

const server = new webpackDevServer(compiler, config.devServer);

server.listen(config.devServer.port, err => {
    if (err) {
        return err;
    }
});