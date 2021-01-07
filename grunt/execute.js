const { join } = require('path');
const { cwd } = require('process');

const scripts = join(cwd(), 'scripts');
const uxaScripts = join(cwd(), 'node_modules', '@ux-aspects', 'ux-aspects-scripts', 'bin');
const downlevelDts = join(cwd(), 'node_modules', 'downlevel-dts', 'index.js');
const ngPackagr = join(cwd(), 'node_modules', 'ng-packagr', 'cli', 'main.js');
const webpack = join(cwd(), 'node_modules', 'webpack', 'bin', 'webpack.js');

module.exports = {
    iconset: {
        src: [join(scripts, 'iconset.js')]
    },
    licenses: {
        src: [join(scripts, 'licenses.js')]
    },
    less: {
        src: [join(scripts, 'inline-less.js')]
    },
    protractor: {
        src: [join(cwd(), 'scripts', 'protractor.js')]
    },
    'downlevel-dts': {
        src: [downlevelDts],
        options: {
            args: [join(cwd(), 'dist', 'library'), join(cwd(), 'dist', 'library'), '--to', '3.7']
        }
    },
    ngpackagr: {
        src: [ngPackagr],
        options: {
            args: ['-p', 'src/ng-package.json']
        }
    },
    'package_artifactory_ux-aspects': {
        src: [join(uxaScripts, 'package-artifactory.js')],
        options: {
            args: ['ux-aspects', 'ux-aspects', 'dist/library']
        }
    },
    'package_artifactory_ux-aspects-docs': {
        src: [join(uxaScripts, 'package-artifactory.js')],
        options: {
            args: ['ux-aspects-docs', 'ux-aspects']
        }
    },
    webpack_documentation: {
        src: [webpack],
        options: {
            nodeargs: ['--max-old-space-size=4096'],
            args: ['--config', 'configs/webpack.docs.prod.config.js']
        }
    },
};
