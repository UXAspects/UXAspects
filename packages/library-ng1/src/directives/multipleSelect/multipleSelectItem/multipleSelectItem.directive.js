multipleSelectItem.$inject = ["multipleSelectProvider"];

export default function multipleSelectItem(multipleSelectProvider) {
    return {
        restrict: "A",
        priority: -1, //need -1 so that this executes before ng-click handlers
        link: function(scope, element, attrs) {
            if (attrs.multipleSelectItem) {
                var item = scope.$eval(attrs.multipleSelectItem);
                if (item) {

                    scope.state = multipleSelectProvider.state;
                    var oldSelecting = scope.state.selecting;

                    var clickFunction = function(e) {

                        if (oldSelecting === true) {
                            e.preventDefault();
                            e.stopImmediatePropagation();
                            if (multipleSelectProvider.itemClicked(item)) {
                                scope.multipleSelectChecked = true;
                                element.addClass("multiple-select-item--selected");
                            } else {
                                scope.multipleSelectChecked = false;
                                element.removeClass("multiple-select-item--selected");
                            }
                            scope.$apply();
                        }
                    };

                    //set up click
                    element.on("click.multiSelect", function(e) {
                        clickFunction(e);
                    });

                    element.on("keyup.multiSelect", function(e) {
                        if (e.keyCode !== 32) {
                            return;
                        }
                        clickFunction(e);
                    });

                    scope.$watch("state", function(nv) {
                        if (nv.selecting && oldSelecting !== nv.selecting) {
                            element.addClass("multiple-select-item--selecting");
                            oldSelecting = true;
                        } else if (!nv.selecting) {
                            oldSelecting = false;
                            scope.multipleSelectChecked = false;
                            element.removeClass("multiple-select-item--selected");
                            element.removeClass("multiple-select-item--selecting");
                        }

                        //check if the item is still selected or not.
                        if (nv.selecting && multipleSelectProvider.isSelected(item)) {
                            scope.multipleSelectChecked = true;
                            element.addClass("multiple-select-item--selected");
                        } else {
                            scope.multipleSelectChecked = false;
                            element.removeClass("multiple-select-item--selected");
                        }


                    }, true);

                    //set up ui from current state
                    if (oldSelecting === true) {
                        element.addClass("multiple-select-item--selecting");
                        if (multipleSelectProvider.isSelected(item)) {
                            scope.multipleSelectChecked = true;
                            element.addClass("multiple-select-item--selected");
                        }
                    }



                    scope.$on("destroy", function() {
                        element.off("click.multiSelect");
                        scope.multipleSelectChecked = false;
                        element.removeClass("multiple-select-item--selected");
                    });
                }
            }
        }
    };
}