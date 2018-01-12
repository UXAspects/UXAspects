var path = require('path');

var certificateFile = path.join('configs', 'webpack.dev.pfx');

module.exports = {
    'webpack-cert': {
        cmd: 'certutil',
        args: ['-f', '-importpfx', certificateFile]
    }
};
