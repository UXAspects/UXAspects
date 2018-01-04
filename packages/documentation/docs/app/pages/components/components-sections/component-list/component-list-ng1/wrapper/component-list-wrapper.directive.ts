angular.module('app').directive('uxdComponentListWrapper', () => {
    return {
        restrict: 'E',
        template: require('./component-list-wrapper.directive.html'),
        controller: ['$templateCache', function ($templateCache) {
            var vm = this;

            vm.components = [];
        }],
        controllerAs: 'vm'
    };
});
