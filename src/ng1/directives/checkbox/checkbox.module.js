import CheckboxDirective from './checkbox.directive.js';
import CheckboxController from './checkbox.controller.js';

import '../../services/keyboardService/keyboardService.module.js';

angular.module('ux-aspects.checkbox', ['ux-aspects.keyboardService'])
	.directive('checkbox', CheckboxDirective)
	.controller('CheckboxCtrl', CheckboxController);
