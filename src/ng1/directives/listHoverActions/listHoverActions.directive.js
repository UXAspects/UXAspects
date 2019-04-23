export function listHoverActions() {
    return {
        restrict: "E",
        replace: true,
        transclude: true,
        template: require('./listHoverActions.html'),
        controller: 'ListHoverActionsCtrl',
        controllerAs: 'lh'
    };
}