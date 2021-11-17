import { generateAngularWebpackConfig } from './utils/generate-angular-webpack-config.mjs';
import { join } from 'path';
import { cwd } from 'process';

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
    cache: {
        enabled: true,
        path: join(cwd(), '.angular')
    },
    outputPath: '.tmp/e2e',
    index: './e2e/pages/index.html',
};

export default await generateAngularWebpackConfig('ux-aspects-e2e', join(cwd(), 'e2e'), join(cwd(), 'e2e', 'pages', 'app'), e2eConfiguration);
