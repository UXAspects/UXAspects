import DetailRowHeaderDirective from './detailRowHeader/detailRowHeader.directive.js';
import DetailRowHeaderPopoverDirective from './detailRowHeader/detailRowHeaderPopover.directive.js';
import DetailRowHeaderController from './detailRowHeader/detailRowHeader.controller.js';

import MultiSortableHeaderDirective from './multiSortableHeader/multiSortableHeader.directive.js';
import MultiSortableHeaderController from './multiSortableHeader/multiSortableHeader.controller.js';

import SortDirectionToggleDirective from './sortDirectionToggle/sortDirectionToggle.directive.js';
import SortDirectionToggleController from './sortDirectionToggle/sortDirectionToggle.controller.js';

import SorterDirective from './sorter/sorter.directive.js';
import SorterController from './sorter/sorter.controller.js';

import SorterHeaderDirective from './sorterHeader/sortableHeader.directive.js';
import SorterHeaderController from './sorterHeader/sortableHeader.controller.js';

import SorterOptionDirective from './sorterOption/sorterOption.directive.js';
import SorterOptionController from './sorterOption/sorterOption.controller.js';

angular.module("ux-aspects.sorters", [])
    .directive("detailRowHeader", DetailRowHeaderDirective)
    .controller("DetailRowHeaderCtrl", DetailRowHeaderController)
    .directive("detailRowHeaderPopover", DetailRowHeaderPopoverDirective)
    .directive('multiSortableHeader', MultiSortableHeaderDirective)
    .controller("MultiSortableHeaderCtrl", MultiSortableHeaderController)
    .directive("sortDirectionToggle", SortDirectionToggleDirective)
    .controller("SortDirectionToggleCtrl", SortDirectionToggleController)
    .directive("sorter", SorterDirective)
    .controller("SorterCtrl", SorterController)
    .directive('sortableHeader', SorterHeaderDirective)
    .controller("SorterHeaderCtrl", SorterHeaderController)
    .directive("sorterOption", SorterOptionDirective)
    .controller("SorterOptionCtrl", SorterOptionController);

