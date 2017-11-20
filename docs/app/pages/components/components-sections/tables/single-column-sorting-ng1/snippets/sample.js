angular.module('app').controller('SingleColumnSortingCtrl', SingleColumnSortingCtrl);

function SingleColumnSortingCtrl() {
    var vm = this;

    vm.activeSorter = "date";
    vm.orderDesc = false;
    vm.sorterHeaders = [{
            sorterHeader: "",
            sortable: false,
            fixedClass: "table-col-icon"
        },
        {
            sorterHeader: "NAME",
            sortable: true,
            sort: "name",
            fixedClass: "table-col-md"
        },
        {
            sorterHeader: "AUTHOR",
            sortable: true,
            sort: "author",
            fixedClass: "table-col-md"
        },
        {
            sorterHeader: "DATE MODIFIED",
            sortable: true,
            sort: "date",
            fixedClass: "table-col-md"
        },
        {
            sorterHeader: "WORK COMPLETED (%)",
            sortable: true,
            sort: "complete",
            fixedClass: "table-col-md"
        },
        {
            sorterHeader: "STATUS",
            sortable: false,
            center: true,
            fixedClass: "table-col-md"
        }
    ];

    vm.sortableTable = [{
        id: 1,
        name: "Document 1",
        author: chance.name(),
        date: "18 Dec 2016",
        complete: 97,
        active: true
    }, {
        id: 2,
        name: "Document 2",
        author: chance.name(),
        date: "22 Dec 2016",
        complete: 15,
        active: false
    }, {
        id: 3,
        name: "Document 3",
        author: chance.name(),
        date: "12 Dec 2016",
        complete: 20,
        active: true
    }, {
        id: 4,
        name: "Document 4",
        author: chance.name(),
        date: "16 Dec 2016",
        complete: 74,
        active: true
    }, {
        id: 5,
        name: "Document 5",
        author: chance.name(),
        date: "11 Dec 2016",
        complete: 63,
        active: false
    }, {
        id: 6,
        name: "Document 6",
        author: chance.name(),
        date: "21 Dec 2016",
        complete: 21,
        active: true
    }, {
        id: 7,
        name: "Document 7",
        author: chance.name(),
        date: "17 Dec 2016",
        complete: 85,
        active: false
    }, {
        id: 8,
        name: "Document 8",
        author: chance.name(),
        date: "29 Dec 2016",
        complete: 11,
        active: true
    }];

    vm.sortByKey = function (array, key, descending) {
        if (descending === true) {
            return array.sort(function (a, b) {
                var x = a[key];
                var y = b[key];
                return ((x < y) ? 1 : ((x > y) ? -1 : ((a.id < b.id) ? -1 : 1)));
            });
        }
        return array.sort(function (a, b) {
            var x = a[key];
            var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : ((a.id < b.id) ? -1 : 1)));
        });
    };

    vm.sorterHeaders.forEach(function (headers) {
        headers.select = function (activeSorter, orderDesc) {
            vm.activeSorter = activeSorter;
            vm.orderDesc = orderDesc;
            vm.sortByKey(vm.sortableTable, activeSorter, orderDesc);
        };
    });

}
