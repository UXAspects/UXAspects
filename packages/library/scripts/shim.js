/**
 * This script is for adding references to files if they change location
 * if the build output to prevent breaking references in existing projects
 */
const { cwd } = require('process');
const { existsSync, mkdirSync, writeFileSync } = require('fs');
const { copySync, copyFileSync } = require('fs-extra');
const { resolve } = require('path');
const { getModulePath } = require('module-search');

const buildPath = resolve(cwd(), 'dist');
const distPath = resolve(buildPath, 'dist');

const theme = getModulePath('@ux-aspects/theme');
const angularjs = getModulePath('@ux-aspects/ux-aspects-ng1');

/*
    Copy in Theme and AngularJS components
*/

// create all required directories
createDirectory(resolve(buildPath, 'fonts'));
createDirectory(resolve(buildPath, 'img'));
createDirectory(resolve(buildPath, 'less'));
createDirectory(resolve(buildPath, 'ng1'));
createDirectory(resolve(buildPath, 'styles'));

// copy AngularJS components
copySync(resolve(angularjs, './dist'), resolve(buildPath, './ng1'));
copySync(resolve(theme, './dist/css'), resolve(buildPath, './styles'));
copySync(resolve(theme, './dist/fonts'), resolve(buildPath, './fonts'));
copySync(resolve(theme, './dist/img'), resolve(buildPath, './img'));
copySync(resolve(theme, './dist/styles'), resolve(buildPath, './less'));

/**
 * Create the dist directory
 */
createDirectory(distPath);
/**
 * Shim the Stylesheet
 */
const cssPath = resolve(distPath, 'styles');

createDirectory(cssPath);

writeFileSync(
    resolve(cssPath, 'ux-aspects.css'), 
    `@import url("../../styles/ux-aspects.css");`
);

writeFileSync(
    resolve(cssPath, 'ux-aspects.min.css'), 
   `@import url("../../styles/ux-aspects.min.css");`
);


/**
 * Shim the Less Files
 */
const lessPath = resolve(distPath, 'less');

createDirectory(lessPath);

writeFileSync(
    resolve(lessPath, 'ux-aspects.less'), 
    `@import "../../less/ux-aspects.less";`
);

/**
 * Shim the Angular 1 components
 */

const ng1Path = resolve(distPath, 'ng1');

createDirectory(ng1Path);

copyFileSync(resolve(buildPath, './ng1/ux-aspects-ng1.js'), resolve(ng1Path, 'ux-aspects-ng1.js'));
copyFileSync(resolve(buildPath, './ng1/ux-aspects-ng1.min.js'), resolve(ng1Path, 'ux-aspects-ng1.min.js'));

/**
 * Shim the Angular components
 */
const libPath = resolve(distPath, 'lib');

createDirectory(libPath);

writeFileSync(
    resolve(libPath, 'index.js'), 
    `export * from '../../bundles/ux-aspects.umd';`
);


function createDirectory(path) {
    if (!existsSync(path)) {
        mkdirSync(path);
    }
}