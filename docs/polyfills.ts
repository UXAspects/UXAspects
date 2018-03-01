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

/**
 * Required to support Web Animations `@angular/platform-browser/animations`.
 * Needed for: All but Chrome, Firefox and Opera. http://caniuse.com/#feat=web-animation
 **/
import 'web-animations-js';