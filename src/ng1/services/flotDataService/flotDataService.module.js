import FlotDataService from './flotData.service.js';

// // load all additional plugins
import '../../plugins/flot/excanvas.min.js';
import '../../plugins/flot/jquery.flot.js';
import '../../plugins/flot/jquery.flot.labelspacing.js';
import '../../plugins/flot/jquery.flot.pie.js';
import '../../plugins/flot/jquery.flot.resize.js';
import '../../plugins/flot/jquery.flot.scrollable.js';
import '../../plugins/flot/jquery.flot.spline.js';
import '../../plugins/flot/jquery.flot.stack.js';
import '../../plugins/flot/jquery.flot.symbol.js';
import '../../plugins/flot/jquery.flot.time.js';
import '../../plugins/flot/jquery.flot.timeline.js';
import '../../plugins/flot/jquery.flot.tooltip.js';
import '../../plugins/flot/jquery.flot.valuelabels.js';

angular.module('ux-aspects.flotDataService', [])
    .factory("flotDataService", FlotDataService);