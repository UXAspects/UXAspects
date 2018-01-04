const ng1 = require('../configs/webpack.ng1.config.js');
const e2e = require('../configs/webpack.e2e.config.js');

module.exports = {
    ng1: ng1,
    dev: Object.assign({ watch: true }, ng1),
    e2e: e2e
};