import PreviewPaneProvider from './previewPane.provider.js';

import PreviewPaneDirective from './previewPane/previewPane.directive.js';
import PreviewPaneController from './previewPane/previewPane.controller.js';

import PreviewPaneItemDirective from './previewPaneItem/previewPaneItem.directive.js';
import PreviewPaneItemController from './previewPaneItem/previewPaneItem.controller.js';

import PreviewPaneToggleDirective from './previewPaneToggle/previewPaneToggle.directive.js';
import PreviewPaneToggleController from './previewPaneToggle/previewPaneToggle.controller.js';

import PreviewPaneWindowDirective from './previewPaneWindow/previewPaneWindow.directive.js';

import '../../services/windowCommunicationService/windowCommunication.module.js';
import '../../services/keyboardService/keyboardService.module.js';

angular.module("ux-aspects.previewPanes", ['ux-aspects.windowCommunicationService', 'ux-aspects.keyboardService'])
	.provider('previewPaneProvider', PreviewPaneProvider)
	.directive('previewPane', PreviewPaneDirective)
	.controller('PreviewPaneCtrl', PreviewPaneController)
	.directive('previewPaneItem', PreviewPaneItemDirective)
	.controller('PreviewPaneItemCtrl', PreviewPaneItemController)
	.directive('previewPaneToggle', PreviewPaneToggleDirective)
	.controller('PreviewPaneToggleCtrl', PreviewPaneToggleController)
	.directive('previewPaneWindow', PreviewPaneWindowDirective);