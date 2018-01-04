import ExpandInputDirective from './expandInput.directive.js';
import ExpandInputController from './expandInput.controller.js';

angular.module("ux-aspects.expandInput", [])
	.directive('expandInput', ExpandInputDirective)
	.controller('ExpandInputCtrl', ExpandInputController);
