/**
 * Typescript 3.4 (Angular 8+) compiles `ReadonlyArray` to `readonly` which
 * is a breaking change and causes Angular < 8 to fail
 */

const glob = require('glob');
const { join } = require('path');
const { cwd } = require('process');
const ts = require('typescript');
const { readFileSync, writeFileSync } = require('fs');
const { transformerFactory } = require('ts-transform-readonly-array');

async function transform() {

    // get all the declaration files
    const declarations = await getDeclarations();

    for (const declaration of declarations) {
        // get the absolute file path
        const path = join(cwd(), 'dist', declaration);

        // load the contents of the file
        const content = readFileSync(path, 'utf8');

        // convert the file to a source file
        const sourceFile = ts.createSourceFile(path, content, ts.ScriptTarget.ES2015, true);

        // create a printer to emit the modified file as a string
        const printer = ts.createPrinter();

        // perform the transformation
        const result = ts.transform(sourceFile, [transformerFactory]);

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
}

function getDeclarations() {
    return new Promise(resolve => {
        glob('**/*.d.ts', {
            cwd: join(cwd(), 'dist')
        }, (error, matches) => {

            if (error) {
                process.exit(1);
            }

            resolve(matches);
        });
    });
}

transform();