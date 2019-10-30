const { env } = require('process');
const _ = require('lodash');
const { join } = require('path');

const isJenkinsBuild = !!env.RE_BUILD_TYPE;

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
        path: '../node_modules/protractor-istanbul-plugin',
        outputPath: './e2e/coverage'
      },
      {
        package: 'protractor-image-comparison',
        options: {
            baselineFolder: join(process.cwd(), './e2e/screenshots'),
            formatImageName: `{tag}-{logName}-{width}x{height}`,
            screenshotPath: join(process.cwd(), '.tmp/'),
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

    jasmine.getEnv().addReporter(new Reporter(browser.params));
  },

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000,
    showTiming: true,
    print: function () { }
  }
};

// Custom reporter
function Reporter(options) {


  options.appDir = options.appDir || './';
  const _root = { appDir: options.appDir, suites: [] };
  log('AppDir: ' + options.appDir, +1);
  let _currentSuite;

  this.suiteStarted = function (suite) {
    _currentSuite = { description: suite.description, status: null, specs: [] };
    _root.suites.push(_currentSuite);
    log('Suite: ' + suite.description, +1);
  };

  this.suiteDone = function (suite) {
    let statuses = _currentSuite.specs.map(function (spec) {
      return spec.status;
    });
    statuses = _.uniq(statuses);
    const status = statuses.indexOf('failed') >= 0 ? 'failed' : statuses.join(', ');
    _currentSuite.status = status;
    log('Suite ' + _currentSuite.status + ': ' + suite.description, -1);
  };

  this.specStarted = function () {};

  this.specDone = function (spec) {
    var currentSpec = {
      description: spec.description,
      status: spec.status
    };
    if (spec.failedExpectations.length > 0) {
      currentSpec.failedExpectations = spec.failedExpectations;
    }

    _currentSuite.specs.push(currentSpec);
    log(spec.status + ' - ' + spec.description);

    // log reasons for failure
    spec.failedExpectations.forEach(failure => log(failure.message, 4));
  };

  // for console output
  var _pad;
  function log(str, indent) {
    _pad = _pad || '';
    if (indent === -1) {
      _pad = _pad.substr(2);
    }
    console.log(_pad + str);
    if (indent === 1) {
      _pad = _pad + '  ';
    }
  }

}