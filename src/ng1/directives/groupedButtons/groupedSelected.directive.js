export default function groupedSelected() {
  return {
    restrict: 'A',
    link: function (scope, element) {
      element.on('click', function () {
        angular.element('.btn-align').removeClass('active');
        element.addClass('active');
      });
    }
  };
}