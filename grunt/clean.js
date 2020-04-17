module.exports = {
    library: 'dist/library',
    styles: 'dist/styles',
    'ux-aspects_tgz': 'dist/library/ux-aspects-ux-aspects-*.*.*.tgz',
    'ux-aspects-docs_tgz': 'ux-aspects-ux-aspects-docs-*.*.*.tgz',
    documentation: 'dist/docs',
    e2e: ['e2e/dist', 'target/e2e'],
    target: ['target/bower', 'target/npm', 'target/artifactory', 'target/release-staging', 'target/docs']
};
