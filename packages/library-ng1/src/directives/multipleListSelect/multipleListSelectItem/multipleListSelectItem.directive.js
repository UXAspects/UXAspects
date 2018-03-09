multipleListSelectItem.$inject = ["multipleSelectProvider"];

export default function multipleListSelectItem(multipleSelectProvider) {
  return {
    restrict: "A",
    priority: -1,
    link: function (scope, element, attrs) {
      //look for the parent row with class single-click to highlight when that row is selected
      var parentRow = element.parents(".single-select");
      var loaded = false;
      //multiple list select check box focus and row highlight 
      scope.$watch(
        function () {
          var receivedFocus = false;
          receivedFocus = receivedFocus || element.hasClass("preview-pane-selected-item");
          return receivedFocus;
        },
        function (nV) {

          if (nV) {
            element.attr("style", "opacity:1");
            element.parents("tr").addClass("highlight");
          } else {
            element.removeAttr("style");
            element.parents("tr").removeClass("highlight");
            if (!loaded) {
              var rowIndex = Number(element.parents("tr").attr("index") || 0);
              element.attr("index", rowIndex - 1);
              loaded = true;
            }
          }
        });

      scope.$watch(function () {
          return multipleSelectProvider.state.selecting;
        },
        function (nv, ov) {

          if (nv !== ov && nv === false) {
            element.parents("tr").removeClass("highlight");
          }
        });

      if (attrs.multipleListSelectItem) {
        var item = scope.$eval(attrs.multipleListSelectItem);
        if (item) {
          var clickFunction = function (e) {
            multipleSelectProvider.state.selecting = true;
            if (multipleSelectProvider.state.selectedFromButton === false) {
              multipleSelectProvider.state.selectedFromCheckBox = true;
            }
            scope.$apply();
            if (oldSelecting === true) {
              e.preventDefault();
              e.stopImmediatePropagation();
              if (multipleSelectProvider.itemClicked(item)) {
                parentRow.addClass("single-select-selected-bg");
                element.addClass("multi-select-checkbox-checked");

              } else {
                parentRow.removeClass("single-select-selected-bg");
                element.removeClass("multi-select-checkbox-checked");
              }
              scope.$apply();
            }
          };

          scope.state = multipleSelectProvider.state;
          var oldSelecting = scope.state.selecting;
          //set up click
          element.on("click.multiSelect", function (e) {
            clickFunction(e);
          });
          // for keyboard controls
          element.on("keyup.multiSelect", function (e) {
            parentRow.addClass("highlight");
            if (e.keyCode !== 32) {
              return;
            }
            clickFunction(e);
          });

          scope.$watch("state", function (nv) {
            if (nv.selecting && oldSelecting !== nv.selecting) {
              oldSelecting = true;
              parentRow.addClass("multiple-list-select-item--selecting");
            } else if (!nv.selecting) {
              oldSelecting = false;
              parentRow.removeClass("single-select-selected-bg");
              element.removeClass("multi-select-checkbox-checked");
              parentRow.removeClass("multiple-list-select-item--selecting");
            }

            //check if the item is still selected or not.
            if (nv.selecting && multipleSelectProvider.isSelected(item)) {
              parentRow.addClass("single-select-selected-bg");
              element.addClass("multi-select-checkbox-checked");
            } else {
              parentRow.removeClass("single-select-selected-bg");
              element.removeClass("multi-select-checkbox-checked");
            }


          }, true);

          //set up ui from current state
          if (oldSelecting === true) {
            parentRow.addClass("multiple-list-select-item--selecting");
            if (multipleSelectProvider.isSelected(item)) {
              parentRow.addClass("single-select-selected-bg");
              element.addClass("multi-select-checkbox-checked");
            }
          }



          scope.$on("destroy", function () {
            element.off("click.multiSelect");
            parentRow.removeClass("single-select-selected-bg");
            element.removeClass("multi-select-checkbox-checked");
          });
        }
      }
    }
  };
}