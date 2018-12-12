treegridTemplate.$inject = ["$templateRequest", "$compile"];

export function treegridTemplate($templateRequest, $compile) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            url: '=',
            item: '='
        },
        link: function (scope, elem) {
            if (scope.url) {
                $templateRequest(scope.url).then(function (html) {
                    var template = angular.element(html);
                    elem.replaceWith(template);
                    $compile(template)(scope);
                });
            }
        }
    };
}