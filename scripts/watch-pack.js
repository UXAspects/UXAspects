const { execSync } = require('child_process');
const { argv, exit } = require('process');
const { moveSync, existsSync, unlinkSync, mkdirpSync, watch } = require('fs-extra');
const { join, dirname, resolve } = require('path');

const DEBOUNCE_INTERVAL = 1000;

(async () => {
    const args = argv.slice(2);
    const cwd = resolve(args[0]);
    const outputPath = resolve(args[1]);

    // Wait for a bit while the old dist directory is deleted and recreated
    // Node watch is likely to crash if we dive right in
    await new Promise(resolve => setTimeout(resolve, 10000));

    const outputDir = dirname(outputPath);
    mkdirpSync(outputDir);

    // create initial package
    createPackage(cwd, outputPath);

    // recreate package after every change
    console.log('- Starting watch (this might crash but concurrently will relaunch the process)')
    let timeout;
    watch(cwd, { recursive: true }, () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            createPackage(cwd, outputPath);
        }, DEBOUNCE_INTERVAL);
    });
})().catch(error => {
    console.error('FATAL ERROR:', error);
    exit(1);
});

function createPackage(cwd, outputPath) {
    try {
        if (existsSync(outputPath)) {
            unlinkSync(outputPath);
        }

        const outputDir = dirname(outputPath);

        if (!existsSync(join(cwd, 'package.json'))) {
            console.warn(`WARN: no package.json found in ${cwd}`);
            return null;
        }

        // create the package tgz file
        const tempFileName = createTempPackage(cwd, outputDir);

        // rename to the requested filename
        moveSync(join(outputDir, tempFileName), outputPath);

        if (existsSync(outputPath)) {
            console.log(`✔ Package created: ${outputPath}`);
            return outputPath;
        }
    } catch (error) {
        console.warn('WARN: failed to create package', error);
    }

    return null;
}

function createTempPackage(cwd, outputDir) {
    return execSync(`npm pack --quiet --pack-destination "${outputDir}"`, {
        cwd,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
}
