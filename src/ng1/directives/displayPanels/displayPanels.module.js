import DisplayPanelService from './displayPanel.service.js';
import DisplayPanelDirective from './displayPanel/displayPanel.directive.js';
import DisplayPanelItemDirective from './displayPanelItem/displayPanelItem.directive.js';
import '../../services/keyboardService/keyboardService.module.js';
  
angular.module("ux-aspects.displayPanels", ['ux-aspects.keyboardService'])
	.factory('$displayPanel', DisplayPanelService)
	.directive('displayPanel', DisplayPanelDirective)
	.directive('displayPanelItem', DisplayPanelItemDirective);