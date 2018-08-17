import SelectTableController from './selectTable.controller.js';
import SelectTableDirective from './selectTable.directive.js';

angular.module("ux-aspects.selectTable", ["ux-aspects.templateOutlet"])
    .directive("selectTable", SelectTableDirective)
    .controller("selectTableCtrl", SelectTableController);
