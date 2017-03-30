import DisplayCancelOptionDirective from './displayCancelOption/displayCancelOption.directive.js';
import DisplayCancelOptionController from './displayCancelOption/displayCancelOption.controller.js';

import DisplaySelectOptionsDirective from './displaySelectOptions/displaySelectOptions.directive.js'; 
import DisplaySelectOptionsController from './displaySelectOptions/displaySelectOptions.controller.js';

import MultipleListSelectActionsDirective from './multipleListSelectActions/multipleListSelectActions.directive.js';
import MultipleListSelectActionsController from './multipleListSelectActions/multipleListSelectActions.controller.js';

import MultipleListSelectItemDirective from './multipleListSelectItem/multipleListSelectItem.directive.js';

import '../multipleSelect/multipleSelect.module.js';

angular.module("ux-aspects.multipleListSelect", [])
	.directive('displayCancelOption', DisplayCancelOptionDirective)
	.controller('DisplayCancelOptionCtrl', DisplayCancelOptionController)
	.directive('displaySelectOptions', DisplaySelectOptionsDirective)
	.controller('DisplaySelectOptionsCtrl', DisplaySelectOptionsController)
	.directive('multipleListSelectActions', MultipleListSelectActionsDirective)
	.controller('MultipleListSelectActionsCtrl', MultipleListSelectActionsController)
	.directive('multipleListSelectItem', MultipleListSelectItemDirective); 