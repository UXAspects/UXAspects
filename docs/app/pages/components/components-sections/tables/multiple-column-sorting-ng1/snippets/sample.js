angular.module('app').controller('MultipleColumnSortingCtrl', MultipleColumnSortingCtrl);

function MultipleColumnSortingCtrl() {
    var vm = this;

    vm.activeSorter = ["none", "none", "none"]; //initially setting these values to "none" results in no default sorting
    vm.orderDesc = ["none", "none", "none"];

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
        name: "Document",
        author: chance.name(),
        date: "18 Dec 2016",
        complete: 97,
        active: true
    }, {
        id: 2,
        name: "Email",
        author: chance.name(),
        date: "22 Dec 2016",
        complete: 15,
        active: false
    }, {
        id: 3,
        name: "Email",
        author: chance.name(),
        date: "12 Dec 2016",
        complete: 20,
        active: true
    }, {
        id: 4,
        name: "Email",
        author: chance.name(),
        date: "16 Dec 2016",
        complete: 74,
        active: true
    }, {
        id: 5,
        name: "Email",
        author: chance.name(),
        date: "17 Dec 2016",
        complete: 63,
        active: false
    }, {
        id: 6,
        name: "Document",
        author: chance.name(),
        date: "21 Dec 2016",
        complete: 21,
        active: true
    }, {
        id: 7,
        name: "Document",
        author: chance.name(),
        date: "17 Dec 2016",
        complete: 85,
        active: false
    }, {
        id: 8,
        name: "Document",
        author: chance.name(),
        date: "17 Dec 2016",
        complete: 11,
        active: true
    }];

    vm.sortByKey = function (array, key, descending) {
        return array.sort(function (a, b) {
            var desc0 = 0,
                desc1 = 0,
                desc2 = 0;

            if (descending[0] === true) {
                desc0 = 1;
            }
            if (descending[1] === true) {
                desc1 = 2;
            }
            if (descending[2] === true) {
                desc2 = 4;
            }
            var sortCase = desc0 + desc1 + desc2;
            var x0 = a[key[0]];
            var y0 = b[key[0]];
            var x1 = a[key[1]];
            var y1 = b[key[1]];
            var x2 = a[key[2]];
            var y2 = b[key[2]];

            switch (sortCase) {
                case 0:
                    return ((x0 < y0) ? -1 : ((x0 > y0) ? 1 : ((x1 < y1) ? -1 : ((x1 > y1) ? 1 : ((x2 < y2) ? -1 : ((x2 > y2) ? 1 : ((a.id < b.id) ? -1 : 1)))))));
                case 1:
                    return ((x0 < y0) ? 1 : ((x0 > y0) ? -1 : ((x1 < y1) ? -1 : ((x1 > y1) ? 1 : ((x2 < y2) ? -1 : ((x2 > y2) ? 1 : ((a.id < b.id) ? -1 : 1)))))));
                case 2:
                    return ((x0 < y0) ? -1 : ((x0 > y0) ? 1 : ((x1 < y1) ? 1 : ((x1 > y1) ? -1 : ((x2 < y2) ? -1 : ((x2 > y2) ? 1 : ((a.id < b.id) ? -1 : 1)))))));
                case 3:
                    return ((x0 < y0) ? 1 : ((x0 > y0) ? -1 : ((x1 < y1) ? 1 : ((x1 > y1) ? -1 : ((x2 < y2) ? -1 : ((x2 > y2) ? 1 : ((a.id < b.id) ? -1 : 1)))))));
                case 4:
                    return ((x0 < y0) ? -1 : ((x0 > y0) ? 1 : ((x1 < y1) ? -1 : ((x1 > y1) ? 1 : ((x2 < y2) ? 1 : ((x2 > y2) ? -1 : ((a.id < b.id) ? -1 : 1)))))));
                case 5:
                    return ((x0 < y0) ? 1 : ((x0 > y0) ? -1 : ((x1 < y1) ? -1 : ((x1 > y1) ? 1 : ((x2 < y2) ? 1 : ((x2 > y2) ? -1 : ((a.id < b.id) ? -1 : 1)))))));
                case 6:
                    return ((x0 < y0) ? -1 : ((x0 > y0) ? 1 : ((x1 < y1) ? 1 : ((x1 > y1) ? -1 : ((x2 < y2) ? 1 : ((x2 > y2) ? -1 : ((a.id < b.id) ? -1 : 1)))))));
                case 7:
                    return ((x0 < y0) ? 1 : ((x0 > y0) ? -1 : ((x1 < y1) ? 1 : ((x1 > y1) ? -1 : ((x2 < y2) ? 1 : ((x2 > y2) ? -1 : ((a.id < b.id) ? -1 : 1)))))));
            }
        });
    }

    vm.sorterHeaders.forEach(function (headers) {
        headers.select = function (activeSorter, orderDesc) {
            vm.activeSorter = activeSorter;
            vm.orderDesc = orderDesc;
            vm.sortByKey(vm.sortableTable, activeSorter, orderDesc);
        };
    });

}
