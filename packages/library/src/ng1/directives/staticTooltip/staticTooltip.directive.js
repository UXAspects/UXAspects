export default function staticTooltip() {
    return {
        restrict: "A",
        controller: "StaticTooltipCtrl as stc",
        bindToController: true
    };
}