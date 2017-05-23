var path = require('path');

var pemFile = path.join('node_modules', 'webpack-dev-server', 'ssl', 'server.pem');
var crtFile = path.join('node_modules', 'webpack-dev-server', 'ssl', 'server.crt');

module.exports = {
    webpack_extract_cert: {
        cmd: 'openssl',
        args: ['x509', '-outform', 'der', '-in', pemFile, '-out', crtFile]
    },
    webpack_import_cert: {
        cmd: 'certutil',
        args: ['-addstore', '-enterprise', '-f', 'Root',  crtFile]
    }
};
