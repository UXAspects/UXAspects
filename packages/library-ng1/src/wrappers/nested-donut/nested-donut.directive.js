export function NestedDonutDirective() {
    return {
        restrict: 'E',
        scope: {
            dataset: '=',
            options: '=?'
        },
        template: `<nested-donut dataset="dataset" options="options"></nested-donut>`,
        controller: ['$scope', function($scope) {
            this.$onDestroy = function() {
                $scope.$destroy();
            };
        }]
    };
}