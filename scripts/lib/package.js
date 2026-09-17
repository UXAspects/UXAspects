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
const { spawnSync } = require('child_process');
const { existsSync, moveSync, unlinkSync, mkdirpSync } = require('fs-extra');
const { dirname, join, resolve } = require('path');

function createPackage(dir, outputPath) {
  if (existsSync(outputPath)) {
    unlinkSync(outputPath);
  }

  const outputDir = dirname(outputPath);

  // create the package tgz file
  const tempFileName = createTempPackage(dir, outputDir);

  // rename to the requested filename
  moveSync(join(outputDir, tempFileName), outputPath);
}

function createTempPackage(dir, outputDir) {
  if (!existsSync(join(dir, 'package.json'))) {
    throw new Error(`package.json not found in ${dir}`);
  }

  if (!existsSync(outputDir)) {
    mkdirpSync(outputDir);
  }

  const command = `npm pack --quiet --pack-destination "${resolve(outputDir)}"`;
  const process = spawnSync(command, {
    cwd: dir,
    encoding: 'utf8',
    shell: true,
  });

  if (process.status || process.error) {
    throw new Error(`command failed: ${command}\ncwd: ${dir}\n${process.error ?? process.stderr}`);
  }

  return process.stdout.trim();
}

module.exports = {
  createPackage,
};
