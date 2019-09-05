const { execSync } = require('child_process');
const { exit } = require('process');

// access environment
const http_proxy = process.env.HTTP_PROXY;
const https_proxy = process.env.HTTPS_PROXY;
const cwd = process.cwd();

// produce the docker command string
const dockerCommand = `docker run --rm -it --memory=4g -e "http_proxy=${http_proxy}" -e "https_proxy=${https_proxy}" -v "${cwd}:/wd" -w /wd --entrypoint /bin/bash uxaspects/buildenv:latest`;

// run the command string with the inherited terminal
try {
    execSync(dockerCommand, { stdio: 'inherit' });
} catch (error) {
    console.warn(`Exited: ${error.message || error.signal}`);
}

// Avoid a whole bunch of NPM errors when leaving the container
exit(0);
