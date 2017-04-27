export default function draggableCard() {
  return {
    restrict: "E",
    template: require('./draggableCard.html'),
    replace: true,
    transclude: true,
    scope: {
      cardTitle: '=?',
      cardSubtitle: '=?',
      cardSelected: '=?',
      cardIcons: '=?',
      disableRemove: '=?',
      disableEdit: '=?'
    },
    link: function (scope, element) {

      //if the card is the default selected card then set an attribute on it
      if (scope.cardSelected && scope.cardSelected === true) {
        element[0].setAttribute('default-selected-card', '');
      }

      if (scope.cardIcons){
        for (var i = 0; i < scope.cardIcons.length; i++){
          if(!scope.cardIcons[i].tooltipPlacement){
            scope.cardIcons[i].tooltipPlacement = 'top';
          }
        }
      }

      //get parent element properties
      var parentScope = element.parent().scope();

      //find out whether we are allowed to edit or remove
      var allowEditing = (parentScope.allowEditing !== null && parentScope.allowEditing !== undefined) ? parentScope.allowEditing : true;
      var allowRemoving = (parentScope.allowRemoving !== null && parentScope.allowRemoving !== undefined) ? parentScope.allowRemoving : true;
      var allowReordering = (parentScope.allowReordering !== null && parentScope.allowReordering !== undefined) ? parentScope.allowReordering : true;

      //find out if we have the necessary functions to edit and remove
      var hasEditFunc = (parentScope.onEdit !== null && parentScope.onEdit !== undefined);
      var hasRemoveFunc = (parentScope.onRemove !== null && parentScope.onRemove !== undefined);

      scope.allowEditing = hasEditFunc && allowEditing;
      scope.allowRemoving = hasRemoveFunc && allowRemoving;
      scope.allowReordering = allowReordering;

      //show header if any of the properties have been set
      scope.showTitle = scope.cardTitle || scope.cardSubtitle;
      scope.showHeader = scope.showTitle || scope.allowEditing || scope.allowRemoving;

      scope.$on('allowEditingChanged', function () {
        allowEditing = (parentScope.allowEditing !== null && parentScope.allowEditing !== undefined) ? parentScope.allowEditing : true;
        scope.allowEditing = hasEditFunc && allowEditing;
      });

      scope.$on('allowRemovingChanged', function () {
        allowRemoving = (parentScope.allowRemoving !== null && parentScope.allowRemoving !== undefined) ? parentScope.allowRemoving : true;
        scope.allowRemoving = hasRemoveFunc && allowRemoving;
      });

    }
  };
}