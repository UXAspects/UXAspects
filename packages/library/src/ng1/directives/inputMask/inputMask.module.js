import InputMaskDirective from './inputMask.directive.js';

import '../../plugins/jquery-inputmask/jquery.inputmask.bundle.js';

angular.module('ux-aspects.inputMask', [])
	.directive('mask', InputMaskDirective);