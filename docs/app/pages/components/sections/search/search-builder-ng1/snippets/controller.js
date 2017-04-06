angular.module('app').controller('SearchBuilderDemoCtrl', SearchBuilderDemoCtrl);

SearchBuilderDemoCtrl.$inject = ['$modal'];

function SearchBuilderDemoCtrl($modal) {
    var vm = this;

    // store a stringified version of the search query object
    vm.searchQuery = JSON.stringify({
        "keywords": {
            "keyword-0": {
                "component": "keyword",
                "value": null
            }
        }
    }, null, 4);


    vm.openModal = function () {

        var modalInstance = $modal.open({
            animation: false,
            templateUrl: 'modalLayout.html',
            controller: 'SearchBuilderDemoModalCtrl',
            controllerAs: 'vm',
            keyboard: 'true',
            size: 'lg',
            windowClass: 'search-builder-modal-window',
            resolve: {
                searchQuery: function () {
                    //provide the modal with the existing search query if there is one
                    return JSON.parse(vm.searchQuery);
                }
            }
        });

        modalInstance.result.then(function (result) {
            if (result === "cancel") return;

            //store the search query as a stringified version of the object
            vm.searchQuery = JSON.stringify(result, null, 4);
        });
    };
}