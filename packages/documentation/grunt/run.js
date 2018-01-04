var path = require('path');

var certificateFile = path.join('configs', 'webpack.docs.dev.pfx');

module.exports = {
    'webpack-cert': {
        cmd: 'certutil',
        args: ['-f', '-importpfx', certificateFile]
    }
};
