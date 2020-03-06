const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const config = require('../configs/webpack.e2e.config');
const { join } = require('path');
const { cwd } = require('process');
const Cypress = require('cypress');
const projectPath = join(cwd(), 'apps', 'test-environment-e2e');
const tsConfigPath = join(projectPath, 'tsconfig.e2e.json');

const compiler = webpack(config);

compiler.hooks.done.tap('Cypress', () => {

    const config = {
        project: projectPath,
        browser: 'electron',
        env: {
            tsConfig: tsConfigPath
        }
    };

    if (process.argv.indexOf('--ci') !== -1) {
        Cypress.run(config);
    } else {
        Cypress.open({ ...config, headed: true });
    }
});

const server = new webpackDevServer(compiler, config.devServer);

server.listen(config.devServer.port, err => {
    if (err) {
        return err;
    }
});