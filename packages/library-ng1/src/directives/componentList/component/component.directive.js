export default function component() {
  return {
    restrict: 'E',
    require: '^^componentList',
    transclude: true,
    template: require('./component.html'),
    controller: 'ComponentCtrl as vm',
    link: function (scope, element, attrs, ctrl, transclude) {

      // find the destination for the transcluded content
      var container = element.find('.component-content');

      // perform transclusion
      transclude(function (content, childScope) {

        // get initial value
        childScope.model = ctrl.components[scope.$parent.$index];

        // store child scope
        scope.vm.childScope = childScope;

        // add element to container
        container.append(content);

        // update the model in the parent container
        childScope.$watch('model', function (newValue) {
          ctrl.components[scope.$parent.$index] = newValue;
        });

        // ensure the model gets update if the value in the parent changes
        scope.$watch('$parent.component', function() {
          if(childScope.model !== scope.$parent.component) {
            childScope.model = scope.$parent.component;
          }
        }, true);

      });

    }
  };
}