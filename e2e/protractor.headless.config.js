// FIRST TIME ONLY- run:
//   ./node_modules/.bin/webdriver-manager update
//
//   Try: `npm run webdriver:update`
//
// AND THEN EVERYTIME ...
//   1. Compile with `tsc`
//   2. Make sure the test server (e.g., lite-server: localhost:8080) is running.
//   3. ./node_modules/.bin/protractor protractor.config.js
//
//   To do all steps, try:  `npm run e2e`

var fs = require('fs');
var path = require('canonical-path');
var _ = require('lodash');

var JasmineReporters = require('jasmine-reporters');
var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

exports.config = {
  directConnect: true,

  chromeDriver: '../node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver_2.33',

  // Capabilities to be passed to the webdriver instance. Only one browser may be uncommented at a time.
  capabilities: {
    'browserName': 'chrome',
    chromeOptions: {
      args: [ "--headless", "--disable-gpu", "--no-sandbox", "--window-size=800x600" ]
    }

    // 'browserName': 'internet explorer',
    // 'browserName': 'firefox',
  },

  // Test one browser at a time
  maxSessions: 1,

  // For future use with browsers other than Chrome. Assumes local execution of 'webmanager-driver update'.
  // localSeleniumStandaloneOpts: {
  //   jvmArgs: [
  //     "-Dwebdriver.chrome.driver=.\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\chromedriver_2.30.exe",
  //     "-Dwebdriver.ie.driver=.\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\IEDriverServer3.4.0.exe",
  //     "-Dwebdriver.gecko.driver=.\\node_modules\\protractor\\node_modules\\webdriver-manager\\selenium\\geckodriver-v0.17.0.exe"
  //   ]
  // },
  
  // Framework to use. Jasmine is recommended.
  framework: 'jasmine',

  // Spec patterns are relative to this config file
  // specs: ['dist/**/*e2e-spec.js'],
  specs: ['dist/**/*e2e-spec.js'],

  // For angular tests
  useAllAngular2AppRoots: true,

  // Base URL for application server
  baseUrl: 'http://localhost:8080',

  onPrepare: function() {
    //// SpecReporter
    //var SpecReporter = require('jasmine-spec-reporter');
    //jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'none'}));
    //// jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));

    // debugging
    // console.log('browser.params:' + JSON.stringify(browser.params));
    jasmine.getEnv().addReporter(new Reporter( browser.params )) ;

    // Allow changing bootstrap mode to NG1 for upgrade tests
    global.setProtractorToNg1Mode = function() {
      browser.useAllAngular2AppRoots = false;
      browser.rootEl = 'body';
    };
    
    // returning the promise makes protractor wait for the reporter config before executing tests
    return browser.getProcessedConfig().then(function(config) {
        //var browserName;
        browser.driver.getCapabilities().then(function(caps) {
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
            modifySuiteName: function(generatedSuiteName, suite) {
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
    print: function() {}
  }
};

// Custom reporter
function Reporter(options) {
  var _defaultOutputFile = path.resolve(process.cwd(), './e2e/_test-output', 'protractor-results.txt');
  options.outputFile = options.outputFile || _defaultOutputFile;

  initOutputFile(options.outputFile);
  options.appDir = options.appDir ||  './';
  var _root = { appDir: options.appDir, suites: [] };
  log('AppDir: ' + options.appDir, +1);
  var _currentSuite;

  this.suiteStarted = function(suite) {
    _currentSuite = { description: suite.description, status: null, specs: [] };
    _root.suites.push(_currentSuite);
    log('Suite: ' + suite.description, +1);
  };

  this.suiteDone = function(suite) {
    var statuses = _currentSuite.specs.map(function(spec) {
      return spec.status;
    });
    statuses = _.uniq(statuses);
    var status = statuses.indexOf('failed') >= 0 ? 'failed' : statuses.join(', ');
    _currentSuite.status = status;
    log('Suite ' + _currentSuite.status + ': ' + suite.description, -1);
  };

  this.specStarted = function(spec) {

  };

  this.specDone = function(spec) {
    var currentSpec = {
      description: spec.description,
      status: spec.status
    };
    if (spec.failedExpectations.length > 0) {
      currentSpec.failedExpectations = spec.failedExpectations;
    }

    _currentSuite.specs.push(currentSpec);
    log(spec.status + ' - ' + spec.description);
  };

  this.jasmineDone = function() {
    outputFile = options.outputFile;
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
    output.suites.forEach(function(suite) {
      results.push(pad + 'Suite: ' + suite.description + ' -- ' + suite.status);
      pad+=indent;
      suite.specs.forEach(function(spec) {
        results.push(pad + spec.status + ' - ' + spec.description);
        if (spec.failedExpectations) {
          pad+=indent;
          spec.failedExpectations.forEach(function (fe) {
            results.push(pad + 'message: ' + fe.message);
          });
          pad=pad.substr(2);
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
