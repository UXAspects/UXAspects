// Master config for running docs + assets in webpack-dev-server

const docsConfig = require('./webpack.docs.dev.config.js');
const cssAssetsConfig = require('./webpack.css-assets.dev.config.js');
const libAssetsConfig = require('./webpack.lib-assets.dev.config.js');

// ensure we run them in development mode
docsConfig.mode = 'development';
cssAssetsConfig.mode = 'development';
libAssetsConfig.mode = 'development';

module.exports = [docsConfig, cssAssetsConfig, libAssetsConfig];
