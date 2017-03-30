angular.module('app').controller('SortToggleCtrl', SortToggleCtrl);

function SortToggleCtrl() {

    var vm = this;

    vm.sortDirectionToggle = {
        label: 'Sort by:',
        sorters: [{
            name: 'Document',
            sort: 'document',
            defaultSorter: true,
            select: function () {
                // Do stuff here when selected
            }
        }, {
            name: 'Name',
            sort: 'name',
            select: function () {
                // Do stuff here when selected
            }
        }, {
            name: 'Date',
            sort: 'date',
            select: function () {
                // Do stuff here when selected
            }
        }]
    };

    // An example method which finds active sorter from select() function
    vm.applySorter = function () {
        vm.sortDirectionToggle.sorters.forEach(function (sorters) {
            sorters.select = function (activeSorter, orderDesc) {
                vm.activeSorter = activeSorter;
                vm.orderDesc = orderDesc;
                vm.loadPage();
            };
        });
    };
}
