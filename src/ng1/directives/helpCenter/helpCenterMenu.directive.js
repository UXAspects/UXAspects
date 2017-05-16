helpCenterMenu.$inject = ["$timeout", "$rootScope", "throttleService"];

export default function helpCenterMenu($timeout, $rootScope, throttleService) {
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

            var throttledBroadcast = throttleService(function() {
                $rootScope.$broadcast('Help-Center-Update');
            }, 500, true);

            // create an observer instance
            var helpCenterObserver = new MutationObserver(function (mutationRecords) {
                if (isHelpCenterUpdate(mutationRecords)) {
                    // Throttle the broadcast to max once per 500ms
                    throttledBroadcast();
                }
            });

            // pass in the target node, as well as the observer options
            helpCenterObserver.observe(document.body, {
                childList: true,
                subtree: true
            });

            //if any of the items url/text changes we need to update the list
            $rootScope.$on('Help-Center-Update', updateList);

            scope.$on('$destroy', function () {
                helpCenterObserver.disconnect();
            });

            function isHelpCenterUpdate(mutationRecords) {

                // Check the array of records, which contains the details of the DOM mutation
                for (var mutationRecord of mutationRecords) {

                    // Check if any of the added nodes have the help-center-item attribute
                    for (var addedNode of mutationRecord.addedNodes) {
                        if (isHelpCenterItem(addedNode)) {
                            return true;
                        }
                    }

                    // Check if any of the removed nodes have the help-center-item attribute
                    for (var removedNode of mutationRecord.removedNodes) {
                        if (isHelpCenterItem(removedNode)) {
                            return true;
                        }
                    }
                }

                return false;
            }

            function isHelpCenterItem(node) {
                // Check for nodeType 1 (Element) and the help center attribute
                return (node.nodeType === 1 && node.hasAttribute('help-center-item'));
            }

            function updateList() {

                var items = angular.element("[help-center-item]");

                // get the current menu items
                var currentItems = scope.menuItems;
                var newItems = [];

                for (var i = 0; i < items.length; i++) {
                    var options = {
                        title: angular.element(items[i]).attr('help-center-title'),
                        url: angular.element(items[i]).attr('help-center-url')
                    };
                    newItems.push(options);
                }

                // Sort if a function was provided
                if (scope.sortFn) {
                    newItems.sort(scope.sortFn);
                }

                // only update if there are changes to the list
                if (!angular.equals(newItems, currentItems)) {
                    scope.$evalAsync(function () {
                        scope.menuItems = newItems;
                    });
                }
            }
        }
    };
}