import CardSetDirective from './cardSet.directive.js';
import CardTabDirective from './cardTab.directive.js';
import TabContentDirective from './tabContent.directive.js';

import '../../services/safeTimeout/safeTimeout.module.js';
import '../../external/angular-sanitize/angular-sanitize.min.js';

angular.module('ux-aspects.cardTabs', ['ux-aspects.safeTimeout', 'ngSanitize'])
	.directive('cardset', CardSetDirective)
	.directive('card', CardTabDirective)
	.directive('tabContent', TabContentDirective);

