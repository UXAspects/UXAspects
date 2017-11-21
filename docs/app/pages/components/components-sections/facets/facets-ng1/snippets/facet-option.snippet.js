angular.module("app").controller("ListViewCtrl", ListViewCtrl);

function ListViewCtrl($state, items, exampleDataService, $rootScope, multipleSelectProvider) {
    var vm = this;
    // ........

    vm.service = exampleDataService;
    vm.totalItems = vm.service.getTotal();
    vm.currentPage = 1;
    vm.pageSize = 50;
    vm.items = items;
    vm.filters = [];
    vm.facets = [];
    vm.dropdownFilters = [];
    // .........
    vm.multiprovider = multipleSelectProvider;
    // ..........
    vm.facets.push(usersFacet);
    vm.facets.push(extFacet);
    vm.generateFacetObjects();
    vm.generateFilters();
    vm.clearAllFn = function () {
        // ...
    };
}

ListViewCtrl.prototype.generateFacetObjects = function () {
    var vm = this;
    // .........
    option.select = function () {
        // .........
        vm.updateSelectCounts();
        vm.loadPage();
    };

    option.deselect = function () {
        // ..........
        vm.updateSelectCounts();
        vm.loadPage();
    };

    option.count = vm.getCount(option);
    option.disabled = false;
    option.showZero = true;
};

ListViewCtrl.prototype.updateSelectCounts = function () {
    var vm = this;

    vm.count = 0;
    //sort out filters
    var filters = filters || [];

    vm.filters.forEach(function (filterListToBeOred) {
        if (filterListToBeOred.length > 0) {
            filters.push(function (data) {
                return filterListToBeOred.some(function (filter) {
                    return filter(data);
                });
            });
        }
    });

    vm.items = vm.service.getPage(vm.currentPage - 1, vm.pageSize, filters);

    for (var i = 0; i < vm.items.length; i++) {
        if (vm.multiprovider.isSelected(vm.items[i])) {
            vm.count = vm.count + 1;
        }
    }

    vm.multiprovider.state.count = vm.count;
};