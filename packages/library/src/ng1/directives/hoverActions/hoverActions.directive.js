hoverActions.$inject = ['safeTimeout'];

export default function hoverActions(safeTimeout) {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        template: '<div class="hover-actions" ng-transclude></div>',
        controller: 'HoverActionsCtrl as hac',
        link: function (scope, element, attrs) {

            var hoverActions = null;

            //create safeTimeout instance
            var safeTimeoutInstance = safeTimeout.create(scope);

            //await for transclusion to finish then process element
            safeTimeoutInstance.timeout(getHoverElement);

            /*
              Initialisation
            */
            function getHoverElement() {

                //find the element that will trigger the hover effect
                var hoverElement;

                if (attrs.hoverElement === null) hoverElement = element.parent();
                else hoverElement = element.parents(attrs.hoverElement);

                //ensure a hover element was specified
                if (hoverElement.length === 0) hoverElement = element.parent();

                // if we have one it should be the first item in the list
                scope.hac.hoverElement = hoverElement.first();

                //ensure it is hoverable
                if (!scope.hac.hoverElement.attr('tabindex')) scope.hac.hoverElement.attr('tabindex', 0);

                //get hover actions
                hoverActions = scope.hac.hoverElement.find('.hover-action');

                //apply listeners to the parent element
                applyListeners();
            }

            /*
              Bind to events
            */
            function applyListeners() {
                scope.hac.hoverElement.mouseover(onHover);
                scope.hac.hoverElement.mouseleave(onLeave);
                scope.hac.hoverElement.focus(onFocus);
                scope.hac.hoverElement.blur(onBlur);
                scope.hac.hoverElement.keydown(onKeyDown);
            }

            /*
              Event handlers
            */
            function onFocus() {
                element.addClass('focused');
            }

            function onBlur() {
                element.removeClass('focused');
            }

            function onHover() {
                element.addClass('hovered');
            }

            function onLeave() {
                element.removeClass('hovered');
            }

            function onKeyDown(evt) {
                //if there right arrow key is pressed then focus the first action
                if (evt.keyCode === 39) hoverActions.first().focus();
            }
        }
    };
}