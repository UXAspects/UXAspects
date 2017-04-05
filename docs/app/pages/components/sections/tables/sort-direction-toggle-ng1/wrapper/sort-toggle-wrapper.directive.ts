angular.module('app').directive('uxdSortToggleWrapper', () => {
    return {
        restrict: 'E',
        template: require('./sort-toggle-wrapper.directive.html'),
        controller: ['$scope', function ($scope) {

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

            // cleanup afterwards
            this.$onDestroy = function () {
                $scope.$destroy();
            };
        }],
        controllerAs: 'vm',
        scope: true
    };
});