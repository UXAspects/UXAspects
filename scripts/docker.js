const { execSync } = require('child_process');
const { exit } = require('process');
const { join } = require('path');
const { mkdirpSync } = require('fs-extra');

// access environment
const http_proxy = process.env.HTTP_PROXY;
const https_proxy = process.env.HTTPS_PROXY;
const cwd = process.cwd();

const nodeModulesDocker = join(cwd, '.node_modules__docker');

// Ensure the docker node_modules directory exists
mkdirpSync(nodeModulesDocker);

// produce the docker command string
const dockerCommand = `docker run --rm -it --memory=4g -e "http_proxy=${http_proxy}" -e "https_proxy=${https_proxy}" -v "${cwd}:/wd" -v "${nodeModulesDocker}:/wd/node_modules" -w /wd --entrypoint /bin/bash uxaspects/buildenv:1.3.0`;

// run the command string with the inherited terminal
try {
    execSync(dockerCommand, { stdio: 'inherit' });
} catch (error) {
    console.warn(`Exited: ${error.message || error.signal}`);
}

// Avoid a whole bunch of NPM errors when leaving the container
exit(0);
