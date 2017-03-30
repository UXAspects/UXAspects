vm.sorters = {
    title: "Sort by",
    options: [{
        name: "NAME",
        sort: "document",
        default: false,
        iconClass: "hpe-icon hpe-actions"
    }, {
        name: "DATE MODIFIED (earliest)",
        sort: "date",
        default: false,
        iconClass: "hpe-icon hpe-manual"
    }, {
        name: "DATE MODIFIED (latest)",
        sort: "date",
        orderDesc: true,
        default: true,
        iconClass: "hpe-icon hpe-3d"
    }]
};

//An example method which finds active sorter from select() function
ListViewCtrl.prototype.applySorter = function () {
    var vm = this;

    vm.sorters.options.forEach(function (option) {
        option.select = function (sorter) {
            vm.activeSorter = sorter.sort;
            vm.orderDesc = sorter.orderDesc;
            //The page will be sorted according to the value of active sorter in loadPage() function before loading
            vm.loadPage();
        };
    });
}