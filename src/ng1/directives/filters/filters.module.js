import FilterDirective from './filter/filter.directive.js';
import FilterController from './filter/filter.controller.js';

import FilterContainerDirective from './filterContainer/filterContainer.directive.js';
import FilterContainerController from './filterContainer/filterContainer.controller.js';

import FilterOptionDirective from './filterOption/filterOption.directive.js';
import FilterOptionController from './filterOption/filterOption.controller.js';

angular.module("ux-aspects.filters", [])
	.directive('filter', FilterDirective)
	.controller('FilterCtrl', FilterController)
	.directive('filterContainer', FilterContainerDirective)
	.controller('FilterContainerCtrl', FilterContainerController)
	.directive('filterOption', FilterOptionDirective)
	.controller('FilterOptionCtrl', FilterOptionController);