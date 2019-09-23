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
    npm_setversion_release: {
        exec: 'node ./node_modules/@ux-aspects/ux-aspects-scripts/bin/setversion-release.js'
    },
    'npm_pack_ux-aspects': {
        options: {
            cwd: join(cwd(), 'dist')
        },
        exec: 'npm pack --quiet'
    },
    'npm_pack_ux-aspects-docs': {
        exec: 'npm pack --quiet --unsafe-perm'
    },
    webpack_ng1: {
        exec: 'node ./node_modules/webpack/bin/webpack.js --colors --config ./configs/webpack.ng1.config.js'
    }
};
