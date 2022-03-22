const chalk = require('chalk');
const { execSync } = require('child_process');
const { argv, exit } = require('process');
const { moveSync, existsSync, unlinkSync, mkdirpSync, watch } = require('fs-extra');
const { join, dirname, resolve } = require('path');

const START_DELAY = 10000;
const RESTART_INTERVAL = 5000;
const DEBOUNCE_INTERVAL = 1000;

(async () => {
    const args = argv.slice(2);
    const cwd = resolve(args[0]);
    const outputPath = resolve(args[1]);

    // Wait for a bit while the old dist directory is deleted and recreated
    // Node watch is likely to crash if we dive right in
    await new Promise(resolve => setTimeout(resolve, START_DELAY));

    const outputDir = dirname(outputPath);
    mkdirpSync(outputDir);

    await startWatchWithRetry(cwd, outputPath);
})().catch(error => {
    err(error);
    exit(1);
});

async function startWatchWithRetry(cwd, outputPath) {
    let done = false;
    do {
        try {
            // create initial package
            createPackage(cwd, outputPath);

            // watch for future changes
            startWatch(cwd, outputPath);

            done = true;
        } catch (error) {
            warn('watch failed to start, retrying');
            await new Promise(resolve => setTimeout(resolve, RESTART_INTERVAL));
        }
    } while (!done);
}

function createPackage(cwd, outputPath) {
    if (existsSync(outputPath)) {
        unlinkSync(outputPath);
    }

    const outputDir = dirname(outputPath);

    // create the package tgz file
    const tempFileName = createTempPackage(cwd, outputDir);

    // rename to the requested filename
    moveSync(join(outputDir, tempFileName), outputPath);

    if (existsSync(outputPath)) {
        console.log(`✔ Package created: ${outputPath}`);
    }
}

function startWatch(cwd, outputPath) {
    let timeout;
    watch(cwd, { recursive: true }, () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            createPackage(cwd, outputPath);
        }, DEBOUNCE_INTERVAL);
    });
}

function createTempPackage(cwd, outputDir) {
    return execSync(`npm pack --quiet --pack-destination "${outputDir}"`, {
        cwd,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
}

function warn(...args) {
    console.warn(chalk.yellowBright('WARNING:'), ...args);
}

function err(...args) {
    console.error(chalk.red('ERROR:'), ...args);
}
