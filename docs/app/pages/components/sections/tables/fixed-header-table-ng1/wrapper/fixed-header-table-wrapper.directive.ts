angular.module('app').directive('uxdFixedHeaderTableWrapper', () => {
    return {
        restrict: 'E',
        template: require('./fixed-header-table-wrapper.directive.html'),
        scope: true,
        controller: ['$scope', function ($scope) {

            // cleanup afterwards
            this.$onDestroy = function() {
                $scope.$destroy();
            };

            let chance = require('chance').Chance();

            this.data = [{
                id: 1,
                Data: 156,
                User: chance.name(),
                Task: '40%',
                Date: 'July 14, 2016'
            }, {
                id: 2,
                Data: 226,
                User: chance.name(),
                Task: '-20%',
                Date: 'July 15, 2016'
            }, {
                id: 3,
                Data: 52,
                User: chance.name(),
                Task: '26%',
                Date: 'July 21, 2016'
            }, {
                id: 4,
                Data: 461,
                User: chance.name(),
                Task: '-23%',
                Date: 'July 19, 2016'
            }, {
                id: 5,
                Data: 119,
                User: chance.name(),
                Task: '16%',
                Date: 'June 14, 2016'
            }, {
                id: 6,
                Data: 145,
                User: chance.name(),
                Task: '30%',
                Date: 'August 14, 2016'
            }, {
                id: 7,
                Data: 455,
                User: chance.name(),
                Task: '-28%',
                Date: 'September 14, 2016'
            }, {
                id: 8,
                Data: 156,
                User: chance.name(),
                Task: '80%',
                Date: 'October 14, 2016'
            }, {
                id: 9,
                Data: 240,
                User: chance.name(),
                Task: '-22%',
                Date: 'November 14, 2016'
            }];
        }],
        controllerAs: 'vm'
    };
});