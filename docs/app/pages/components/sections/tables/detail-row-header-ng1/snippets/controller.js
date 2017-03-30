angular.module("app").controller("DetailRowResponsiveTableCtrl", DetailRowResponsiveTableCtrl);

DetailRowResponsiveTableCtrl.$inject = ["$scope", "exampleDataService"];

function DetailRowResponsiveTableCtrl($scope, exampleDataService) {

    var vm = this;
    vm.service = exampleDataService;

    vm.detailRowHeaders = [{
            title: "Type",
            class: "col-xs-1"
        },
        {
            title: "Participant",
            class: "col-xs-3"
        },
        {
            title: "From Address",
            class: "col-xs-3",
            sort: "address",
            filter: "detailRowHeaderPopover.html",
            filterClass: "demo-filter"
        },
        {
            title: "Subject",
            class: "col-xs-3",
            sort: "subject"
        },
        {
            title: "Message Score",
            class: "col-xs-2",
            sort: "percent"
        }
    ];

    vm.activeSorter = [null, null, null];
    vm.sortOrder = ["none", "none", "none"];
    vm.detailRowTable = vm.service.getDetailRowTable(vm.activeSorter, vm.sortOrder);

    //An example method which finds the active sorter from the select() function
    vm.applySorter = function () {
        vm.detailRowHeaders.forEach(function (detailRowHeaders) {
            detailRowHeaders.select = function (activeSorter, ascending) {
                vm.activeSorter = activeSorter;
                vm.sortOrder = ascending;
                vm.detailRowTable = vm.service.getDetailRowTable(vm.activeSorter, vm.sortOrder);
            };
        });
    };

    vm.applySorter();

    //watches for when the filter has been added before updating the table
    $scope.$on('detailRowTableUpdated', function () {
        vm.detailRowTable = vm.service.getDetailRowTable(vm.activeSorter, vm.sortOrder);
    });

}