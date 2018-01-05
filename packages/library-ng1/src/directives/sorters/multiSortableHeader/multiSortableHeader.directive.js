multiSortableHeader.$inject = ['$resize', '$timeout'];

export default function multiSortableHeader($resize, $timeout) {
    return {
        restrict: "A",
        scope: true,
        template: require("./multiSortableHeader.html"),
        controller: "MultiSortableHeaderCtrl as vm",
        link: function(scope, element) {

            // store reference to native element
            var nativeElement = element.get(0);

            // watch for any changes to children
            var observer = new MutationObserver(initialiseTooltips);
            
            // wait for initial digest
            $timeout(function() {

                // begin watching for dom changes
                observer.observe(nativeElement, {
                    childList: true,
                    subtree: true,
                    characterData: true
                });

                // initialise tooltips
                initialiseTooltips();
            });

            function initialiseTooltips() {

                // find all column elements
                var columns = nativeElement.getElementsByTagName('th');

                // iterate each column
                for (var idx = 0; idx < columns.length; idx++) {

                    // get current column
                    var column = columns.item(idx);

                    // bind to current function
                    $resize.bind(column, updateTooltip);
                }

                // initially update tooltips
                updateAllTooltips(columns);
            }

            function updateAllTooltips(columns) {

                // iterate each column and update tooltip
                for (var idx = 0; idx < columns.length; idx++) {

                    // update column tooltip
                    updateTooltip(columns.item(idx));
                }
            }

            function updateTooltip(column) {

                // get label element
                var label = column.querySelector('.multiSortTitle');

                // check if requires tooltip
                var showTooltip = label.offsetWidth < label.scrollWidth;

                // wrap element
                var labelElement = angular.element(label);

                // if doesnt have a tooltip but needs one then add one
                if (showTooltip === true) {

                    // apply tooltip
                    labelElement.tooltip({
                        title: labelElement.text(),
                        container: 'body'
                    });
                } else {
                    labelElement.tooltip('destroy');
                }

            }
        }
    };
}