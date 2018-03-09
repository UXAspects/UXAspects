#!/usr/bin/env node
/**
 * Print the current repository version.
 */
const version = require('../lerna.json').version;
console.log(version);