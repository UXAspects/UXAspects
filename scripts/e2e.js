const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const { join } = require('path');
const { cwd } = require('process');
const config = require('../configs/webpack.e2e.config');
const { spawn } = require('child_process');
const { Subject, zip } = require('rxjs');

/**
 * This script will build and start the e2e app and then proceed to
 * run both the protractir tests and cypress tests simultaneously.
 *
 * Once both applications have finished running it will terminate the
 * server.
 */

const compiler = webpack(config);

// listen for the end to end app to finish compiling
compiler.hooks.done.tap('E2E', () => {

    const protractorComplete$ = new Subject();
    const cypressComplete$ = new Subject();

    const protractorPath = join(cwd(), 'node_modules', '.bin', getExecutableName('protractor'));
    const protractorConfig = join(cwd(), 'e2e', 'protractor.config.js');
    const cypressPath = join(cwd(), 'node_modules', '.bin', getExecutableName('cypress'));
    const cypressProjectPath = join(cwd(), 'apps', 'test-environment-e2e');
    const cypressTsConfigPath = join(cypressProjectPath, 'tsconfig.e2e.json');

    const protractor = spawn(protractorPath, [protractorConfig], { stdio: 'inherit' });
    const cypress = spawn(cypressPath, ['run', '--headless', '--project', cypressProjectPath, '--browser', 'electron', '--env', `tsConfig=${cypressTsConfigPath}`], { stdio: 'inherit' });

    // listen for the processes to end
    protractor.on('exit', (data) => protractorComplete$.next(data));
    cypress.on('exit', (data) => cypressComplete$.next(data));

    // whenever both process have completed finish up
    zip(protractorComplete$, cypressComplete$).subscribe(([protractorResult, cypressResult]) => {
        server.close();

        // if either of the tests exit with a code of 1, we should exit with a code of 1
        process.exit(protractorResult || cypressResult);
    });
});

const server = new webpackDevServer(compiler, config.devServer);

server.listen(config.devServer.port, err => {
    if (err) {
        return err;
    }
});

/** The spawn function will not automatically find .cmd files so when on Windows we need to add the extension explicitly */
function getExecutableName(name) {
    return process.platform === 'win32' || process.platform === 'win64' ? name + '.cmd' : name;
}