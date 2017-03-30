angular.module('app').directive('uxdSortToggleWrapper', () => {
    return {
        restrict: 'E',
        template: require('./sort-toggle-wrapper.directive.html'),
        controller: function () {

            this.sorterData = {
                label: 'Sort by:',
                sorters: [{
                    name: 'Document',
                    sort: 'document',
                    defaultSorter: true,
                    select: () => { }
                }, {
                    name: 'Name',
                    sort: 'name',
                    select: () => { }
                }, {
                    name: 'Date',
                    sort: 'date',
                    select: () => { }
                }]
            };

        },
        controllerAs: 'vm'
    };
});