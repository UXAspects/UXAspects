export default function modalInsetHeader() {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        template: require('./modalInsetHeader.html'),
        link: function (scope, element, attrs, controllers, transclude) {

            //perform manually transclusion to provide the appropriate scope after transclusion
            transclude(scope.$parent, function (clone) {
                element.find('.header-content').append(clone);
            });

            //find the close container element to allow closing of the element on click
            var closeElement = element.find('.close-container');

            var allowDismiss = attrs.allowDismiss && attrs.allowDismiss === 'false' ? false : true;

            //if they do not want the dismiss button to be shown, hide it
            if (allowDismiss === false) {
                closeElement.hide();
            }

            //hide panel when close button is clicked
            closeElement.click(function (event) {

                scope.$apply(function () {
                    scope.showPanel = false;
                });
                event.stopPropagation();
            });
        }
    };
}