searchComponent.$inject = ['$animate'];

export default function searchComponent($animate) {
    return {
        restrict: 'E',
        controller: 'SearchComponentCtrl',
        controllerAs: 'sc',
        template: require('./searchComponent.html'),
        replace: true,
        transclude: true,
        require: ['^searchGroup'],
        link: function(scope, element, attrs, ctrl, transclude) {

            //prevent any animation on the element - reduce any lag
            $animate.enabled(false);

            //store the component id
            scope.componentId = element.parents('.field').first().attr('component-id');

            //make search group controller available to the search component controller
            scope.searchGroup = ctrl[0];

            //check if the component should have an initial value
            scope.model = scope.searchGroup.getComponentValue(scope.componentId);

            //perform manualy transclusion to provide correct scope to controller
            transclude(scope, function(clone) {
                element.find('.component-container').append(clone);
            });

        }
    };
}