export default function sortDirectionToggle() {
    return {
        restrict: "E",
        controller: "SortDirectionToggleCtrl as sdt",
        template: require("./sortDirectionToggle.html"),
        scope: {
            label: '=',
            sorters: '=',
            descend: '=?'
        },
        bindToController: true
    };
}