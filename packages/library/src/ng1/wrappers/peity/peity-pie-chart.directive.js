export function PeityPieChartDirective() {
    return {
        restrict: 'E',
        scope: {
			data: "=",
			options: "="
		},
        template: `<pie-chart data="data" options="options"></pie-chart>`,
        controller: ['$scope', function($scope) {
            this.$onDestroy = function() {
                $scope.$destroy();
            };
        }]
    };
}