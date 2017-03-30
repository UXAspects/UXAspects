import SideNavigationDirective from './sideNavigation.directive.js';

import '../../plugins/metisMenu/jquery.metisMenu.js';

angular.module('ux-aspects.sideNavigation', [])
    .directive("sideNavigation", SideNavigationDirective);