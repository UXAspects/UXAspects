const chalk = require('chalk');
const { existsSync, mkdirpSync, watch } = require('fs-extra');
const { dirname, isAbsolute, relative } = require('path');
const { cwd } = require('process');
const { createPackage } = require('./package');

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
                warn(error.message ?? error);
                warn('pack failed, retrying...');
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
        createPackage(pkg.dir, pkg.outputPath);

        if (existsSync(pkg.outputPath)) {
            console.log(`✔ Package created: ${pkg.outputPath}`);
        }
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
