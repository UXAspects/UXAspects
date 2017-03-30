import LayoutSwitcherContainerDirective from './layoutSwitcherContainer/layoutSwitcherContainer.directive.js';
import LayoutSwitcherContainerController from './layoutSwitcherContainer/layoutSwitcherContainer.controller.js';

import LayoutSwitcherItemDirective from './layoutSwitcherItem/layoutSwitcherItem.directive.js';
import LayoutSwitcherItemController from './layoutSwitcherItem/layoutSwitcherItem.controller.js';

import '../../services/resizeService/resize.module.js';

angular.module("ux-aspects.layoutSwitcher", ['ux-aspects.resizeService'])
	.directive('layoutSwitcherContainer', LayoutSwitcherContainerDirective)
	.controller('LayoutSwitcherContainerCtrl', LayoutSwitcherContainerController)
	.directive('layoutSwitcherItem', LayoutSwitcherItemDirective)
	.controller('LayoutSwitcherItemCtrl', LayoutSwitcherItemController);
