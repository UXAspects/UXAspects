const { mkdirpSync } = require('fs-extra');
const { join } = require('path');
const { cwd } = require('process');
const { JUnitXmlReporter } = require('jasmine-reporters');
const { SpecReporter } = require('jasmine-spec-reporter');

const outputDir = join(cwd(), 'target', 'e2e');
const junitDir = join(outputDir, 'junit');
const screenshotOutputDir = join( outputDir, 'screenshots');

exports.config = {
    directConnect: true,
    chromeDriver: require('chromedriver').path,

    // Capabilities to be passed to the webdriver instance. Only one browser may be uncommented at a time.
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: ['--headless', '--disable-gpu', '--no-sandbox', '--window-size=800x600']
        },
        shardTestFiles: true,
        maxInstances: 5
    },

    maxSessions: 5,

    framework: 'jasmine2',

    // Spec patterns are relative to this config file
    specs: ['./tests/**/**/*e2e-spec.ts'],

    plugins: [
        // {
        //     path: '../node_modules/protractor-istanbul-plugin',
        //     outputPath: './e2e/coverage'
        // },
        {
            package: 'protractor-image-comparison',
            options: {
                baselineFolder: join(process.cwd(), './e2e/screenshots'),
                formatImageName: `{tag}-{logName}-{width}x{height}`,
                screenshotPath: screenshotOutputDir,
                savePerInstance: true,
                autoSaveBaseline: true,
                ignoreAntialiasing: true
            }
        }
    ],

    useAllAngular2AppRoots: true,

    // Base URL for application server
    baseUrl: 'http://localhost:4000',

    resultJsonOutputFile: join(outputDir, 'results.json'),

    onPrepare: function() {
        require('ts-node').register({
            project: 'e2e/tsconfig.e2e.json'
        });

        mkdirpSync(junitDir);

        // returning the promise makes protractor wait for the reporter config before executing tests
        return browser.getProcessedConfig().then(function(config) {
            browser.driver.getCapabilities().then(function(caps) {
                browser.browserName = caps.get('browserName');
            });

            var browserName = config.capabilities.browserName;

            // Add reporter which will output results in XML format
            jasmine.getEnv().addReporter(
                new JUnitXmlReporter({
                    consolidateAll: false,
                    savePath: junitDir,
                    filePrefix: `${browserName}.`
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

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000,
        showTiming: true,
        print: function() {}
    }
};
