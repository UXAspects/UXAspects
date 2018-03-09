angular.module('app').directive('uxdAccordionWrapper', () => {
    return {
        restrict: 'E',
        template: require('./accordion-wrapper.directive.html'),
        controller: ['$scope', '$timeout', function ($scope, $timeout) {
            var vm = this;

            vm.groups = [{
                title: 'Accordion 1',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt est vitae ultrices accumsan. Aliquam ornare lacus adipiscing, posuere lectus et, fringilla augue.',
                isOpen: 'true'

            }, {
                title: 'Accordion 2',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt est vitae ultrices accumsan. Aliquam ornare lacus adipiscing, posuere lectus et, fringilla augue.',
                isOpen: 'false'
            }, {
                title: 'Accordion 3',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt est vitae ultrices accumsan. Aliquam ornare lacus adipiscing, posuere lectus et, fringilla augue.',
                isOpen: 'false'
            }];

            $timeout(function () {
                $(".panel-heading[data-toggle='collapse']").each(function (index, element) {
                    $(element).keypress(function (e) {
                        if (e.which === 13 || e.which === 32) {
                            $(element).trigger('click');
                        }
                    });
                });
            }, 200);

            // Clean up scope
            vm.$onDestroy = function () {
                $scope.$destroy();
            };
        }],
        controllerAs: 'vm'
    };
});
