const { resolve } = require('path');
const { cwd } = require('process');

module.exports = {
    'jasmine-report': {
        src: resolve(cwd(), 'scripts', 'jasmine-report.js')
    }
};
