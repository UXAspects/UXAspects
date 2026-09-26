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
 * Verifies that the built library only imports symbols from @angular/* packages
 * that still exist in the NEWEST Angular version allowed by its peerDependencies.
 *
 * The library is compiled against the Angular version installed in this
 * workspace, so the compiler cannot tell us whether an API we use has been
 * removed in a newer major that we nevertheless advertise support for. This
 * script downloads that newest version and checks every named import in the
 * FESM bundle against its exports (see https://github.com/UXAspects/UXAspects/issues/1763).
 *
 * Requires network access to the npm registry. Set UX_SKIP_ANGULAR_COMPAT=1 to
 * skip the check (for example in an offline build).
 *
 * Usage: node scripts/verify-angular-compat.js [path/to/dist/library]
 */
const { execFileSync } = require('child_process');
const { existsSync, mkdtempSync, mkdirSync, readdirSync, readFileSync, rmSync } = require('fs');
const { tmpdir } = require('os');
const { dirname, join, resolve } = require('path');
const semver = require('semver');

const distPath = resolve(process.argv[2] ?? 'dist/library');

if (process.env.UX_SKIP_ANGULAR_COMPAT) {
  console.warn('verify-angular-compat: skipped because UX_SKIP_ANGULAR_COMPAT is set');
  process.exit(0);
}

const packageJson = JSON.parse(readFileSync(join(distPath, 'package.json'), 'utf8'));
const peerDependencies = packageJson.peerDependencies ?? {};

/** Split a module specifier such as "@angular/cdk/a11y" into { name: "@angular/cdk", subpath: "./a11y" } */
function parseSpecifier(specifier) {
  const segments = specifier.split('/');
  const name = specifier.startsWith('@') ? segments.slice(0, 2).join('/') : segments[0];
  const rest = segments.slice(name.split('/').length).join('/');
  return { name, subpath: rest ? `./${rest}` : '.' };
}

/** Collect the named imports from every @angular/* module referenced by the FESM bundles */
function collectAngularImports() {
  const imports = new Map(); // specifier -> Set<symbol>
  const fesmDir = join(distPath, 'fesm2022');
  const importPattern = /^import\s*\{([^}]*)\}\s*from\s*['"](@angular\/[^'"]+)['"]/gm;
  for (const file of readdirSync(fesmDir).filter(name => name.endsWith('.mjs'))) {
    const source = readFileSync(join(fesmDir, file), 'utf8');
    for (const match of source.matchAll(importPattern)) {
      const [, names, specifier] = match;
      const symbols = imports.get(specifier) ?? new Set();
      for (const name of names.split(',')) {
        const original = name.trim().split(/\s+as\s+/)[0];
        if (original) {
          symbols.add(original);
        }
      }
      imports.set(specifier, symbols);
    }
  }
  return imports;
}

/** The peer range that applies to a package. @angular/* packages are released in lockstep with @angular/core. */
function rangeFor(name) {
  if (peerDependencies[name]) {
    return { range: peerDependencies[name], inherited: false };
  }
  if (name.startsWith('@angular/') && peerDependencies['@angular/core']) {
    return { range: peerDependencies['@angular/core'], inherited: true };
  }
  return undefined;
}

function npm(args) {
  return execFileSync('npm', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] });
}

function newestVersion(name, range) {
  const versions = JSON.parse(npm(['view', name, 'versions', '--json']));
  const newest = semver.maxSatisfying(Array.isArray(versions) ? versions : [versions], range);
  if (!newest) {
    throw new Error(`no published version of ${name} satisfies "${range}"`);
  }
  return newest;
}

function download(name, version, workDir) {
  const target = join(workDir, name.replace(/[@/]/g, '_'));
  mkdirSync(target, { recursive: true });
  const tarball = npm([
    'pack',
    `${name}@${version}`,
    '--pack-destination',
    target,
    '--silent',
  ]).trim();
  execFileSync('tar', ['-xzf', join(target, tarball), '-C', target]);
  return join(target, 'package');
}

/** Resolve a subpath of a downloaded package to its ESM entry file via the exports map */
function resolveEntry(packageDir, subpath) {
  const manifest = JSON.parse(readFileSync(join(packageDir, 'package.json'), 'utf8'));
  let target = manifest.exports?.[subpath];
  while (target && typeof target === 'object') {
    target = target.module ?? target.default ?? target.import ?? Object.values(target)[0];
  }
  if (typeof target !== 'string' && subpath === '.') {
    target = manifest.module ?? manifest.main;
  }
  return typeof target === 'string' ? join(packageDir, target) : undefined;
}

/** Collect the names exported by an ESM file, following `export * from` re-exports */
function collectExports(file, seen = new Set(), names = new Set()) {
  if (!file || seen.has(file) || !existsSync(file)) {
    return names;
  }
  seen.add(file);
  const source = readFileSync(file, 'utf8');
  for (const match of source.matchAll(/^export\s*\{([^}]*)\}/gm)) {
    for (const item of match[1].split(',')) {
      const exported = item
        .trim()
        .split(/\s+as\s+/)
        .pop();
      if (exported) {
        names.add(exported);
      }
    }
  }
  for (const match of source.matchAll(
    /^export\s+(?:async\s+)?(?:function|class|const|let|var)\s+([A-Za-z_$][\w$]*)/gm
  )) {
    names.add(match[1]);
  }
  for (const match of source.matchAll(/^export\s*\*\s*from\s*['"](\.[^'"]+)['"]/gm)) {
    collectExports(join(dirname(file), match[1]), seen, names);
  }
  return names;
}

const imports = collectAngularImports();
const workDir = mkdtempSync(join(tmpdir(), 'ux-aspects-compat-'));
const downloaded = new Map(); // package name -> { version, dir }
const problems = [];
const checked = [];

try {
  for (const [specifier, symbols] of [...imports].sort()) {
    const { name, subpath } = parseSpecifier(specifier);
    const peer = rangeFor(name);
    if (!peer) {
      console.warn(
        `verify-angular-compat: ${name} is not a peer dependency, skipping ${specifier}`
      );
      continue;
    }
    if (!downloaded.has(name)) {
      const version = newestVersion(name, peer.range);
      console.log(
        `verify-angular-compat: checking against ${name}@${version} ` +
          `(newest version allowed by ${peer.inherited ? 'the @angular/core' : 'its'} peer range "${peer.range}")`
      );
      downloaded.set(name, { version, dir: download(name, version, workDir) });
    }
    const { version, dir } = downloaded.get(name);
    const entry = resolveEntry(dir, subpath);
    if (!entry) {
      problems.push(`${specifier} is not an entry point of ${name}@${version}`);
      continue;
    }
    const exported = collectExports(entry);
    for (const symbol of symbols) {
      if (!exported.has(symbol)) {
        problems.push(
          `"${symbol}" is imported from "${specifier}" but is not exported by ${name}@${version}`
        );
      }
    }
    checked.push(`${specifier} (${symbols.size} symbols)`);
  }
} finally {
  rmSync(workDir, { recursive: true, force: true });
}

if (problems.length > 0) {
  console.error(
    `\nverify-angular-compat: ${packageJson.name} uses APIs that do not exist in a supported Angular version:\n`
  );
  for (const problem of problems) {
    console.error(`  ✖ ${problem}`);
  }
  console.error('\nEither replace the API or narrow the peerDependencies range.\n');
  process.exit(1);
}

console.log(
  `verify-angular-compat: OK - ${checked.length} entry points verified: ${checked.join(', ')}`
);
