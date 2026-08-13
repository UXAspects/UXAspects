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
const { execSync } = require('child_process');
const { argv, exit } = require('process');
const { join } = require('path');
const { mkdirpSync } = require('fs-extra');

const args = argv.slice(2);
const image = args[0] || 'uxaspects/buildenv:latest';
const command = args[1] ? `/bin/bash -c "${args[1]}"` : '/bin/bash';
const http_proxy = process.env.HTTP_PROXY;
const https_proxy = process.env.HTTPS_PROXY;
const cwd = process.cwd();
const nodeModulesDocker = join(cwd, '.node_modules__docker');

// Ensure the docker node_modules directory exists
mkdirpSync(nodeModulesDocker);

// produce the docker command string
const dockerCommand = `docker run --rm -it --memory=4g -e "http_proxy=${http_proxy}" -e "https_proxy=${https_proxy}" -v "${cwd}:/wd" -v "${nodeModulesDocker}:/wd/node_modules" -w /wd ${image} ${command}`;

// run the command string with the inherited terminal
try {
  execSync(dockerCommand, { stdio: 'inherit' });
} catch (error) {
  console.warn(`Exited: ${error.message || error.signal}`);
}

// Avoid a whole bunch of NPM errors when leaving the container
exit(0);
