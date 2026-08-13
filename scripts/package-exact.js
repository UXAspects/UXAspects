/*
 * Copyright 2015-2026 Micro Focus or one of its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
  deps.forEach(function (dep) {
    var depPackageJson = require('../node_modules/' + dep + '/package.json');
    packageJson[depsProperty][dep] = depPackageJson.version;
  });

  fs.writeFileSync(
    path.resolve(__dirname, '../package.json'),
    JSON.stringify(packageJson, null, 2)
  );
}
