import { MultipleSelectBridge } from "./selection/multiple-select-bridge";
import { SelectionModel } from "./selection/tree-grid-selection-model";

TreeGridController.$inject = ["$scope", "$q", "multipleSelectProvider", "$timeout"];

/**
 * @param {ng.IScope} $scope
 * @param {ng.IQProvider} $q
 * @param {*} multipleSelectProvider
 * @param {ng.ITimeoutService} $timeout
 */
export function TreeGridController($scope, $q, multipleSelectProvider, $timeout) {
    var vm = this;

    var treegridId = multipleSelectProvider.getNextComponentId();

    var defaultOptions = {
        maxDepth: 5,
        childrenProperty: "nodes",
        expandTopLevel: false,
        select: {
            row: true,
            check: false,
            selectChildren: false,
            rowClass: "shift-select-selected-bg",
            indeterminate: false,
            comparator: (prev, current) => prev === current
        },
        expander: {
            type: "class",
            contracted: "hpe-chevron-right",
            expanded: "hpe-chevron-down",
            expanding: "spinner spinner-accent spinner-bounce-middle"
        },
        icons: {
            type: "class",
            get: function (item, expanded) {
                if ((angular.isFunction(vm.allOptions.hasChildren) && vm.allOptions.hasChildren(item)) ||
                    item.hasOwnProperty(vm.allOptions.childrenProperty)) {
                    return expanded ? "hpe-folder-open" : "hpe-folder";
                }
                return "hpe-document";
            }
        }
    };

    vm.loading = false;
    vm.gridRows = [];
    vm.treeData = [];
    vm.selectionModel = new SelectionModel();
    vm.allSelected = false;

    // private fields
    vm._selected = [];

    Object.defineProperty(vm, 'selected', {
        set: selection => vm.selectionModel.setSelection(...selection),
        get: () => vm.selectionModel.getSelection()
    });

    // Delay Initialising the function until we have all the inputs
    requestAnimationFrame(() => vm.onInit());

    vm.onInit = function () {

        // apply the specified options
        setOptions(vm.options);

        // determine if this is an async tree
        vm.isAsync = angular.isFunction(vm.data);

        // Watch for changes to the tree data and update the view when it changes
        const dataWatcher = $scope.$watch('vm.data', updateView, true);

        // watch for changes to the options
        const optionsWatcher = $scope.$watch('vm.options', options => setOptions(options), true);

        // Event for reloading the grid to its initial state
        const reloadWatcher = $scope.$on("treegrid.reload", () => updateView());

        // Initial load of top-level items
        updateView();

        if (vm.selectionManager) {
            vm.selectionManager({
                $selection: new MultipleSelectBridge(vm.selectionModel, this),
                $model: vm.selectionModel
            });
        }

        $scope.$digest();

        // clean up when tree grid is destroyed
        $scope.$on('$destroy', () => {
            dataWatcher();
            optionsWatcher();
            reloadWatcher();
        });
    };

    // Retrieves array for ng-repeat of grid rows
    vm.getGridRows = function () {
        // Reusing an array object to prevent unnecessary change detection (endless digest cycle)
        vm.gridRows.length = 0;
        populateGridRows(vm.treeData, vm.gridRows);
        return vm.gridRows;
    };

    vm.toggleAllRows = function () {
        vm.allSelected = !vm.allSelected;
        vm.gridRows.filter(row => !vm.isDisabled(row)).forEach(row => {
            return vm.allSelected ? vm.selectionModel.select(row.dataItem) : vm.selectionModel.deselect(row.dataItem);
        });
    };

    vm.expanderClick = function (row, event) {
        if (!row.canExpand) {
            return;
        }

        event.stopPropagation();
        return toggleExpand(row);
    };

    vm.checkboxClick = function (event, row) {

        // if the item is disabled then do nothing
        if (vm.isDisabled(row)) {
            return;
        }

        vm.selectionModel.toggle(row.dataItem);
        event.stopPropagation();
        event.preventDefault();
    };

    // Expand the specified row if possible. Returns true if the row is expandable.
    vm.expand = function (row) {
        if (!row.canExpand || row.expanded) {
            return false;
        }
        $timeout(() => expand(row));
        return true;
    };

    // Expand the specified row if possible and return the data load promise.
    vm.expandAsync = function (row) {
        if (!row.canExpand || row.expanded) {
            return $q.when(false);
        }

        row.expanding = true;

        // run async to allow loading indicator to appear
        // adding in 17ms delay (1 frame at 60fps - 16.6667ms)
        // to ensure firefox shows the loading indicator before blocking the main UI thread
        return $q(resolve => $timeout(() => expand(row).then(result => resolve(result)), 17));
    };

    // Contract the specified row if possible. Returns true if the row is contractable.
    vm.contract = function (row) {
        if (!row.canExpand || !row.expanded) {
            return false;
        }
        contract(row);
        return true;
    };

    // Reload the specified row if it has children. Returns the data load promise.
    vm.reloadAsync = function (row) {
        if (!row.canExpand) {
            return $q.when(false);
        }
        return reload(row);
    };

    vm.rowFocus = function (row, event) {
        vm.currentRow = {
            element: angular.element(event.target),
            item: row.dataItem,
            row: row
        };
    };

    // Format user defined icon class to include hpe-icon if required
    vm.iconClass = function (className) {
        if (className && className.indexOf("hpe-") >= 0) {
            return ["hpe-icon", className];
        }
        return className;
    };

    vm.isDisabled = function (row) {
        const data = row.dataItem;
        const disabledProperty = vm.allOptions.disabled;

        if (angular.isString(disabledProperty)) {
            return data.hasOwnProperty(disabledProperty) ? data[disabledProperty] : false;
        }

        if (angular.isFunction(disabledProperty)) {
            return disabledProperty(data);
        }

        return false;
    };

    function setOptions(options) {
        // update the options
        vm.allOptions = angular.extend({}, defaultOptions, options);

        // update the comparator function
        vm.selectionModel.comparator = vm.allOptions.select.comparator;
    }

    function updateView() {
        vm.loading = true;
        getTreeData(getChildren(), 0)
            .then(rows => vm.treeData = rows)
            .then(function () {
                // Expand top level items if configured
                var promises = vm.treeData
                    .filter(row => row.canExpand && (vm.allOptions.expandTopLevel || row.expanded))
                    .map(row => expand(row));
                return $q.all(promises);
            })
            .catch(function (err) {
                vm.loading = false;
                console.error("Data load error: " + err);
            })
            .finally(() => vm.loading = false);
    }

    // Get row data suitable for angular binding from an array of source data
    function getTreeData(dataPromise, level) {
        // dataPromise might also be just regular data
        return $q.when(dataPromise).then(function (data) {
            var rows = [];
            for (var i = 0; i < data.length; i += 1) {
                var canExpand = hasChildren(data[i]) && level < vm.allOptions.maxDepth;
                var row = {
                    treegridId: treegridId,
                    level: level,
                    levelClass: "treegrid-level-" + level,
                    rowClass: getRowClass(data[i]),
                    canExpand: canExpand,
                    expanding: false,
                    expander: {
                        type: vm.allOptions.expander.type,
                        contracted: vm.allOptions.expander.contracted,
                        expanded: vm.allOptions.expander.expanded,
                        expanding: vm.allOptions.expander.expanding
                    },
                    icon: {
                        type: vm.allOptions.icons.type,
                        get: vm.allOptions.icons.get
                    },
                    dataItem: data[i],
                    children: []
                };
                configureRowExpandedProperty(row);
                row.api = rowApi(row);
                rows.push(row);
            }
            if (angular.isFunction(vm.allOptions.sort)) {
                rows = rows.sort(vm.allOptions.sort);
            }
            return rows;
        });
    }

    function configureRowExpandedProperty(row) {
        // Link the `expanded` property to the dataItem property if defined
        if (vm.allOptions.expandedProperty) {
            Object.defineProperty(row, 'expanded', {
                get: function () {
                    return this.dataItem[vm.allOptions.expandedProperty];
                },
                set: function (value) {
                    this.dataItem[vm.allOptions.expandedProperty] = value;
                }
            });
        } else {
            row.expanded = false;
        }
    }

    // Set up functions for the row
    function rowApi(row) {
        return {
            expand: function () {
                return vm.expandAsync(row);
            },
            contract: function () {
                return vm.contract(row);
            },
            reload: function () {
                return vm.reloadAsync(row);
            },
            getValueForColumn: function (colIndex) {
                return getValueForColumn(row, colIndex);
            }
        };
    }

    // Returns true if the source data item has children according to configuration
    function hasChildren(dataItem) {
        if (angular.isFunction(vm.allOptions.hasChildren)) {
            return vm.allOptions.hasChildren(dataItem);
        }
        return angular.isArray(dataItem[vm.allOptions.childrenProperty]) && dataItem[vm.allOptions.childrenProperty].length > 0;
    }

    // Returns the array of child data items from a source data item
    function getChildren(dataItem) {
        if (vm.isAsync) {
            // data is a function which returns a promise
            return vm.data(dataItem);
        }
        // Working with pre-loaded data
        if (!angular.isDefined(dataItem)) {
            return vm.data;
        }
        if (hasChildren(dataItem)) {
            return dataItem[vm.allOptions.childrenProperty];
        }
        return [];
    }

    // Flatten the treeData structure into an array of items and expanded children for the grid.
    function populateGridRows(treeData, output) {

        treeData.forEach(row => {

            // add the row to the output array
            output.push(row);

            // if it is expanded also add any children
            if (row.expanded) {
                populateGridRows(row.children, output);
            }
        });
    }

    // Toggle the expanded state of a row and update the view model accordingly
    function toggleExpand(row) {

        // if expansion is not allowed then do nothing
        if (!row.canExpand) {
            return;
        }

        if (row.expanded) {
            return contract(row);
        } else {
            return vm.expandAsync(row);
        }
    }

    // Remove children of a row from the view model
    function contract(row) {
        row.expanded = false;
        return $q.when(row);
    }

    // Add children of a row to the view model
    function expand(row) {
        row.expanding = true;
        return getTreeData(getChildren(row.dataItem), row.level + 1)
            .then(function (newRows) {
                row.children = newRows;
                row.expanded = true;
                // Expand any child rows
                var promises = newRows.filter(row => row.canExpand && row.expanded).map(row => expand(row));
                return $q.all(promises).then(() => row);
            })
            .catch(function (err) {
                console.error("Data load error: " + err);
            })
            .finally(function () {
                row.expanding = false;
            });
    }

    // Reload the children of a row
    function reload(row) {
        row.children = [];
        return expand(row);
    }

    function getValueForColumn(row, colIndex) {
        if (colIndex < 0 || colIndex >= vm.columns.length) {
            throw new Error("colIndex is out of range");
        }
        var col = vm.columns[colIndex];
        if (angular.isString(col.value) && row.dataItem.hasOwnProperty(col.value)) {
            return row.dataItem[col.value];
        }
        if (angular.isFunction(col.value)) {
            return col.value(row.dataItem);
        }
        return "";
    }

    function getRowClass(dataItem) {
        var rowClassProperty = vm.allOptions.rowClass;
        if (angular.isString(rowClassProperty) && dataItem.hasOwnProperty(rowClassProperty)) {
            return dataItem[rowClassProperty];
        }
        if (angular.isFunction(rowClassProperty)) {
            return rowClassProperty(dataItem);
        }
        return null;
    }
}