module.exports = {
    'documentation': require('../configs/webpack.prod.config.js')({
        theme: 'keppel'
    }),
    'documentation-hpe': require('../configs/webpack.prod.config.js')({
        theme: 'hpe'
    }),
    'develop': require('../configs/webpack.dev.config.js')
};
