modalInsetPanel.$inject = ['safeAnimationFrame'];

export default function modalInsetPanel(safeAnimationFrame) {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        template: '<div class="modal-panel-region"><div class="modal-panel"></div></div>',
        scope: {
            showPanel: '=',
            panelWidth: '=',
            panelSide: '=',
            onDismiss: '=?'
        },
        link: function (scope, element, attrs, controllers, transclude) {

            //perform manually transclusion to provide the appropriate scope after transclusion
            transclude(scope, function (clone) {
                element.find('.modal-panel').append(clone);
            });

            //store the current offset - avoid making dom measurements
            var transformX = 0,
                sideMultiplier = scope.panelSide === 'left' ? -1 : 1,
                panelWidth = scope.panelWidth;

            //store the different states in a 'enum' style structure
            var states = {
                closed: 1,
                closing: 2,
                opening: 3,
                open: 4
            };

            //hold current state
            var state = (scope.showPanel === false) ? states.closed : states.open;

            //get the modal panel element
            var modalPanel = element.find('.modal-panel');

            //set panel side classes and multiplier
            setPanelSide();

            //set the initial panel size
            resizeModalPanel();

            //instantiate the safeAnimationFrame service with current scope
            var animationInstance = safeAnimationFrame.create(scope);

            //on animation frame do update position etc..
            animationInstance.animationFrame(updatePanel);

            //watch the showPanel property for changes
            scope.$watch('showPanel', function (nv, ov) {
                if (nv !== ov) {
                    if (nv === true) showPanel();
                    else {
                        hidePanel();
                    }
                }
            });

            //watch for changes to the desired modal side
            scope.$watch('panelSide', function (nv, ov) {
                if (nv !== ov) setPanelSide();
            });

            //watch the panel size changing - dont store if width is 0, means it is hidden
            scope.$watch('panelWidth', function (nv, ov) {
                if (nv !== ov) {
                    panelWidth = nv;

                    //set the actual panel size
                    resizeModalPanel();
                }
            });

            //if the user clicks inside the modal panel container hide the panel
            element.click(function () {
                scope.showPanel = false;
            });

            //if the user clicks inside the panel then stop propagation
            modalPanel.click(function (event) {
                event.stopPropagation();
            });

            function setPanelSide() {
                //apply the appropriate side class
                if (scope.panelSide === 'left') {
                    modalPanel.removeClass('right');
                    modalPanel.addClass('left');
                } else {
                    modalPanel.removeClass('left');
                    modalPanel.addClass('right');
                }

                //update side multiplier
                sideMultiplier = scope.panelSide === 'left' ? -1 : 1;

                //call resize panel to update position if closed
                resizeModalPanel();
            }

            function resizeModalPanel() {
                //ensure we have the latest size
                panelWidth = scope.panelWidth;

                //actually size the element
                modalPanel.width(panelWidth);

                //if the panel should be offscreen - update position
                if (state === states.closed || state === states.opening) {
                    var targetOffset = (panelWidth + 10) * sideMultiplier;
                    transformX = targetOffset;
                    modalPanel.get(0).style.transform = 'translateX(' + transformX + 'px)';
                }
            }

            function showPanel() {
                //ensure showPanel has the correct value
                scope.showPanel = true;

                //ensure the element is visible
                element.get(0).style.display = 'block';

                //begin animation to open panel
                state = states.opening;
            }

            function hidePanel() {
                //ensure showPanel has the correct value
                scope.showPanel = false;

                //update the state
                state = states.closing;

                //if a function was specified to be called when dismissed then call it.
                if (scope.onDismiss) scope.onDismiss();
            }

            function updatePanel() {
                //take all require measurments up front to avoid reflow
                var targetOffset = (panelWidth + 10) * sideMultiplier;

                //calculate how much the position should change every frame - assume ~60fps - target duration 0.1 seconds
                var tick = panelWidth / (60 * 0.1);

                switch (state) {
                    case states.closed:
                        if (transformX !== targetOffset) {
                            transformX = targetOffset;
                            modalPanel.get(0).style.transform = 'translateX(' + transformX + 'px)';

                            //hide the container element
                            if (element.get(0).style.display !== 'none') element.get(0).style.display = 'none';
                        } else {
                            //ensure the container element is hidden
                            if (element.get(0).style.display !== 'none') element.get(0).style.display = 'none';
                        }
                        break;

                    case states.closing:

                        //begin moving toward an offset of targetOffset
                        if (transformX < targetOffset) {

                            //increment the position by the tick amount
                            transformX += tick;

                            //check to see if animation has finished
                            if (transformX >= targetOffset) {
                                transformX = targetOffset;
                                state = states.closed;
                            }
                        } else {
                            //increment the position by the tick amount
                            transformX -= tick;

                            //check to see if animation has finished
                            if (transformX <= targetOffset) {
                                transformX = targetOffset;
                                state = states.closed;
                            }
                        }

                        //set position - using css transforms for smooth animation - especially on mobile
                        modalPanel.get(0).style.transform = 'translateX(' + transformX + 'px)';
                        break;

                    case states.opening:

                        //begin moving toward an offset of zero
                        if (transformX < 0) {

                            //increment the position by the tick amount
                            transformX += tick;

                            //check to see if animation has finished
                            if (transformX >= 0) {
                                transformX = 0;
                                state = states.open;
                            }
                        } else {
                            //increment the position by the tick amount
                            transformX -= tick;

                            //check to see if animation has finished
                            if (transformX <= 0) {
                                transformX = 0;
                                state = states.open;
                            }
                        }

                        //set position - using css transforms for smooth animation - especially on mobile
                        modalPanel.get(0).style.transform = 'translateX(' + transformX + 'px)';
                        break;

                    case states.open:
                        if (transformX !== 0) {
                            transformX = 0;
                            modalPanel.get(0).style.transform = 'translateX(' + 0 + 'px)';
                        }
                        break;
                }

            }

        }
    };
}