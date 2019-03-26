import { ENTER, DELETE } from '@angular/cdk/keycodes';

export default class TreeViewCtrl {

    static get $inject() {
        return ['$scope', '$element', '$timeout'];
    }

    /**
     * @param {ng.IScope} $scope
     * @param {JQuery} $element
     * @param {ng.ITimeoutService} $timeout
     */
    constructor($scope, $element, $timeout) {

        /** @type {ng.IScope} */
        this.$scope = $scope;

        /** @type {ng.ITimeoutService} */
        this.$timeout = $timeout;

        /** @type {ng.IScope} - the scope of the parent controller */
        this.treeScope = null;

        /** @type {(item: TreeViewNode) => boolean} */
        this.filterFunction = $scope.filterFunction || null;

        /** @type {TreeViewNode} */
        this.selectedNode = $scope.selected;

        /** @type {ng.IScope} */
        this.selectedNodeScope = null;

        /** @type {TreeViewNode} reference to the node being edited */
        this.editingNode = null;

        //The developer can pass in functions for adding new items and adding new folders.
        //These will be decorated with the internal functionality, not overridden.
        //if no functions are supplied here, the tree will provide inline edit buttons
        /** @type {Function} */
        this.addItem = $scope.addItem || angular.noop();

        /** @type {Function} */
        this.deleteFn = $scope.deleteFn || angular.noop();

        /** @type {boolean} */
        this.readOnly = $scope.readOnly || false;

        /** @type {TreeViewOptions} */
        this.treeOptions = $scope.treeOptions || { showTreeLines: true, openOnSelect: false };

        /** @type {boolean} */
        this.inlineEdit = !!(!this.addItem);

        /** @type {TreeViewIconConfig} */
        this.icons = $scope.icons || {
            folder: {
                collapsed: 'hpe-folder',
                expanded: 'hpe-folder-open'
            },
            item: 'hpe-document',
            'default': 'hpe-3d'
        };

        $scope.$watch(() => this.selectedNode, selected => {
            if (selected !== undefined) {
                $scope.selected = selected;
            }
        }, true);

        $scope.$watch('selected', selected => {
            this.selectedNode = selected;
            this.ensureVisible(selected);
        });

        //Initialisation
        $timeout(() => {
            this.treeScope.collapseAll();

            $timeout(() => {
                const treeElement = $element.find('.angular-ui-tree');
                //Make tree visible after it is loaded
                treeElement.css('max-height', '');
                treeElement.css('visibility', '');
            });
        });
    }

    /**
     * @param {ng.IScope} parentScope
     */
    init(parentScope) {
        if (!this.treeScope) {
            this.treeScope = parentScope;
        }
    }

    /**
     * @param {string} type
     * @param {boolean} collapsed
     */
    getIcon(type, collapsed) {

        if (this.icons && type) {
            const icon = this.icons[type];
            if (!icon) {
                return this.icons['default'];
            }

            if (typeof icon === 'string' || icon instanceof String) {
                return icon;
            }

            if (icon.collapsed && collapsed) {
                return icon.collapsed;
            }

            if (icon.expanded && !collapsed) {
                return icon.expanded;
            }

            return this.icons['default'];
        }
    }

    /**
     * @param {TreeViewNode} node
     */
    getTooltip(node) {
        if (!node.tooltip) {
            return;
        }

        return typeof node.tooltip === 'function' ? node.tooltip.call(null, node) : node.tooltip;
    }

    /**
     * @param {ng.IScope} scope
     * @returns {boolean}
     */
    canAddItem(scope) {
        return scope.$modelValue.allowChildren && !this.readOnly && (!this.selectedNode.permissions || (this.selectedNode.permissions && this.selectedNode.permissions.add));
    }

    /**
     * @returns {boolean}
     */
    canDeleteItem() {
        return !this.readOnly && (!this.selectedNode.permissions || (this.selectedNode.permissions && this.selectedNode.permissions.delete));
    }

    /**
     * @returns {boolean}
     */
    canEditItem() {
        return !this.readOnly && (!this.selectedNode.permissions || (this.selectedNode.permissions && this.selectedNode.permissions.edit));
    }

    /**
     * @param {ng.IScope} scope
     * @param {boolean} allowChildren
     * @param {TreeViewNode} newItem
     */
    newSubItem(scope, allowChildren, newItem) {
        if (this.canAddItem(scope)) {
            //create the new item
            const nodeData = scope.$modelValue;
            const itemToAdd = newItem || { id: -1, allowChildren: !!allowChildren, title: 'New', nodes: [] };
            const length = nodeData.nodes.push(itemToAdd);

            //select the new node for editing
            //defer execution until the $$hashKey is available. i.e. after the browser has rendered
            //If you want to manipulate objects before Angular manipulates the DOM you can use evalAsync - from a controller context
            //From a directive context, evalAsync runs after the DOM has been manipulated
            this.$timeout(() => {
                this.selectedNodeScope.expand();

                this.selectedNode = nodeData.nodes[length - 1];
                this.edit({ $modelValue: nodeData.nodes[length - 1] }, !!newItem);

                this.selectedNodeScope = this.selectedNodeScope.childNodes()[this.selectedNodeScope.childNodesCount() - 1];
            });
        }
    }

    /** only show nodes based on their title, or according to the supplied function
     * @param {TreeViewNode} item
     * @returns {boolean}
     */
    filter(item) {
        if (this.filterFunction) {
            return !!this.filterFunction(item);
        }
        return !(this.$scope.query && this.$scope.query.length > 0 && item.title.indexOf(this.$scope.query) === -1);
    }

    /**
     * remove an item from the tree
     * @param {ng.IScope} scope
     */
    remove(scope) {
        scope.remove();
    }

    /**
     * handle the selected item in the tree
     * @param {ng.IScope} scope
     */
    select(scope) {
        //check if it's already clicked
        const firstClick = !this.isSelected(scope);
        //update reference to the selected node
        this.selectedNode = scope.$modelValue;
        this.selectedNodeScope = scope;
        //change any text inputs back to spans
        this.editingNode = null;
        if (this.treeOptions.openOnSelect) {
            //toggle the node
            scope.select(scope);
            //force the node to be expanded if this the initial selection
            //otherwise clicking again on the selected node will toggle it as any other node
            if (firstClick) {
                scope.expand();
            }
        }
    }

    /**
     * call on a node to check if it's currently selected
     * @param {ng.IScope} scope
     * @returns {boolean}
     */
    isSelected(scope) {
        if ((this.selectedNode === null) || (!scope.$modelValue)) {
            return false;
        }
        //we compare on the internal hashkey in case the titles or IDs aren't unique
        return (this.selectedNode.$$hashKey === scope.$modelValue.$$hashKey);
    }

    /** call on a node to check if it's currently being edited
     * @param {ng.IScope} scope
     * @returns {boolean}
     */
    isBeingEdited(scope) {
        if ((this.editingNode === null) || (!scope.$modelValue)) {
            return false;
        }
        //we compare on the internal hashkey in case the titles or IDs aren't unique
        return (this.editingNode.$$hashKey === scope.$modelValue.$$hashKey);
    }

    /**
     * activate inline edit of the selected node's title
     * @param {ng.IScope} scope
     * @param {boolean} itemAlreadyCreated
     */
    edit(scope, itemAlreadyCreated) {
        //if an item was added via the API then it does not need edited here again
        if (itemAlreadyCreated) {
            return;
        }
        //editing is only performed on the currently selected item
        if (this.isSelected(scope) && this.canEditItem(scope)) {
            this.editingNode = scope.$modelValue;
            this.editingNode.$oV = this.editingNode.title;
            //if possible, select all the text in the input
            if (this.selectedNodeScope && this.selectedNodeScope.$element) {
                this.$timeout(() => this.selectedNodeScope.$element.find('input.title-edit').select());
            }
        } else {
            //this function is bound to the node title. If it wasn't already selected, click through to the default node action.
            this.select(scope);
        }
    }

    /**
     * Save off changes to a node
     * @param {KeyboardEvent} $event
     */
    finishEdit($event) {
        if (($event.which === ENTER) || ($event.type === 'blur')) {
            //if the node is now blank, undo the change
            if (this.editingNode && this.editingNode.title === '') {
                this.editingNode.title = this.editingNode.$oV;
            }
            //exit edit mode
            this.editingNode = null;
            if ($event.type === 'keypress') {
                this.$timeout(() => this.selectedNodeScope.$element.find('span.title-readonly')[0].focus());
            }
        }
    }

    addItem() {
        if (this.selectedNode) {
            //call decoratee
            this.newSubItem(this.wrapNode(this.selectedNode), false, this.addItem() || null);
        }
    }

    /**
     * @param {ng.IScope} scope
     */
    deleteFn(scope) {
        if (this.selectedNode) {
            if (this.canDeleteItem(scope)) {
                //call decoratee
                const response = this.deleteFn() || null;
                if (response) {
                    this.$timeout(() => {
                        if (this.selectedNodeScope.$parentNodeScope !== null) {
                            this.selectedNodeScope.$parentNodeScope.$element.find('span.title-readonly')[0].focus();
                        }
                        this.remove(this.selectedNodeScope);
                        this.selectedNode = null;
                        this.selectedNodeScope = null;
                    });
                }
            }
        }
    }

    /**
     * @param {TreeViewNode} node
     */
    wrapNode(node) {
        return { $modelValue: node };
    }

    /**
     * @param {ng.IScope} scope
     * @param {KeyboardEvent} $event
     */
    keyboardSelect(scope, $event) {
        if ($event.which === ENTER) {
            this.edit(scope);
        } else if ($event.which === 45) { // insert
            this.select(scope);
            if (this.$scope.addItem) {
                this.$scope.addItem(scope);
            }

        } else if ($event.which === DELETE) {
            this.select(scope);
            if (this.$scope.deleteFn) {
                this.$scope.deleteFn(scope);
            }
        }
    }

    /**
     * Find the node in the table and expand to it
     * @param {TreeViewNode} node
     */
    ensureVisible(node) {
        const nodeScope = this.findNodeScope(node, this.treeScope.$nodesScope.childNodes());
        if (nodeScope !== null) {
            this.expandToNode(nodeScope);
        }
    }

    /**
     * Return the scope for the node in the given scope hierarchy
     * @param {TreeViewNode} node
     * @param {ng.IScope[]} scopes
     */
    findNodeScope(node, scopes) {
        let result = null;
        for (let i = 0; i < scopes.length; i += 1) {
            if (scopes[i].$modelValue === node) {
                result = scopes[i];
            }
            else if (scopes[i].$childNodesScope) {
                result = this.findNodeScope(node, scopes[i].$childNodesScope.childNodes());
            }
            if (result !== null) break;
        }
        return result;
    }

    /**
     * Expand all parents of the node
     * @param {ng.IScope} nodeScope
     */
    expandToNode(nodeScope) {
        let currentScope = nodeScope;
        while (currentScope.$parentNodeScope) {
            currentScope = currentScope.$parentNodeScope;
            currentScope.expand();
        }
    }
}

/**
 * @typedef {Object} TreeViewNode
 * @property {number} id
 * @property {string} title
 * @property {string} type
 * @property {string|Function} [tooltip]
 * @property {TreeViewNode[]} [nodes]
 * @property {boolean} [allowChildren]
 */

 /**
 * @typedef {Object} TreeViewOptions
 * @property {boolean} [showTreeLines]
 * @property {boolean} [openOnSelect]
 * @property {number} [loadHeight]
 */

 /**
 * @typedef {Object} TreeViewIconFolderConfig
 * @property {string} collapsed
 * @property {string} expanded
 */

/**
 * @typedef {Object} TreeViewIconConfig
 * @property {TreeViewIconFolderConfig} folder
 * @property {string} item
 * @property {string} [default]
 */