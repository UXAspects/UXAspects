angular.module('app').directive('uxdSearchToolbarWrapper', () => {
    return {
        restrict: 'E',
        template: require('./search-toolbar-wrapper.directive.html'),
        controller: ['$scope', function ($scope) {
            var vm = this;

            var chance = require('chance').Chance();

            vm.list = [];
            for (var i = 0; i < 15; i += 1) {
                vm.list.push(chance.name());
            }

            vm.search = function(text) {
                // Search logic goes here
            };

            // Clean up scope
            vm.$onDestroy = function () {
                $scope.$destroy();
            };
        }],
        controllerAs: 'vm'
    };
});