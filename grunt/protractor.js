const path = require('path');

module.exports = {
    e2e: {
        options: {
            configFile: path.join(process.cwd(), 'e2e', 'protractor.config.js'),
            keepAlive: true,
            noColor: false,
            webdriverManagerUpdate: true
        }
    }
};