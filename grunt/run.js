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
    library_build: {
        exec: 'npm run library-build'
    },
    documentation_build: {
        exec: 'node --max-old-space-size=4096 ./node_modules/webpack/bin/webpack.js --colors --config ./configs/webpack.docs.prod.config.js'
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
