import MultipleSelectProvider from './multipleSelect.provider.js';
import MultipleSelectItemDirective from './multipleSelectItem/multipleSelectItem.directive.js';

import MultipleSelectActionDirective from './multipleSelectAction/multipleSelectAction.directive.js';
import MultipleSelectActionController from './multipleSelectAction/multipleSelectAction.controller.js';

import MultipleSelectActionsDirective from './multipleSelectActions/multipleSelectActions.directive.js';
import MultipleSelectActionsController from './multipleSelectActions/multipleSelectActions.controller.js';

angular.module("ux-aspects.multipleSelect", [])
    .provider("multipleSelectProvider", MultipleSelectProvider)
    .directive("multipleSelectItem", MultipleSelectItemDirective)
    .directive("multipleSelectAction", MultipleSelectActionDirective)
    .directive("multipleSelectActions", MultipleSelectActionsDirective)
    .controller("MultipleSelectActionsCtrl", MultipleSelectActionsController)
    .controller("MultipleSelectActionCtrl", MultipleSelectActionController);
