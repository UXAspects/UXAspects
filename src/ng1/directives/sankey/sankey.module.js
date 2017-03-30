import SankeyDirective from './sankey.directive.js';
import SankeyFactory from './sankey.factory.js';

import '../../plugins/d3/d3.js';

angular.module("ux-aspects.sankey", [])
    .directive("sankey", SankeyDirective)
    .factory('d3Sankey', SankeyFactory);
