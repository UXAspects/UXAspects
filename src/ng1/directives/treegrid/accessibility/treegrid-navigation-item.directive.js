export function treegridNavigationItem() {
    return {
        restrict: 'A',
        controller: 'TreeGridNavigationItemCtrl as tgni',
        require: '^^treegridNavigation',
        /**
         * @param {ng.IScope} scope
         * @param {ng.IAugmentedJQueryStatic} _element
         * @param {ng.IAttributes} _attrs
         * @param {TreeGridNavigationController} ctrl
         */
        link: function (scope, _element, _attrs, ctrl) {

            // provide access to the parent controller
            scope.tgni.onInit(ctrl);

            // add the item to the record of items
            ctrl.insert(scope.tgni);

            // if the item is removed update the list
            scope.$on('$destroy', () => ctrl.remove(scope.tgni));
        }
    };
}