import { listHoverActions } from './listHoverActions.directive';
import { ListHoverActionsCtrl } from './listHoverActions.controller';

import { listHoverAction } from './listHoverAction/listHoverAction.directive';
import { ListHoverActionCtrl } from './listHoverAction/listHoverAction.controller';

angular.module("ux-aspects.listHoverActions", ['ux-aspects.eventHandlers'])
	.directive('listHoverActions', listHoverActions)
	.controller('ListHoverActionsCtrl', ListHoverActionsCtrl)
	.directive('listHoverAction', listHoverAction)
	.controller('ListHoverActionCtrl', ListHoverActionCtrl);
