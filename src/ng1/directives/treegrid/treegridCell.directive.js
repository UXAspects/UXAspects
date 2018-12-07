treegridCell.$inject = ["$templateRequest", "$compile"];

export function treegridCell($templateRequest, $compile) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            row: '=',
            column: '='
        },
        link: function (scope, elem) {
            scope.item = scope.row.dataItem;
            if (scope.column.template) {
                $templateRequest(scope.column.template).then(function (html) {
                    var template = angular.element(html);
                    addTooltip(template);
                    elem.replaceWith(template);
                    $compile(template)(scope);
                });
            } else {
                var expr = "";
                if (angular.isString(scope.column.value) && scope.item.hasOwnProperty(scope.column.value)) {
                    expr = "item[column.value]";
                } else if (angular.isFunction(scope.column.value)) {
                    expr = "column.value(item)";
                }
                var span = angular.element("<span/>", {
                    "ng-bind": expr
                });
                addTooltip(span);
                elem.replaceWith(span);
                $compile(span)(scope);
            }

            function addTooltip(newElement) {
                if (scope.column.tooltip) {
                    newElement.attr("tooltip", scope.column.tooltip);
                }
                if (scope.column.tooltipPlacement) {
                    newElement.attr("tooltip-placement", scope.column.tooltipPlacement);
                }
            }
        }
    };
}