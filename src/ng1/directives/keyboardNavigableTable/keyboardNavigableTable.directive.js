keyboardNavigableTable.$inject = ["$document"];

export default function keyboardNavigableTable($document) {
  var Keys = {
    'up': 38,
    'down': 40,
    'home': 36,
    'end': 35,
    'pageup': 33,
    'pagedown': 34,
    'esc': 27
  };
  return {
    restrict: "A",
    link: function (scope, elem) {
      // Table key handler
      elem.on("keydown.keyboardNavigableTable", "tr", function (e) {
        if ([Keys.up, Keys.down, Keys.home, Keys.end, Keys.pageup, Keys.pagedown, Keys.esc].indexOf(e.which) === -1) return;
        e.stopPropagation();
        e.preventDefault(); // Prevents arrow keys from scrolling the page
        var selection = getSelection();
        var newSelectedElement = selection.selected;
        var itemToJumpTo;
        switch (e.which) {
          case Keys.up:
            newSelectedElement = selection.parentRow.prev("tr");
            break;
          case Keys.down:
            newSelectedElement = selection.parentRow.next("tr");
            break;
          case Keys.home:
            newSelectedElement = selection.parentRow.prevAll('tr:last');
            break;
          case Keys.end:
            newSelectedElement = selection.parentRow.nextAll('tr:last');
            break;
          case Keys.pageup:
            itemToJumpTo = selection.parentRow.prevAll('tr');
            if (itemToJumpTo.length)
              newSelectedElement = selection.parentRow.prevAll('tr:eq(10)').length ? selection.parentRow.prevAll('tr:eq(10)') : $(itemToJumpTo[itemToJumpTo.length - 1]);
            break;
          case Keys.pagedown:
            itemToJumpTo = selection.parentRow.nextAll('tr');
            if (itemToJumpTo.length)
              newSelectedElement = selection.parentRow.nextAll('tr:eq(10)').length ? selection.parentRow.nextAll('tr:eq(10)') : $(itemToJumpTo[itemToJumpTo.length - 1]);
            break;
        }
        if (newSelectedElement.length === 0) {
          // If the next selection doesn't exist then keep focus on current element
          newSelectedElement = selection.selected;
        }

        // only focus if it wasn't the esc key, otherwise blur
        if (e.which === Keys.esc)
          newSelectedElement.blur();
        else
          newSelectedElement.focus();

        // select the next row we are navigating to
        if (newSelectedElement.is("tr") && newSelectedElement !== selection.selected) {
          // Notify when selected row changes
          newSelectedElement.trigger({
            type: "receivedSelection.keyboardNavigableTable",
            shiftKey: e.shiftKey,
            ctrlKey: e.ctrlKey
          });
        }

      });

      // Function to return the focused element, and it's parent row.
      function getSelection() {
        var result = {
          selected: elem.find("tbody tr").first()
        };
        var selected = angular.element($document[0].activeElement);
        if (elem.has(selected)) {
          var parentRow = selected.closest("tr");
          result.selected = selected.is("a") ? selected : parentRow;
          result.parentRow = parentRow;
        }
        return result;
      }

    }
  };
}