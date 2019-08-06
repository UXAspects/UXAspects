let fs = require('fs');
let path = require('path');
let less = require('less');

// entry paths
let rootPath = process.cwd();
let stylesPath = path.join(rootPath, 'src', 'styles');
let stylesheetPath = path.join(stylesPath, 'ux-aspects.less');

// dist folder paths
let distPath = path.join(rootPath, 'dist');
let lessDistPath = path.join(distPath, 'less');
let cssDistPath = path.join(distPath, 'styles');

// output file paths
let lessDestinationPath = path.join(lessDistPath, 'ux-aspects.less');
let cssDestinationPath = path.join(cssDistPath, 'ux-aspects.css');

// load in the original less file
let stylesheet = fs.readFileSync(stylesheetPath, 'utf8');

// set up the less options
let options = {
    rootFileInfo: {
        currentDirectory: stylesPath
    }
};

// ensure output directories exists
if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath);
}

if (!fs.existsSync(lessDistPath)) {
    fs.mkdirSync(lessDistPath);
}

if (!fs.existsSync(cssDistPath)) {
    fs.mkdirSync(cssDistPath);
}

// parse the less file
less.parse(stylesheet, options, (err, ruleset, imports, options) => {

    // make all the import statements inline
    let statements = ruleset.rules.filter(rule => rule.type === 'Import')
        .map(rule => `@import (inline) "${ resolveTildePaths(rule.path.value) }";`)
        .join('\n');

    // produce the inline less file
    less.render(statements, options, (err, output) => {

        if (err) {
            console.error(err);
            process.exit(1);
        }

        // output the less file
        fs.writeFileSync(lessDestinationPath, output.css);

        // convert to CSS
        less.render(output.css, (err, output) => {

            if (err) {
                console.error(err);
                process.exit(2);
            }

            // output the css file
            fs.writeFileSync(cssDestinationPath, output.css);

            // end the script
            process.exit();
        });

    });
});

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