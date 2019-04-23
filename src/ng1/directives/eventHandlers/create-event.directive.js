export function createEventDirective(eventName, directiveName) {
    return ['$parse', '$rootScope', '$exceptionHandler', function ($parse, $rootScope, $exceptionHandler) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                // get the expression from the attribute with the same name
                const expression = $parse(attrs[directiveName]);

                // delay attaching the event listener to prevent blocking the initial render
                scope.$evalAsync(attachEventListener);

                function attachEventListener() {
                    element.on(eventName, function(event) {
                        const callback = function () {
                            expression(scope, { $event: event });
                        };

                        if (!$rootScope.$$phase) {
                            scope.$apply(callback);
                        } else {
                            try {
                                callback();
                            } catch (error) {
                                $exceptionHandler(error);
                            }
                        }
                    });
                }
            }
        };
    }];
}