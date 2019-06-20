const { join } = require('path');
const { cwd } = require('process');

const certificateFile = join('configs', 'webpack.docs.dev.pfx');

module.exports = {
    webpack_import_cert: {
        cmd: 'certutil',
        args: ['-f', '-importpfx', certificateFile]
    },
    'npm_pack_ux-aspects': {
        options: {
            cwd: join(cwd(), 'dist', 'library')
        },
        exec: 'npm pack --quiet'
    },
    'npm_pack_ux-aspects-docs': {
        exec: 'npm pack --quiet --unsafe-perm'
    }
};
