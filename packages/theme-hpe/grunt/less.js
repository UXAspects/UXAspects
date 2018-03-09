const { cwd } = require('process');
const { resolve } = require('path'); 
const { getModulePath } = require('module-search');
const LessPluginNpmImport = require('less-plugin-npm-import');

module.exports = {
    hpe: {
        src: [resolve(cwd(), 'less', 'ux-aspects-hpe.less')],
        dest: resolve(cwd(), 'dist', 'css', 'ux-aspects.css'),
        options: {
            plugins: [
                new LessPluginNpmImport({
                    prefix: '~'
                })
            ]
        }
    }
}
