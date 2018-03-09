import TreeViewDirective from './treeView.directive.js';
import TreeViewController from './treeView.controller.js';

import '../../external/angular-ui-tree/angular-ui-tree.js';

// load template into ng-template cache
require('./treeView.partial.html');

angular.module("ux-aspects.treeview", ['ui.tree'])
    .controller("TreeViewCtrl", TreeViewController)
    .directive("treeView", TreeViewDirective);