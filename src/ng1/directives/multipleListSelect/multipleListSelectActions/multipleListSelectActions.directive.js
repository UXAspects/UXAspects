multipleListSelectActions.$inject = ["$document", "multipleSelectProvider"];

export default function multipleListSelectActions($document, multipleSelectProvider) {
  return {
    restrict: "E",
    transclude: true,
    replace: true,
    template: require('./multipleListSelectActions.html'),
    controller: "MultipleListSelectActionsCtrl as dssa",
    scope: {
      onSelect: "&",
      onDeselect: "&",
      keyFn: "&",
      total: "="
    },
    link: function (scope, element) {
      //look for toolbars
      var toolbar = element.parents("[affix-element]");
      var disp = element.find(".disp");
      var revDisp = element.find(".reverse-disp");
      var multipleSelectOptions = revDisp.find("*");
      var disabledButtons = false;
      //watch for the selection state changing
      scope.$watch("dssa.state", function (nv, ov) {
        //if selecting mode
        //this logic is to make buttons disabled when count is zero
        if ((nv.count === 0 && ov.count > 0) && nv.selecting === true && nv.selectedFromCheckBox === true) {
          multipleSelectProvider.reset();
          if (disabledButtons === false) {
            for (var i = multipleSelectOptions.length - 1; i >= 0; i--) {
              if (multipleSelectOptions[i].disabled === false) {
                multipleSelectOptions[i].disabled = true;
              }
            }
            disabledButtons = true;
          }
        } else if (nv.count > 0) {
          if (disabledButtons === true) {
            for (var j = multipleSelectOptions.length - 1; j >= 0; j--) {
              if (multipleSelectOptions[j].disabled === true) {
                multipleSelectOptions[j].disabled = false;
              }
            }
            disabledButtons = false;
          }
        }
        if (nv.selecting) {
          //bind to esc key to exit.
          $document.off("keyup.multipleSelect").on("keyup.multipleSelect", function (e) {
            if (e.keyCode === 27) {
              multipleSelectProvider.cancel();
              scope.$apply();
            }
          });
          //if we are in a toolbar set the class
          if (toolbar.length) {
            toolbar.addClass("multiple-select-mode");
            disp.addClass("donot-disp");
            revDisp.removeClass("donot-disp");
          }
        } else {
          if (toolbar.length) {
            toolbar.removeClass("multiple-select-mode");
            disp.removeClass("donot-disp");
            revDisp.addClass("donot-disp");
          }
          $document.off("keyup.multipleSelect");
        }
      }, true);

      //watch for total count changes
      scope.$watch("total", function (nv) {

        multipleSelectProvider.total = nv;
        multipleSelectProvider.validateSelection();

      });

      //remove any bindings on destroy.
      scope.$on("$destroy", function () {
        $document.off("keyup.multipleSelect");
        multipleSelectProvider.cancel();
      });

    }
  };
}