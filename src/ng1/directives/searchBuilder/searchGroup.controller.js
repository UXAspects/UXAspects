SearchGroupCtrl.$inject = ['$scope'];

export default function SearchGroupCtrl($scope) {
    var vm = this;

    vm.data = {};
    vm.components = [];
    vm.showPlaceholder = false;
    vm.maxFields = $scope.maxFields ? parseInt($scope.maxFields) : null;
    vm.readOnly = $scope.readOnly;

    vm.addNewField = function(index) {

        const targetFunction = vm.getAddFields()[index];

        //call the user function specified to add a field
        if (!targetFunction) throw new Error('Search Builder - Add Field function required.');

        //check to ensure we have not reached the maximum number of fields
        if (vm.maxFields && vm.components.length >= vm.maxFields) return;

        var newField = targetFunction();

        //if it returns a promise then dont do anything until resolved
        if (newField.then) {

            //show placeholder until promise has been resolved
            vm.showPlaceholder = true;

            //when field type is known
            newField.then(function(field) {

                //check if there is an array of fields being added
                var fields = Array.isArray(field) ? field : [field];

                //create new components
                for (var i = 0; i < fields.length; i++) {
                    var component = vm.findComponentByName(fields[i].component);
                    vm.createComponent(fields[i].id, component);
                }

                //hide placeholder now that promise has been resolved
                vm.showPlaceholder = false;
            });

            //if the promise is rejected then hide the placeholder
            newField.catch(function() {
                vm.showPlaceholder = false;
            });
        } else {

            //check if there is an array of fields being added
            var newFields = Array.isArray(newField) ? newField : [newField];

            //create new components
            for (var i = 0; i < newFields.length; i++) {
                var component = vm.findComponentByName(newFields[i].component);
                vm.createComponent(newFields[i].id, component);
            }
        }
    };

    vm.createComponent = function(componentId, component, value) {
        vm.data[componentId] = {
            component: component.name,
            value: value ? value : null
        };

        vm.components.push({
            componentId: componentId,
            templateUrl: component.templateUrl
        });

        //keep everything up to date
        $scope.searchBuilder.setGroupValue($scope.groupId, vm.data);
    };

    vm.findComponentByName = function(componentName) {

        for (var i = 0; i < $scope.searchBuilder.components.length; i++) {
            if ($scope.searchBuilder.components[i].name === componentName) return $scope.searchBuilder.components[i];
        }

        return null;
    };


    vm.removeComponent = function(componentId) {

        // if there is an remove-field function specified then call it
        if ($scope.removeField) {

            // call the function passing in the componentId
            var shouldRemove = $scope.removeField(componentId);

            // the result might be a promise
            if (shouldRemove && shouldRemove.then) {

                // wait for promise to be resolved
                shouldRemove.then(function(result) {

                    if (result === true) {
                        performRemoval();
                    }
                });

            } else {
                if (shouldRemove === undefined || shouldRemove === true) {
                    performRemoval();
                }
            }

        } else {
            performRemoval();
        }

        function performRemoval() {

            //remove any traces of data from this component
            delete vm.data[componentId];

            for (var i = 0; i < vm.components.length; i++) {
                if (vm.components[i].componentId === componentId) {
                    vm.components.splice(i, 1);
                    return;
                }
            }

            //keep everything up to date
            $scope.searchBuilder.setGroupValue($scope.groupId, vm.data);
        }

    };

    vm.setInitialData = function(data) {
        //store this new data
        vm.data = data;

        //iterate each item and create appropriate control
        for (var componentId in data) {
            //get field properties
            var props = data[componentId];
            var componentName = props.component;
            var initialValue = props.value;

            //create field using the component name
            var component = vm.findComponentByName(componentName);
            vm.createComponent(componentId, component, initialValue);
        }
    };

    vm.getComponentValue = function(componentId) {
        return vm.data[componentId].value;
    };

    vm.updateComponentValue = function(componentId, value) {
        vm.data[componentId].value = value;

        //keep everything up to date
        $scope.searchBuilder.setGroupValue($scope.groupId, vm.data);
    };

    vm.getAddFields = function () {
        return Array.isArray($scope.addField) ? $scope.addField : [$scope.addField];
    };

    vm.getButtonText = function (index) {
        // normalize the data so we are always dealing with an array
        const labels = Array.isArray($scope.buttonText) ? $scope.buttonText : [$scope.buttonText];

        // get the label at the given index
        return labels[index];
    };
}