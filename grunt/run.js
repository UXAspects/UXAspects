const { join } = require('path');
const { cwd } = require('process');

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
        exec: 'npm run library-build'
    },
    build_documentation_production: {
        exec: 'npm run documentation-build'
    },
    npm_pack: {
        options: {
            cwd: join(cwd(), 'dist')
        },
        exec: 'npm pack'
    },
    npm_pack_docs: {
        exec: 'npm pack'
    }
};
