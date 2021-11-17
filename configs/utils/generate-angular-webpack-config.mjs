import { cwd } from 'process';
import { getCommonConfig } from '@angular-devkit/build-angular/src/webpack/configs/common.js';
import { getStylesConfig } from '@angular-devkit/build-angular/src/webpack/configs/styles.js';
import { getTypeScriptConfig } from '@angular-devkit/build-angular/src/webpack/configs/typescript.js';
import { generateWebpackConfig } from '@angular-devkit/build-angular/src/utils/webpack-browser-config.js';
import { logging } from '@angular-devkit/core';
import { getBrowserConfig } from '@angular-devkit/build-angular/src/webpack/configs/browser.js';
import { getDevServerConfig } from '@angular-devkit/build-angular/src/webpack/configs/dev-server.js';
import { applyWebpackTransforms } from './webpack-transform.mjs';
import { getIndexConfig } from './index-webpack-partial.mjs';

/**
 * Generate a webpack config using the Angular CLI.
 * @type import('@angular-devkit/build-angular/src/utils/normalize-builder-schema').NormalizedBrowserBuilderSchema
 */
export async function generateAngularWebpackConfig(projectName, projectRoot, sourceRoot, schema, webpackPartialGenerators = []) {
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

