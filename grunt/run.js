const { join } = require('path');
const { cwd } = require('process');

module.exports = {
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
