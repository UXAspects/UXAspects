import HotkeyDirective from './hotkey.directive.js';

import '../../services/keyboardService/keyboardService.module.js';

angular.module("ux-aspects.hotkey", ['ux-aspects.keyboardService'])
	.directive('hotkey', HotkeyDirective);
