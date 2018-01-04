export default function multipleSelectAction() {
    return {
        restrict: "E",
        require: "^^multipleSelectActions",
        template: require('./multipleSelectAction.html'),
        transclude: true,
        replace: true,
        controller: "MultipleSelectActionCtrl as msa",
        scope: {
            name: "@",
            action: "&",
            type: "@"
        }
    };
}