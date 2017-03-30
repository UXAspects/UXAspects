export default function condensedHeader() {
  return {
    restrict: 'A',
    link: function (scope, element) {
      var body = angular.element('body');
      if (element.hasClass('condensed')) {
        body.addClass('condensed-panel');
      }
    }
  };
}