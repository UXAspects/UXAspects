SorterHeaderCtrl.$inject = ["$scope", "$attrs"];

export default function SorterHeaderCtrl($scope, $attrs) {
    var vm = this;

    vm.headers = $scope.$parent.$eval($attrs.headers);
    vm.defaultSorter = $scope.$parent.$eval($attrs.defaultSorter);
    vm.defaultOrder = $scope.$parent.$eval($attrs.defaultOrder);
    vm.fontSize = $scope.$parent.$eval($attrs.fontSize);

    // watch for changes to the headers value and update it when it is changed
    $scope.$watch(function() {
        return $scope.$parent.$eval($attrs.headers);
    }, function(newValue) {
        vm.headers = newValue;
    });

    var selectedColumn = {
        header: findHeader(vm.defaultSorter),
        descending: vm.defaultOrder
    };

    vm.select = function(header) {

        // if not a sortable row stop here
        if (!header.sortable) {
            return;
        }

        // if same header then toggle
        if (selectedColumn.header === header) {
            selectedColumn.descending = !selectedColumn.descending;
        } else {
            selectedColumn.header = header;
            selectedColumn.descending = false;
        }

        // call select function if present
        if (header.select) {
            header.select.call(header, selectedColumn.header.sort, selectedColumn.descending);
        }

    };

    vm.getIcon = function(header) {

        if (selectedColumn && selectedColumn.header === header) {
            return selectedColumn.descending ? 'hpe-descend' : 'hpe-ascend';
        }

        return 'ng-hide';
    };

    function findHeader(sort) {

        if (!vm.headers) {
            return null;
        }

        var matches = vm.headers.filter(function(header) {
            return header.sort === sort;
        });

        return matches[0];
    }
}