const path = require('path');

module.exports = {
    licenses: {
        src: [path.resolve(process.cwd(), 'scripts', 'licenses.js')]
    },
    less: {
        src: [path.resolve(process.cwd(), 'scripts', 'inline-less.js')]
    },
    shim: {
        src: [path.resolve(process.cwd(), 'scripts', 'shim.js')]
    },
    'patch-dist-package': {
        src: [path.resolve(process.cwd(), 'scripts', 'patch-dist-package.js')]
    }
};
