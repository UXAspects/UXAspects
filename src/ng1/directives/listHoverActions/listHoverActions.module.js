import ListHoverActionsDirective from './listHoverActions.directive.js';
import ListHoverActionsController from './listHoverActions.controller.js';

import ListHoverActionDirective from './listHoverAction/listHoverAction.directive.js';
import ListHoverActionController from './listHoverAction/listHoverAction.controller.js';

import '../../services/keyboardService/keyboardService.module.js';


angular.module("ux-aspects.listHoverActions", [])
	.directive('listHoverActions', ListHoverActionsDirective)
	.controller('ListHoverActionsCtrl', ListHoverActionsController)
	.directive('listHoverAction', ListHoverActionDirective)
	.controller('ListHoverActionCtrl', ListHoverActionController);
