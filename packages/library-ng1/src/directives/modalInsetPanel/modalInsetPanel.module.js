import ModalInsetPanelDirective from './modalInsetPanel.directive.js';
import ModalInsetContentDirective from './modalInsetContent.directive.js';
import ModalInsetHeaderDirective from './modalInsetHeader.directive.js';

import '../../services/safeAnimationFrame/safeAnimationFrame.module.js';

angular.module('ux-aspects.modalInsetPanel', [])
	.directive('modalInsetPanel', ModalInsetPanelDirective)
	.directive('modalInsetContent', ModalInsetContentDirective)
	.directive('modalInsetHeader', ModalInsetHeaderDirective);