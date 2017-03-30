angular.module('app').directive('uxdGroupedButtonsWrapper', () => {
    return {
        restrict: 'E',
        template: require('./grouped-buttons-wrapper.directive.html'),
        controller: ['$templateCache', function ($templateCache) {
            var vm = this;

            vm.position = 'middle';
            vm.page = 1;

            vm.previousPage = function () {
                if (vm.page > 1) { vm.page--; };
            };

            vm.nextPage = function () {
                if (vm.page < 4) { vm.page++; };
            };
        }],
        controllerAs: 'vm'
    };
});
