const webpack = require('webpack');
const webpackConfig = require('../configs/webpack.docs.prod.config.js');

// run webpack to compile
webpack(webpackConfig, (err, stats) => {
    if (err) {
        console.error(err.stack || err);
        if (err.details) {
            console.error(err.details);
        }
        throw new Error('Webpack build failed');
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
        console.error(info.errors);
        throw new Error('Webpack build failed');
    }

    if (stats.hasWarnings()) {
        console.warn(info.warnings);
    }

    // log the webpack output
    console.log(stats.toString({
        chunks: false,
        colors: true
    }));
});
