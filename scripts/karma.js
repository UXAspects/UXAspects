const { glob } = require('glob');
const { SingleTestTransformLoader } = require('@angular-devkit/build-angular/src/webpack/plugins/single-test-transform');
const { generateWebpackConfig } = require('@angular-devkit/build-angular/src/utils/webpack-browser-config.js');
const { cwd } = require('process');
const { join } = require('path');
const { getCommonConfig } = require('@angular-devkit/build-angular/src/webpack/configs/common.js');
const { getStylesConfig } = require('@angular-devkit/build-angular/src/webpack/configs/styles.js');
const { getTypeScriptConfig } = require('@angular-devkit/build-angular/src/webpack/configs/typescript.js');
const { getTestConfig } = require('@angular-devkit/build-angular/src/webpack/configs');
const { logging } = require('@angular-devkit/core');
const karma = require('karma');
const logger = new logging.Logger('info')

const builderOptions = {
    main: 'src/test.ts',
    polyfills: 'src/polyfills.ts',
    tsConfig: 'tsconfig.spec.json',
    outputPath: '',
    scripts: [],
    styles: [
        'node_modules/bootstrap/dist/css/bootstrap.css',
        'src/styles/ux-aspects.less'
    ],
    budgets: [],
    assets: [],
    verbose: true,
    sourceMap: { styles: false, scripts: false, vendor: false },
    optimization: { styles: false, scripts: false, fonts: false },
    buildOptimizer: false,
    aot: false,
    vendorChunk: true,
    namedChunks: true,
    extractLicenses: false,
    outputHashing: 'none',
    watch: true,
    cache: {
        enabled: true,
        path: join(cwd(), '.angular')
    }
};

runKarma();

async function runKarma() {
    const karmaServer = new karma.Server(await getKarmaOptions(), (exitCode) => {
        if (exitCode === 0) {
            logger.info('Karma has exited successfully.');
        }
    });

    await karmaServer.start();
}

async function getKarmaOptions() {
    const karmaOptions = {};

    karmaOptions.buildWebpack = {
        options: builderOptions,
        webpackConfig: await getWebpackConfig(),
        logger,
        failureCb: () => {
        },
        successCb: () => {
        }
    };


    return karma.config.parseConfig(
        join(cwd(), 'karma.conf.js'),
        karmaOptions,
        { promiseConfig: true, throwErrors: true },
    );
}

async function getWebpackConfig() {
    const config = await generateWebpackConfig(
        cwd(),
        join(cwd(), 'src'),
        join(cwd(), 'src'),
        'karma',
        builderOptions,
        wco => [
            getCommonConfig(wco),
            getStylesConfig(wco),
            // can be removed after v13.1
            getTypeScriptConfig(wco),
            getTestConfig(wco),
        ], logger, {});

    config.module.rules.unshift({
        test: join(cwd(), 'src', 'test.ts'),
        use: {
            // cannot be a simple path as it differs between environments
            loader: SingleTestTransformLoader,
            options: {
                files: findTests(),
                logger,
            },
        },
    });

    return config;
}

function findTests() {
    // get test files relative to the src directory
    return glob.sync('./src/**/*.spec.ts').map(f => f.substr(5));
}
