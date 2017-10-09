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

let ng1Path = path.join(distPath, 'ng1');

if (!fs.existsSync(ng1Path)) {
    fs.mkdirSync(ng1Path);
}

fs.writeFileSync(
    path.join(ng1Path, 'ux-aspects-ng1.js'), 
    `export * from '../../ng1/ux-aspects-ng1';`
);

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