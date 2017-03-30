/**
 * sideNavigation - Directive to run metsiMenu on sidebar navigation
 */
export default function sideNavigation() {
    return {
        restrict: 'A',
        scope: true,
        link: function(scope, element, attributes) {

            if (typeof scope.$eval(attributes.sideNavigation) === "undefined") {
                element.metisMenu();
            } else {
                scope.$watch(attributes.sideNavigation, function(newValue) {
                    if (newValue) {
                        element.metisMenu();
                    }
                });
            }

            //support automatic hiding of the navigation bar on state change
            if (typeof attributes.autoCollapse !== "undefined") {
                angular.element('body').addClass('auto-collapse');
                scope.$root.$on('$stateChangeSuccess', function() {
                    angular.element('body').addClass('hide-navbar');
                    angular.element('body').removeClass('condensed-panel');
                });
            }
        }
    };
}