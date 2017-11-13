var path = require('path');

var certificateFile = path.join('configs', 'webpack.docs.dev.pfx');

module.exports = {
    webpack_import_cert: {
        cmd: 'certutil',
        args: ['-f', '-importpfx', certificateFile]
    },
    e2e: {
        exec: 'npm run e2e',
    },
    build_library: {
        exec: 'npm run build:library'
    },
    e2e_coverage: {
        exec: 'npm run e2e_coverage',
    }
};
