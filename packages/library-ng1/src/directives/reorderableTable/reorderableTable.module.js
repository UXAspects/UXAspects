import ReorderableTableDirective from './reorderableTable.directive.js';

import '../../services/safeTimeout/safeTimeout.module.js';
import '../../services/safeEventListener/safeEventListener.module.js';

angular.module('ux-aspects.reorderableTable', ['ux-aspects.safeTimeout', 'ux-aspects.safeEventListener'])
    .directive('reorderableTable', ReorderableTableDirective);
