const { execSync } = require('child_process');
const { env } = require('process');
const isJenkinsBuild = !!env.RE_BUILD_TYPE;
const express = require('express');
const { join } = require('path');

if (!isJenkinsBuild) {
    startSeleniumContainer();
}

buildE2eApp();
serveE2eApp();
startProtractor();

// build the e2e application
function buildE2eApp() {
    console.log('Building e2e application...');
    execSync('ng build ux-aspects-e2e', { stdio: 'inherit' });
}

function serveE2eApp() {
    const server = express();
    server.use('/', express.static(join('dist', 'e2e')));
    server.listen(4000, () => console.log('E2E application is now available at http://localhost:4000'));
}

function startSeleniumContainer() {
    execSync('docker-compose -p ux-aspects up -d selenium', { stdio: 'inherit' });
}

function startProtractor() {
    execSync(`ng e2e ux-aspects-e2e`, { stdio: 'inherit' });
}
