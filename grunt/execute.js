const path = require('path');

module.exports = {
    iconset: {
        src: [ path.join(process.cwd(), 'scripts', 'iconset.js') ]
    },
    licenses: {
        src: [ path.join(process.cwd(), 'scripts', 'licenses.js') ]
    },
    less: {
        src: [ path.join(process.cwd(), 'scripts', 'inline-less.js') ]
    }
};