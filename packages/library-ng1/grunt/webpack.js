module.exports = {
    build: require('../webpack.config'),
    develop: Object.assign({ watch: true }, require('../webpack.config'))
};