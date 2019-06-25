const fs = require('fs-extra');
const { join } = require('path');
const { cwd } = require('process');
const _ = require('lodash');
const JasmineReporters = require('jasmine-reporters');
const Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

const outputDir = join(cwd(), 'target', 'e2e');
const junitDir = join(outputDir, 'junit');

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

    // protractor_istanbul_plugin package
    plugins: [
        {
            path: '../node_modules/protractor-istanbul-plugin',
            outputPath: './e2e/coverage'
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

        fs.mkdirpSync(junitDir);

        // returning the promise makes protractor wait for the reporter config before executing tests
        return browser.getProcessedConfig().then(function(config) {
            browser.driver.getCapabilities().then(function(caps) {
                browser.browserName = caps.get('browserName');
            });

            var browserName = config.capabilities.browserName;

            // Add reporter which will output results in XML format
            jasmine.getEnv().addReporter(
                new JasmineReporters.JUnitXmlReporter({
                    consolidateAll: false,
                    savePath: junitDir,
                    filePrefix: `${browserName}.`
                })
            );

            // Add reporter which will output results in HTML format
            // jasmine.getEnv().addReporter(
            //     new Jasmine2HtmlReporter({
            //         takeScreenshots: false,
            //         // Save HTML results files in this folder
            //         savePath: './e2e/html',
            //         // Iclude browser name and date in the name of the HTML results file
            //         fileNamePrefix: browserName,
            //         fileNameDateSuffix: true,
            //         // Set to false to display only failures in the HTML results file
            //         showPassed: true,
            //         cleanDestination: false
            //     })
            // );

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
