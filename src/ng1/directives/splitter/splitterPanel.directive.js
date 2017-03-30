export default function splitterPanel() {
    return {
        restrict: "E",
        template: require('./splitterPanel.html'),
        transclude: true,
        replace: true
    };
}