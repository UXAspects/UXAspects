ComponentCtrl.$inject = ['$scope'];

export default function ComponentCtrl($scope) {
    var vm = this;

    var KEYS = {
        ENTER: 13
    };

    // get the parent controller
    vm.componentListCtrl = $scope.$parent.vm;

    // store the state of the remove button
    vm.removingDisabled = vm.componentListCtrl.removingDisabled;

    // remove this field
    vm.removeField = function () {
        vm.componentListCtrl.removeField($scope.$parent.$index);
    };

    vm.keyDown = function (event) {
        if (event.keyCode !== KEYS.ENTER) {
            return;
        }

        // determine if this is the last item in the list
        if ($scope.$parent.$last) {
            vm.componentListCtrl.addField();
        }
    };

    $scope.$watch('vm.componentListCtrl.removingDisabled', function (value) {
        vm.removingDisabled = value;
    });
}