const { execSync } = require('child_process');
const { renameSync } = require('fs');
const { join, basename } = require('path');
const { mkdirpSync } = require('fs-extra');

const cwd = process.cwd();

const nodeModulesDir = join(cwd, 'node_modules');
const nodeModulesDockerDir = join(cwd, '.node_modules__docker');
//const dockerImage = 'uxaspects/buildenv:latest';
const dockerImage = 'cafinternal/prereleases:buildenv-1.3.0-EL-3727-SNAPSHOT';

// Ensure the docker node_modules__docker directory exists
mkdirpSync(nodeModulesDocker);

// access environment
const http_proxy = process.env.HTTP_PROXY || process.env.http_proxy;
const https_proxy = process.env.HTTPS_PROXY || process.env.https_proxy;

if (!http_proxy){
    console.warn(`An http proxy has not been defined.`);
}

if (!https_proxy){
    console.warn(`An https proxy has not been defined.`);
}

// produce the docker command string
const dockerCommand = `docker run --rm -it --memory=4g -e "http_proxy=${http_proxy}" -e "https_proxy=${https_proxy}" -v "${cwd}:/wd" -v "${nodeModulesDocker}:/wd/node_modules" -w /wd --entrypoint /bin/bash ${dockerImage}`;

// run the command string with the inherited terminal
try {
    execSync(dockerCommand, { stdio: 'inherit' });
} catch (error) {
    console.warn(`Exited: ${error.message || error.signal}`);
}
