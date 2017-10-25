// Import Stylesheets
import './styles.css';

// Import Polyfills
import 'core-js/es6';
import 'core-js/es7/reflect';
require('zone.js/dist/zone');
Error['stackTraceLimit'] = Infinity;
require('zone.js/dist/long-stack-trace-zone');

import * as $ from 'jquery';
(<any>window).$ = $;
(<any>window).jQuery = $;

// import only the required jquery ui functionality
import 'jquery-ui/ui/unique-id';
import 'jquery-ui/ui/position';
import 'jquery-ui/ui/widgets/sortable';

import 'bootstrap';

import 'angular';
import '../../dist/ng1/ux-aspects-ng1';

// Import application
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { AppModule } from './app/app.module';

// enable angular production mode to simulate real environment
enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule);