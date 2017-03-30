layoutSwitcherItem.$inject = ['$templateRequest', '$compile'];

export default function layoutSwitcherItem($templateRequest, $compile) {
  return {
    restrict: "E",
    replace: false,
    transclude: true,
    require: '^layoutSwitcherContainer',
    controller: 'LayoutSwitcherItemCtrl as vm',
    template: '<div ng-style="{ \'display\': vm.visible ? \'block\' : \'none\' }"></div>',
    scope: true,
    link: function (scope, element, attrs, ctrl, transclude) {

      var layoutUrl = attrs.layout;
      var targetScope = scope.$parent;
      var container = element.children().first();

      // if a layout url was specified we need to load it
      if (layoutUrl !== undefined) {

        $templateRequest(layoutUrl).then(function (template) {
          container.append($compile(template)(targetScope));
        });

      } else {

        // otherwise just perform transclusion
        container.append(transclude(targetScope));
      }
    }
  };
}