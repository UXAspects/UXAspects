export function SankeyDirective() {
    return {
        restrict: 'E',
        scope: {
            chartSize: '=?',
            chartData: '=',
            options: '=',
            click: '=?'
        },
        template: `<sankey chart-data="chartData" chart-size="chartSize" options="options" click="vm.click"></sankey>`,
        controller: ['$scope', function($scope) {

            this.$onDestroy = function() {
                $scope.$destroy();
            };

            this.click = function(data) {
                if ($scope.click) {
                    $scope.click(data);
                }
            };
        }],
        controllerAs: 'vm'
    };
}