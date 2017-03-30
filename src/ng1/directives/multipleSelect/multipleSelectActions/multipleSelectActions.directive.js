multipleSelectActions.$inject = ["$document", "multipleSelectProvider"];

export default function multipleSelectActions($document, multipleSelectProvider) {
    return {
        restrict: "E",
        transclude: true,
        replace: true,
        template: require('./multipleSelectActions.html'),
        controller: "MultipleSelectActionsCtrl as mssa",
        scope: {
            onSelect: "&",
            onDeselect: "&",
            keyFn: "&",
            total: "="
        },
        link: function(scope, element) {
            //look for toolbars
            var toolbar = element.parents(".affix-element");
            //watch for the selection state changing
            scope.$watch("mssa.state", function(nv) {
                //if selecting mode
                if (nv.selecting) {
                    //bind to esc key to exit.
                    $document.off("keyup.multipleSelect").on("keyup.multipleSelect", function(e) {
                        if (e.keyCode === 27) {
                            multipleSelectProvider.cancel();
                            scope.$apply();
                        }
                    });
                    //if we are in a toolbar set the class
                    if (toolbar.length) {
                        toolbar.addClass("multiple-select-mode");
                    }
                } else {
                    if (toolbar.length) {
                        toolbar.removeClass("multiple-select-mode");
                    }
                    $document.off("keyup.multipleSelect");
                }
            }, true);

            //watch for total count changes
            scope.$watch("total", function(nv) {

                multipleSelectProvider.total = nv;
                multipleSelectProvider.validateSelection();

            });

            //remove any bindings on destroy.
            scope.$on("$destroy", function() {
                $document.off("keyup.multipleSelect");
                multipleSelectProvider.cancel();
            });

        }
    };
}