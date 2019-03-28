/**
 * @param {ng.ICompileService} $compile
 * @param {ng.ITemplateRequestService} $templateRequest
 */
export function ngTemplateOutlet($compile, $templateRequest) {
    return {
        restrict: 'A',
        scope: {
            ngTemplateOutlet: '=?',
            ngTemplateOutletUrl: '=?',
            ngTemplateOutletContext: '=?',
        },
        /**
         * @param {ng.IScope} scope
         * @param {JQuery} element
         */
        link: function(scope, element) {

            // extract the properties we want access to
            const { ngTemplateOutlet, ngTemplateOutletUrl, ngTemplateOutletContext } = scope;

            // create a new scope for the item
            const context = scope.$new(true);

            // store the inserted element
            let template;

            // insert the data provided in the context
            if (ngTemplateOutletContext) {
                for (const prop in ngTemplateOutletContext) {
                    context[prop] = ngTemplateOutletContext[prop];
                }
            }

            // support an inline template
            if (ngTemplateOutlet) {
                template = $compile(scope.ngTemplateOutlet)(context);
                return element.append(template);
            }

            // support a template url
            if (ngTemplateOutletUrl) {

                // request the template and then compile and insert it
                $templateRequest(ngTemplateOutletUrl).then(result => {
                    template = $compile(result)(context);
                    element.append(template);
                });
            }

            // watch for any future changes
            const watcher = scope.$watch('ngTemplateOutletContext', (newValue, oldValue) => {
                if (newValue !== oldValue) {

                    // update the scope
                    for (const prop in newValue) {
                        context[prop] = newValue[prop];
                    }

                    // update the template
                    $compile(template)(context);
                }
            }, true);

            scope.$on('$destroy', () => watcher());
        }
    };
}

ngTemplateOutlet.$inject = ['$compile', '$templateRequest'];