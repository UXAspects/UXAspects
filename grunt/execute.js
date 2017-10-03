const path = require('path');
const process = require('process');

module.exports = {
    iconset: {
        src: [ path.join(process.cwd(), 'scripts', 'iconset.js') ]
    },
    licenses: {
        src: [ path.join(process.cwd(), 'scripts', 'licenses.js') ]
    },
    'inline-component-less': {
        src: [ path.join(process.cwd(), 'scripts', 'inline-component-less.js') ]
    }
};