import ComponentListDirective from './componentList.directive.js';
import ComponentListController from './componentList.controller.js';

import ComponentDirective from './component/component.directive.js';
import ComponentController from './component/component.controller.js';

angular.module('ux-aspects.componentList', [])
	.directive('componentList', ComponentListDirective)
	.controller('ComponentListCtrl', ComponentListController)
	.directive('component', ComponentDirective)
	.controller('ComponentCtrl', ComponentController);
