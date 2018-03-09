import BackButtonHeaderDirective from './backButtonHeader.directive.js';

import '../../external/angular-ui-router/angular-ui-router.js';

angular.module("ux-aspects.backButtonHeader", ['ui.router'])
    .directive('backButtonHeader', BackButtonHeaderDirective);