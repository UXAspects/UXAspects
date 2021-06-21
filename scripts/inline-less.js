const fs = require('fs-extra');
const path = require('path');
const less = require('less');

// entry paths
const rootPath = process.cwd();
const stylesPath = path.join(rootPath, 'src', 'styles');

// dist folder paths
const distPath = path.join(rootPath, 'dist', 'library');
const lessDistPath = path.join(distPath, 'less');
const cssDistPath = path.join(distPath, 'styles');

// ensure output directories exists
fs.mkdirpSync(distPath);
fs.mkdirpSync(lessDistPath);
fs.mkdirpSync(cssDistPath);

// set up the less options
const options = {
    rootFileInfo: {
        currentDirectory: stylesPath
    }
};

(async () => {
    try {
        await renderDefaultStylesheet();
    } catch (err) {
        console.error(err.stack || err);
        process.exit(1);
    }
})();


async function renderDefaultStylesheet() {
    const less = await getInlinedLess('ux-aspects.less');
    await createStylesheets(less, 'ux-aspects');
}

/**
 * Read the given less source file, extract the import statements, and convert them into (inline) import statements.
 * @param {*} importFilter a function to filter the import statements that are returned.
 */
async function getInlinedLess(lessFileName, importFilter = () => true) {
    return new Promise((resolve, reject) => {

        // Read the source .less file
        const lessFilePath = path.join(stylesPath, lessFileName);
        const stylesheet = fs.readFileSync(lessFilePath, 'utf8');

        less.parse(stylesheet, options, (err, ruleset) => {

            if (err) {
                reject(new Error(err));
            }

            // make all the import statements inline
            const statements = ruleset.rules.filter(rule => rule.type === 'Import' && importFilter(rule))
                .map(rule => `@import (inline) "${ resolveTildePaths(rule.path.value) }";`)
                .join('\n');

            resolve(statements);
        });
    });
}

/**
 * Create .less and .css files within `dist` for the given less content.
 */
async function createStylesheets(less, stylesheetName) {

    const lessOutput = await lessRender(less);

    const lessDestinationPath = path.join(lessDistPath, `${stylesheetName}.less`)
    fs.writeFileSync(lessDestinationPath, lessOutput.css);
    console.log(lessDestinationPath);

    const cssOutput = await lessRender(lessOutput.css);

    const cssDestinationPath = path.join(cssDistPath, `${stylesheetName}.css`);
    fs.writeFileSync(cssDestinationPath, cssOutput.css);
    console.log(cssDestinationPath);
}

async function lessRender(input) {
    return new Promise((resolve, reject) => {
        less.render(input, options, (err, output) => {
            if (err) {
                reject(new Error(err));
            }

            resolve(output);
        });
    });
}

/**
 * Webpack allows the use of tilde to reference the node_modules folder
 * however the less.js library does not. This function will allow us to
 * continue to use the tilde to represent the node modules folder even
 * when using less.js to compile the source.
 *
 * This will allow people to import the ux-aspects.less file in their projects
 * as if we use a relative path to node_modules this may be incorrect due
 * to NPM flattening the folder structure.
 */
function resolveTildePaths(location) {

    // only make changes if the path starts with a tilde otherwise it is fine as it is
    if (location.indexOf('~') === 0) {
        // update the path to be {package_root}/node_nodules/{path}
        location = path.join(rootPath, 'node_modules', location.substr(1));
    }

    return location;
}
