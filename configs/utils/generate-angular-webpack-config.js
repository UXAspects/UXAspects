const { cwd } = require('process');
const { getCommonConfig } = require('@angular-devkit/build-angular/src/webpack/configs/common.js');
const { getStylesConfig } = require('@angular-devkit/build-angular/src/webpack/configs/styles.js');
const { getTypeScriptConfig } = require('@angular-devkit/build-angular/src/webpack/configs/typescript.js');
const { generateWebpackConfig } = require('@angular-devkit/build-angular/src/utils/webpack-browser-config.js');
const { logging } = require('@angular-devkit/core');
const { getBrowserConfig } = require('@angular-devkit/build-angular/src/webpack/configs/browser.js');
const { getDevServerConfig } = require('@angular-devkit/build-angular/src/webpack/configs/dev-server.js');
const { applyWebpackTransforms } = require('./webpack-transform.js');
const { getIndexConfig } = require('./index-webpack-partial.js');

/**
 * Generate a webpack config using the Angular CLI.
 * @type import('@angular-devkit/build-angular/src/utils/normalize-builder-schema').NormalizedBrowserBuilderSchema
 */
async function generateAngularWebpackConfig(projectName, projectRoot, sourceRoot, schema, webpackPartialGenerators = []) {
    const config = await generateWebpackConfig(
        cwd(),
        projectRoot,
        sourceRoot,
        projectName,
        schema,
        wco => [
            getDevServerConfig(wco),
            getCommonConfig(wco),
            // this is not required after Angular v13.1.0
            getBrowserConfig(wco),
            getStylesConfig(wco),
            // this is not required after Angular v13.1.0
            getTypeScriptConfig(wco),
            getIndexConfig(wco),
            ...webpackPartialGenerators,
        ], new logging.Logger('info'), {});

    return applyWebpackTransforms(config);
}

module.exports = {
    generateAngularWebpackConfig
}
