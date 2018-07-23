const { join } = require('path');

const certificateFile = join('configs', 'webpack.docs.dev.pfx');

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
    build_documentation_production: {
        exec: 'npm run build:documentation:prod'
    }
};
