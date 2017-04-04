export function PartitionMapDirective() {
    return {
        restrict: 'E',
        scope: {
			chartData: "=",
			chartOptions: "=",
            chartLoading: "="
		},
        template: `<partition-map chart-data="chartData" chart-options="chartOptions" chart-loading="chartLoading"></partition-map>`,
        controller: ['$scope', function($scope) {
            this.$onDestroy = function() {
                $scope.$destroy();
            };
        }]
    };
}