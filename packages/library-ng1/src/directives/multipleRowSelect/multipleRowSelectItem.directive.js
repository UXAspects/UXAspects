multipleRowSelectItem.$inject = ["multipleSelectProvider"];

export default function multipleRowSelectItem(multipleSelectProvider) {
  var SelectedClass = "shift-select-selected-bg";
  return {
    restrict: "A",
    link: function (scope, element, attrs) {
      if (attrs.multipleRowSelectItem) {
        // Prevent shift click from selecting text
        angular.element(element).children("*").css({
          "user-select": "none",
          "-ms-user-select": "none",
          "-moz-user-select": "none",
          "-webkit-user-select": "none"
        });
        var item = scope.$eval(attrs.multipleRowSelectItem);
        if (item) {
          //set up click
          element.on("click.multiSelect", function (e) {
            if (e.shiftKey) {
              extendOrStartSelection();
            }
            else if (e.ctrlKey) {
              addToOrStartSelection();
            }
            else {
              startSelection();
            }
            element.focus();  // Workaround for IE, make sure parent element gets focus
            e.preventDefault();
            e.stopImmediatePropagation();
          });

          // for keyboard controls
          element.on("keydown.multiSelect", function (e) {
            if (e.keyCode === 32) {
              addToOrStartSelection();
              e.preventDefault();
              e.stopImmediatePropagation();
            }
          });
          
          // Custom event triggered by keyboardNavigableTable to handle shift key extension
          element.on("receivedSelection.keyboardNavigableTable", function(e) {
            if (!e.ctrlKey) {
              if (e.shiftKey) {
                extendSelectionFromPrevious();
              }
              else {
                // if shift key not held then dont select any
                multipleSelectProvider.selectNone();
                multipleSelectProvider.multipleRowSelectOriginIndex = scope.$index;
                scope.$apply();
              }
            }
          });

          // Prevent selection of text on shift click for IE
          element.on("selectstart", function(e) {
            e.preventDefault();
            return false;
          });

          scope.$watch(function() {
            return multipleSelectProvider.isSelected(item);
          }, function (nv) {
            //check if the item is still selected or not.
            if (nv) {
              element.addClass(SelectedClass);
            } else {
              element.removeClass(SelectedClass);
            }
          }, true);

          scope.$on("destroy", function () {
            element.off("click.multiSelect");
            element.removeClass(SelectedClass);
          });
        }
      }

      // Clear selection and select this row
      function startSelection() {
        multipleSelectProvider.state.selecting = true;
        if(multipleSelectProvider.state.selectedFromButton === false) {
          multipleSelectProvider.state.selectedFromCheckBox = true;
        }

        multipleSelectProvider.selectNone();

        multipleSelectProvider.multipleRowSelectItemPreviousSelectionDirection = undefined;
        if (multipleSelectProvider.itemClicked(item)) {
          multipleSelectProvider.multipleRowSelectOriginIndex = scope.$index;
          element.addClass(SelectedClass);
        }
        scope.$apply();
      }

      // Add this row to the current selection
      function addToOrStartSelection() {
        if (!multipleSelectProvider.state.selecting) {
          startSelection();
        }
        else {
          multipleSelectProvider.multipleRowSelectItemPreviousSelectionDirection = undefined;
          if (multipleSelectProvider.itemClicked(item)) {
            multipleSelectProvider.multipleRowSelectOriginIndex = scope.$index;
            element.addClass(SelectedClass);
          }
          else {
            element.removeClass(SelectedClass);
          }
          scope.$apply();
        }
      }

      // Add this row and all intermediate rows to the current selection
      function extendOrStartSelection() {
        if (!multipleSelectProvider.state.selecting) {
          startSelection();
        }
        else {
          extendSelection();
        }
      }

      // Select previous row, this row, and all intermediate rows
      function extendSelectionFromPrevious() {
        multipleSelectProvider.state.selecting = true;
        if (multipleSelectProvider.state.selectedFromButton === false) {
          multipleSelectProvider.state.selectedFromCheckBox = true;
        }
        multipleSelectProvider.multipleRowSelectItemPreviousSelectionDirection = undefined;
        extendSelection();
      }

      function extendSelection() {
        var itemsToSelect = getItemsToSelect(multipleSelectProvider.multipleRowSelectOriginIndex, scope.$index);
        if (multipleSelectProvider.rangeClicked(itemsToSelect.itemIndices)) {
          for (var i in itemsToSelect.elements) {
            itemsToSelect.elements[i].addClass(SelectedClass);
          }
        } else {
          for (var j in itemsToSelect.elements) {
            itemsToSelect.elements[j].removeClass(SelectedClass);
          }
        }
        scope.$apply();
      }
      
      function getItemsToSelect(lastIndex, currentIndex) {
        var result = {
          itemIndices: [],
          elements: []
        };
        //Ensure we have an index for the clicked item (expected)
        if (currentIndex !== null && currentIndex !== undefined){

          //If this is the first item clicked there's no previous index to look at
          if (lastIndex === null || lastIndex === undefined){
            result.itemIndices.push(getItemFromRow(currentIndex));
            result.elements.push(element);
          }
          else {
            var rowItems = [];
            var from = Math.min(lastIndex, currentIndex);
            var to = Math.max(lastIndex, currentIndex);

            for (var i = from; i <= to; i++){
              rowItems[i] = getItemFromRow(i);
              result.itemIndices.push(rowItems[i].item);
              result.elements.push(rowItems[i].element);
            }
          }
        }

        return result;
      }

      function getItemFromRow(index){
        var el = element.parent().children("tr").eq(index);
        return{
          item : el.scope().$eval(
            el.attr("multiple-row-select-item")
          ),
          element : el
        } ;
      }
    }
  };
}
