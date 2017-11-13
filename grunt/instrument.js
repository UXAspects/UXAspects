const path = require('path');

module.exports = {
    files: ['e2e/dist/app.js'],
    options: {
        lazy: false,
        basePath: path.join(process.cwd(), 'e2e', 'instrumented'),
    }
};