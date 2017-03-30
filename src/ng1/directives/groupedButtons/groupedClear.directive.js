export default function groupedClear() {
  return {
    restrict: 'A',
    link: function (scope, element) {
      //only do this once
      if (!scope.curr) {
        scope.group = element[0].parentNode;
        var btnNav = scope.group.querySelectorAll('.btn-nav');
        scope.count = btnNav.length;
        for (var i = 0; i < btnNav.length; i++) {
          if (btnNav.item(i).classList.contains('active')) {
            scope.curr = btnNav.item(i);
            scope.index = i;
          }
        }
        //if no active class was set the first button should be active
        if (!scope.curr) {
          scope.curr = btnNav.item(0);
          scope.curr.classList.add('active');
          scope.index = 0;
        }
      }
      element.on('click', function () {
        scope.curr.classList.remove('active');
        scope.curr = element;
        scope.index = scope.curr.index() - 1;
        scope.curr = scope.curr[0];
        scope.curr.classList.add('active');
      });
    }
  };
}