(function() {

    angular.module('app').controller('ChooseModalCtrl', ChooseModalCtrl);

    ChooseModalCtrl.$inject = ['$scope', '$modalInstance', 'availableColumns'];

    function ChooseModalCtrl($scope, $modalInstance, availableColumns) {
        var vm = this;

        vm.scrollConfig = {
            autoReinitialise: true,
            enableKeyboardNavigation: true
        };

        vm.limitReached = false;

        vm.columnSearch = '';

        vm.hiddenColumns = availableColumns.filter(function(column) {
            return column.visible === false;
        }).slice(0);

        vm.visibleColumns = availableColumns.filter(function(column) {
            return column.visible === true;
        }).slice(0);

        vm.selectedColumns = [];

        vm.canAddColumns = false;
        vm.canRemoveColumns = false;

        // watch for any changes to selected rows
        $scope.$watch('vm.selectedColumns', updateButtons, true);
        $scope.$watch('vm.visibleColumns', updateButtons, true);

        vm.selectRow = function(event, column) {

            // if a drag element was clicked then ignore
            if (event.target.hasAttribute('reorder-up') ||
                event.target.hasAttribute('reorder-down') ||
                event.target.hasAttribute('reorder-drag')) {
                return;
            }

            // if column is locked then dont selected
            if (column.locked) return;

            column.selected = !column.selected;
        };

        vm.addColumns = function() {

            vm.selectedColumns.forEach(function(column) {

                // find index in visible columns array
                var index = vm.hiddenColumns.indexOf(column);

                // remove that item from the array
                var item = vm.hiddenColumns.splice(index, 1)[0];

                // add item to visible column array
                vm.visibleColumns.push(item);
            });

            // clear all selected items
            vm.selectedColumns = [];
        };

        vm.removeColumns = function() {
            // get the selected columns
            var columns = vm.visibleColumns.filter(function(column) {
                return column.selected;
            });

            // iterate and move
            for (var idx = 0; idx < columns.length; idx++) {

                var column = columns[idx];

                // get matching index
                var index = vm.visibleColumns.indexOf(column);

                // remove the item from visible list
                var item = vm.visibleColumns.splice(index, 1)[0];

                // deselect item
                item.selected = false;

                // push on to hidden list
                vm.hiddenColumns.push(item);
            }
        };

        vm.ok = function() {
            $modalInstance.close(generateColumnData());
        };

        vm.cancel = function() {
            $modalInstance.dismiss();
        };

        function generateColumnData() {
            var output = [];

            // store visible columns first
            vm.visibleColumns.forEach(function(column, index) {
                column.order = index;
                column.visible = true;

                output.push(column);
            });

            // then store hidden columns
            vm.hiddenColumns.forEach(function(column, index) {
                column.order = vm.visibleColumns.length + index;
                column.visible = false;

                output.push(column);
            });

            return output;
        }

        function updateButtons() {

            vm.canRemoveColumns = vm.visibleColumns.filter(function(column) {
                return column.selected;
            }).length > 0;

            if(vm.selectedColumns.length !== 0 && ((vm.selectedColumns.length + vm.visibleColumns.length) <= 7)) {
                vm.canAddColumns = true;
                vm.limitReached = false;
            }
            else if(vm.selectedColumns.length !== 0) {
                vm.limitReached = true;
                vm.canAddColumns = false;
            }
            else {
                vm.canAddColumns = false;
                vm.limitReached = false;
            }
        }
    }

})();