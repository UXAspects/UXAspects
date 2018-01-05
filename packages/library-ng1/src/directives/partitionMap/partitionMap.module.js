import PartitionMapDirective from './partitionMap.directive.js';
import PartitionMapService from './partitionMap.service.js';

import PartitionMapEditingDirective from './editing/partitionMapEditing.directive.js';

import PartitionMapPopoverDirective from './popover/partitionMapPopover.directive.js';

import '../../services/safeInterval/safeInterval.module.js';

// // load all additional plugins
import '../../plugins/customscroll/jquery.jscrollpane.js';
import '../../plugins/customscroll/jquery.mousewheel.js';

angular.module("ux-aspects.partitionMap", ['ux-aspects.safeInterval'])
	.directive('partitionMap', PartitionMapDirective)
	.factory('d3PartitionMap', PartitionMapService)
	.directive('partitionEditing', PartitionMapEditingDirective)
	.directive('partitionPopover', PartitionMapPopoverDirective);