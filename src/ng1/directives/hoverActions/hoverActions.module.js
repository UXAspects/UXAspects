import HoverActionsDirective from './hoverActions.directive.js';
import HoverActionsController from './hoverActions.controller.js';
import HoverActionDirective from './hoverAction.directive.js';

angular.module('ux-aspects.hoverActions', [])
	.directive('hoverActions', HoverActionsDirective)
	.controller('HoverActionsCtrl', HoverActionsController)
	.directive('hoverAction', HoverActionDirective);