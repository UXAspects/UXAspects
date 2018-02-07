selectTableCtrl.$inject = ["$timeout", "$scope", "$filter"];

export default function selectTableCtrl($timeout, $scope, $filter) {
    var vm = this;

    // initial delay to ensue we have all the values we need
    $timeout(initialise.bind(vm));

    function initialise() {

        vm.tableHeight = vm.tableHeight || "300px";
        vm.displayVals = vm.values;
    
        if (vm.multipleSelect) {
            vm.selected = vm.selected || [];
        }
    
        vm.reselectFilteredItems = vm.selectHiddenItems === "reselect";
        vm.selectFilteredItems = !(vm.selectHiddenItems === "clear" || vm.selectHiddenItems === "reselect");
    
        vm.previouslySelected = null;
    
        $scope.$watch('vm.values', updateValues, true);
        $scope.$watch('vm.searchText', updateValues);
    }


    vm.displayFn = function(value) {
        return vm.selectKey ? value[vm.selectKey] : value;
    };

    vm.isselected = function(item) {
        var select_val = vm.selected;

        // if the selected value is a string
        if (!vm.multipleSelect) {
            return item === select_val;
        } else {
            var found = false;

            for (var i = 0; i < select_val.length; i++) {

                if (angular.equals(select_val[i], item)) {
                    found = true;
                    break;
                }
            }
            return found;
        }
    };

    function updateScrollbar() {

        // ensure scrollpane has been initialised
        if ($scope.pane === undefined) {
            return;
        }

        // update the scrollpane on next digest
        $timeout($scope.pane.reinitialise);
    }

    function updateValues() {

        var matchValue = {};
        matchValue[vm.selectKey] = vm.searchText;
        var hasObjectProperties = vm.values[0] !== null && typeof vm.values[0] === 'object';

        if (hasObjectProperties) {
            //it is an array of objects
            vm.displayVals = $filter('filter')(vm.values, matchValue);
        } else {
            //it is an array of strings
            vm.displayVals = $filter('filter')(vm.values, vm.searchText);
        }

        if (!vm.multipleSelect) {
            //When this flag is passed as false, we need to check if
            //the selected item is still visible, and deselect it if not.
            if (!vm.selectFilteredItems) {
                if (vm.selected && !vm.isValueVisible(hasObjectProperties, vm.selected)) {
                    //record the selected value for reselection
                    if (vm.reselectFilteredItems) {
                        vm.previouslySelected = vm.selected;
                    }
                    //deselect
                    vm.select(vm.selected);
                } else if (vm.reselectFilteredItems && vm.previouslySelected && !vm.selected) {
                    if (vm.isValueVisible(hasObjectProperties, vm.previouslySelected)) {
                        vm.select(vm.previouslySelected);
                    }
                }
            }
        }

        updateScrollbar();
    }

    vm.isValueVisible = function(hasObjectProperties, value) {

        //only need to act when an item is selected
        if (value) {
            //Case where the values are an object array
            if (hasObjectProperties) {
                return vm.displayVals.some(function(element) {
                    return element === value;
                });
            } else {
                //Case where the values are an array of strings
                return !!~vm.displayVals.indexOf(value);
            }
        }

    };

    vm.select = function(value, $event) {
        var mouseEvent = false;
        if ($event) {
            mouseEvent = $event.screenX || $event.screenY;
            mouseEvent = !!mouseEvent;
        }
        // if we are using multiple select, add selected value to vm.selected array. If not, just set vm.selected to be the value.
        if (!vm.multipleSelect) {
            //This is deselecting of already selected option
            if (value === vm.selected) {
                //clear selected value and index
                vm.selected = "";
                if (mouseEvent) {
                    $event.currentTarget.blur();
                }
            } else {
                //This is selecting an item
                vm.selected = value;
            }
        } else {
            var notFound = true;

            for (var i = 0; i < vm.selected.length; i++) {
                if (angular.equals(vm.selected[i], value)) {
                    vm.selected.splice(i, 1);
                    notFound = false;
                    if (mouseEvent) {
                        $event.currentTarget.blur();
                    }
                    break;
                }
            }

            if (notFound) {
                vm.selected.push(value);
            }
        }
    };

    vm.keydown = function(e) {
        //Enter or space, trigger a click
        if (e.which === 13 || e.which === 32) {
            $timeout(function() {
                e.target.click();
            });
            e.stopPropagation();
            e.preventDefault();
        }
    };
}