angular.module('app').service('searchBuilderId', searchBuilderId);

function searchBuilderId() {
    var vm = this;

    vm.generateComponentId = function (componentName, searchQuery) {
        //initialise or increments

        vm.existingIds = [];

        //Get all IDs which have currently been assigned for each component
        for (var groupName in searchQuery) {
            var group = searchQuery[groupName];

            //build up list of all component ids
            for (var component in group) vm.existingIds.push(component);
        }

        var index = 0;
        var componentId;

        //setting upper limit to avoid an infinte loop
        while (index < 1000) {
            var desiredId = componentName + "-" + index;

            if (vm.existingIds.indexOf(desiredId) === -1) {
                componentId = desiredId;
                break;
            }

            index++;
        }

        return componentId;

    };

    return vm;
}