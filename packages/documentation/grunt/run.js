const { cwd } = require('process');
const { resolve } = require('path');

var webpackConfigFile = resolve(cwd(), 'configs', 'webpack.prod.config.js');
var certificateFile = resolve(cwd(), 'configs', 'webpack.dev.pfx');

module.exports = {
    'webpack-cert': {
        cmd: 'certutil',
        args: ['-f', '-importpfx', certificateFile]
    }
};
