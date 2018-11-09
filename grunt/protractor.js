const path = require('path');

module.exports = {
    e2e: {
        options: {
            configFile: path.join(process.cwd(), 'e2e', 'protractor.config.js'),
            keepAlive: true,
            noColor: false,
            webdriverManagerUpdate: false,
            collectorPort: 3011,
            coverageDir: path.join(process.cwd(), 'e2e'),
            args: {
                baseUrl: 'http://localhost:4000'
            }
        }
    }
};