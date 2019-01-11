marqueeWizardSideStep.$inject = ['$templateRequest', '$compile', '$rootScope', '$parse'];

export function marqueeWizardSideStep($templateRequest, $compile, $rootScope, $parse) {
    return {
        restrict: 'E',
        replace: true,
        scope: false,
        link: function (scope, element, attr) {

            // get the step object
            const step = $parse(attr.step)(scope);

            // load the template
            $templateRequest(step.stepTemplateUrl).then(result => {

                // create a new scope
                let stepScope = $rootScope.$new(false, scope);

                // add the step properties to the scope
                stepScope = Object.assign(stepScope, step);

                // insert the uncompiled template
                element.append(angular.element(result));

                // compile the element
                $compile(element.children().first())(stepScope);
            });

        }
    };
}