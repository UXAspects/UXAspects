export default function detailRowHeader() {
    return {
        restrict: "A",
        controller: "DetailRowHeaderCtrl as vm",
        template: require("./detailRowHeader.html"),
        scope: true,
        bindToController: true
    };
}