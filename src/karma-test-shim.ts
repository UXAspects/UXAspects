Error.stackTraceLimit = Infinity;

// WARNING: The order of these imports is important!
import 'core-js';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

// Set up the test environment
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

// Run each test
const context = require.context('./', true, /\.spec\.ts$/);
context.keys().map(context);