export default function SelectTableDirective() {
    return {
        restrict: 'E',
        scope: {
            values: "=",
            selected: "=",
            id: "=?",
            tableHeight: "=?",
            searchText: "=?",
            selectKey: "=?",
            multipleSelect: "=?",
            selectHiddenItems: "=?"
        },
        controller: "selectTableCtrl as vm",
        bindToController: true,
        template: require("./selectTable.html")
    };
}