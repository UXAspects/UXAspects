import { join } from 'path';
import { cwd } from 'process';

/**
 * The development documentation configuration.
 * @type import('@angular-devkit/build-angular/src/utils/normalize-builder-schema').NormalizedBrowserBuilderSchema
 */
export const developmentConfiguration = {
    outputPath: 'dist/docs',
    index: 'docs/index.html',
    main: 'docs/main.ts',
    polyfills: 'docs/polyfills.ts',
    progress: true,
    tsConfig: 'tsconfig.json',
    assets: [
        {
            'glob': '**/*',
            'input': 'docs/app/assets/',
            'output': '/assets/'
        },
        {
            'glob': 'favicon.ico',
            'input': 'docs/',
            'output': '/'
        },
        {
            'glob': '**/*',
            'input': 'src/fonts/',
            'output': '/assets/fonts/'
        },
        {
            'glob': '**/*',
            'input': 'src/img/',
            'output': '/assets/img/'
        }
    ],
    styles: ['docs/styles.less'],
    scripts: [],
    budgets: [],
    aot: true,
    buildOptimizer: false,
    vendorChunk: true,
    extractLicenses: false,
    sourceMap: { styles: true, scripts: true, vendor: true },
    optimization: { styles: false, scripts: false },
    namedChunks: true,
    cache: {
        enabled: true,
        path: join(cwd(), '.angular')
    },
    allowedCommonJsDependencies: ['chart.js'],
}

/**
 * The production documentation configuration.
 * @type import('@angular-devkit/build-angular/src/utils/normalize-builder-schema').NormalizedBrowserBuilderSchema
 */
export const productionConfiguration = {
    ...developmentConfiguration,
    buildOptimizer: true,
    vendorChunk: false,
    extractLicenses: true,
    sourceMap: { styles: false, scripts: false, vendor: false },
    optimization: { styles: true, scripts: true },
    namedChunks: false,
    budgets: [
        {
            type: 'initial',
            maximumWarning: '500kb',
            maximumError: '1mb'
        },
        {
            type: 'anyComponentStyle',
            maximumWarning: '2kb',
            maximumError: '4kb'
        }
    ],
    fileReplacements: [
        {
            replace: 'docs/environments/environment.ts',
            with: 'docs/environments/environment.prod.ts'
        }
    ],
    outputHashing: 'all'
}
