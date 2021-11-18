const { generateAngularWebpackConfig } = require('./utils/generate-angular-webpack-config');
const { developmentConfiguration } = require('./documentation');
const { join } = require('path');
const { cwd } = require('process');
const { getDocumentationConfig } = require('./utils/documentation-webpack-partial');

module.exports = async () => {
    const config = await generateAngularWebpackConfig(
        'ux-aspects',
        join(cwd(), 'docs'),
        join(cwd(), 'docs', 'app'),
        developmentConfiguration,
        [getDocumentationConfig()]
    );

    return { ...config, watch: true };
};
