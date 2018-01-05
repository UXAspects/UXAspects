import MultipleRowSelectItemDirective from './multipleRowSelectItem.directive.js'; 

import '../multipleSelect/multipleSelect.module.js';

angular.module("ux-aspects.multipleRowSelect", ['ux-aspects.multipleSelect'])
	.directive('multipleRowSelectItem', MultipleRowSelectItemDirective);
