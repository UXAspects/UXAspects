angular.module("app").controller("SelectDemoCtrl", SelectDemoCtrl);

SelectDemoCtrl.$inject = ['$timeout', '$filter', '$q'];

function SelectDemoCtrl($timeout, $filter, $q) {
    var vm = this;

    // Configuration options for the single select controls
    vm.singleSelectOptions = {
        placeholder: "Select a location",
        pageSize: 20
    };

    // Configuration options for the multiple select controls
    vm.multipleSelectOptions = {
        placeholder: "Select some locations",
        pageSize: 20
    };

    // Data source with strings
    vm.locations = [
        "United States",
        "United Kingdom",
        "Afghanistan",
        "Aland Islands",
        "Albania",
        ...
    ];

    // Data source with objects
    vm.locationObjects = [];
    for (var i in vm.locations) {
        vm.locationObjects.push({
            country: vm.locations[i],
            id: i
        });
    }

    // Properties to bind to the ng-model attribute of each control
    vm.singleSelectLocation = "";
    vm.multipleSelectLocations = [];
    vm.singleSelectPagingLocation = "";
    vm.multipleSelectPagingLocations = [];

    // Paging function which returns a promise, and simulates an asynchronous data request
    // Fetches from vm.locations
    vm.locationPageFn = function(pageNumber, pageSize, searchString) {
        var deferred = $q.defer();
        // Simulate a server request using a timeout
        $timeout(function() {
            var results;
            results = $filter('filter')(vm.locations, searchString);
            results = results.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
            deferred.resolve(results);
        }, 1000);
        return deferred.promise;
    };

    // Paging function which returns a promise, and simulates an asynchronous data request
    // Fetches from vm.locationObjects
    vm.locationObjectPageFn = function(pageNumber, pageSize, searchString) {
        var deferred = $q.defer();
        // Simulate a server request using a timeout
        $timeout(function() {
            var results;
            results = $filter('filter')(vm.locationObjects, searchString);
            results = results.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
            deferred.resolve(results);
        }, 1000);
        return deferred.promise;
    };
}