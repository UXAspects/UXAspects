import DynamicSelectDirective from './dynamicSelect.directive.js';
import DynamicSelectController from './dynamicSelect.controller.js';
import '../../services/debounceService/debounce.module.js';

require('./dynamicSelectListItem.tmpl.html');

angular.module('ux-aspects.dynamicSelect', ['ux-aspects.debounceService'])
	.directive('dynamicSelect', DynamicSelectDirective)
	.controller('DynamicSelectCtrl', DynamicSelectController);