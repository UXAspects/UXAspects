export function PeityLineChartDirective() {
    return {
        restrict: 'E',
        scope: {
			data: "=",
			options: "="
		},
        template: `<line-chart data="data" options="options"></line-chart>`,
        controller: ['$scope', function($scope) {
            this.$onDestroy = function() {
                $scope.$destroy();
            };
        }]
    };
}