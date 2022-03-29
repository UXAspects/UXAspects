import * as chalk from 'chalk';
import { execSync } from 'child_process';
import { existsSync, mkdirpSync, moveSync, unlinkSync, watch } from 'fs-extra';
import { dirname, isAbsolute, join, relative, resolve } from 'path';
import { cwd, exit } from 'process';

const RESTART_INTERVAL = 5000;
const DEBOUNCE_INTERVAL = 1000;

export interface Package {
    dir: string;
    outputPath: string;
}

interface InternalPackage extends Package {
    timeout?: NodeJS.Timeout;
}

export class WatchPack {
    private _packages: InternalPackage[];

    constructor(data: Package[]) {
        this._packages = data;
    }

    async run(): Promise<void> {
        this.createOutputDirs();

        await this.packAndWatchForChanges();
    }

    private createOutputDirs(): void {
        for (const watchInfo of this._packages) {
            const outputDir = dirname(watchInfo.outputPath);
            mkdirpSync(outputDir);
        }
    }

    private async packAndWatchForChanges(): Promise<void> {
        let done = false;
        do {
            try {
                // create initial package
                this.createPackages();

                // watch for future changes
                this.startWatch();

                done = true;
            } catch (error) {
                warn(error);
                warn('pack failed, retrying');
                await sleep(RESTART_INTERVAL);
            }
        } while (!done);
    }

    private createPackages() {
        for (const pkg of this._packages) {
            this.createPackage(pkg);
        }
    }

    private startWatch() {
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

    private getPackageForFile(filePath: string): InternalPackage | null {
        if (!filePath) {
            return null;
        }

        return this._packages.find(watchInfo => {
            const relativePath = relative(watchInfo.dir, filePath);
            return relativePath && !relativePath.startsWith('..') && !isAbsolute(relativePath);
        });
    }

    private createPackage(pkg: InternalPackage): void {
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

    private createTempPackage(dir: string, outputDir: string) {
        const command = `npm pack --quiet --pack-destination "${resolve(outputDir)}"`;
        return execSync(command, {
            cwd: dir,
            encoding: 'utf8',
            stdio: ['ignore', 'pipe', 'ignore'],
        }).trim();
    }
}

async function sleep(duration: number): Promise<void> {
    await new Promise(_resolve => setTimeout(_resolve, duration));
}

export function warn(...args: string[]) {
    console.warn(chalk.yellowBright('WARNING:'), ...args);
}

export function err(...args: string[]) {
    console.error(chalk.red('ERROR:'), ...args);
}
