/*
    This script will generate a json file containing details on
    all the available icons in the UX Aspects icon set for use
    within our documentation
*/
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const { SyntaxKind, createVariableStatement, createModifier, createPrinter, updateSourceFileNode, createSourceFile, createVariableDeclarationList, createVariableDeclaration, createIdentifier, createArrayLiteral, createStringLiteral, NewLineKind, NodeFlags, ScriptTarget } = require('typescript');

const iconsets = [
    { name: 'ux', prefix: 'ux-icon' },
];

iconsets.forEach(iconset => {

    const iconPath = path.join(process.cwd(), 'src', 'icons', iconset.name);
    const outputPath = path.join(process.cwd(), 'docs', 'app', 'data', `${iconset.name}-icons.json`);

    getIcons(iconPath).then(icons => {

        // construct output object
        let output = {
            icons: icons.map(icon => {
                return {
                    name: path.parse(icon).name,
                    classname: `${iconset.prefix}-${path.parse(icon).name}`
                };
            })
        };

        // Output a json file to our docs data folder
        fs.writeFileSync(outputPath, JSON.stringify(output, null, 4));
    });

});

function getIcons(iconPath) {
    return new Promise((resolve) => {

        // find all SVG files in icons folder
        glob('**/*.svg', {
            cwd: iconPath
        }, (error, matches) => {

            if (error) {
                process.exit(1);
            }

            resolve(matches);
        });

    });

}

//
// Generate the list of icons for the Icon Component
//
async function generateIconComponentList() {
    const iconPath = path.join(process.cwd(), 'src', 'icons', 'ux');
    const svgs = await getIcons(iconPath);
    const icons = svgs.map(icon => createStringLiteral(path.parse(icon).name));

    // make the string literals use single quotes
    icons.forEach(icon => icon.singleQuote = true);

    let sourceFile = createSourceFile('common-icons.ts', '', ScriptTarget.Latest);

    // Add autogenerate comment at the top of the file
    const commonIcons = createVariableStatement(
        [createModifier(SyntaxKind.ExportKeyword)],
        createVariableDeclarationList([
            createVariableDeclaration(
                createIdentifier('commonIcons'),
                undefined,
                createArrayLiteral(icons, true)
            )],
        NodeFlags.Const
    ));

    // insert the array
    sourceFile = updateSourceFileNode(sourceFile, [commonIcons]);

    // create a printer to output file contents
    const printer = createPrinter({ newLine: NewLineKind.LineFeed });
    const header = `/** AUTOGENERATED: DO NOT MODIFY **/\n\n`;
    const contents = printer.printFile(sourceFile);
    const outputPath = path.join(process.cwd(), 'src', 'components', 'icon', 'iconsets', 'common-icons.ts');
    fs.writeFileSync(outputPath, header + contents);
}

generateIconComponentList();
