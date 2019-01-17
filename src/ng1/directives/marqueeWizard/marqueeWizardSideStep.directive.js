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
                const stepScope = Object.assign($rootScope.$new(false, scope), step);

                // ensure boolean properties get recalculated from the original object every time
                Object.defineProperties(stepScope, {
                    completed: {
                        get: () => step.completed
                    },
                    error: {
                        get: () => step.error
                    },
                    visited: {
                        get: () => step.visited
                    }
                });

                // insert the uncompiled template
                element.append(angular.element(result));

                // compile the element
                $compile(element.children().first())(stepScope);
            });

        }
    };
}