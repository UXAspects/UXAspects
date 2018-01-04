export default function groupedNext() {
  return {
    restrict: 'A',
    link: function (scope, element) {
      scope.group = element[0].parentNode;
      var btnNav = scope.group.querySelectorAll('.btn-nav');
      element.on('click', function () {
        scope.curr.classList.remove('active');
        if (scope.index >= scope.count - 1) {
          scope.index = 0;
          scope.curr = btnNav.item(0);
        } else {
          scope.index++;
          scope.curr = btnNav.item(scope.index);
        }
        scope.curr.classList.add('active');
      });
    }
  };
}