#!/usr/bin/env node
const fs = require('fs-extra');
const { resolve } = require('path');
const { cwd } = require('process');

const packagesPath = resolve(cwd(), 'packages');
const targetPath = resolve(cwd(), 'target');

// Clear the target directory
fs.removeSync(targetPath);

// Get current version
const version = fs.readJsonSync(resolve(cwd(), 'lerna.json')).version;
if (!version) throw `Couldn't read lerna version.`;

console.log(`Gathering version ${version}`);

// Check all package project directories for build artifacts
const packages = fs.readdirSync(packagesPath);
for (const package of packages) {

    const packagePath = resolve(packagesPath, package);

    // Verify that it's a directory
    const stat = fs.statSync(packagePath);
    if (stat.isDirectory()) {

        // Check package directory contents
        const packageFiles = fs.readdirSync(packagePath);
        for (const fileName of packageFiles) {

            const filePath = resolve(packagePath, fileName);
            const targetPackagePath = resolve(targetPath, package);

            if (fileName === 'target') {

                // Create directory target/<package>
                fs.ensureDirSync(targetPackagePath);

                // Copy all target files
                fs.copySync(filePath, targetPackagePath);

                console.log(`${filePath} -> ${targetPackagePath}`);
            }

            if (fileName.endsWith(`${version}.tgz`)) {

                // Create directory target/<package>/npm
                const targetNpmPath = resolve(targetPackagePath, 'npm');
                fs.ensureDirSync(targetNpmPath);

                // Copy the npm package file
                const targetNpmFilePath = resolve(targetNpmPath, fileName);
                fs.copySync(filePath, targetNpmFilePath);

                console.log(`${filePath} -> ${targetNpmFilePath}`);
            }
        }
    }
}
