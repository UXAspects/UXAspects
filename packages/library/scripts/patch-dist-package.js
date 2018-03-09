#!/usr/bin/env node
/**
 * dist/package.json contains file paths under dist. This script is for fixing those up, ensuring that the
 * main package.json continues to work with `npm link`.
 */
const { cwd } = require('process');
const fs = require('fs');
const path = require('path');

const packageJsonPath = path.resolve(cwd(), 'dist', 'package.json');

// Load the contents of dist/package.json
const content = fs.readFileSync(packageJsonPath, 'utf-8');

let packageJson = JSON.parse(content);

// Remove the `files` property, since it specifies the `dist` directory.
delete packageJson.files;

// Write back to dist/package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 4));
