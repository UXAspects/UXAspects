import 'core-js/es6';
import 'core-js/es7/reflect';
import { environment } from './environments/environment';

require('zone.js/dist/zone');

if (!environment.production) {
    Error['stackTraceLimit'] = Infinity;
    require('zone.js/dist/long-stack-trace-zone');
}
