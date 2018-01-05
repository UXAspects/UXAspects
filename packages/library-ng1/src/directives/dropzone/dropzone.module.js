import DropZoneDirective from './dropzone.directive.js';

import '../../plugins/dropzone/dropzone.js';

angular.module("ux-aspects.dropZone", [])
	.directive('dropZone', DropZoneDirective);


