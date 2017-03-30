import GroupedClearDirective from './groupedClear.directive.js';
import GroupedNextDirective from './groupedNext.directive.js';
import GroupedPreviousDirective from './groupedPrevious.directive.js';
import GroupedSelectedDirective from './groupedSelected.directive.js';

angular.module("ux-aspects.groupedButtons", [])
  .directive("groupedClear", GroupedClearDirective)
  .directive("groupedNext", GroupedNextDirective)
  .directive("groupedPrevious", GroupedPreviousDirective)
  .directive("groupedSelected", GroupedSelectedDirective);