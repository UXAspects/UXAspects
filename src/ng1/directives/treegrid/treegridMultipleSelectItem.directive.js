treegridMultipleSelectItem.$inject = ["multipleSelectProvider"];

export default function treegridMultipleSelectItem(multipleSelectProvider) {
    
    return {
        restrict: "A",
        link: function (scope, element, attrs) {

            if (attrs.treegridMultipleSelectItem) {

                var row = scope.$eval(attrs.treegridMultipleSelectItem);

                if (row) {

                    scope.$watch(attrs.treegridMultipleSelectItem, function(nv) {
                        if (nv.selected !== undefined && nv.selected !== multipleSelectProvider.isSelected(row.dataItem)) {
                            var newState = multipleSelectProvider.itemClicked(row.dataItem);
                            if (newState) {
                                element.addClass("multiple-select-item--selected");
                            } else {
                                element.removeClass("multiple-select-item--selected");
                            }
                        }
                    }, true);

                    row.selected = multipleSelectProvider.isSelected(row.dataItem);

                    scope.$on("destroy", function () {
                        element.off("click.multiSelect");
                        element.off("keyup.multiSelect");
                        element.removeClass("multiple-select-item--selected");
                    });
                }
            }
        }
    };
}