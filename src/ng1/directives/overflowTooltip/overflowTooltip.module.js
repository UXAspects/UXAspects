import OverflowTooltipDirective from './overflowTooltip.directive.js';
import SingleLineOverflowTooltipDirective from './singleLineOverflowTooltip.directive.js';

import '../../services/safeTimeout/safeTimeout.module.js';
import '../../services/resizeService/resize.module.js';

 angular.module("ux-aspects.overflowTooltip", ['ux-aspects.resizeService'])
 	.directive('overflowTooltip', OverflowTooltipDirective)
 	.directive('singleLineOverflowTooltip', SingleLineOverflowTooltipDirective);