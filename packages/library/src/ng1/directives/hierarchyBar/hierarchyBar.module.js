import HierarchyBarDirective from './hierarchyBar.directive.js';
import HierarchyBarController from './hierarchyBar.controller.js';

require('./hierarchyBar.popover.html');
require('./hierarchyBar.ellipsis-popover.html');

angular.module('ux-aspects.hierarchyBar', [])
	.directive('hierarchyBar', HierarchyBarDirective)
	.controller('HierarchyBarCtrl', HierarchyBarController);
