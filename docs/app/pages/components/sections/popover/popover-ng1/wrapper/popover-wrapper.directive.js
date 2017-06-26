angular.module('app').directive('uxdPopoverWrapper', () => {
    return {
        restrict: 'E',
        template: require('./popover-wrapper.directive.html'),
        controller: ['$scope', '$templateCache', function ($scope, $templateCache) {
            $templateCache.put('popover-ng1/popoverLayout.html', require('!!raw-loader!../snippets/popoverLayout.html'));
            $templateCache.put('nestedPopoverLayout.html', require('!!raw-loader!../snippets/nestedPopoverLayout.html'));

            var vm = this;

            vm.senders = [{
                name: "Simona Terrace",
                title: "Equity Trader",
                email: "simona.terrace@enron.com",
                radioModel: 4
            }];

            vm.recipients = [
                {
                    name: "Luke French",
                    email: "luke.french@pxc.com",
                    radioModel: 4
                }, {
                    name: "Irene Beck",
                    email: "irene.beck@pxc.com",
                    radioModel: 4
                }
            ];

            vm.radioOptions = {
                option1: 1,
                option2: 2,
                option3: 3,
                option4: 4
            };

            // Clean up scope
            vm.$onDestroy = function () {
                $scope.$destroy();
            };
        }],
        controllerAs: 'vm'
    };
});