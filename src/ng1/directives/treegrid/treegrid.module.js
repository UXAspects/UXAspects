import '../../services/keyboardService/keyboardService.module';
import '../keyboardNavigableTable/keyboardNavigableTable.module';
import '../multipleSelect/multipleSelect.module';
import { TreeGridNavigationItemController } from './accessibility/treegrid-navigation-item.controller';
import { treegridNavigationItem } from './accessibility/treegrid-navigation-item.directive';
import { TreeGridNavigationController } from './accessibility/treegrid-navigation.controller';
import { treegridNavigation } from './accessibility/treegrid-navigation.directive';
import { TreeGridController } from './treegrid.controller';
import { TreegridDirective } from './treegrid.directive';
import { treegridCell } from './treegridCell.directive';
import { treegridMultipleSelectItem } from './treegridMultipleSelectItem.directive';

angular.module('ux-aspects.treegrid', ['ux-aspects.multipleSelect', 'ux-aspects.keyboardService', 'ux-aspects.keyboardNavigableTable', 'ux-aspects.eventHandlers'])
    .controller("TreegridCtrl", TreeGridController)
    .controller("TreeGridNavigationCtrl", TreeGridNavigationController)
    .controller("TreeGridNavigationItemCtrl", TreeGridNavigationItemController)
    .directive('treegrid', TreegridDirective)
    .directive('treegridCell', treegridCell)
    .directive('treegridMultipleSelectItem', treegridMultipleSelectItem)
    .directive('treegridNavigation', treegridNavigation)
    .directive('treegridNavigationItem', treegridNavigationItem);
