ComponentListCtrl.$inject = ['$scope'];

export default function ComponentListCtrl($scope) {
    var vm = this;

    // set defaults
    vm.components = Array.isArray(vm.components) ? vm.components : [];
    vm.buttonText = vm.buttonText ? vm.buttonText : 'Add a field';
    vm.minComponents = vm.minComponents ? vm.minComponents : 0;

    // create initial fields if minimum components have been set
    initialiseFields();

    // set initial button states
    updateButtonStates();

    vm.addField = function () {

        // if adding is not enabled then do nothing
        if (vm.addingDisabled === true) {
            return;
        }

        vm.components.push(null);

        // if add event was specified then call it
        if (vm.onAdd) {
            vm.onAdd.call();
        }

    };

    vm.removeField = function (index) {

        if (vm.removingDisabled === true) {
            return;
        }

        vm.components.splice(index, 1);

        // if add event was specified then call it
        if (vm.onRemove) {
            vm.onRemove.call();
        }
    };

    $scope.$watch('vm.components', function () {
        // ensure we have dont exceed the maximum number of components
        if(vm.maxComponents && vm.components.length > vm.maxComponents) {
            vm.components = vm.components.slice(0, vm.maxComponents);
        }

        // update button availability
        updateButtonStates();
    }, true);

    function initialiseFields() {
        if (vm.components.length < vm.minComponents) {
            for (var idx = 0; idx <= (vm.minComponents - vm.components.length); idx++) {
                vm.components.push(null);
            }
        }
    }

    function updateButtonStates() {

        // determine if adding is enabled based on if any empty fields and max number of allowed fields
        var emptyFields = vm.components.filter(function (item) {
            return item === undefined || item === null || item === '';
        });

        vm.addingDisabled = emptyFields.length > 0;

        // enforce max component count
        if (vm.addingDisabled === false && vm.maxComponents && vm.components.length >= vm.maxComponents) {
            vm.addingDisabled = true;
        }

        // enforce minimum components limit
        vm.removingDisabled = vm.components.length <= vm.minComponents;
    }
}