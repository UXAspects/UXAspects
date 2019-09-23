treegridCell.$inject = ['$templateRequest', '$compile', '$interpolate'];

/**
 * @param {ng.ITemplateRequestService} $templateRequest
 * @param {ng.ICompileService} $compile
 * @param {ng.IInterpolateService} $interpolate
 */
export function treegridCell($templateRequest, $compile, $interpolate) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            row: '=',
            column: '='
        },
        link: function (scope, element) {

            scope.item = scope.row.dataItem;

            // if a custom template is provided
            if (scope.column.template) {
                $templateRequest(scope.column.template).then(html => {
                    const template = angular.element(html);
                    element.replaceWith(template);
                    $compile(template)(scope);
                    addTooltip(template);
                });
            } else {

                let expression;
                if (angular.isString(scope.column.value) && scope.item.hasOwnProperty(scope.column.value)) {
                    expression = 'item[column.value]';
                } else if (angular.isFunction(scope.column.value)) {
                    expression = 'column.value(item)';
                }

                const span = angular.element('<span/>', { 'ng-bind': expression });
                element.replaceWith(span);
                $compile(span)(scope);

                addTooltip(span);
            }

            function addTooltip(newElement) {
                if (scope.column.tooltip) {
                    scope.$evalAsync(() => {
                        newElement.one('mouseenter', () => {
                            newElement.tooltip({ title: $interpolate(scope.column.tooltip)(scope), placement: scope.column.tooltipPlacement || 'top' });
                            newElement.tooltip('show');
                        });
                    });
                }
            }
        }
    };
}