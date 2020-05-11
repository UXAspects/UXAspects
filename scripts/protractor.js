const { env } = require('process');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const launcher = require('protractor/built/launcher');
const isIp = require('is-ip');
const config = require('../configs/webpack.e2e.config');
const { exec, execSync } = require('child_process');

const DOCKER_CONTAINER_NAME = 'uxa_selenium';

const isJenkinsBuild = !!env.RE_BUILD_TYPE;

exec('ngcc --properties es2015 browser module main --first-only --create-ivy-entry-points', { stdio: 'inherit' }, err => {

    if (err) {
        throw new Error(err);
    }

    env.E2E_HOST_ADDRESS = isJenkinsBuild ? 'localhost' : getHostAddressFromSeleniumContainer();

    const protractorConfigFile = isJenkinsBuild ? './e2e/protractor.config.js' : './e2e/protractor.dev.config.js';

    const compiler = webpack(config);
    compiler.hooks.done.tap('Protractor', () => launcher.init(protractorConfigFile));

    const server = new webpackDevServer(compiler, config.devServer);

    server.listen(config.devServer.port, err => {
        if (err) {
            return err;
        }
    });
});


function getHostAddressFromSeleniumContainer() {
    const cmd = `docker exec ${DOCKER_CONTAINER_NAME} getent ahosts host.docker.internal | awk 'NR==1 { print $1 }'`;
    const address = execSync(cmd, { encoding: 'utf8' }).trim();

    if (!isIp(address)) {
        throw new Error(`Expected an IP address but got "${address}". Make sure docker container ${DOCKER_CONTAINER_NAME} is running.`);
    }

    return address;
}
