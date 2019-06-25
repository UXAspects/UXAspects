/*
    This script will generate a json file containing details on
    all the available icons in the UX Aspects icon set for use
    within our documentation
*/
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const iconsets = [
    { name: 'hpe', prefix: 'hpe' },
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

})

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