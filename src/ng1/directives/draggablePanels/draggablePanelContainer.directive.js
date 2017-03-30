export default function draggablePanelContainer() {
  return {
    restrict: "E",
    scope: {
      draggableGroup: '@',
      draggableView: '@?',
      customPlaceholderSize: '@?',
      onDragStart: '=?',
      onDragOver: '=?',
      onDragEnd: '=?'
    },
    link: function (scope, element) {

      //get the group name or use the default one
      var groupName = scope.draggableGroup ? scope.draggableGroup : 'draggable';
      var draggableView = scope.draggableView ? scope.draggableView : false;
      var customPlaceholderSize = scope.customPlaceholderSize ? scope.customPlaceholderSize : false;



      if (draggableView) {
        if (draggableView === "card")
          element.find(".list").hide();

        if (draggableView === "list")
          element.find(".card").hide();
      }

      var displayView = function (panel) {

        var container = panel.item.parent()[0];

        if (container !== undefined && container !== null) {

          if (container.getAttribute('draggable-view') === "card") {
            angular.element(panel.item[0]).find(".card").show();
            angular.element(panel.item[0]).find(".list").hide();
          }

          if (container.getAttribute('draggable-view') === "list") {
            angular.element(panel.item[0]).find(".card").hide();
            angular.element(panel.item[0]).find(".list").show();
          }
        }

      };

      //add the group name to the element
      element.addClass(groupName);

      element.sortable({
        items: '.draggable-panel',
        handle: ".draggable-panel-handle",
        connectWith: '.' + groupName,
        tolerance: 'pointer',
        placeholder: 'sortable-placeholder',
        forcePlaceholderSize: !customPlaceholderSize,
        opacity: 0.8,
        start: function (evt, panel) {
          if (scope.onDragStart) scope.onDragStart.apply(this, [evt, panel]);
        },
        over: function (evt, panel) {
          if (scope.onDragOver) scope.onDragOver.apply(this, [evt, panel]);
        },
        stop: function (evt, panel) {
          if (draggableView) displayView(panel);
          if (scope.onDragEnd) scope.onDragEnd.apply(this, [evt, panel]);
        }
      });

    }
  };
}