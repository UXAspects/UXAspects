#!/usr/bin/env node
/**
 * Sets the version in bower.json equal to the package.json version.
 */
const fs = require('fs-extra');
const { resolve } = require('path');
const { cwd } = require('process');

const packageJsonPath = resolve(cwd(), 'package.json');
const bowerJsonPath = resolve(cwd(), 'bower.json');

// Read JSON from package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

// Read JSON from bower.json
const bowerJson = JSON.parse(fs.readFileSync(bowerJsonPath, 'utf-8'));

// Apply the version to the bower object
bowerJson.version = packageJson.version;
console.log(bowerJson.version);

// Write out bower.json
fs.writeFileSync(bowerJsonPath, JSON.stringify(bowerJson, null, 4));
