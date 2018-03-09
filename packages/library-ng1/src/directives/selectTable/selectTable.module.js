import SelectTableDirective from './selectTable.directive.js';
import SelectTableController from './selectTable.controller.js';

angular.module("ux-aspects.selectTable", [])
    .directive("selectTable", SelectTableDirective)
    .controller("selectTableCtrl", SelectTableController);
