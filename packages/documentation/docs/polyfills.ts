/*
  Import Polyfill Libraries
*/
import 'core-js/es6';
import 'core-js/es7/reflect';
require('zone.js/dist/zone');
import { environment } from './environments/environment';

if (!environment.production) {
  Error['stackTraceLimit'] = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
}