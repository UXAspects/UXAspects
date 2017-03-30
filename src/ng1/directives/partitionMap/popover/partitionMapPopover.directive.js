partitionPopover.$inject = ['$compile', '$timeout'];

export default function partitionPopover($compile, $timeout) {
  return {
    restrict: "E",
    transclude: true,
    template: require('./popoverTemplate.html'),
    scope: true,
    link: function (scope, element) {
      var vm = scope;

      //find the target area for the template
      var contentArea = angular.element(element[0].getElementsByClassName('user-content')[0]);

      scope.$watch('chart.childList', function (newValue, oldValue) {
        if (newValue === oldValue) {
          return;
        }

        // update scroll pane
        if(vm.pane) {
          $timeout(vm.pane.reinitialise);
        }
      });

      scope.$on('popover-update', function (event, data) {
        var userContentScope = scope.$new(true);

        for (var key in data) {
          userContentScope[key] = data[key];
        }

        if (vm.chart.popoverTemplate) {
          //compile the template with the latest values

          //compile template and add it to the popover
          contentArea.empty().append(vm.chart.popoverTemplate);
          $compile(contentArea)(userContentScope);

          //apply the scope
          if (!userContentScope.$$phase) {
            userContentScope.$digest();
          }
        }
      });
    }
  };
}