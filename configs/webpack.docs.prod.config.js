const { generateAngularWebpackConfig } = require('./utils/generate-angular-webpack-config');
const { productionConfiguration } = require('./documentation.js');
const { join } = require('path');
const { cwd } = require('process');
const { getDocumentationConfig } = require('./utils/documentation-webpack-partial');

module.exports = () => generateAngularWebpackConfig(
    'ux-aspects',
    join(cwd(), 'docs'),
    join(cwd(), 'docs', 'app'),
    productionConfiguration,
    [getDocumentationConfig()]
);
