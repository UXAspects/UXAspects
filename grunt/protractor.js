const path = require('path');

module.exports = {
    e2e: {
        options: {
            configFile: path.join(process.cwd(), 'e2e', 'protractor.config.js'),
            keepAlive: true,
            noColor: false,
            webdriverManagerUpdate: false,            
            // For future use with browsers other than Chrome. Assumes local execution of 'webmanager-driver update'.
            //seleniumServerJar: path.join(process.cwd(), 'node_modules', 'protractor', 'node_modules', 'webdriver-manager', 'selenium', 'selenium-server-standalone-3.4.0.jar')
            
            collectorPort: 3011,
            coverageDir: path.join(process.cwd(), 'e2e'),
            args: {
                baseUrl: 'http://localhost:8080'
            }
        }
    }
};