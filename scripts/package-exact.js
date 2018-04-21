/* jshint node:true */
/* eslint-env node */

/*
 * This will look at the current version of all of your dependencies and update your package.json
 * with the specific version that you currently have in node_modules. This will save you from the
 * sadness that is: DEPENDENCY MANAGEMENT
 *
 * Place this file in a folder that's a a sibling to your package.json and node_modules
 * Then simply run: node scripts/package-exact
 * (replace "scripts" with the name of the folder you placed this stuff in)
 *
 * When you're ready to update dependencies, I recommend https://github.com/bahmutov/next-update
 */


var fs = require('fs');
var path = require('path');

var packageJson = require('../package.json');
strictifyDeps('devDependencies');
console.log('done!');

function strictifyDeps(depsProperty) {
  var deps = Object.keys(packageJson[depsProperty]);
  deps.forEach(function(dep) {
    var depPackageJson = require('../node_modules/' + dep + '/package.json');
    packageJson[depsProperty][dep] = depPackageJson.version;
  });

  fs.writeFileSync(path.resolve(__dirname, '../package.json'), JSON.stringify(packageJson, null, 2));
}