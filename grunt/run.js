module.exports = {
    'package-library': {
        exec: 'ux-package ./dist/library --output ./target/npm/ux-aspects-ux-aspects.tgz --artifactory',
    },
    'package-docs-library': {
        exec: 'ux-package . --output ./target/npm/ux-aspects-ux-aspects-docs.tgz --artifactory --remove-scripts',
    },
};
