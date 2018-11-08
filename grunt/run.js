const { join } = require('path');
const { cwd } = require('process');

const certificateFile = join('configs', 'webpack.docs.dev.pfx');

module.exports = {
    webpack_import_cert: {
        cmd: 'certutil',
        args: ['-f', '-importpfx', certificateFile]
    },
    angular_components_build: {
        exec: 'node ./node_modules/ng-packagr/cli/main.js -p ./src/ng-package.json'
    },
    documentation_build: {
        exec: 'node --max-old-space-size=4096 ./node_modules/webpack/bin/webpack.js --colors --config ./configs/webpack.docs.prod.config.js'
    },
    npm_pack: {
        options: {
            cwd: join(cwd(), 'dist')
        },
        exec: 'npm pack --quiet'
    },
    npm_pack_docs: {
        exec: 'npm pack --quiet'
    },
    webpack_ng1: {
        exec: 'node ./node_modules/webpack/bin/webpack.js --colors --config ./configs/webpack.ng1.config.js'
    }
};
