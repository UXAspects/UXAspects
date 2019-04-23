export function listHoverAction() {
    return {
        restrict: "E",
        replace: true,
        template: require('./listHoverAction.html'),
        controller: "ListHoverActionCtrl as lha",
        bindToController: true,
        require: '^^listHoverActions',
        scope: {
            icon: "@",
            name: "@",
            click: "&"
        }
    };
}