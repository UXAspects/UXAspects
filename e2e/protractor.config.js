const { env } = require('process');
const { join } = require('path');
const { mkdirpSync } = require('fs-extra');
const { cwd } = require('process');
const { JUnitXmlReporter } = require('jasmine-reporters');
const { SpecReporter } = require('jasmine-spec-reporter');

const isJenkinsBuild = !!env.RE_BUILD_TYPE;
const outputDir = join(cwd(), 'target', 'e2e');
const junitDir = join(outputDir, 'junit');
const screenshotOutputDir = join(outputDir, 'screenshots');

exports.config = {
  directConnect: true,  // Set to false if using Selenium Grid
  chromeDriver: require('chromedriver').path,

  // Capabilities to be passed to the webdriver instance. Only one browser may be uncommented at a time.
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ["--headless", "--disable-gpu", "--no-sandbox", "--window-size=800x600"]
    },
    shardTestFiles: true,
    maxInstances: 5
  },

  // Test one browser at a time
  maxSessions: 5,

  // Framework to use. Jasmine is recommended.
  framework: 'jasmine',

  // Spec patterns are relative to this config file
  specs: ['./tests/**/**/*e2e-spec.ts'],

  plugins: [
    {
      package: 'protractor-image-comparison',
      options: {
        baselineFolder: join(cwd(), './e2e/screenshots'),
        formatImageName: `{tag}-{logName}-{width}x{height}`,
        screenshotPath: screenshotOutputDir,
        savePerInstance: true,
        autoSaveBaseline: !isJenkinsBuild,
        ignoreAntialiasing: true
      },
    },
    {
      package: 'protractor-console-plugin',
      failOnError: true,
      logWarnings: false,
      exclude: [
        new RegExp(/favicon.ico/, 'g')
      ]
    }
  ],

  // For angular tests
  useAllAngular2AppRoots: true,

  // Base URL for application server
  baseUrl: 'http://localhost:4000',

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

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000,
    showTiming: true,
    print: function () { }
  }
};
