module.exports = {
    library: ['dist/@ux-aspects', 'dist/bundles', 'dist/components', 'dist/directives', 'dist/pipes', 'dist/services', 'dist/index.d.ts', 'dist/package.json', 'dist/ux-aspects.d.ts', 'dist/ux-aspects.metadata.json'],
    documentation: 'dist/docs',
    ng1: 'dist/ng1',
    styles: 'dist/styles',
    fonts: 'dist/fonts',
    images: 'dist/img',
    less: 'dist/less',
    licenses: 'dist/Licenses',
    e2e: ['e2e/dist', 'e2e/_test-output', 'e2e/coverage', 'e2e/html', 'e2e/xml', 'e2e/chromedriver.exe'],
    shim: 'dist/dist',
    bower: 'target/bower',
    webdriver: 'node_modules/protractor/node_modules/webdriver-manager/selenium'
};