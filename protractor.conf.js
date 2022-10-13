// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { env, cwd } = require('process');
const { join } = require('path');
const { JUnitXmlReporter } = require('jasmine-reporters');
const { mkdirpSync } = require('fs-extra');
const { execSync } = require('child_process');
const isIp = require('is-ip');
const express = require('express');
const cors = require('cors');
const { SpecReporter } = require('jasmine-spec-reporter');

const outputDir = join(cwd(), 'target', 'e2e');
const junitDir = join(outputDir, 'junit');
const screenshotOutputDir = join(outputDir, 'screenshots');
const isJenkinsBuild = !!env.RE_BUILD_TYPE;
const DOCKER_CONTAINER_NAME = 'uxa-selenium';

if (!isJenkinsBuild) {
    startSeleniumContainer();
}

const e2eHostAddress = isJenkinsBuild ? 'localhost' : getHostAddressFromSeleniumContainer();

const config = {
    chromeDriver: require('chromedriver').path,
    baseUrl: `http://${e2eHostAddress}:4000/#/`,
    allScriptsTimeout: 11000,
    specs: [
        './e2e/tests/components/organization-chart/*.e2e-spec.ts'
    ],
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: [
                '--headless',
                '--disable-gpu',
                '--no-sandbox',
                '--disable-dev-shm-usage',
                '--window-size=800x600',
                '--log-level=1'
            ],
            w3c: false
        },
        shardTestFiles: true,
        maxInstances: 5
    },
    useAllAngular2AppRoots: true,
    maxSessions: 3,
    directConnect: true,
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        print: function () {}
    },
    onPrepare() {
        require('ts-node').register({
            project: 'e2e/tsconfig.e2e.json'
        });
        mkdirpSync(junitDir);

        // returning the promise makes protractor wait for the reporter config before executing tests
        return browser.getProcessedConfig().then(function (config) {
            browser.driver.getCapabilities().then(function (caps) {
                browser.browserName = caps.get('browserName');
            });

            const browserName = config.capabilities.browserName;

            // Add reporter which will output results in XML format
            jasmine.getEnv().addReporter(
                new JUnitXmlReporter({
                    consolidateAll: false,
                    savePath: junitDir,
                    filePrefix: `${ browserName }.`
                })
            );

            jasmine.getEnv().addReporter(
                new SpecReporter({
                    spec: {
                        displayStacktrace: 'none'
                    },
                    summary: {
                        displayErrorMessages: true,
                        displayFailed: true,
                        displayDuration: false
                    }
                })
            );
        });
    },
    beforeLaunch() {
        console.log('Building e2e application...');
        execSync('ng build ux-aspects-e2e', { stdio: 'inherit' });

        const server = express();
        server.use(cors());
        server.use('/', express.static(join('dist', 'e2e')));
        server.listen(4000, () => console.log('E2E application is now available at http://localhost:4000'));
    },
    plugins: [
        {
            package: 'protractor-image-comparison',
            options: {
                baselineFolder: join(cwd(), './e2e/screenshots'),
                formatImageName: `{tag}-{logName}-{width}x{height}`,
                screenshotPath: screenshotOutputDir,
                savePerInstance: true,
                autoSaveBaseline: false,
                ignoreAntialiasing: true
            },
        },
        {
            package: 'protractor-console-plugin',
            failOnError: true,
            logWarnings: false,
            exclude: [
                new RegExp(/favicon.ico/, 'g'),
                'Invalid Host/Origin header',
                '[WDS] Disconnected!',
                /sockjs-node\/info/
            ]
        }
    ]
};

if (!isJenkinsBuild) {
    config.directConnect = false;
    config.seleniumAddress = 'http://127.0.0.1:4444/wd/hub';
    config.chromeDriver = null;
    config.plugins.find(plugin => plugin.package === 'protractor-image-comparison').options.autoSaveBaseline = true;
}

module.exports.config = config;

function getHostAddressFromSeleniumContainer() {
    const cmd = `docker exec ${DOCKER_CONTAINER_NAME} getent ahosts host.docker.internal`;
    const output = execSync(cmd, { encoding: 'utf8' });
    const address = getHostAddressFromAHosts(output);

    if (!isIp(address)) {
        throw new Error(`Expected an IP address but got "${address}". Make sure docker container ${DOCKER_CONTAINER_NAME} is running.`);
    }

    return address;
}

function getHostAddressFromAHosts(hosts) {
    const match = hosts.match(/^(?:\d+\.){3}\d+/m);
    if (!match) {
        return null;
    }

    return match[0];
}

function startSeleniumContainer() {
    execSync('docker-compose -p ux-aspects up -d selenium', { stdio: 'inherit' });
}
