import InfiniteScrollDirective from './infiniteScroll.directive.js';
import '../../services/safeTimeout/safeTimeout.module.js';
import '../../services/safeInterval/safeInterval.module.js'; 

angular.module('ux-aspects.infiniteScroll', ['ux-aspects.safeTimeout', 'ux-aspects.safeInterval'])
	.directive('infiniteScroll', InfiniteScrollDirective);