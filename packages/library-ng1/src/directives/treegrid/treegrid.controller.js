TreegridCtrl.$inject = ["$scope", "$q", "multipleSelectProvider"];

export default function TreegridCtrl($scope, $q, multipleSelectProvider) {
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
      rowClass: "shift-select-selected-bg"
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

  vm.allOptions = angular.extend({}, defaultOptions, vm.options);

  vm.isAsync = angular.isFunction(vm.data);

  vm.loading = false;

  vm.gridRows = [];

  vm.treeData = [];

  vm.multipleSelectInstance = multipleSelectProvider.getComponentInstance(treegridId);

  vm.allSelected = false;

  // Set up multi select to work standalone
  if (!vm.multipleSelectInstance.keyFn) {
    vm.multipleSelectInstance.keyFn = function (e) {
      return JSON.stringify(e.item);
    };
  }
  if (!vm.multipleSelectInstance.onSelect) {
    vm.multipleSelectInstance.onSelect = function () {};
  }
  if (!vm.multipleSelectInstance.onDeselect) {
    vm.multipleSelectInstance.onDeselect = function () {};
  }

  // Watch for changes to the tree data and update the view when it changes
  $scope.$watch('vm.data', function () {
    updateView();
  }, true);

  $scope.$watch("vm.multipleSelectInstance.selectedItems", function (nv) {
    if (angular.isArray(nv)) {
      // selectedItems are JSON from keyFn above
      var selected = [];
      for (var i = 0; i < nv.length; i += 1) {
        selected.push(JSON.parse(nv[i]));
      }
      vm.selected = selected;
    }
  }, true);

  // Event for reloading the grid to its initial state
  $scope.$on("treegrid.reload", function () {
    updateView();
  });

  $scope.$on("$destroy", function () {
    vm.multipleSelectInstance.reset();
  });

  // Retrieves array for ng-repeat of grid rows
  vm.getGridRows = function () {
    // Reusing an array object to prevent unnecessary change detection (endless digest cycle)
    vm.gridRows.length = 0;
    populateGridRows(vm.treeData, vm.gridRows);
    return vm.gridRows;
  };

  vm.toggleAllRows = function () {
    vm.allSelected =  !vm.allSelected;
    if (vm.allSelected) {
      vm.gridRows.forEach(row => row.selected = true);
    } else {
      vm.gridRows.forEach(row => row.selected = false);
    }
  };

  vm.expanderClick = function (row, e) {
    if (!row.canExpand) return;
    e.stopPropagation();
    return toggleExpand(row);
  };

  vm.checkboxClick = function (event) {
    event.stopPropagation(); 
  };

  // Expand the specified row if possible. Returns true if the row is expandable.
  vm.expand = function (row) {
    if (!row.canExpand || row.expanded) return false;
    expand(row);
    return true;
  };

  // Expand the specified row if possible and return the data load promise.
  vm.expandAsync = function (row) {
    if (!row.canExpand || row.expanded) {
      return $q.when(false);
    }
    return expand(row);
  };

  // Contract the specified row if possible. Returns true if the row is contractable.
  vm.contract = function (row) {
    if (!row.canExpand || !row.expanded) return false;
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

  // Initial load of top-level items
  updateView();

  function updateView() {
    vm.loading = true;
    getTreeData(getChildren(), 0)
      .then(function (rows) {
        // Populate top level rows
        vm.treeData = rows;
      })
      .then(function () {
        // Expand top level items if configured
        var promises = [];
        if (vm.allOptions.expandTopLevel) {
          for (var i = 0; i < vm.treeData.length; i += 1) {
            if (vm.treeData[i].canExpand) {
              promises.push(expand(vm.treeData[i]));
            }
          }
        }
        return $q.all(promises);
      })
      .catch(function (err) {
        vm.loading = false;
        console.error("Data load error: " + err);
      })
      .finally(function () {
        vm.loading = false;
      });
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
          expanded: false,
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
        row.api = rowApi(row);
        rows.push(row);
      }
      if (angular.isFunction(vm.allOptions.sort)) {
        rows = rows.sort(vm.allOptions.sort);
      }
      return rows;
    });
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
    for (var i = 0; i < treeData.length; i += 1) {
      output.push(treeData[i]);
      if (treeData[i].expanded) {
        populateGridRows(treeData[i].children, output);
      }
    }
  }

  // Toggle the expanded state of a row and update the view model accordingly
  function toggleExpand(row) {
    if (!row.canExpand) return;
    if (row.expanded) {
      return contract(row);
    }
    return expand(row);
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
        return row;
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