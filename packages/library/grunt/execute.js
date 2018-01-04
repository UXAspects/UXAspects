const path = require('path');

module.exports = {
    licenses: {
        src: [ path.join(process.cwd(), 'scripts', 'licenses.js') ]
    },
    less: {
        src: [ path.join(process.cwd(), 'scripts', 'inline-less.js') ]
    },
    shim: {
        src: [ path.join(process.cwd(), 'scripts', 'shim.js') ]
    }
};