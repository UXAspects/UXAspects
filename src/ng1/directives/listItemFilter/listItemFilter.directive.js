export default function listItemFilter() {
    return {
        restrict: 'A',
        scope: true,
        link: function (scope, element, attrs) {

            scope.$watch(attrs.filterText, function (nv, ov) {
                if (nv !== ov) filter(nv);
            });

            var filter = function (filterText) {
                // get a list of the latest children
                var children = element.children();

                // iterate through each child and filter based on key
                children.each(function (idx, listItem) {
                    var li = angular.element(listItem);

                    var key = li.attr('key');

                    if (key && key.toLowerCase().indexOf(filterText.toLowerCase()) !== -1)
                        li.show();
                    else
                        li.hide();
                });
            };
        }
    };
}