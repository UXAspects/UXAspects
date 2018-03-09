import ExpandingTextareaDirective from './expandingTextarea.directive.js';

import '../../plugins/expanding-textarea/expanding-textarea.js';

angular.module("ux-aspects.expandingTextarea", [])
	.directive('expandingTextarea', ExpandingTextareaDirective);
