import DraggablePanelDirective from './draggablePanel.directive.js';
import DraggablePanelContainerDirective from './draggablePanelContainer.directive.js';
import DragHandleDirective from './dragHandle.directive.js';

angular.module("ux-aspects.draggablePanels", [])
	.directive('draggablePanel', DraggablePanelDirective)
	.directive('draggablePanelContainer', DraggablePanelContainerDirective)
	.directive('dragHandle', DragHandleDirective);


