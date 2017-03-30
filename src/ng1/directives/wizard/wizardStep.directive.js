export default function WizardStep() {
    return {
        restrict: 'E',
        require: "^wizard",
        transclude: true,
        replace: true,
        scope: {
            active: '=?'
        },
        template: require('./step.html'),
        controller: function() {},
        compile: function(elm, attrs, transclude) {
            return function postLink(scope, elm, attrs, wizardCtrl) {
                scope.$watch('active', function(active) {
                    if (active) {
                        wizardCtrl.select(scope);
                    }
                });


                scope.disabled = false;
                scope.done = false;

                scope.select = function() {
                    wizardCtrl.select(scope);
                };


                if (scope.$parent.$index !== undefined && scope.$parent.$index !== null) {
                    wizardCtrl.insertStep(scope, scope.$parent.$index);
                } else {
                    wizardCtrl.addStep(scope);
                }
                scope.$on('$destroy', function() {
                    wizardCtrl.removeStep(scope);
                });

                //We need to transclude later, once the content container is ready.
                //when this link happens, we're inside a step heading.
                scope.$transcludeFn = transclude;
            };
        }

    };
}