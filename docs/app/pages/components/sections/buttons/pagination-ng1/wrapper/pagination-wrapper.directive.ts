angular.module('app').directive('uxdPaginationWrapper', () => {
    return {
        restrict: 'E',
        template: require('./pagination-wrapper.directive.html'),
        controller: ['$templateCache', function ($templateCache) {
            var vm = this;

            vm.totalItems = 100;
            vm.currentPage = 1;
            vm.numPages = 0;
        }],
        controllerAs: 'vm'
    };
});
