import '../../services/resizeService/resize.module.js';
import '../../services/safeTimeout/safeTimeout.module.js';
import OverflowTooltipDirective from './overflowTooltip.directive';
import SingleLineOverflowTooltipDirective from './singleLineOverflowTooltip.directive';


 angular.module("ux-aspects.overflowTooltip", ['ux-aspects.resizeService'])
 	.directive('overflowTooltip', OverflowTooltipDirective)
 	.directive('singleLineOverflowTooltip', SingleLineOverflowTooltipDirective);