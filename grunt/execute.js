const { join } = require('path');
const { cwd } = require('process');

const scripts = join(cwd(), 'scripts');
const uxaScripts = join(cwd(), 'node_modules', '@ux-aspects', 'ux-aspects-scripts', 'bin');
const ngCli = join(cwd(), 'node_modules', '@angular', 'cli', 'bin', 'ng.js');

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
        src: [join(scripts, 'protractor.js')]
    },
    'build-library': {
        src: [ngCli],
        options: {
            args: ['build', 'ux-aspects', '--configuration=production']
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
    'build-documentation': {
        src: [ngCli],
        options: {
            args: ['build', 'documentation', '--configuration=production'],
            nodeargs: ['--max-old-space-size=8192']
        }
    },
    'lint-documentation': {
        src: [ngCli],
        options: {
            args: ['lint', 'documentation']
        }
    },
    'lint-library': {
        src: [ngCli],
        options: {
            args: ['lint', 'ux-aspects']
        }
    },
    'lint-e2e': {
        src: [ngCli],
        options: {
            args: ['lint', 'ux-aspects-e2e']
        }
    },
};
