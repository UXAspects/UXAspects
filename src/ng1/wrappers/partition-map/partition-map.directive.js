export function PartitionMapDirective() {
    return {
        restrict: 'E',
        scope: {
			chartData: "=",
			chartOptions: "=",
            chartLoading: "="
		},
        template: ``,
        controller: ['$scope', '$compile', '$timeout', '$element', function($scope, $compile, $timeout, $element) {
            
            // need a timeout due to the directive calling a rootscope apply in its creation
            $timeout(() => {
                let partitionMap = $compile('<partition-map chart-data="chartData" chart-options="chartOptions" chart-loading="chartLoading"></partition-map>')($scope);
                $element.append(partitionMap);
            });

            this.$onDestroy = function() {
                $scope.$destroy();
            };
        }]
    };
}