const { env } = require('process');
const { join } = require('path');
const { mkdirpSync } = require('fs-extra');
const { cwd } = require('process');
const { JUnitXmlReporter } = require('jasmine-reporters');
const { SpecReporter } = require('jasmine-spec-reporter');
const webpack = require('webpack');
const express = require('express');
const webpackConfig = require('../configs/webpack.e2e.config');

const e2eHostPort = 4000;
const e2eHostAddress = env.E2E_HOST_ADDRESS || 'localhost';
const outputDir = join(cwd(), 'target', 'e2e');
const junitDir = join(outputDir, 'junit');
const screenshotOutputDir = join(outputDir, 'screenshots');

// Configuration for running Protractor on Jenkins
exports.config = {
  directConnect: true,
  chromeDriver: require('chromedriver').path,
  baseUrl: `http://${e2eHostAddress}:${e2eHostPort}/#/`,

  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: [
        "--headless",
        "--disable-gpu",
        "--no-sandbox",
        "--disable-dev-shm-usage",
        "--window-size=800x600",
        "--log-level=1"
      ],
      w3c: false
    },
    shardTestFiles: true,
    maxInstances: 5
  },

  maxSessions: 3,

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000,
    showTiming: true,
    print: function () { }
  },

  beforeLaunch: onBeforeLaunch,
  afterLaunch: onAfterLaunch,

  // Spec patterns are relative to this config file
  specs: ['./tests/**/**/*.e2e-spec.ts'],

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
  ],

  useAllAngular2AppRoots: true,

  onPrepare: function () {

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
};

let webServer;

async function onBeforeLaunch() {
    await startWebServer();
}

function onAfterLaunch() {
    if (webServer) {
        webServer.close();
        webServer = null;
        console.log('Stopped webserver.')
    }
}

async function startWebServer() {
    return new Promise((resolve, reject) => {
        console.log('Starting webpack compilation...');
        webpack(webpackConfig, (err, stats) => {
            if (err || stats.hasErrors()) {
                reject(err || 'Webpack compilation failed.');
            }

            webServer = express().use(express.static(join(__dirname, 'dist'))).listen(e2eHostPort);
            console.log(`Webserver is listening on port ${e2eHostPort}.`);

            resolve();
        });
    });
}
