export default function groupedPrevious() {
  return {
    restrict: 'A',
    link: function (scope, element) {
      scope.group = element[0].parentNode;
      var btnNav = scope.group.querySelectorAll('.btn-nav');
      element.on('click', function () {
        scope.curr.classList.remove('active');
        if (scope.index <= 0) {
          scope.index = scope.count - 1;
          scope.curr = btnNav.item(scope.index);
        } else {
          scope.index--;
          scope.curr = btnNav.item(scope.index);
        }
        scope.curr.classList.add('active');
      });
    }
  };
}