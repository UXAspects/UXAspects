var path = require('path');
var process = require('process');

module.exports = {
    readme: {
        src: 'README.md',
        dest: path.resolve(process.cwd(), 'dist', 'README.md')
    },
    webdriver: {
        options: {
            mode: true,
        },
        cwd: path.join(process.cwd(), 'node_modules', 'chromedriver', 'lib', 'chromedriver'),
        src: 'chromedriver!(*.zip)',
        dest: path.join(process.cwd(), 'e2e'),
        expand: true
    },
    'dist-package': {
        src: 'dest/ux-aspects-ux-aspects-*.tgz',
        dest: process.cwd(),
        expand: true
    }
};