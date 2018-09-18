import '../../services/keyboardService/keyboardService.module';
import { DisplayPanelService } from './displayPanel.service';
import { DisplayPanelDirective } from './displayPanel/displayPanel.directive';
import { DisplayPanelItemDirective } from './displayPanelItem/displayPanelItem.directive';

angular.module("ux-aspects.displayPanels", ['ux-aspects.keyboardService'])
	.service('$displayPanel', DisplayPanelService)
	.directive('displayPanel', DisplayPanelDirective)
	.directive('displayPanelItem', DisplayPanelItemDirective);