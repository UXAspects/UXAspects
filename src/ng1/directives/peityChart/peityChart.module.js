import PeityChartDirective from './peityChart.directive.js';

// // load all additional plugins
import '../../plugins/peity/jquery.peity.js';

angular.module('ux-aspects.updatingLinechart', [])
    .directive('updatingLinechart', PeityChartDirective);