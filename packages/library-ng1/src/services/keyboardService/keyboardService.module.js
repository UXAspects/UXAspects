import KeyboardService from './keyboardService.service.js';

angular.module('ux-aspects.keyboardService', [])
	.service('keyboardService', KeyboardService)
	.service('keyboardNavigationService', KeyboardService)
	.service('hotkeyService', KeyboardService);