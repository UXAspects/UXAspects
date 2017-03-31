export function ScrollPaneDirective() {
    return {
        restrict: 'E',
        scope: {
            scrollName: '@?',
            scrollConfig: '=?'
        },
        template: `<div scroll-pane></div>`,
        link: function (scope, element) {

            if (scope.scrollName) {
                element.attr('scroll-name', scope.scrollName);
            }
            if (scope.scrollConfig) {
                element.attr('scroll-config', scope.scrollConfig);
            }
        }
    };
}