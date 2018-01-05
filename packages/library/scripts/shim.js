/**
 * This script is for adding references to files if they change location
 * if the build output to prevent breaking references in existing projects
 */
const fs = require('fs');
const path = require('path');

const buildPath = path.join(process.cwd(), 'dist');
const distPath = path.join(buildPath, 'dist');


/**
 * Create the dist directory
 */
if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath);
}

/**
 * Shim the Stylesheet
 */
let cssPath = path.join(distPath, 'styles');

if (!fs.existsSync(cssPath)) {
    fs.mkdirSync(cssPath);
}

fs.writeFileSync(
    path.join(cssPath, 'ux-aspects.css'), 
    `@import url("../../styles/ux-aspects.css");`
);

fs.writeFileSync(
   path.join(cssPath, 'ux-aspects.min.css'), 
   `@import url("../../styles/ux-aspects.min.css");`
);


/**
 * Shim the Less Files
 */
let lessPath = path.join(distPath, 'less');

if (!fs.existsSync(lessPath)) {
    fs.mkdirSync(lessPath);
}

fs.writeFileSync(
    path.join(lessPath, 'ux-aspects.less'), 
    `@import "../../less/ux-aspects.less";`
);

/**
 * Shim the Angular 1 components
 */

 /*
let ng1Path = path.join(distPath, 'ng1');

if (!fs.existsSync(ng1Path)) {
    fs.mkdirSync(ng1Path);
}

//  Duplicating this file as they may not be using a module loader if using ng1 only
let ng1FileContents = fs.readFileSync(path.join(buildPath, 'ng1', 'ux-aspects-ng1.js'), 'utf8');

fs.writeFileSync(
    path.join(ng1Path, 'ux-aspects-ng1.js'), 
    ng1FileContents
);


//  Duplicating this file as they may not be using a module loader if using ng1 only
let ng1MinFileContents = fs.readFileSync(path.join(buildPath, 'ng1', 'ux-aspects-ng1.min.js'), 'utf8');

fs.writeFileSync(
    path.join(ng1Path, 'ux-aspects-ng1.min.js'), 
    ng1MinFileContents
);
*/

/**
 * Shim the Angular components
 */
let libPath = path.join(distPath, 'lib');

if (!fs.existsSync(libPath)) {
    fs.mkdirSync(libPath);
}

fs.writeFileSync(
    path.join(libPath, 'index.js'), 
    `export * from '../../bundles/ux-aspects.umd';`
);