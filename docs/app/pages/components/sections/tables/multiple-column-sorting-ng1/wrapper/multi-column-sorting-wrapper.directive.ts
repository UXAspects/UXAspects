angular.module('app').directive('uxdMultiColumnSortingWrapper', () => {
    return {
        restrict: 'E',
        template: require('./multi-column-sorting-wrapper.directive.html'),
        controller: MultiColumnSortingController,
        controllerAs: 'vm',
        scope: true
    };
});

class MultiColumnSortingController {

    private activeSorter = ['none', 'none', 'none'];
    private orderDesc = ['none', 'none', 'none'];

    private sorterHeaders: any[];
    private sortableTable: any[];

    static $inject = ['$scope'];

    constructor(private scope: angular.IScope) {

        this.sorterHeaders = [{
            sorterHeader: '',
            sortable: false,
            fixedClass: 'table-col-icon',
            select: this.select.bind(this)
        },
        {
            sorterHeader: 'NAME',
            sortable: true,
            sort: 'name',
            fixedClass: 'table-col-md',
            select: this.select.bind(this)
        },
        {
            sorterHeader: 'AUTHOR',
            sortable: true,
            sort: 'author',
            fixedClass: 'table-col-md',
            select: this.select.bind(this)
        },
        {
            sorterHeader: 'DATE MODIFIED',
            sortable: true,
            sort: 'date',
            fixedClass: 'table-col-md',
            select: this.select.bind(this)
        },
        {
            sorterHeader: 'WORK COMPLETED (%)',
            sortable: true,
            sort: 'complete',
            fixedClass: 'table-col-md',
            select: this.select.bind(this)
        },
        {
            sorterHeader: 'STATUS',
            sortable: false,
            center: true,
            fixedClass: 'table-col-md',
            select: this.select.bind(this)
        }];

        this.sortableTable = [{
            id: 1,
            name: 'Document',
            author: chance.name(),
            date: '18 Dec 2016',
            complete: 97,
            active: chance.bool()
        }, {
            id: 2,
            name: 'Email',
            author: chance.name(),
            date: '22 Dec 2016',
            complete: 15,
            active: chance.bool()
        }, {
            id: 3,
            name: 'Email',
            author: chance.name(),
            date: '12 Dec 2016',
            complete: 20,
            active: chance.bool()
        }, {
            id: 4,
            name: 'Email',
            author: chance.name(),
            date: '16 Dec 2016',
            complete: 74,
            active: chance.bool()
        }, {
            id: 5,
            name: 'Email',
            author: chance.name(),
            date: '17 Dec 2016',
            complete: 63,
            active: chance.bool()
        }, {
            id: 6,
            name: 'Document',
            author: chance.name(),
            date: '21 Dec 2016',
            complete: 21,
            active: chance.bool()
        }, {
            id: 7,
            name: 'Document',
            author: chance.name(),
            date: '17 Dec 2016',
            complete: 85,
            active: chance.bool()
        }, {
            id: 8,
            name: 'Document',
            author: chance.name(),
            date: '17 Dec 2016',
            complete: 11,
            active: chance.bool()
        }];
    }

    // cleanup afterwards
    $onDestroy () {
        this.scope.$destroy();
    };

    sortByKey(array: any[], key: string, descending: boolean) {
        return array.sort((a, b) => {

            let desc0 = 0,
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

            let sortCase = desc0 + desc1 + desc2;
            let x0 = a[key[0]];
            let y0 = b[key[0]];
            let x1 = a[key[1]];
            let y1 = b[key[1]];
            let x2 = a[key[2]];
            let y2 = b[key[2]];

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

    select(activeSorter: any, orderDesc: any) {
        this.activeSorter = activeSorter;
        this.orderDesc = orderDesc;
        this.sortByKey(this.sortableTable, activeSorter, orderDesc);
    }

}
