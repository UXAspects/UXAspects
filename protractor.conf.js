// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');
const { env, cwd } = require("process");
const { join } = require("path");
const { JUnitXmlReporter } = require("jasmine-reporters");
const { mkdirpSync } = require('fs-extra');
const { execSync } = require("child_process");
const isIp = require("is-ip");

const e2eHostPort = 4000;
const e2eHostAddress = env.E2E_HOST_ADDRESS || 'localhost';
const outputDir = join(cwd(), 'target', 'e2e');
const junitDir = join(outputDir, 'junit');
const screenshotOutputDir = join(outputDir, 'screenshots');
const DOCKER_CONTAINER_NAME = 'uxa-selenium';
const isJenkinsBuild = !!env.RE_BUILD_TYPE;
env.E2E_HOST_ADDRESS = isJenkinsBuild ? 'localhost' : getHostAddressFromSeleniumContainer();

const config = {
    chromeDriver: require('chromedriver').path,
    baseUrl: `http://${ e2eHostAddress }:${ e2eHostPort }/#/`,
    allScriptsTimeout: 11000,
    specs: [
        './e2e/**/*.e2e-spec.ts'
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

    maxSessions: 3,
    directConnect: true,
    baseUrl: 'http://localhost:4200/',
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        print: function() {}
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
                        displayStacktrace: true
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

if (isJenkinsBuild) {
    config.directConnect = false;
    config.seleniumAddress = 'http://127.0.0.1:4444/wd/hub';
    config.chromeDriver = null;
    config.plugins.find(plugin => plugin.package === 'protractor-image-comparison').options.autoSaveBaseline = true;
}

if (!isJenkinsBuild) {
    startSeleniumContainer();
}

module.exports.config = config;



function startSeleniumContainer() {
    execSync('docker-compose -p ux-aspects up -d selenium', { stdio: 'inherit' });
}

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
