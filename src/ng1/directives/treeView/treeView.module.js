import '../../external/angular-ui-tree/angular-ui-tree';
import TreeViewController from './treeView.controller';
import TreeViewDirective from './treeView.directive';


// load template into ng-template cache
require('./treeView.partial.html');

angular.module("ux-aspects.treeview", ['ui.tree'])
    .controller("TreeViewCtrl", TreeViewController)
    .directive("treeView", TreeViewDirective);