export default function sorter() {
    return {
        restrict: "E",
        controller: "SorterCtrl as sc",
        template: require("./sorter.html"),
        scope: {
            sorterTitle: "="
        },
        transclude: true,
        replace: true
    };
}