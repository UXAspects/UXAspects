export function ngTemplateOutlet($compile, $templateRequest) {
    return {
        restrict: 'A',
        scope: {
            ngTemplateOutlet: '=?',
            ngTemplateOutletUrl: '=?',
            ngTemplateOutletContext: '=?',
        },
        link: function(scope, element) {

            // extract the properties we want access to
            const { ngTemplateOutlet, ngTemplateOutletUrl, ngTemplateOutletContext } = scope;

            // create a new scope for the item
            const context = scope.$new(true);

            // insert the data provided in the context
            if (ngTemplateOutletContext) {
                for (const prop in ngTemplateOutletContext) {
                    context[prop] = ngTemplateOutletContext[prop];
                }
            }

            // support an inline template
            if (ngTemplateOutlet) {
                return element.append($compile(scope.ngTemplateOutlet)(context));
            }

            // support a template url
            if (ngTemplateOutletUrl) {

                // request the template and then compile and insert it
                $templateRequest(ngTemplateOutletUrl).then(template => element.append($compile(template)(context)));
            }
        }
    };
}

ngTemplateOutlet.$inject = ['$compile', '$templateRequest'];