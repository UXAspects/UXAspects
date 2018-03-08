const path = require('path');
const process = require('process');

module.exports = {
    e2e: {
        exec: 'npm run e2e',
    },
    build_library: {
        exec: 'npm run build:library'
    },
    'npm-pack-dist': {
        cwd: path.resolve(process.cwd(), 'dist'),
        exec: 'npm pack --ignore-scripts'
    }
};
