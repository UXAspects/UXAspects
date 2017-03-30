import GridDirective from './grid.directive.js';
import GridController from './grid.controller.js';
import GridCellDirective from './grid/gridCell.directive.js';
import GridPluginsService from './gridPlugins.service.js';

angular.module('ux-aspects.grid', [])
	.directive('grid', GridDirective)
	.controller('GridCtrl', GridController)
	.directive('gridCell', GridCellDirective)
	.factory('gridPlugins', GridPluginsService);
