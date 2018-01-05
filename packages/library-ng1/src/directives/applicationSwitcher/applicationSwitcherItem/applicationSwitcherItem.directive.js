export default function applicationSwitcherItem() {
    return {
        restrict: "E",
        require: "^applicationSwitcherContainer",
        controller: "ApplicationSwitcherItemCtrl as asi",
        template: require("./applicationSwitcherItem.html"),
        replace: true,
        scope: {
            name: "@",
            select: "&",
            value: "@"
        },
        link: function(scope, element, attr, applicationSwitcherContainer) {
            element.bind('click', function() {
                scope.asi.applicationSwitcherContainer = applicationSwitcherContainer;
                scope.asi.select();
            });
        }
    };
}