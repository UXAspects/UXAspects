const { config } = require('./protractor.config');

// Configuration for running Protractor on a development environment
config.directConnect = false;
config.seleniumAddress = 'http://127.0.0.1:4444/wd/hub';
config.chromeDriver = null;

config.plugins.find(plugin => plugin.package === 'protractor-image-comparison').options.autoSaveBaseline = true;

exports.config = config;
