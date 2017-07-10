// Import Stylesheets
import './styles.css';

// Import Polyfills
import 'core-js/es6';
import 'core-js/es7/reflect';
require('zone.js/dist/zone');
Error['stackTraceLimit'] = Infinity;
require('zone.js/dist/long-stack-trace-zone');

// Import application
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { AppModule } from './app/app.module';

// enable angular production mode to simulate real environment
enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule);