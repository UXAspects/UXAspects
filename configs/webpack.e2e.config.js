const { generateAngularWebpackConfig } = require('./utils/generate-angular-webpack-config.js');
const { join } = require('path');
const { cwd } = require('process');

/**
 * The e2e configuration.
 * @type import('@angular-devkit/build-angular/src/utils/normalize-builder-schema').NormalizedBrowserBuilderSchema
 */
const e2eConfiguration = {
    main: './e2e/pages/main.ts',
    polyfills: './e2e/pages/polyfills.ts',
    styles: ['./e2e/pages/styles.css'],
    scripts: [],
    tsConfig: './e2e/tsconfig.app.json',
    sourceMap: { styles: false, scripts: false, vendor: false },
    optimization: { styles: true, scripts: true },
    buildOptimizer: true,
    assets: [],
    progress: true,
    budgets: [],
    aot: true,
    outputHashing: 'all',
    deleteOutputPath: false,
    cache: {
        enabled: true,
        path: join(cwd(), '.angular')
    },
    outputPath: '.tmp/e2e',
    index: './e2e/pages/index.html',
};

module.exports = async () => {
    const config = await generateAngularWebpackConfig('ux-aspects-e2e', join(cwd(), 'e2e'), join(cwd(), 'e2e', 'pages', 'app'), e2eConfiguration);
    return ({
        ...config,
        devServer: {
            ...config.devServer,
            port: 4000,
            host: '127.0.0.1',
        }
    });
};
