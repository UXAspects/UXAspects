export function PeityUpdatingLineChartDirective() {
    return {
        restrict: 'E',
        scope: {
			data: "=",
			options: "=",
            method: "=",
            updateinterval: "="
		},
        template: `<updating-linechart data="data" options="options" method="method" updateinterval="updateinterval"></updating-linechart>`,
        controller: ['$scope', function($scope) {
            this.$onDestroy = function() {
                $scope.$destroy();
            };
        }]
    };
}