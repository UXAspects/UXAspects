import FloatingActionButtonDirective from './floatingActionButton.directive.js';
import FloatingActionButtonController from './floatingActionButton.controller.js';

angular.module("ux-aspects.floatingActionButton", [])
	.directive('floatingActionButton', FloatingActionButtonDirective)
	.controller('FloatingActionButton', FloatingActionButtonController);
