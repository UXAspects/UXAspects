export default function fixedCard() {
  return {
    restrict: "E",
    template: require('./fixedCard.html'),
    replace: true,
    scope: {
      cardTitle: '=',
      cardSubtitle: '=?',
      cardSelected: '=?'
    },
    link: function (scope, element) {

      //if the card is the default selected card then set an attribute on it
      if (scope.cardSelected && scope.cardSelected === true) {
        element[0].setAttribute('default-selected-card', '');
      }

    }
  };
}