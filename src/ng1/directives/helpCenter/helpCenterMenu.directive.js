helpCenterMenu.$inject = ["$timeout", "$rootScope"];

export default function helpCenterMenu($timeout, $rootScope) {
    return {
        restrict: "E",
        scope: {
            url: "@",
            helpText: "@",
            icon: "@",
            target: "@?",
            sortFn: "=?"
        },
        template: require('./helpCenterMenu.html'),
        link: function (scope) {
            if (!scope.target) scope.target = '_self';
            scope.iconBase = scope.icon && scope.icon.indexOf('hp-') === -1 ? 'hpe-icon' : 'hp-icon';

            //populate the health center once binding intially evaluated
            $timeout(updateList);

            // create an observer instance
            var helpCenterObserver = new MutationObserver(function() {
                $rootScope.$broadcast('Help-Center-Update');
            });

            // pass in the target node, as well as the observer options
            helpCenterObserver.observe(document.body, { childList: true, subtree: true });

            //if any of the items url/text changes we need to update the list
            $rootScope.$on('Help-Center-Update', updateList);

            function updateList() {

                var items = angular.element("[help-center-item]");

                // get the current menu items
                var currentItems = scope.menuItems;
                scope.menuItems = [];

                for (var i = 0; i < items.length; i++) {
                    var options = {
                        title: angular.element(items[i]).attr('help-center-title'),
                        url: angular.element(items[i]).attr('help-center-url')
                    };
                    scope.menuItems.push(options);
                }

                // only update if there are changes to the list
                if(!angular.equals(scope.menuItems, currentItems)) {
                    scope.$evalAsync(function() {
                        scope.menuItems.sort(scope.sortFn);
                    });
                }
            }
        }
    };
}