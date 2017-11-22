const path = require('path');

module.exports = {
    src: path.join(process.cwd(), 'e2e', 'coverage', '*.json'),
    options: {
        type: ['text-summary', 'html', 'json-summary'],
        dir: path.join(process.cwd(), 'e2e', 'coverage', 'reports'),
        print: 'both'
    }
};