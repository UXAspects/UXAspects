export default function WizardDirective() {
    return {
        restrict: "E",
        transclude: true,
        replace: true,
        scope: {
            onFinished: "&",
            onCanceled: "&",
            onChanging: "&",
            onFinishing: "&",
            isVisited: "=",
            buttonOptions: "="
        },
        controller: "AspectsWizardCtrl",
        controllerAs: "wzrd",
        template: require('./wizard.html'),
        link: function(scope, element, attrs, ctrls) {
            scope.$watch('buttonOptions', function(newValue, oldValue) {
                if (newValue === oldValue) return;

                if (newValue) {
                    ctrls.buttonOptions = angular.extend(ctrls.defaultOptions, newValue);
                    ctrls.updateButtonTabIndexes();
                }

            }, true);

            // watch for changes on isvisited attribute
            scope.$watch('isVisited', function(newValue, oldValue) {
                if (newValue === oldValue) return;

                // only update steps if isVisited was set to true
                if (newValue) {
                    ctrls.updateIsVisited();
                }
            }, true);
        }
    };
}