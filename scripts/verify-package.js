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

/**
 * Verifies that a packaged npm tarball is internally consistent: every file that
 * its package.json points at (main, module, typings/types and every leaf of the
 * `exports` map) must actually be present in the tarball, and at least one
 * TypeScript declaration file must be shipped.
 *
 * This guards against the packaging tool (npm pack) silently dropping files
 * that the build wrote to disk, e.g. when the output layout of ng-packagr
 * changes between major versions (see https://github.com/UXAspects/UXAspects/issues/1763).
 *
 * Usage: node scripts/verify-package.js [path/to/package.tgz]
 */
const { execFileSync } = require('child_process');
const { existsSync } = require('fs');
const { resolve } = require('path');

const tarballPath = resolve(process.argv[2] ?? 'target/npm/ux-aspects-ux-aspects.tgz');

function fail(messages) {
  console.error(`\nverify-package: ${tarballPath} is not a valid package:\n`);
  for (const message of messages) {
    console.error(`  ✖ ${message}`);
  }
  console.error('');
  process.exit(1);
}

if (!existsSync(tarballPath)) {
  fail([`tarball not found`]);
}

// list the tarball contents, stripping the leading "package/" directory that npm adds
const entries = new Set(
  execFileSync('tar', ['-tzf', tarballPath], { encoding: 'utf8' })
    .split('\n')
    .filter(Boolean)
    .map(entry => entry.replace(/^package\//, ''))
);

const packageJson = JSON.parse(
  execFileSync('tar', ['-xzOf', tarballPath, 'package/package.json'], { encoding: 'utf8' })
);

/** Collect every string leaf of the exports map (conditions may be nested arbitrarily) */
function collectExportTargets(value, targets = new Map(), path = 'exports') {
  if (typeof value === 'string') {
    targets.set(value, path);
  } else if (Array.isArray(value)) {
    value.forEach((item, index) => collectExportTargets(item, targets, `${path}[${index}]`));
  } else if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      collectExportTargets(child, targets, `${path}["${key}"]`);
    }
  }
  return targets;
}

const referenced = new Map();

for (const field of ['main', 'module', 'typings', 'types']) {
  if (typeof packageJson[field] === 'string') {
    referenced.set(packageJson[field], field);
  }
}

collectExportTargets(packageJson.exports ?? {}, referenced);

const normalise = target => target.replace(/^\.\//, '');

const errors = [];

for (const [target, source] of referenced) {
  const file = normalise(target);
  // wildcard subpath patterns cannot be checked for a single file, only that the directory exists
  if (file.includes('*')) {
    const directory = file.slice(0, file.indexOf('*'));
    if (![...entries].some(entry => entry.startsWith(directory))) {
      errors.push(`${source} -> "${target}": no files match this pattern in the tarball`);
    }
    continue;
  }
  if (!entries.has(file)) {
    errors.push(`${source} -> "${target}" is missing from the tarball`);
  }
}

const hasTypings =
  typeof packageJson.typings === 'string' ||
  typeof packageJson.types === 'string' ||
  [...referenced.values()].some(source => /"types"\]$/.test(source));

if (!hasTypings) {
  errors.push(
    'package.json does not declare any TypeScript typings (typings, types or exports["."].types)'
  );
}

if (![...entries].some(entry => entry.endsWith('.d.ts'))) {
  errors.push('the tarball contains no TypeScript declaration (.d.ts) files');
}

if (errors.length > 0) {
  if (Array.isArray(packageJson.files)) {
    errors.push(
      `package.json has a "files" allowlist (${packageJson.files.length} entries) - ` +
        'check that it includes every directory the build produces'
    );
  }
  fail(errors);
}

console.log(
  `verify-package: ${packageJson.name}@${packageJson.version} OK ` +
    `(${entries.size} files, ${referenced.size} referenced entry points verified)`
);
