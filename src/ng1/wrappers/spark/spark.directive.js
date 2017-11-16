export function SparkDirective() {
    return {
        restrict: 'E',
        scope: {
            type: "=",
            value: "=",
            fillheight: "=?",
            inlineLabel: "=?",
            top: "=?",
            topLeftLabel: "=?",
            topRightLabel: "=?",
            bottomLeftLabel: "=?",
            bottomRightLabel: "=?",
            sparkTooltip: "@?",
            barColor: "=?"
        },
        template: `<spark type="type" spark-tooltip="{{ sparkTooltip }}" value="value" fillheight="fillheight" inline-label="inlineLabel" top="top" top-left-label="topLeftLabel" top-right-label="topRightLabel" bottom-left-label="bottomLeftLabel" bottom-right-label="bottomRightLabel" bar-color="barColor"></spark>`,
        controller: ['$scope', function($scope) {
            
            $scope.type = typeof $scope.type === 'function' ? $scope.type() : $scope.type;
            $scope.value = typeof $scope.value === 'function' ? $scope.value() : $scope.value;
            $scope.fillheight = typeof $scope.fillheight === 'function' ? $scope.fillheight() : $scope.fillheight;
            $scope.inlineLabel = typeof $scope.inlineLabel === 'function' ? $scope.inlineLabel() : $scope.inlineLabel;
            $scope.top = typeof $scope.top === 'function' ? $scope.top() : $scope.top;
            $scope.topLeftLabel = typeof $scope.topLeftLabel === 'function' ? $scope.topLeftLabel() : $scope.topLeftLabel;
            $scope.topRightLabel = typeof $scope.topRightLabel === 'function' ? $scope.topRightLabel() : $scope.topRightLabel;
            $scope.bottomLeftLabel = typeof $scope.bottomLeftLabel === 'function' ? $scope.bottomLeftLabel() : $scope.bottomLeftLabel;
            $scope.bottomRightLabel = typeof $scope.bottomRightLabel === 'function' ? $scope.bottomRightLabel() : $scope.bottomRightLabel;
            $scope.barColor = typeof $scope.barColor === 'function' ? $scope.barColor() : $scope.barColor;

            this.$onDestroy = function() {
                $scope.$destroy();
            };
        }]
    };
}