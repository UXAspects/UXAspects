import SearchToolbarDirective from './searchToolbar.directive.js';
import SearchToolbarController from './searchToolbar.controller.js';

import '../../services/safeTimeout/safeTimeout.module.js';

angular.module("ux-aspects.searchToolbar", ['ux-aspects.safeTimeout'])
    .directive("searchToolbar", SearchToolbarDirective)
    .controller("searchToolbarCtrl", SearchToolbarController);
