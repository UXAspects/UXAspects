// Master config for running docs + assets in webpack-dev-server

const docsConfig = require('./webpack.docs.dev.config.js');
const cssAssetsConfig = require('./webpack.css-assets.dev.config.js');
const libAssetsConfig = require('./webpack.lib-assets.dev.config.js');
const ng1AssetsConfig = require('./webpack.ng1-assets.dev.config.js');

// ensure we run them in development mode
docsConfig.mode = 'development';
cssAssetsConfig.mode = 'development';
libAssetsConfig.mode = 'development';
ng1AssetsConfig.mode = 'development';

module.exports = [docsConfig, cssAssetsConfig, libAssetsConfig, ng1AssetsConfig];
