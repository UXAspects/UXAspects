// Apply TypeScript transformations to ensure backwards compatibility
// with older versions of TypeScript and Angular

const glob = require('glob');
const { join } = require('path');
const { cwd } = require('process');
const ts = require('typescript');
const { readFileSync, writeFileSync } = require('fs');
const { transformerFactory } = require('ts-transform-readonly-array');

/**
 * Typescript 3.4 (Angular 8+) compiles `ReadonlyArray` to `readonly` which
 * is a breaking change and causes Angular < 8 to fail
 */
async function transformDeclarations() {

    // get all the declaration files
    const declarations = await getDeclarations();

    for (const declaration of declarations) {
        // get the absolute file path
        const path = join(cwd(), 'dist', declaration);
        applyTransform(path, transformerFactory);
    }
}

function getDeclarations() {
    return new Promise(resolve => {
        glob('**/*.d.ts', { cwd: join(cwd(), 'dist'), ignore: ['**/ng1/*.js', '**/docs/**/*.js'] }, (error, matches) => resolve(matches));
    });
}

// Angular 8 deprecated `defineInjectable` in favor of `ɵɵdefineInjectable`.
// `defineInjectable` is still available until Angular 11, so we should modify
// the imports and function calls to use the version supported in older
// versions of Angular
async function transformImports() {
    // get all the declaration files
    const bundles = await getBundles();

    for (const bundle of bundles) {
        // get the absolute file path
        const path = join(cwd(), 'dist', bundle);

        applyTransform(path, injectableTransformerFactory);
    }
}

function applyTransform(path, transformer) {

    // load the contents of the file
    const content = readFileSync(path, 'utf8');

    // convert the file to a source file
    const sourceFile = ts.createSourceFile(path, content, ts.ScriptTarget.ES2015, true);

    // create a printer to emit the modified file as a string
    const printer = ts.createPrinter();

    // perform the transformation
    const result = ts.transform(sourceFile, [transformer]);

    // get the transformed result
    const transformedSourceFile = result.transformed[0];

    // convert the transformed file
    const newContent = printer.printFile(transformedSourceFile);

    // cleanup afterwards
    result.dispose();

    // if the content has changed then we should output the new file
    if (content !== newContent) {
        writeFileSync(path, newContent);
    }
}

/** Fetch all build javascript files */
function getBundles() {
    return new Promise(resolve => {
        glob('**/*.js', { cwd: join(cwd(), 'dist') }, (error, matches) => resolve(matches));
    });
}

/**
 * Perform an identifier rename from `defineInjectable` to `ɵɵdefineInjectable`
 * and `ɵɵinject` to `inject`.
 *
 * There are only two possible places where these is used:
 * 1. In an import statement
 * 2. As an identifier on a static function
 */
const injectableTransformerFactory = (context) => (bundle) => {
    function visitor(node) {

        if (node.getText() === 'ɵɵdefineInjectable') {

            // rename `ɵɵdefineInjectable` identifier to `defineInjectable`
            if (ts.isIdentifier(node)) {
                return ts.createIdentifier('defineInjectable');
            }

            // rename `ɵɵdefineInjectable` import to `defineInjectable`
            if (ts.isImportSpecifier(node)) {
                return ts.createImportSpecifier(undefined, ts.createIdentifier('defineInjectable'));
            }
        }

        if (node.getText() === 'ɵɵinject') {

            // rename `ɵɵinject` identifier to `inject`
            if (ts.isIdentifier(node)) {
                return ts.createIdentifier('inject');
            }

            // rename `ɵɵinject` import to `inject`
            if (ts.isImportSpecifier(node)) {
                return ts.createImportSpecifier(undefined, ts.createIdentifier('inject'));
            }
        }

        return ts.visitEachChild(node, visitor, context);
    }
    return ts.visitNode(bundle, visitor);
};


transformDeclarations();
transformImports();