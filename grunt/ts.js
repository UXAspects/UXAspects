const path = require('path');

module.exports = {
    e2e: {
        tsconfig: path.join(process.cwd(), 'e2e', 'tsconfig.json')
    }
};