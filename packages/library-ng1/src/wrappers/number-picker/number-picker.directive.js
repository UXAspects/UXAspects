export function NumberPickerDirective() {
    return {
        restrict: 'E',
        scope: {
            value: "=",
            step: "=?",
            max: "=?",
            min: "=?",
            validate: "&?",
            disabled: "=?"
        },
        template: `<number-picker ng-model="value" step="step" max="max" min="min" validate="validate" ng-disabled="disabled"></number-picker>`,
        controller: ['$scope', function($scope) {
            this.$onDestroy = function() {
                $scope.$destroy();
            };
        }]
    };
}