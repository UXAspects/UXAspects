const fs = require('fs');
const { env } = require('process');
const path = require('canonical-path');
const _ = require('lodash');
const { join } = require('path');
const JasmineReporters = require('jasmine-reporters');
const Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

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

    // Allow changing bootstrap mode to NG1 for upgrade tests
    global.setProtractorToNg1Mode = function () {
      browser.useAllAngular2AppRoots = false;
      browser.rootEl = 'body';
    };

    // returning the promise makes protractor wait for the reporter config before executing tests
    return browser.getProcessedConfig().then(function (config) {

      browser.driver.getCapabilities().then(function (caps) {
        browser.browserName = caps.get('browserName');
      });

      var browserName = config.capabilities.browserName;

      // Add reporter which will output results in XML format
      var junitReporter = new JasmineReporters.JUnitXmlReporter({
        consolidateAll: true,

        // Save XML results files in this folder
        savePath: './e2e/xml',

        //filePrefix: 'reportXMLoutput',
        // this will produce distinct xml files for each capability
        filePrefix: browserName + '-xmloutput',
        modifySuiteName: function (generatedSuiteName) {
          // this will produce distinct suite names for each capability,
          // e.g. 'firefox.login tests' and 'chrome.login tests'
          return browserName + '.' + generatedSuiteName;
        }
      });

      jasmine.getEnv().addReporter(junitReporter);

      // Add reporter which will output results in HTML format
      jasmine.getEnv().addReporter(
        new Jasmine2HtmlReporter({
          takeScreenshots: false,
          // Save HTML results files in this folder
          savePath: './e2e/html',
          // Iclude browser name and date in the name of the HTML results file
          fileNamePrefix: browserName,
          fileNameDateSuffix: true,
          // Set to false to display only failures in the HTML results file
          showPassed: true,
          cleanDestination: false
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

// Custom reporter
function Reporter(options) {

  var _defaultOutputFile = path.resolve(process.cwd(), './e2e/_test-output', 'protractor-results.txt');
  options.outputFile = options.outputFile || _defaultOutputFile;

  try {
      initOutputFile(options.outputFile);
  } catch(err) {}

  options.appDir = options.appDir || './';
  var _root = { appDir: options.appDir, suites: [] };
  log('AppDir: ' + options.appDir, +1);
  var _currentSuite;

  this.suiteStarted = function (suite) {
    _currentSuite = { description: suite.description, status: null, specs: [] };
    _root.suites.push(_currentSuite);
    log('Suite: ' + suite.description, +1);
  };

  this.suiteDone = function (suite) {
    var statuses = _currentSuite.specs.map(function (spec) {
      return spec.status;
    });
    statuses = _.uniq(statuses);
    var status = statuses.indexOf('failed') >= 0 ? 'failed' : statuses.join(', ');
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

  this.jasmineDone = function () {
    const outputFile = options.outputFile;
    //// Alternate approach - just stringify the _root - not as pretty
    //// but might be more useful for automation.
    // var output = JSON.stringify(_root, null, 2);
    var output = formatOutput(_root);
    fs.appendFileSync(outputFile, output);
  };

  function ensureDirectoryExistence(filePath) {
    var dirname = path.dirname(filePath);
    if (directoryExists(dirname)) {
      return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
  }

  function directoryExists(path) {
    try {
      return fs.statSync(path).isDirectory();
    }
    catch (err) {
      return false;
    }
  }

  function initOutputFile(outputFile) {
    ensureDirectoryExistence(outputFile);
    var header = "Protractor results for: " + (new Date()).toLocaleString() + "\n\n";
    fs.writeFileSync(outputFile, header);
  }

  // for output file output
  function formatOutput(output) {
    var indent = '  ';
    var pad = '  ';
    var results = [];
    results.push('AppDir:' + output.appDir);
    output.suites.forEach(function (suite) {
      results.push(pad + 'Suite: ' + suite.description + ' -- ' + suite.status);
      pad += indent;
      suite.specs.forEach(function (spec) {
        results.push(pad + spec.status + ' - ' + spec.description);
        if (spec.failedExpectations) {
          pad += indent;
          spec.failedExpectations.forEach(function (fe) {
            results.push(pad + 'message: ' + fe.message);
          });
          pad = pad.substr(2);
        }
      });
      pad = pad.substr(2);
      results.push('');
    });
    results.push('');
    return results.join('\n');
  }

  // for console output
  var _pad;
  function log(str, indent) {
    _pad = _pad || '';
    if (indent == -1) {
      _pad = _pad.substr(2);
    }
    console.log(_pad + str);
    if (indent == 1) {
      _pad = _pad + '  ';
    }
  }

}