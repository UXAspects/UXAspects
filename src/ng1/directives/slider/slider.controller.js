SliderCtrl.$inject = ['$scope', '$timeout'];

export default function SliderCtrl($scope, $timeout) {
    var vm = this;

    // store the values of the two thumbs
    vm.thumbLowerValue = null;
    vm.thumbUpperValue = null;

    // store tooltip visibility
    vm.tooltipLowerVisible = false;
    vm.tooltipUpperVisible = false;

    // store thumb event information
    vm.lowerThumbState = {
        hover: false,
        drag: false
    };

    vm.upperThumbState = {
        hover: false,
        drag: false
    };

    // store all the track colors
    vm.trackColors = {
        lower: '#f2f2f2',
        range: '#889baa',
        higher: '#f2f2f2'
    };

    // store thumb positions
    vm.thumbPositions = {
        lower: 0,
        upper: 0
    };

    vm.trackSizes = {
        lower: 0,
        range: 0,
        higher: 0
    };

    // store the order we want to display the thumbs
    vm.thumbOrder = {
        lower: 100,
        upper: 101
    };

    // store all the ticks to display
    vm.ticks = [];

    var defaultOptions = {
        type: 'value',
        handles: {
            style: 'button',
            callout: {
                trigger: 'none',
                background: '#464646',
                color: '#fff',
                formatter: function(value) {
                    return value;
                }
            }
        },
        track: {
            height: 'wide',
            min: 0,
            max: 100,
            ticks: {
                snap: 'none',
                major: {
                    show: true,
                    steps: 10,
                    labels: true,
                    formatter: function(value) {
                        return value;
                    }
                },
                minor: {
                    show: true,
                    steps: 5,
                    labels: false,
                    formatter: function(value) {
                        return value;
                    }
                }
            },
            colors: {
                lower: '#f2f2f2',
                range: 'rgba(96,121,141, 0.75)',
                higher: '#f2f2f2'
            }
        }
    };


    // process the slider options
    processOptions();

    // watch for any changes to options
    $scope.$watch('vm.options', function(newValue, oldValue) {
        if (newValue !== oldValue) {
            processOptions();
        }
    }, true);

    // watch for changes to the values
    $scope.$watch('vm.thumbLowerValue', function(newValue, oldValue) {
        if (newValue !== oldValue) {
            updateViewValues();
        }
    });

    $scope.$watch('vm.thumbUpperValue', function(newValue, oldValue) {
        if (newValue !== oldValue) {
            updateViewValues();
        }
    });

    // watch for any changes to state
    $scope.$watch('vm.lowerThumbState', function(newValue, oldValue) {
        if (newValue !== oldValue) {
            updateTooltipVisibility();
        }
    }, true);

    $scope.$watch('vm.upperThumbState', function(newValue, oldValue) {
        if (newValue !== oldValue) {
            updateTooltipVisibility();
        }
    }, true);

    // watch for any external model changes
    $scope.$watch('vm.ngModel', function(newValue, oldValue) {
        if (newValue === oldValue) return;

        // ensure everything is up to date and in sync
        updateFromModel();
    }, true);

    // set initial values
    updateFromModel();

    // initially update tooltips
    updateTooltipVisibility();


    vm.bringToFront = function(upperThumb) {

        // determine which thumb to update
        vm.thumbOrder.lower = upperThumb ? 100 : 101;
        vm.thumbOrder.upper = upperThumb ? 101 : 100;
    };

    // Private Functions

    function updateTooltipVisibility() {

        // update visiblility based on configuration and state
        switch (vm.options.handles.callout.trigger) {

            case 'none':
                vm.tooltipLowerVisible = false;
                vm.tooltipUpperVisible = false;
                break;

            case 'persistent':
                vm.tooltipLowerVisible = true;
                vm.tooltipUpperVisible = true;
                break;

            case 'hover':
                vm.tooltipLowerVisible = vm.lowerThumbState.hover || vm.lowerThumbState.drag;
                vm.tooltipUpperVisible = vm.upperThumbState.hover || vm.upperThumbState.drag;
                break;

            case 'drag':
                vm.tooltipLowerVisible = vm.lowerThumbState.drag;
                vm.tooltipUpperVisible = vm.upperThumbState.drag;
                break;

        }
    }

    function processOptions() {

        // override any default options with specified options
        vm.options = $.extend(true, defaultOptions, vm.options);

        // update ticks
        updateTicks();

        // update track colors
        updateTrackColors();
    }

    function updateViewValues() {

        var lowerPercentage = (((vm.thumbLowerValue - vm.options.track.min) / (vm.options.track.max - vm.options.track.min)) * 100);
        var upperPercentage = (((vm.thumbUpperValue - vm.options.track.min) / (vm.options.track.max - vm.options.track.min)) * 100);

        // update thumb positions
        vm.thumbPositions = {
            lower: lowerPercentage + '%',
            upper: upperPercentage + '%'
        };

        vm.trackSizes = {
            lower: lowerPercentage,
            range: upperPercentage - lowerPercentage,
            higher: vm.options.type === 'value' ? 100 - lowerPercentage : 100 - upperPercentage
        };

        // update the model - use timeout to apply on next digest cycle
        $timeout(function() {
            vm.ngModel = vm.options.type === 'value' ? vm.thumbLowerValue : {
                low: vm.thumbLowerValue,
                high: vm.thumbUpperValue
            };
        });
    }

    function updateFromModel() {

        if (vm.options.type === 'value') {

            // get the current value from the model
            vm.thumbLowerValue = parseFloat(vm.ngModel);

            // ensure is a valid number
            if (isNaN(vm.thumbLowerValue)) {
                vm.thumbLowerValue = vm.options.track.min;
            }

            // ensure it is within the range
            if (vm.thumbLowerValue > vm.options.track.max) {
                vm.thumbLowerValue = vm.options.track.max;
            }

            if (vm.thumbLowerValue < vm.options.track.min) {
                vm.thumbLowerValue = vm.options.track.min;
            }

        } else {

            // ensure we have low and high properties
            if (vm.ngModel.low === undefined || vm.ngModel.high === undefined) {
                throw new Error('Slider - For range input model must have low and high properties');
            }

            // store the previous values
            var lowerPrevious = vm.thumbLowerValue;
            var upperPrevious = vm.thumbUpperValue;

            // get the current value from the model
            vm.thumbLowerValue = parseFloat(vm.ngModel.low);
            vm.thumbUpperValue = parseFloat(vm.ngModel.high);

            // determine if the position has changed
            var lowerChanged = vm.thumbLowerValue !== lowerPrevious;
            var upperChanged = vm.thumbUpperValue !== upperPrevious;

            // if either is not an number then set the range min/max
            if (isNaN(vm.thumbLowerValue)) {
                vm.thumbLowerValue = vm.options.track.min;
            }

            if (isNaN(vm.thumbUpperValue)) {
                vm.thumbUpperValue = vm.options.track.max;
            }

            // ensure lower thumb it is within the range
            if (vm.thumbLowerValue > vm.options.track.max) {
                vm.thumbLowerValue = vm.options.track.max;
            }

            if (vm.thumbLowerValue < vm.options.track.min) {
                vm.thumbLowerValue = vm.options.track.min;
            }

            // ensure upper thumb it is within the range
            if (vm.thumbUpperValue > vm.options.track.max) {
                vm.thumbUpperValue = vm.options.track.max;
            }

            if (vm.thumbUpperValue < vm.options.track.min) {
                vm.thumbUpperValue = vm.options.track.min;
            }


            // ensure lower thumb is not higher than upper or vice versa
            if (lowerChanged && vm.thumbLowerValue > vm.thumbUpperValue) {
                vm.thumbLowerValue = vm.thumbUpperValue;
            }

            if (upperChanged && vm.thumbUpperValue < vm.thumbLowerValue) {
                vm.thumbUpperValue = vm.thumbLowerValue;
            }

            // update the z-indexes
            if (upperChanged && lowerChanged) {

                // if lower thumb is at the max range then bring it to front
                if (vm.thumbLowerValue === vm.options.track.max) {
                    vm.bringToFront(false);
                }

                // if the upper thumb is at the lowest range then bring it to front
                if (vm.upperThumbValue === vm.options.track.min) {
                    vm.bringToFront(true);
                }
            } else if (upperChanged) {
                vm.bringToFront(true);
            } else if (lowerChanged) {
                vm.bringToFront(false);
            }

        }

        // after validation ensure model is up to date
        updateViewValues();
    }

    function updateTrackColors() {

        // get colors for each part of the track
        var lower = vm.options.track.colors.lower;
        var range = vm.options.track.colors.range;
        var higher = vm.options.track.colors.higher;

        // update the controller value
        vm.trackColors.lower = typeof lower === 'string' ? lower : 'linear-gradient(to right, ' + lower.join(', ') + ')';
        vm.trackColors.range = typeof range === 'string' ? range : 'linear-gradient(to right, ' + range.join(', ') + ')';
        vm.trackColors.higher = typeof higher === 'string' ? higher : 'linear-gradient(to right, ' + higher.join(', ') + ')';
    }

    function updateTicks() {

        // get major tick options
        var majorOptions = vm.options.track.ticks.major;

        // get major tick options
        var minorOptions = vm.options.track.ticks.minor;

        // check if we should show major ticks
        if (majorOptions.show === false && minorOptions.show === false) {
            vm.ticks = [];
        }

        // create ticks
        var majorTicks = createScaleTicks(majorOptions, 'major');

        var minorTicks = createScaleTicks(minorOptions, 'minor');

        // remove any minor ticks that are on a major interval
        vm.ticks = unionTicks(majorTicks, minorTicks);
    }

    function createScaleTicks(options, type) {

        // store the ticks
        var ticks = [];

        // get tick steps
        var steps = options.steps;

        if (angular.isArray(steps)) {

            // iterate each step
            for (var idx in steps) {

                // get step value
                var step = steps[idx];

                // calculate tick position - then convert to percentage
                var tickPosition = ((step - vm.options.track.min) / (vm.options.track.max - vm.options.track.min)) * 100;

                // if the tick is out ouf bounds then skip
                if (tickPosition < 0 || tickPosition > 100) {
                    continue;
                }

                // add tick to array
                ticks.push({
                    showTicks: options.show,
                    showLabels: options.labels,
                    type: type,
                    position: tickPosition,
                    value: step,
                    label: options.formatter(step)
                });
            }

        } else {

            // iterate each tick
            for (var tidx = vm.options.track.min; tidx <= vm.options.track.max; tidx += options.steps) {

                // calculate tick position - then convert to percentage
                var tickLocation = ((tidx - vm.options.track.min) / (vm.options.track.max - vm.options.track.min)) * 100;

                // if the tick is out ouf bounds then skip
                if (tickLocation < 0 || tickLocation > 100) {
                    continue;
                }

                // add tick to array
                ticks.push({
                    showTicks: options.show,
                    showLabels: options.labels,
                    type: type,
                    position: tickLocation,
                    value: tidx,
                    label: options.formatter(tidx)
                });
            }
        }


        return ticks;
    }

    function unionTicks(majorTicks, minorTicks) {

        // start of with all the major ticks as they take precendence
        var ticks = majorTicks.slice(0);

        // iterate each minor tick
        for (var idx = 0; idx < minorTicks.length; idx++) {

            // get current minor tick
            var minorTick = minorTicks[idx];

            // check if there is a major tick with the same value
            var match = false;

            for (var maj = 0; maj < majorTicks.length; maj++) {
                if (majorTicks[maj].position === minorTick.position) {
                    match = true;
                    break;
                }
            }

            // if there are no matches then add the tick to the output array
            if (match === false) {
                ticks.push(minorTick);
            }
        }

        return ticks.sort(function(tickOne, tickTwo) {
            if (tickOne.value < tickTwo.value) {
                return -1;
            }
            if (tickOne.value > tickTwo.value) {
                return 1;
            }
            return 0;
        });
    }

}