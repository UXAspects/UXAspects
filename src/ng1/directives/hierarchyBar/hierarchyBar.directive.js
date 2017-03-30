hierarchyBar.$inject = ["$timeout", "$resize"];

export default function hierarchyBar($timeout, $resize) {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            options: '=',
            selectNode: "&",
            containerClass: "@?"
        },
        template: require('./hierarchyBar.html'),
        bindToController: true,
        controller: 'HierarchyBarCtrl as vm',
        link: function(scope, element, attrs, ctrl) {
            var nativeElement = element.get(0),
                hierarchyBarContainer = nativeElement.querySelector('.hierarchy-bar-container'),
                hierarchyBarList = nativeElement.querySelector('.hierarchy-bar-list');

            // if not specified use the parent element
            var parentContainer = ctrl.containerClass ? angular.element('.' + ctrl.containerClass) : element.parent();

            if (parentContainer[0] !== null && parentContainer[0] !== undefined) {
                $resize.bind(parentContainer[0], function() {
                    updateHierarchyBar();
                });
            }

            scope.$watch("vm.data", function(nv, ov) {
                if (nv !== ov) {
                    $timeout(function() {
                        updateHierarchyBar();
                    });
                }
            });

            /*
                 determine if any overflow is occuring and make appropriate changes
             */
            function updateHierarchyBar() {

                if (!hierarchyBarContainer) {
                    hierarchyBarContainer = nativeElement.querySelector('.hierarchy-bar-container');
                    hierarchyBarList = hierarchyBarContainer.querySelector('.hierarchy-bar-list');
                }

                // perform in a timeout to allow digests to complete
                $timeout(function() {

                    // calculate the size of the margins etc..
                    var marginSize = getOptions() && getOptions().overview ? 102 : 50;

                    // determine if there is overflow
                    ctrl.hierarchyBarOverflow = hierarchyBarContainer.clientWidth < (hierarchyBarList.clientWidth + marginSize);

                    // store all the hidden nodes
                    ctrl.hiddenHierarchyBar = [];

                    // if there is no overflow then stop here
                    if (ctrl.hierarchyBarOverflow === false) {
                        return;
                    }

                    // determine the overflow element width
                    var clipPosition = (hierarchyBarList.clientWidth + 72) - hierarchyBarContainer.clientWidth;

                    // get the breadcrumb elements
                    var hierarchyBarListItem = hierarchyBarContainer.querySelectorAll('.hierarchy-bar-list-item');

                    // iterate each breadcrumb
                    for (var idx = 0; idx < hierarchyBarListItem.length; idx++) {

                        // get the breadcrumb
                        var hierarchyBarListItemid = hierarchyBarListItem.item(idx);

                        // check if the offset position is less that
                        var position = hierarchyBarListItemid.offsetLeft;

                        // if position is less than the width of the ellipsis then add to list of hidden
                        if (position <= clipPosition) {

                            // get the matching breadcrumb data
                            ctrl.hiddenHierarchyBar.push(ctrl.data[idx]);
                        }

                    }

                    // if the popover is visible then ensure the first item is at least shown
                    if (ctrl.hiddenHierarchyBar.length === 0 && ctrl.data.length > 0) {
                        ctrl.hiddenHierarchyBar.push(ctrl.data[0]);
                    }

                });

            }

            /*
                Returns the options defined in the controller
            */
            function getOptions() {
                return ctrl.options;
            }

        }
    };
}