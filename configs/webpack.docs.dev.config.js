const { generateAngularWebpackConfig } = require('./utils/generate-angular-webpack-config');
const { developmentConfiguration } = require('./documentation');
const { join } = require('path');
const { cwd } = require('process');
const { getDocumentationConfig } = require('./utils/documentation-webpack-partial');

module.exports = () => generateAngularWebpackConfig(
    'ux-aspects',
    join(cwd(), 'docs'),
    join(cwd(), 'docs', 'app'),
    developmentConfiguration,
    [getDocumentationConfig()]
);
