var path = require('path');

var certificateFile = path.join('configs', 'webpack.docs.dev.pfx');
var webdriverManager = path.join('node_modules', 'protractor', 'node_modules', 'webdriver-manager');

module.exports = {
    webpack_import_cert: {
        cmd: 'certutil',
        args: ['-f', '-importpfx', certificateFile]
    },
    webdriver_manager_update: {
        options: {
            cwd: webdriverManager
        },
        cmd: './bin/webdriver-manager',
        args: ['update']
    },
    e2e: {
        exec: 'npm run e2e',
    },
    build_library: {
        exec: 'npm run build:library'
    }
};
