const { execSync } = require('child_process');
const { renameSync } = require('fs');
const { join, basename } = require('path');

const cwd = process.cwd();

const nodeModulesDir = join(cwd, 'node_modules');
const nodeModulesDevDir = join(cwd, '.node_modules__dev');
const nodeModulesDockerDir = join(cwd, '.node_modules__docker');

try {
    // Move existing node_modules to a known location
    renameSync(nodeModulesDir, nodeModulesDevDir);
    console.log(`Renamed node_modules to ${basename(nodeModulesDevDir)}. You can use this instead of doing \`npm ci\` again after exiting the shell.`);
} catch (error) {
    if (error.code !== 'ENOENT') {
        console.warn(`Couldn't rename node_modules. (The IDE probably has a handle on it.)`);
    }
}

try {
    // Restore previously saved node_modules
    renameSync(nodeModulesDockerDir, nodeModulesDir);
    console.log(`Restored node_modules from ${basename(nodeModulesDockerDir)}. Running \`npm ci\` may not be necessary.`);
} catch (error) {
    console.log('Run `npm ci` in the docker shell to obtain Linux 64-bit dependencies.');
}

// access environment
const http_proxy = process.env.HTTP_PROXY;
const https_proxy = process.env.HTTPS_PROXY;

// produce the docker command string
const dockerCommand = `docker run --rm -it --memory=4g -e "http_proxy=${http_proxy}" -e "https_proxy=${https_proxy}" -v "${cwd}:/wd" -w /wd --entrypoint /bin/bash uxaspects/buildenv:latest`;

// run the command string with the inherited terminal
try {
    execSync(dockerCommand, { stdio: 'inherit' });
} catch (error) {
    console.warn(`Exited: ${error.message || error.signal}`);
}

try {
    // Save the linux node_modules for next time
    renameSync(nodeModulesDir, nodeModulesDockerDir);
    console.log(`Renamed node_modules to ${basename(nodeModulesDockerDir)}. This can be used next time you use the docker shell.`);
} catch (error) {
    if (error.code !== 'ENOENT') {
        console.warn(`Couldn't rename node_modules. (The IDE probably has a handle on it.)`);
    }
}

try {
    // Restore previously saved node_modules
    renameSync(nodeModulesDevDir, nodeModulesDir);
    console.log(`Restored node_modules from ${basename(nodeModulesDevDir)}. Running \`npm ci\` may not be necessary.`);
}
catch (error) {
    console.log('Run `npm ci` again to install dependencies for your normal development environment.');
}
