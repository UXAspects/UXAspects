angular.module('app').directive('uxdSingleColumnSortingWrapper', () => {
    return {
        restrict: 'E',
        template: require('./single-column-sorting-wrapper.directive.html'),
        controller: SingleColumnSortingController,
        controllerAs: 'vm',
        scope: true
    };
});

class SingleColumnSortingController {

    activeSorter: string = 'date';
    orderDesc: boolean = false;
    sorterHeaders: any[];
    sortableTable: any[];

    static $inject = ['$scope'];

    constructor(private scope: angular.IScope) {

        let chance = require('chance').Chance();

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
            name: 'Document 1',
            author: chance.name(),
            date: '18 Dec 2016',
            complete: 97,
            active: chance.bool()
        }, {
            id: 2,
            name: 'Document 2',
            author: chance.name(),
            date: '22 Dec 2016',
            complete: 15,
            active: chance.bool()
        }, {
            id: 3,
            name: 'Document 3',
            author: chance.name(),
            date: '12 Dec 2016',
            complete: 20,
            active: chance.bool()
        }, {
            id: 4,
            name: 'Document 4',
            author: chance.name(),
            date: '16 Dec 2016',
            complete: 74,
            active: chance.bool()
        }, {
            id: 5,
            name: 'Document 5',
            author: chance.name(),
            date: '11 Dec 2016',
            complete: 63,
            active: chance.bool()
        }, {
            id: 6,
            name: 'Document 6',
            author: chance.name(),
            date: '21 Dec 2016',
            complete: 21,
            active: chance.bool()
        }, {
            id: 7,
            name: 'Document 7',
            author: chance.name(),
            date: '17 Dec 2016',
            complete: 85,
            active: chance.bool()
        }, {
            id: 8,
            name: 'Document 8',
            author: chance.name(),
            date: '29 Dec 2016',
            complete: 11,
            active: chance.bool()
        }];

    }

    $onDestroy() {
        this.scope.$destroy();
    }

    select(activeSorter: any, orderDesc: boolean) {
        this.activeSorter = activeSorter;
        this.orderDesc = orderDesc;
        this.sortByKey(this.sortableTable, activeSorter, orderDesc);
    }

    sortByKey(data: any[], key: string, descending: boolean) {
        return data.sort((a, b) => {
            let aVal = a[key];
            let bVal = b[key];

            if (aVal < bVal) {
                return descending ? 1 : -1;
            }

            if (aVal > bVal) {
                return descending ? -1 : 1;
            }

            return a.id < b.id ? -1 : 1;
        });
    }

}