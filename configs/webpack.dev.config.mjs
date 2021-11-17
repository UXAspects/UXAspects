// Master config for running docs + assets in webpack-dev-server

import docsConfig from './webpack.common.config.mjs';
import cssAssetsConfig from './webpack.css-assets.dev.config.mjs';

// ensure we run them in development mode
docsConfig.mode = 'development';
cssAssetsConfig.mode = 'development';

export default [docsConfig, cssAssetsConfig];
