angular.module('app').controller('FixedHeaderTableController', ['$timeout', FixedHeaderTableController]);

function FixedHeaderTableController($timeout) {
    var vm = this;

    vm.people = [];
    vm.loading = false;
    vm.page = 0;

    /**
     * Simulate the server request
     */
    vm.loadPage = function() {

        // if we are currently loading or are loading more than 5 pages
        if (vm.loading || vm.page >= 5) {
            return;
        }

        // update the loading state
        vm.loading = true;

        // simulate server call
        $timeout(function() {

            // update the list of people and increment the current page
            vm.people = vm.people.concat(vm.getPeople(vm.page++, 50));

            // set the loading state to false
            vm.loading = false;

        }, 2000);
    };

    vm.getPeople = function(page, count) {

        // create an array of people
        var people = [];

        // populate the array with dummy data
        for (var idx = page * count; idx < (page * count) + count; idx++) {
            people.push({
                id: idx,
                name: chance.name(),
                address: chance.address(),
                phone: chance.phone(),
                active: chance.bool()
            });
        }

        return people;
    };
}