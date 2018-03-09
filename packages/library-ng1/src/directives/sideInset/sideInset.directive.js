sideInset.$inject = ["$compile"];

export default function sideInset($compile) {
    return {
        restrict: "A",
        scope: true,
        link: function(scope, element, attrs) {

            scope.si.position = {};
            var positionClass = "";

            var childElements = element.children();

            //The side panel will appear on the left if it comes before the main content in the HTML, or on the right if it comes after.
            if (childElements.length) {
                if (!!~childElements[0].className.indexOf("side-inset")) {
                    positionClass = "left";
                } else if (childElements.length > 1 && !!~childElements[1].className.indexOf("side-inset")) {
                    positionClass = "right";
                } else {
                    console.error("Required side-inset div was not found in sideInset directive.");
                }
            }
            scope.si.position[positionClass] = true;

            //The toggle button's vertical position is configurable since it is relative to the main content's height.
            var toggleButtonTop = '0px';
            if (attrs.sideInsetButtonTop) {
                toggleButtonTop = attrs.sideInsetButtonTop || toggleButtonTop;
            }

            //The width that the side panel will take is configurable.
            scope.si.sideInsetWidth = attrs.sideInsetWidth || 20;

            if (scope.si.sideInsetWidth < 0 || scope.si.sideInsetWidth > 100) {
                console.error("SideInsetWidth must be between 0 and 100");
                return;
            }

            element.addClass("wrapper-side-inset");

            //Add the toggle button
            var template = "<div class='side-inset-toggle " + positionClass + "' ng-click='si.togglePanel()'>";
            template += "<a class='hpe-icon {{si.icon}}'></a>";
            template += "</div>";
            var toggleButton = angular.element(template);
            $compile(toggleButton)(scope);

            var mainContent = element.find('.main-content');
            var sideInset = element.find('.side-inset');

            mainContent.prepend(toggleButton);

            var styles = {
                transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                float: 'left',
                margin: 0
            };
            var mainContentSpecificStyles = {
                position: 'relative'
            };
            var sideSpecificStyles = {
                overflow: 'hidden'
            };
            var toggleButtonSpecificStyles = {
                position: 'absolute',
                transition: 'right 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                top: toggleButtonTop,
                zIndex: 1
            };

            angular.extend(mainContent[0].style, styles, mainContentSpecificStyles);
            angular.extend(sideInset[0].style, styles, sideSpecificStyles);
            angular.extend(toggleButton[0].style, toggleButtonSpecificStyles);

            //Save the elements on the controller
            scope.si.mainElement = mainContent[0];
            scope.si.sidePanel = sideInset[0];
            scope.si.toggleButton = toggleButton[0];

            scope.si.setInitialWidth();
        },
        controller: "SideInsetCtrl as si"
    };
}