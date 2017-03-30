listHoverAction.$inject = ['keyboardService'];

export default function listHoverAction(keyboardService) {
  return {
    restrict: "E",
    replace: true,
    template: require('./listHoverAction.html'),
    controller: "ListHoverActionCtrl as lha",
    require: '^^listHoverActions',
    scope: {
      icon: "@",
      name: "@",
      click: "&"
    },
    link: function (scope, element) {
      var KEYS = {
        LEFT: 37,
        RIGHT: 39
      };

      element.tooltip({
        title: scope.name
      });

      // clean up after destroyed
      scope.$on('$destroy', function () {
        element.tooltip('destroy');
      });
      
      // on left key press focus on previous action
      keyboardService.keydown(element, KEYS.LEFT, function(e) {
        if (element.prevAll('.list-hover-action').length > 0) {
          e.stopPropagation();
          element.prevAll('.list-hover-action').first().focus();
        }
      });

      // on right key press focus on next action
      keyboardService.keydown(element, KEYS.RIGHT, function(e) {
        if (element.nextAll('.list-hover-action').length > 0) {
          e.stopPropagation();
          element.nextAll('.list-hover-action').first().focus();
        }
      });

    }
  };
}