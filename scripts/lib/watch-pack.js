const chalk = require('chalk');
const { execSync } = require('child_process');
const { existsSync, mkdirpSync, moveSync, unlinkSync, watch } = require('fs-extra');
const { dirname, isAbsolute, join, relative, resolve } = require('path');
const { cwd } = require('process');

const RESTART_INTERVAL = 5000;
const DEBOUNCE_INTERVAL = 1000;

class WatchPack {
    constructor(data) {
        this._packages = data;
    }

    async run() {
        this.createOutputDirs();

        await this.packAndWatchForChanges();
    }

    createOutputDirs() {
        for (const watchInfo of this._packages) {
            const outputDir = dirname(watchInfo.outputPath);
            mkdirpSync(outputDir);
        }
    }

    async packAndWatchForChanges() {
        let done = false;
        do {
            try {
                // create initial package
                this.createPackages();

                // watch for future changes
                this.startWatch();

                done = true;
            } catch (error) {
                warn('pack failed, retrying');
                await sleep(RESTART_INTERVAL);
            }
        } while (!done);
    }

    createPackages() {
        for (const pkg of this._packages) {
            this.createPackage(pkg);
        }
    }

    startWatch() {
        watch(cwd(), { recursive: true }, (_, fileName) => {
            const pkg = this.getPackageForFile(fileName);
            if (pkg) {
                clearTimeout(pkg.timeout);
                pkg.timeout = setTimeout(() => {
                    this.createPackage(pkg);
                }, DEBOUNCE_INTERVAL);
            }
        });
    }

    getPackageForFile(filePath) {
        if (!filePath) {
            return null;
        }

        return this._packages.find(watchInfo => {
            const relativePath = relative(watchInfo.dir, filePath);
            return relativePath && !relativePath.startsWith('..') && !isAbsolute(relativePath);
        });
    }

    createPackage(pkg) {
        if (existsSync(pkg.outputPath)) {
            unlinkSync(pkg.outputPath);
        }

        const outputDir = dirname(pkg.outputPath);

        // create the package tgz file
        const tempFileName = this.createTempPackage(pkg.dir, outputDir);

        // rename to the requested filename
        moveSync(join(outputDir, tempFileName), pkg.outputPath);

        if (existsSync(pkg.outputPath)) {
            console.log(`✔ Package created: ${pkg.outputPath}`);
        }
    }

    createTempPackage(dir, outputDir) {
        const command = `npm pack --quiet --pack-destination "${resolve(outputDir)}"`;
        return execSync(command, {
            cwd: dir,
            encoding: 'utf8',
        }).trim();
    }
}

async function sleep(duration) {
    await new Promise(_resolve => setTimeout(_resolve, duration));
}

function warn(...args) {
    console.warn(chalk.yellowBright('WARNING:'), ...args);
}

function err(...args) {
    console.error(chalk.red('ERROR:'), ...args);
}

module.exports = {
    WatchPack,
    warn,
    err,
};
