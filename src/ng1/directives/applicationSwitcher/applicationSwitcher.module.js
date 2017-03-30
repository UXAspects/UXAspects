import ApplicationSwitcherContainerDirective from './applicationSwitcherContainer/applicationSwitcherContainer.directive.js';
import ApplicationSwitcherContainerController from './applicationSwitcherContainer/applicationSwitcherContainer.controller.js';

import ApplicationSwitcherItemDirective from './applicationSwitcherItem/applicationSwitcherItem.directive.js';
import ApplicationSwitcherItemController from './applicationSwitcherItem/applicationSwitcherItem.controller.js';

angular.module("ux-aspects.applicationSwitcher", [])
    .directive("applicationSwitcherContainer", ApplicationSwitcherContainerDirective)
    .controller("ApplicationSwitcherContainerCtrl", ApplicationSwitcherContainerController)
    .directive("applicationSwitcherItem", ApplicationSwitcherItemDirective)
    .controller("ApplicationSwitcherItemCtrl", ApplicationSwitcherItemController);