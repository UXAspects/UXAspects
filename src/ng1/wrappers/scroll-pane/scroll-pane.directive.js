export function ScrollPaneDirective() {
    return {
        restrict: 'E',
        scope: {
            scrollName: '@?',
            scrollConfig: '=?',
            api: '=?'
        },
        template: `<div scroll-pane><div ng-transclude></div></div>`,
        transclude: true,
        link: function (scope, element) {

            if (scope.scrollName) {
                element.attr('scroll-name', scope.scrollName);
            }
            if (scope.scrollConfig) {
                element.attr('scroll-config', scope.scrollConfig);
            }

            scope.api = scope.api || {};
            scope.api.reinitialize = function () {
                var scrollPane = element;
                var jsp = scrollPane.data('jsp');
                if (jsp) {
                    jsp.reinitialise();
                }
            };
        }
    };
}