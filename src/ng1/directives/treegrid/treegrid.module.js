import TreeGridController from './treegrid.controller.js';
import TreeGridDirective from './treegrid.directive.js';
import TreeGridCellDirective from './treegridCell.directive.js';
import TreeGridRowKeyHandlerDirective from './treegridRowKeyHandler.directive.js';

import '../../services/keyboardService/keyboardService.module.js';
import '../multipleSelect/multipleSelect.module.js';
import '../keyboardNavigableTable/keyboardNavigableTable.module.js';

angular.module('ux-aspects.treegrid', ['ux-aspects.multipleSelect', 'ux-aspects.keyboardService', 'ux-aspects.keyboardNavigableTable'])
    .controller("TreegridCtrl", TreeGridController)
    .directive('treegrid', TreeGridDirective)
    .directive('treegridCell', TreeGridCellDirective)
    .directive('treegridRowKeyHandler', TreeGridRowKeyHandlerDirective);
