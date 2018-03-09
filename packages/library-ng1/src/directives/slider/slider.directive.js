slider.$inject = ['$timeout'];

export default function slider($timeout) {
    return {
        restrict: 'E',
        template: require('./slider.html'),
        scope: {
            options: '=',
            ngModel: '='
        },
        require: 'ngModel',
        controller: 'SliderCtrl as vm',
        bindToController: true,
        link: function(scope, element) {

            // store reference to controller
            var vm = scope.vm;

            // store reference to elements
            var nativeElement = element.get(0);

            var track = nativeElement.querySelector('.track');

            var thumbLower = nativeElement.querySelector('.thumb.lower');
            var thumbUpper = nativeElement.querySelector('.thumb.upper');

            var lowerTooltip = nativeElement.querySelector('.tooltip-lower');
            var upperTooltip = nativeElement.querySelector('.tooltip-upper');

            // store the currently dragged state
            var activeThumb = null;

            // bind event handlers
            bindHandlers();

            // create tooltips after initial digest
            $timeout(createTooltips);

            // unbind event handlers
            scope.$on('$destroy', unbindHandlers);

            function bindHandlers() {

                // add mouse down events to thumbs
                thumbLower.addEventListener('mousedown', thumbDragStart);
                thumbUpper.addEventListener('mousedown', thumbDragStart);

                // add some events to the document
                document.addEventListener('mousemove', thumbDragMove);
                document.addEventListener('mouseup', thumbDragEnd);

                // support touch events
                thumbLower.addEventListener('touchstart', thumbDragStart);
                thumbUpper.addEventListener('touchstart', thumbDragStart);
                document.addEventListener('touchmove', thumbDragMove);
                document.addEventListener('touchend', thumbDragEnd);
            }

            function unbindHandlers() {
                document.removeEventListener('mousemove', thumbDragMove);
                document.removeEventListener('mouseup', thumbDragEnd);

                document.removeEventListener('touchmove', thumbDragMove);
                document.removeEventListener('touchend', thumbDragEnd);
            }

            function thumbDragStart(event) {

                // ensure we are not performing events on tooltip
                if (hasClassOrAncestor(event.target, 'tooltip')) {
                    return;
                }

                // if right or middle click do nothing
                if (event.button && event.button !== 0) {
                    return;
                }

                // store the element to use later
                activeThumb = event.target;

                // get thumb state
                var thumbState = resolveThumbState(activeThumb);

                // update thumb state
                thumbState.drag = true;

                // remove bring to front class from both thumbs
                vm.bringToFront(activeThumb.classList.contains('upper'));

                // stop any highlighting occuring when dragging
                event.preventDefault();

                return false;
            }

            function thumbDragMove(event) {

                // if we arent dragging then stop
                if (activeThumb === null) {
                    return;
                }

                // get the thumb being dragged
                var thumb = activeThumb;

                // check for any page scrolling
                var value = mousePositionToValue(event);

                // snap to ticks
                value = snapToTick(value);

                // get the current value for the thumb
                setValueForThumb(thumb, value);
            }

            function thumbDragEnd() {

                // if we arent dragging then stop
                if (activeThumb === null) {
                    return;
                }

                // get thumb state
                var thumbState = resolveThumbState(activeThumb);

                // update thumb state
                thumbState.drag = false;

                // remove any reference to thumb object being dragged
                activeThumb = null;

                // perform a digest here if required
                if (!scope.$$phase) {
                    scope.$digest();
                }
            }

            function clamp(value, min, max) {
                return Math.min(Math.max(value, min), max);
            }

            function mousePositionToValue(event) {

                // get event position - eithe rmouse or touch
                var eventPosition = event.clientX !== undefined ? event.clientX : event.touches && event.touches.length > 0 ? event.touches[0].clientX : null;

                // if event position is null do nothing
                if (eventPosition === null) {
                    return;
                }

                // get mouse position
                var mouseX = window.pageXOffset + eventPosition;

                // get track size and position
                var trackBounds = track.getBoundingClientRect();

                // restrict the value within the range size
                var position = clamp(mouseX - trackBounds.left, 0, trackBounds.width);

                // get fraction representation of location within the track
                var fraction = (position / trackBounds.width);

                // convert to value within the range
                var value = ((vm.options.track.max - vm.options.track.min) * fraction) + vm.options.track.min;

                // ensure value is valid
                value = validatePosition(value);

                // convert position to point within range
                return value;
            }

            function validatePosition(value) {

                // if slider is not a range value is always valid
                if (vm.options.type === 'value') {
                    return value;
                }

                // otherwise we need to check to make sure lower thumb cannot go above higher and vice versa
                if (activeThumb === thumbLower) {
                    return value <= vm.thumbUpperValue ? value : vm.thumbUpperValue;
                }

                if (activeThumb === thumbUpper) {
                    return value >= vm.thumbLowerValue ? value : vm.thumbLowerValue;
                }
            }

            function setValueForThumb(thumb, value) {

                // set the appropriate values
                if (thumb === thumbLower) {
                    vm.thumbLowerValue = value;
                } else {
                    vm.thumbUpperValue = value;
                }

                // run digest if required
                if (!scope.$$phase) {
                    scope.$digest();
                }
            }

            function createTooltips() {

                // initially update tooltips
                updateTooltip(lowerTooltip, vm.tooltipLowerVisible);
                updateTooltip(upperTooltip, vm.tooltipUpperVisible);

                // watch values of lower thumb
                scope.$watch('vm.thumbLowerValue', function(newValue, oldValue) {
                    if (newValue !== oldValue) {
                        $timeout(function() {
                            updateTooltip(lowerTooltip, vm.tooltipLowerVisible);
                        });
                    }
                });

                // watch values of upper thumb
                scope.$watch('vm.thumbUpperValue', function(newValue, oldValue) {
                    if (newValue !== oldValue) {
                        $timeout(function() {
                            updateTooltip(upperTooltip, vm.tooltipUpperVisible);
                        });
                    }
                });

                // watch for changes in tooltip visibility
                scope.$watch('vm.tooltipLowerVisible', function(newValue, oldValue) {
                    if (newValue !== oldValue) {
                        updateTooltip(lowerTooltip, vm.tooltipLowerVisible);
                    }
                });

                scope.$watch('vm.tooltipUpperVisible', function(newValue, oldValue) {
                    if (newValue !== oldValue) {
                        updateTooltip(upperTooltip, vm.tooltipUpperVisible);
                    }
                });

                // watch callout options to and update if required
                scope.$watch('vm.options.handles.callout', function(newValue, oldValue) {
                    if (newValue !== oldValue) {
                        // update both tooltips
                        $timeout(function() {
                            updateTooltip(lowerTooltip, vm.tooltipLowerVisible);
                            updateTooltip(upperTooltip, vm.tooltipUpperVisible);
                        });
                    }
                });
            }

            function updateTooltip(tooltip, visible) {

                // if tooltip is not visible then stop here
                if (visible === false) {
                    return;
                }

                // get the parent thumb element
                var thumb = tooltip.parentElement;

                // get the thumb width
                var thumbWidth = thumb.offsetWidth;

                // get the tooltips width
                var tooltipWidth = tooltip.offsetWidth;

                // calculat the tooltips new position
                var tooltipPosition = Math.ceil((tooltipWidth - thumbWidth) / 2);

                // update tooltip position
                tooltip.style.left = -tooltipPosition + 'px';

            }

            function snapToTick(value) {

                // get the snap target
                var snapTarget = vm.options.track.ticks.snap;

                // if snap target is none then return original value
                if (!snapTarget || snapTarget === 'none') {
                    return value;
                }

                // get filtered ticks
                var ticks;

                switch (snapTarget) {
                    case 'minor':
                        ticks = vm.ticks.filter(function(tick) {
                            return tick.type === 'minor';
                        });
                        break;

                    case 'major':
                        ticks = vm.ticks.filter(function(tick) {
                            return tick.type === 'major';
                        });
                        break;

                    case 'all':
                        ticks = vm.ticks.slice(0);
                        break;
                }

                var lowerLimit = vm.options.track.min;
                var upperLimit = vm.options.track.max;

                // if range then update the limits
                if (vm.options.type === 'range') {

                    // determine which thumb we are dragging
                    if (activeThumb.classList.contains('lower')) {
                        upperLimit = vm.thumbUpperValue;
                    } else {
                        lowerLimit = vm.thumbLowerValue;
                    }
                }

                // filter ticks within the allowed range
                ticks = ticks.filter(function(tick) {
                    return tick.value >= lowerLimit && tick.value <= upperLimit;
                });

                // find the closest tick
                var snapValue = 0,
                    distance = null;

                // iterate each tick to find the closest
                for (var idx = 0; idx < ticks.length; idx++) {

                    // get tick value
                    var tickValue = ticks[idx];

                    // calculate the distance between this ticks value and our target
                    var tickDistance = Math.max(tickValue.value, value) - Math.min(tickValue.value, value);

                    // if this tick is closer than the previous closest then store this new tick
                    if (distance === null || tickDistance < distance) {

                        distance = tickDistance;
                        snapValue = tickValue.value;
                    }
                }

                return snapValue;
            }

            /*
                Utility Functions
            */
            function resolveThumbState(element) {
                // return the reference to the corresponding state element
                return element.classList.contains('lower') ? vm.lowerThumbState : vm.upperThumbState;
            }

            function hasClassOrAncestor(element, className) {

                // check if the current element has the class
                if (element.classList.contains(className)) {
                    return true;
                }

                // iterate each parent element
                while (element.parentElement) {

                    // check if parent element has class
                    if (element.classList.contains(className)) {
                        return true;
                    }

                    // set element to the parent element
                    element = element.parentElement;
                }

                // if we reach this point then return false
                return false;
            }
        }
    };
}