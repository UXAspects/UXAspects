const { execSync } = require('child_process');

const seleniumDockerImage = 'selenium/standalone-chrome:3.141.59-oxygen';
// produce the docker command string
const dockerCommand = `docker run -d -p 4444:4444 -v /dev/shm:/dev/shm ${seleniumDockerImage}`;

// run the command string with the inherited terminal
try {
    execSync(dockerCommand, { stdio: 'inherit' });
} catch (error) {
    console.warn(`Exited: ${error.message || error.signal}`);
}
