import DateTimePickerDirective from './dateTimePicker.directive.js';
import DateTimePickerController from './dateTimePicker.controller.js';

import DateTimePickerPopupDirective from './dateTimePickerPopup.directive.js';
import DateTimePickerPopupController from './dateTimePickerPopup.controller.js';

import TimePickerDirective from './timePicker.directive.js';
import TimePickerController from './timePicker.controller.js';

import '../../plugins/moment/moment.min.js';
import '../../plugins/moment/moment-timezone-with-data.min.js';

angular.module("ux-aspects.dateTimePicker", [])
	.directive('dateTimePicker', DateTimePickerDirective)
	.controller('DateTimePickerCtrl', DateTimePickerController)
	.directive('dateTimePickerPopup', DateTimePickerPopupDirective)
	.controller('DateTimePickerPopupCtrl', DateTimePickerPopupController)
	.directive('timePicker', TimePickerDirective)
	.controller('TmpkCtrl', TimePickerController);
