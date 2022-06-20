const { join } = require('path');
const { cwd } = require('process');

const scripts = join(cwd(), 'scripts');
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
    'build-library': {
        src: [ngCli],
        options: {
            args: ['build', 'ux-aspects', '--configuration=production']
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
