const { join } = require('path');
const { cwd } = require('process');

module.exports = {
    iconset: {
        src: [ join(cwd(), 'scripts', 'iconset.js') ]
    },
    licenses: {
        src: [ join(cwd(), 'scripts', 'licenses.js') ]
    },
    less: {
        src: [ join(cwd(), 'scripts', 'inline-less.js') ]
    },
    shim: {
        src: [ join(cwd(), 'scripts', 'shim.js') ]
    },
    protractor: {
        src: [ join(cwd(), 'scripts', 'protractor.js') ]
    }
};