export function OrganizationChartDirective() {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            options: '='
        },
        template: `<organization-chart data="data" options="options"></organization-chart>`,
        controller: ['$scope', function($scope) {
            this.$onDestroy = function() {
                $scope.$destroy();
            };
        }]
    };
}