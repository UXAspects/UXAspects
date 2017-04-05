export function FlotDirective() {
    return {
        restrict: 'E',
        scope: {
            dataset: '=',
            options: '=',
            callback: '=',
            onPlotClick: '&',
            onPlotHover: '&',
            donutLabels: '=?'
        },
        template: `<flot dataset="dataset" options="options" callback="callback" on-plot-click="onPlotClickFn" on-plot-hover="onPlotHoverFn" donut-labels="donutLabels"></flot>`,
        link: function (scope) {

            // create wrappers for expression functions
            scope.onPlotClickFn = function () {
                if (scope.onPlotClick) {
                    scope.onPlotClick();
                }
            };

            scope.onPlotHoverFn = function () {
                if (scope.onPlotHover) {
                    scope.onPlotHover();
                }
            };
        },
        controller: ['$scope', function($scope) {
            this.$onDestroy = function() {
                $scope.$destroy();
            };
        }]
    };
}