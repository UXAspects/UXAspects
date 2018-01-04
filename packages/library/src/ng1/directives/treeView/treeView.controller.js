TreeViewCtrl.$inject = ['$scope', '$element', '$timeout'];

export default function TreeViewCtrl($scope, $element, $timeout) {
    var tv = this;
    //the scope of the parent controller
    tv.treeScope = null;

    tv.filterFunction = $scope.filterFunction || null;
    tv.selectedNode = $scope.selected;
    tv.selectedNodeScope = null;
    //reference to the node being edited
    tv.editingNode = null;
    //The developer can pass in functions for adding new items and adding new folders.
    //These will be decorated with the internal functionality, not overridden.
    //if no functions are supplied here, the tree will provide inline edit buttons
    tv.addItem = $scope.addItem || function() {
        return null;
    };

    tv.deleteFn = $scope.deleteFn || function() {
        return null;
    };

    tv.readOnly = $scope.readOnly || false;

    tv.treeOptions = $scope.treeOptions || {
        showTreeLines: true,
        openOnSelect: false
    };

    tv.inlineEdit = !!(!tv.addItem);

    tv.icons = $scope.icons || {
        folder: {
            collapsed: "hpe-folder",
            expanded: "hpe-folder-open"
        },
        item: "hpe-document",
        'default': "hpe-3d"
    };


    $scope.$watch('tv.selectedNode', function(nV) {
        if (nV !== undefined) {
            $scope.selected = nV;
        }
    }, true);

    $scope.$watch("selected", function(nv) {
        tv.selectedNode = nv;
        tv.ensureVisible(nv);
    });

    //Initialisation
    $timeout(function() {
        tv.treeScope.collapseAll();

        $timeout(function() {
            var treeElement = $element.find('.angular-ui-tree');
            //Make tree visible after it is loaded
            treeElement.css('max-height', '');
            treeElement.css('visibility', '');
        });
    });

    tv.init = function(parentScope) {
        if (!tv.treeScope) {
            tv.treeScope = parentScope;
        }
    };

    tv.getIcon = function(type, collapsed) {
        if (tv.icons && type) {
            var icon = tv.icons[type];
            if (!icon) {
                return tv.icons["default"];
            } else if (typeof icon === 'string' || icon instanceof String) {
                return icon;
            } else if (icon.collapsed && collapsed) {
                return icon.collapsed;
            } else if (icon.expanded && !collapsed) {
                return icon.expanded;
            }
            return tv.icons["default"];
        }
    };

    tv.getTooltip = function(node) {
        if (!node.tooltip) {
            return;
        }

        return typeof node.tooltip === 'function' ? node.tooltip.call(null, node) : node.tooltip;
    };

    tv.canAddItem = function(scope) {
        return scope.$modelValue.allowChildren && !tv.readOnly && (!tv.selectedNode.permissions || (tv.selectedNode.permissions && tv.selectedNode.permissions.add));
    };

    tv.canDeleteItem = function() {
        return !tv.readOnly && (!tv.selectedNode.permissions || (tv.selectedNode.permissions && tv.selectedNode.permissions.delete));
    };

    tv.canEditItem = function() {
        return !tv.readOnly && (!tv.selectedNode.permissions || (tv.selectedNode.permissions && tv.selectedNode.permissions.edit));
    };



    tv.newSubItem = function(scope, allowChildren, newItem) {
        if (tv.canAddItem(scope)) {
            //create the new item
            var nodeData = scope.$modelValue;

            var itemToAdd = newItem || {
                id: -1,
                allowChildren: !!allowChildren,
                title: 'New',
                nodes: []
            };

            var length = nodeData.nodes.push(itemToAdd);

            //select the new node for editing
            //defer execution until the $$hashKey is available. i.e. after the browser has rendered
            //If you want to manipulate objects before Angular manipulates the DOM you can use evalAsync - from a controller context
            //From a directive context, evalAsync runs after the DOM has been manipulated
            $timeout(function() {
                tv.selectedNodeScope.expand();

                tv.selectedNode = nodeData.nodes[length - 1];
                tv.edit({
                    $modelValue: nodeData.nodes[length - 1]
                }, !!newItem);

                tv.selectedNodeScope = tv.selectedNodeScope.childNodes()[tv.selectedNodeScope.childNodesCount() - 1];
            });
        }
    };

    //ng-show="tv.filter(node)"
    //only show nodes based on their title, or according to the supplied function
    tv.filter = function(item) {
        if (tv.filterFunction) {
            return !!tv.filterFunction(item);
        }
        return !($scope.query && $scope.query.length > 0 && item.title.indexOf($scope.query) === -1);
    };

    //remove an item from the tree
    tv.remove = function(scope) {
        scope.remove();
    };

    //handle the selected item in the tree
    tv.select = function(scope) {
        //check if it's already clicked
        var firstClick = !tv.isSelected(scope);
        //update reference to the selected node
        tv.selectedNode = scope.$modelValue;
        tv.selectedNodeScope = scope;
        //change any text inputs back to spans
        tv.editingNode = null;
        if (tv.treeOptions.openOnSelect) {
            //toggle the node
            scope.select(scope);
            //force the node to be expanded if this the initial selection
            //otherwise clicking again on the selected node will toggle it as any other node
            if (firstClick) {
                scope.expand();
            }
        }
    };

    //call on a node to check if it's currently selected
    tv.isSelected = function(scope) {
        if ((tv.selectedNode === null) || (!scope.$modelValue)) {
            return false;
        }
        //we compare on the internal hashkey in case the titles or IDs aren't unique
        return (tv.selectedNode.$$hashKey === scope.$modelValue.$$hashKey);
    };

    //call on a node to check if it's currently being edited
    tv.isBeingEdited = function(scope) {
        if ((tv.editingNode === null) || (!scope.$modelValue)) {
            return false;
        }
        //we compare on the internal hashkey in case the titles or IDs aren't unique
        return (tv.editingNode.$$hashKey === scope.$modelValue.$$hashKey);
    };

    //activate inline edit of the selected node's title
    tv.edit = function(scope, itemAlreadyCreated) {
        //if an item was added via the API then it does not need edited here again
        if (itemAlreadyCreated) {
            return;
        }
        //editing is only performed on the currently selected item
        if (tv.isSelected(scope) && tv.canEditItem(scope)) {
            tv.editingNode = scope.$modelValue;
            tv.editingNode.$oV = tv.editingNode.title;
            //if possible, select all the text in the input
            if (tv.selectedNodeScope && tv.selectedNodeScope.$element) {
                $timeout(function() {
                    tv.selectedNodeScope.$element.find("input.title-edit").select();
                });

            }
        } else {
            //this function is bound to the node title. If it wasn't already selected, click through to the default node action.
            tv.select(scope);
        }
    };

    //Save off changes to a node
    tv.finishEdit = function(scope, $event) {
        if (($event.which === 13) || ($event.type === "blur")) {
            //if the node is now blank, undo the change
            if (tv.editingNode && tv.editingNode.title === "") {
                tv.editingNode.title = tv.editingNode.$oV;
            }
            //exit edit mode
            tv.editingNode = null;
            if ($event.type === "keypress") {
                $timeout(function() {
                    tv.selectedNodeScope.$element.find("span.title-readonly")[0].focus();
                });
            }
        }
    };

    $scope.addItem = function() {
        if (tv.selectedNode) {
            //call decoratee
            var newItem = tv.addItem() || null;
            tv.newSubItem(tv.wrapNode(tv.selectedNode), false, newItem);
        }
    };

    $scope.deleteFn = function(scope) {
        if (tv.selectedNode) {
            if (tv.canDeleteItem(scope)) {
                //call decoratee
                var response = tv.deleteFn() || null;
                if (response) {
                    $timeout(function() {
                        if (tv.selectedNodeScope.$parentNodeScope !== null) {
                            tv.selectedNodeScope.$parentNodeScope.$element.find("span.title-readonly")[0].focus();
                        }
                        tv.remove(tv.selectedNodeScope);
                        tv.selectedNode = null;
                        tv.selectedNodeScope = null;
                    });
                }
            }
        }
    };

    tv.wrapNode = function(node) {
        return {
            $modelValue: node
        };
    };

    tv.keyboardSelect = function(scope, $event) {
        if ($event.which === 13) {
            //enter
            tv.edit(scope);
        } else if ($event.which === 45) {
            //insert
            tv.select(scope);
            if ($scope.addItem) {
                $scope.addItem(scope);
            }

        } else if ($event.which === 46) {
            //delete
            tv.select(scope);
            if ($scope.deleteFn) {
                $scope.deleteFn(scope);
            }
        }
    };

    // Find the node in the table and expand to it
    tv.ensureVisible = function(node) {
        var nodeScope = tv.findNodeScope(node, tv.treeScope.$nodesScope.childNodes());
        if (nodeScope !== null) {
            tv.expandToNode(nodeScope);
        }
    };

    // Return the scope for the node in the given scope hierarchy
    tv.findNodeScope = function(node, scopes) {
        var result = null;
        for (var i = 0; i < scopes.length; i += 1) {
            if (scopes[i].$modelValue === node) {
                result = scopes[i];
            }
            else if (scopes[i].$childNodesScope) {
                result = tv.findNodeScope(node, scopes[i].$childNodesScope.childNodes());
            }
            if (result !== null) break;
        }
        return result;
    };

    // Expand all parents of the node
    tv.expandToNode = function(nodeScope) {
        var currentScope = nodeScope;
        while (currentScope.$parentNodeScope) {
            currentScope = currentScope.$parentNodeScope;
            currentScope.expand();
        }
    };
}