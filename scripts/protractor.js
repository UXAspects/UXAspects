const { env } = require('process');
const launcher = require('protractor/built/launcher');
const isIp = require('is-ip');
const { execSync } = require('child_process');

const DOCKER_CONTAINER_NAME = 'uxa-selenium';

const isJenkinsBuild = !!env.RE_BUILD_TYPE;

if (!isJenkinsBuild) {
    startSeleniumContainer();
}

env.E2E_HOST_ADDRESS = isJenkinsBuild ? 'localhost' : getHostAddressFromSeleniumContainer();

const protractorConfigFile = isJenkinsBuild ? './e2e/protractor.config.js' : './e2e/protractor.dev.config.js';

launcher.init(protractorConfigFile);


function startSeleniumContainer() {
    execSync('docker-compose up -d selenium', { stdio: 'inherit' });
}

function getHostAddressFromSeleniumContainer() {
    const cmd = `docker exec ${DOCKER_CONTAINER_NAME} getent ahosts host.docker.internal | awk 'NR==1 { print $1 }'`;
    const address = execSync(cmd, { encoding: 'utf8' }).trim();

    if (!isIp(address)) {
        throw new Error(`Expected an IP address but got "${address}". Make sure docker container ${DOCKER_CONTAINER_NAME} is running.`);
    }

    return address;
}
