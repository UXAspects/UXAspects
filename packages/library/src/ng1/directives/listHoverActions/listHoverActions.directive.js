listHoverActions.$inject = ['keyboardService'];

export default function listHoverActions(keyboardService) {
  return {
    restrict: "E",
    replace: true,
    transclude: true,
    template: require('./listHoverActions.html'),
    controller: 'ListHoverActionsCtrl',
    controllerAs: 'lh',
    link: function (scope, element) {
      var parent = element.parents('tr').first();
      var KEYS = {
        LEFT: 37,
        RIGHT: 39
      };

      keyboardService.keydown(parent, KEYS.LEFT, function(e) {
        var selected = angular.element(document.activeElement);
        if (element.has(selected).length > 0 && window.getComputedStyle(element[0]).getPropertyValue("opacity") !== "0") {
          parent.focus();
          e.preventDefault();
          e.stopPropagation();
        }
      }, 10);

      keyboardService.keydown(parent, KEYS.RIGHT, function(e) {
        var selected = angular.element(document.activeElement);
        if (element.has(selected).length === 0 && window.getComputedStyle(element[0]).getPropertyValue("opacity") !== "0") {
          element.children().first().focus();
          e.preventDefault();
          e.stopPropagation();
        }
      }, 20);

      // add class to parent row
      var parentRow = element.parents('tr').get(0);
      if (parentRow) {
        parentRow.classList.add('hover-actions');
      }
    }
  };
}