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
