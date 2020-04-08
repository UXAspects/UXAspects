const { execSync } = require('child_process');

const cwd = process.cwd();
const dockerImage = 'cypress/included:4.2.0';

// produce the docker command string
const dockerCommand = `docker run --rm -it --memory=4g -v "${cwd}:/wd" -w /wd --entrypoint /bin/bash ${dockerImage}`;

// run the command string with the inherited terminal
try {
    execSync(dockerCommand, { stdio: 'inherit' });
} catch (error) {
    console.warn(`Exited: ${error.message || error.signal}`);
}
