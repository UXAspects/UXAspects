import MenuTabDirective from './menuTab.directive.js';

import '../../services/safeTimeout/safeTimeout.module.js';

angular.module("ux-aspects.menuTab", ['ux-aspects.safeTimeout'])
	.directive('menuTab', MenuTabDirective);
