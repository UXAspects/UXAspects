import ContactDirective from './contact.directive.js';
import ContactGroupDirective from './contactGroup.directive.js';
import ContactTooltipService from './contactTooltip.service.js';

import '../../plugins/jquery-dotdotdot/jquery.dotdotdot.js';

angular.module('ux-aspects.contacts', [])
	.directive('contact', ContactDirective)
	.directive('contactGroup', ContactGroupDirective)
	.factory('contactTooltipService', ContactTooltipService);
