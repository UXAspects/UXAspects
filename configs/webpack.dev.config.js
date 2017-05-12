// Master config for running docs + assets in webpack-dev-server

var docsConfig = require('./webpack.docs.dev.config.js');
var cssAssetsConfig = require('./webpack.css-assets.dev.config.js');
var libAssetsConfig = require('./webpack.lib-assets.dev.config.js');
var ng1AssetsConfig = require('./webpack.ng1-assets.dev.config.js');

module.exports = [docsConfig, cssAssetsConfig, libAssetsConfig, ng1AssetsConfig];
