export default function sorterOption() {
    return {
        restrict: "E",
        require: '^sorter',
        template: require("./sorterOption.html"),
        controller: "SorterOptionCtrl as soc",
        transclude: true,
        replace: true,
        scope: {
            name: "=",
            select: "&",
            default: "=",
            iconClass: "=?",
            disabled: "=?"
        },
        link: function(scope, element, attrs, controller) {

            scope.soc.sorter = controller;
            scope.soc.sorter.addSorterOptions(scope.soc);

            if (scope.default) {
                controller.setTitle(scope.name, scope.default);
            }
        }
    };
}