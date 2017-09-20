import BackButtonHeaderDirective from './backButtonHeader.directive.js';

import '@uirouter/angularjs';

angular.module("ux-aspects.backButtonHeader", ['ui.router'])
    .directive('backButtonHeader', BackButtonHeaderDirective);