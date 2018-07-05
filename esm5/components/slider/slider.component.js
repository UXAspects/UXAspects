/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ColorService } from '../../services/color/index';
var SliderComponent = (function () {
    function SliderComponent(colorService, _changeDetectorRef) {
        this._changeDetectorRef = _changeDetectorRef;
        this.value = 0;
        this.valueChange = new EventEmitter();
        // expose enums to Angular view
        this.sliderType = SliderType;
        this.sliderStyle = SliderStyle;
        this.sliderSize = SliderSize;
        this.sliderSnap = SliderSnap;
        this.sliderThumb = SliderThumb;
        this.sliderTickType = SliderTickType;
        this.sliderThumbEvent = SliderThumbEvent;
        this.sliderCalloutTrigger = SliderCalloutTrigger;
        this.tracks = {
            lower: {
                size: 0,
                color: ''
            },
            middle: {
                size: 0,
                color: ''
            },
            upper: {
                size: 0,
                color: ''
            }
        };
        this.tooltips = {
            lower: {
                visible: false,
                position: 0,
                label: ''
            },
            upper: {
                visible: false,
                position: 0,
                label: ''
            }
        };
        this.thumbs = {
            lower: {
                hover: false,
                drag: false,
                position: 0,
                order: 100,
                value: /** @type {?} */ (null)
            },
            upper: {
                hover: false,
                drag: false,
                position: 0,
                order: 101,
                value: /** @type {?} */ (null)
            }
        };
        // store all the ticks to display
        this.ticks = [];
        // setup default options
        this.defaultOptions = {
            type: SliderType.Value,
            handles: {
                style: SliderStyle.Button,
                callout: {
                    trigger: SliderCalloutTrigger.None,
                    background: colorService.getColor('grey2').toHex(),
                    color: '#fff',
                    formatter: function (value) { return value; }
                },
                keyboard: {
                    major: 5,
                    minor: 1
                },
                aria: {
                    thumb: 'Slider value',
                    lowerThumb: 'Slider lower value',
                    upperThumb: 'Slider upper value'
                }
            },
            track: {
                height: SliderSize.Wide,
                min: 0,
                max: 100,
                ticks: {
                    snap: SliderSnap.None,
                    major: {
                        show: true,
                        steps: 10,
                        labels: true,
                        formatter: function (value) { return value; }
                    },
                    minor: {
                        show: true,
                        steps: 5,
                        labels: false,
                        formatter: function (value) { return value; }
                    }
                },
                colors: {
                    lower: colorService.getColor('grey6').toHex(),
                    range: colorService.getColor('accent').setAlpha(0.75).toRgba(),
                    higher: colorService.getColor('grey6').toHex()
                }
            }
        };
    }
    /**
     * @return {?}
     */
    SliderComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.updateOptions();
        this.updateValues();
        this.setThumbState(SliderThumb.Lower, false, false);
        this.setThumbState(SliderThumb.Upper, false, false);
        // emit the initial value
        this.valueChange.next(this.clone(this.value));
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        if (this.detectValueChange(this.value, this._value)) {
            this.updateValues();
            this._value = this.clone(this.value);
        }
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // persistent tooltips will need positioned correctly at this stage
        setTimeout(function () {
            _this.updateTooltipPosition(SliderThumb.Lower);
            _this.updateTooltipPosition(SliderThumb.Upper);
            // mark as dirty
            // mark as dirty
            _this._changeDetectorRef.markForCheck();
        });
    };
    /**
     * @param {?} thumb
     * @param {?} snapTarget
     * @param {?} forwards
     * @return {?}
     */
    SliderComponent.prototype.snapToNearestTick = /**
     * @param {?} thumb
     * @param {?} snapTarget
     * @param {?} forwards
     * @return {?}
     */
    function (thumb, snapTarget, forwards) {
        // get the value for the thumb
        var value = this.getThumbState(thumb).value;
        // get the closest ticks - remove any tick if we are currently on it
        var /** @type {?} */ closest = this.getTickDistances(value, thumb, snapTarget)
            .filter(function (tick) { return tick.value !== value; })
            .find(function (tick) { return forwards ? tick.value > value : tick.value < value; });
        // If we have no ticks then move by a predefined amount
        if (closest) {
            return this.setThumbValue(thumb, this.validateValue(thumb, closest.value));
        }
        var /** @type {?} */ step = snapTarget === SliderSnap.Major ? this.options.handles.keyboard.major : this.options.handles.keyboard.minor;
        this.setThumbValue(thumb, this.validateValue(thumb, value + (forwards ? step : -step)));
    };
    /**
     * @param {?} thumb
     * @param {?} forwards
     * @return {?}
     */
    SliderComponent.prototype.snapToEnd = /**
     * @param {?} thumb
     * @param {?} forwards
     * @return {?}
     */
    function (thumb, forwards) {
        this.setThumbValue(thumb, this.validateValue(thumb, forwards ? this.options.track.max : this.options.track.min));
    };
    /**
     * @param {?} thumb
     * @return {?}
     */
    SliderComponent.prototype.getThumbValue = /**
     * @param {?} thumb
     * @return {?}
     */
    function (thumb) {
        return this.getThumbState(thumb).value;
    };
    /**
     * @param {?} thumb
     * @return {?}
     */
    SliderComponent.prototype.getFormattedValue = /**
     * @param {?} thumb
     * @return {?}
     */
    function (thumb) {
        return this.options.handles.callout.formatter(this.getThumbState(thumb).value);
    };
    /**
     * @param {?} thumb
     * @return {?}
     */
    SliderComponent.prototype.getThumbState = /**
     * @param {?} thumb
     * @return {?}
     */
    function (thumb) {
        return thumb === SliderThumb.Lower ? this.thumbs.lower : this.thumbs.upper;
    };
    /**
     * @param {?} thumb
     * @param {?} hover
     * @param {?} drag
     * @return {?}
     */
    SliderComponent.prototype.setThumbState = /**
     * @param {?} thumb
     * @param {?} hover
     * @param {?} drag
     * @return {?}
     */
    function (thumb, hover, drag) {
        if (thumb === SliderThumb.Lower) {
            this.thumbs.lower.hover = hover;
            this.thumbs.lower.drag = drag;
        }
        else {
            this.thumbs.upper.hover = hover;
            this.thumbs.upper.drag = drag;
        }
        // update the visibility of the tooltips
        this.updateTooltips(thumb);
    };
    /**
     * @param {?} thumb
     * @param {?} event
     * @return {?}
     */
    SliderComponent.prototype.thumbEvent = /**
     * @param {?} thumb
     * @param {?} event
     * @return {?}
     */
    function (thumb, event) {
        // get the current thumb state
        var /** @type {?} */ state = this.getThumbState(thumb);
        // update based upon event
        switch (event) {
            case SliderThumbEvent.DragStart:
                state.drag = true;
                break;
            case SliderThumbEvent.DragEnd:
                state.drag = false;
                break;
            case SliderThumbEvent.MouseOver:
                state.hover = true;
                break;
            case SliderThumbEvent.MouseLeave:
                state.hover = false;
                break;
            case SliderThumbEvent.None:
                state.drag = false;
                state.hover = false;
                break;
        }
        // update the thumb state
        this.setThumbState(thumb, state.hover, state.drag);
    };
    /**
     * @param {?} thumb
     * @return {?}
     */
    SliderComponent.prototype.getAriaValueText = /**
     * @param {?} thumb
     * @return {?}
     */
    function (thumb) {
        // get the current thumb value
        var /** @type {?} */ value = this.getThumbValue(thumb);
        // get all the ticks
        var /** @type {?} */ tick = this.ticks.find(function (_tick) { return _tick.value === value; });
        if (tick && tick.label) {
            return tick.label;
        }
        // otherwise simply display the formatted value
        return this.getFormattedValue(thumb);
    };
    /**
     * @param {?} thumb
     * @return {?}
     */
    SliderComponent.prototype.updateTooltips = /**
     * @param {?} thumb
     * @return {?}
     */
    function (thumb) {
        var /** @type {?} */ visible = false;
        var /** @type {?} */ state = this.getThumbState(thumb);
        switch (this.options.handles.callout.trigger) {
            case SliderCalloutTrigger.Persistent:
                visible = true;
                break;
            case SliderCalloutTrigger.Drag:
                visible = state.drag;
                break;
            case SliderCalloutTrigger.Hover:
                visible = state.hover || state.drag;
                break;
            case SliderCalloutTrigger.Dynamic:
                visible = true;
                break;
        }
        // update the state for the corresponding thumb
        this.getTooltip(thumb).visible = visible;
        // update the tooltip text
        this.updateTooltipText(thumb);
        // update the tooltip positions
        this.updateTooltipPosition(thumb);
    };
    /**
     * @param {?} thumb
     * @return {?}
     */
    SliderComponent.prototype.updateTooltipText = /**
     * @param {?} thumb
     * @return {?}
     */
    function (thumb) {
        // get the thumb value
        var /** @type {?} */ state = this.getThumbState(thumb);
        var /** @type {?} */ tooltip = this.getTooltip(thumb);
        // store the formatted label
        tooltip.label = this.getFormattedValue(thumb).toString();
    };
    /**
     * @param {?} thumb
     * @return {?}
     */
    SliderComponent.prototype.getTooltipElement = /**
     * @param {?} thumb
     * @return {?}
     */
    function (thumb) {
        return thumb === SliderThumb.Lower ? this.lowerTooltip : this.upperTooltip;
    };
    /**
     * @param {?} thumb
     * @return {?}
     */
    SliderComponent.prototype.getTooltip = /**
     * @param {?} thumb
     * @return {?}
     */
    function (thumb) {
        return thumb === SliderThumb.Lower ? this.tooltips.lower : this.tooltips.upper;
    };
    /**
     * @param {?} thumb
     * @return {?}
     */
    SliderComponent.prototype.updateTooltipPosition = /**
     * @param {?} thumb
     * @return {?}
     */
    function (thumb) {
        var /** @type {?} */ tooltip = this.getTooltip(thumb);
        // if tooltip is not visible then stop here
        if (tooltip.visible === false) {
            return;
        }
        var /** @type {?} */ tooltipElement = this.getTooltipElement(thumb);
        // get the element widths
        var /** @type {?} */ thumbWidth;
        if (this.options.handles.style === SliderStyle.Button) {
            thumbWidth = this.options.track.height === SliderSize.Narrow ? 16 : 24;
        }
        else {
            thumbWidth = 2;
        }
        var /** @type {?} */ tooltipWidth = tooltipElement.nativeElement.offsetWidth;
        // calculate the tooltips new position
        var /** @type {?} */ tooltipPosition = Math.ceil((tooltipWidth - thumbWidth) / 2);
        // update tooltip position
        tooltip.position = -tooltipPosition;
        if (this.options.type === SliderType.Range && this.options.handles.callout.trigger === SliderCalloutTrigger.Dynamic) {
            this.preventTooltipOverlap(tooltip);
        }
    };
    /**
     * @param {?} tooltip
     * @return {?}
     */
    SliderComponent.prototype.preventTooltipOverlap = /**
     * @param {?} tooltip
     * @return {?}
     */
    function (tooltip) {
        var /** @type {?} */ trackWidth = this.track.nativeElement.offsetWidth;
        var /** @type {?} */ lower = (trackWidth / 100) * this.thumbs.lower.position;
        var /** @type {?} */ upper = (trackWidth / 100) * this.thumbs.upper.position;
        var /** @type {?} */ lowerWidth = this.lowerTooltip.nativeElement.offsetWidth / 2;
        var /** @type {?} */ upperWidth = this.upperTooltip.nativeElement.offsetWidth / 2;
        var /** @type {?} */ diff = (lower + lowerWidth) - (upper - upperWidth);
        // if the tooltips are closer than 16px then adjust so the dont move any close
        if (diff > 0) {
            if (tooltip === this.tooltips.lower && this.thumbs.lower.drag === false) {
                tooltip.position -= (diff / 2);
            }
            else if (tooltip === this.tooltips.upper && this.thumbs.upper.drag === false) {
                tooltip.position += (diff / 2);
            }
        }
    };
    /**
     * @param {?} value
     * @param {?} min
     * @param {?} max
     * @return {?}
     */
    SliderComponent.prototype.clamp = /**
     * @param {?} value
     * @param {?} min
     * @param {?} max
     * @return {?}
     */
    function (value, min, max) {
        return Math.min(Math.max(value, min), max);
    };
    /**
     * @param {?} event
     * @param {?} thumb
     * @return {?}
     */
    SliderComponent.prototype.updateThumbPosition = /**
     * @param {?} event
     * @param {?} thumb
     * @return {?}
     */
    function (event, thumb) {
        // get event position - either mouse or touch
        var /** @type {?} */ eventPosition = event instanceof MouseEvent ? event.clientX : event.touches && event.touches.length > 0 ? event.touches[0].clientX : null;
        // if event position is null do nothing
        if (eventPosition === null) {
            return;
        }
        // get mouse position
        var /** @type {?} */ mouseX = window.pageXOffset + eventPosition;
        // get track size and position
        var /** @type {?} */ trackBounds = this.track.nativeElement.getBoundingClientRect();
        // restrict the value within the range size
        var /** @type {?} */ position = this.clamp(mouseX - trackBounds.left, 0, trackBounds.width);
        // get fraction representation of location within the track
        var /** @type {?} */ fraction = (position / trackBounds.width);
        // convert to value within the range
        var /** @type {?} */ value = ((this.options.track.max - this.options.track.min) * fraction) + this.options.track.min;
        // ensure value is valid
        value = this.validateValue(thumb, value);
        // snap to a tick if required
        value = this.snapToTick(value, thumb);
        // update the value accordingly
        this.setThumbValue(thumb, value);
        this.updateOrder(thumb);
        this.updateValues();
        // update tooltip text & position
        this.updateTooltipText(thumb);
        // update the position of all visible tooltips
        this.updateTooltipPosition(SliderThumb.Lower);
        this.updateTooltipPosition(SliderThumb.Upper);
        // mark as dirty for change detection
        this._changeDetectorRef.markForCheck();
    };
    /**
     * @param {?} thumb
     * @return {?}
     */
    SliderComponent.prototype.updateOrder = /**
     * @param {?} thumb
     * @return {?}
     */
    function (thumb) {
        var /** @type {?} */ lower = thumb === SliderThumb.Lower ? 101 : 100;
        var /** @type {?} */ upper = thumb === SliderThumb.Lower ? 100 : 101;
        // The most recently used thumb should be above
        this.thumbs.lower.order = lower;
        this.thumbs.upper.order = upper;
    };
    /**
     * @param {?} value
     * @param {?} thumb
     * @param {?} snapTarget
     * @return {?}
     */
    SliderComponent.prototype.getTickDistances = /**
     * @param {?} value
     * @param {?} thumb
     * @param {?} snapTarget
     * @return {?}
     */
    function (value, thumb, snapTarget) {
        // if snap target is none then return original value
        if (snapTarget === SliderSnap.None) {
            return [];
        }
        // get filtered ticks
        var /** @type {?} */ ticks;
        switch (snapTarget) {
            case SliderSnap.Minor:
                ticks = this.ticks.filter(function (tick) { return tick.type === SliderTickType.Minor; });
                break;
            case SliderSnap.Major:
                ticks = this.ticks.filter(function (tick) { return tick.type === SliderTickType.Major; });
                break;
            default:
                ticks = this.ticks.slice(0);
        }
        // get the track limit
        var /** @type {?} */ lowerLimit = this.options.track.min;
        var /** @type {?} */ upperLimit = this.options.track.max;
        if (this.options.type === SliderType.Range && thumb === SliderThumb.Lower) {
            upperLimit = this.thumbs.upper.value;
        }
        if (this.options.type === SliderType.Range && thumb === SliderThumb.Upper) {
            lowerLimit = this.thumbs.lower.value;
        }
        // Find the closest tick to the current position
        var /** @type {?} */ range = ticks.filter(function (tick) { return tick.value >= lowerLimit && tick.value <= upperLimit; });
        // If there are no close ticks in the valid range then dont snap
        if (range.length === 0) {
            return [];
        }
        return range.sort(function (tickOne, tickTwo) {
            var /** @type {?} */ tickOneDelta = Math.max(tickOne.value, value) - Math.min(tickOne.value, value);
            var /** @type {?} */ tickTwoDelta = Math.max(tickTwo.value, value) - Math.min(tickTwo.value, value);
            return tickOneDelta - tickTwoDelta;
        });
    };
    /**
     * @param {?} value
     * @param {?} thumb
     * @return {?}
     */
    SliderComponent.prototype.snapToTick = /**
     * @param {?} value
     * @param {?} thumb
     * @return {?}
     */
    function (value, thumb) {
        var /** @type {?} */ tickDistances = this.getTickDistances(value, thumb, this.options.track.ticks.snap);
        // if there are no ticks return the current value
        if (tickDistances.length === 0) {
            return value;
        }
        // get the closest tick
        return tickDistances[0].value;
    };
    /**
     * @param {?} thumb
     * @param {?} value
     * @return {?}
     */
    SliderComponent.prototype.validateValue = /**
     * @param {?} thumb
     * @param {?} value
     * @return {?}
     */
    function (thumb, value) {
        // if slider is not a range value is always valid providing it is within the chart min and max values
        if (this.options.type === SliderType.Value) {
            return Math.max(Math.min(value, this.options.track.max), this.options.track.min);
        }
        // check if value is with chart ranges
        if (value > this.options.track.max) {
            return thumb === SliderThumb.Lower ? Math.min(this.options.track.max, this.thumbs.upper.value) : this.options.track.max;
        }
        if (value < this.options.track.min) {
            return thumb === SliderThumb.Upper ? Math.max(this.options.track.min, this.thumbs.lower.value) : this.options.track.min;
        }
        // otherwise we need to check to make sure lower thumb cannot go above higher and vice versa
        if (thumb === SliderThumb.Lower) {
            if (this.thumbs.upper.value === null) {
                return value;
            }
            return value <= this.thumbs.upper.value ? value : this.thumbs.upper.value;
        }
        if (thumb === SliderThumb.Upper) {
            if (this.thumbs.lower.value === null) {
                return value;
            }
            return value >= this.thumbs.lower.value ? value : this.thumbs.lower.value;
        }
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.updateOptions = /**
     * @return {?}
     */
    function () {
        // add in the default options that user hasn't specified
        this.options = this.deepMerge(this.options || {}, this.defaultOptions);
        this.updateTrackColors();
        this.updateTicks();
        this.updateValues();
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.updateValues = /**
     * @return {?}
     */
    function () {
        if (this.value === undefined || this.value === null) {
            this.value = 0;
        }
        var /** @type {?} */ lowerValue = typeof this.value === 'number' ? this.value : this.value.low;
        var /** @type {?} */ upperValue = typeof this.value === 'number' ? this.value : this.value.high;
        // validate values
        lowerValue = this.validateValue(SliderThumb.Lower, Number(lowerValue.toFixed(4)));
        upperValue = this.validateValue(SliderThumb.Upper, Number(upperValue.toFixed(4)));
        // calculate the positions as percentages
        var /** @type {?} */ lowerPosition = (((lowerValue - this.options.track.min) / (this.options.track.max - this.options.track.min)) * 100);
        var /** @type {?} */ upperPosition = (((upperValue - this.options.track.min) / (this.options.track.max - this.options.track.min)) * 100);
        // update thumb positions
        this.thumbs.lower.position = lowerPosition;
        this.thumbs.upper.position = upperPosition;
        // calculate the track sizes
        this.tracks.lower.size = lowerPosition;
        this.tracks.middle.size = upperPosition - lowerPosition;
        this.tracks.upper.size = this.options.type === SliderType.Value ? 100 - lowerPosition : 100 - upperPosition;
        // update the value input
        this.setValue(lowerValue, upperValue);
    };
    /**
     * @param {?} low
     * @param {?=} high
     * @return {?}
     */
    SliderComponent.prototype.setValue = /**
     * @param {?} low
     * @param {?=} high
     * @return {?}
     */
    function (low, high) {
        this.thumbs.lower.value = low;
        this.thumbs.upper.value = high;
        var /** @type {?} */ previousValue = this.clone(this._value);
        this.value = this.options.type === SliderType.Value ? low : { low: low, high: high };
        // call the event emitter if changes occured
        if (this.detectValueChange(this.value, previousValue)) {
            this.valueChange.emit(this.clone(this.value));
            this.updateTooltipText(SliderThumb.Lower);
            this.updateTooltipText(SliderThumb.Upper);
        }
        else {
            this.valueChange.emit(this.clone(this.value));
        }
    };
    /**
     * @param {?} thumb
     * @param {?} value
     * @return {?}
     */
    SliderComponent.prototype.setThumbValue = /**
     * @param {?} thumb
     * @param {?} value
     * @return {?}
     */
    function (thumb, value) {
        // update the thumb value
        this.getThumbState(thumb).value = value;
        // forward these changes to the value
        this.setValue(this.thumbs.lower.value, this.thumbs.upper.value);
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.updateTicks = /**
     * @return {?}
     */
    function () {
        // get tick options
        var /** @type {?} */ majorOptions = this.options.track.ticks.major;
        var /** @type {?} */ minorOptions = this.options.track.ticks.minor;
        // check if we should show ticks
        if (majorOptions.show === false && minorOptions.show === false) {
            this.ticks = [];
        }
        // create ticks for both major and minor - only get the ones to be shown
        var /** @type {?} */ majorTicks = this.getTicks(majorOptions, SliderTickType.Major).filter(function (tick) { return tick.showTicks; });
        var /** @type {?} */ minorTicks = this.getTicks(minorOptions, SliderTickType.Minor).filter(function (tick) { return tick.showTicks; });
        // remove any minor ticks that are on a major interval
        this.ticks = this.unionTicks(majorTicks, minorTicks);
    };
    /**
     * @return {?}
     */
    SliderComponent.prototype.updateTrackColors = /**
     * @return {?}
     */
    function () {
        // get colors for each part of the track
        var _a = this.options.track.colors, lower = _a.lower, range = _a.range, higher = _a.higher;
        // update the controller value
        this.tracks.lower.color = typeof lower === 'string' ? lower : "linear-gradient(to right, " + lower.join(', ') + ")";
        this.tracks.middle.color = typeof range === 'string' ? range : "linear-gradient(to right, " + range.join(', ') + ")";
        this.tracks.upper.color = typeof higher === 'string' ? higher : "linear-gradient(to right, " + higher.join(', ') + ")";
    };
    /**
     * @param {?} steps
     * @return {?}
     */
    SliderComponent.prototype.getSteps = /**
     * @param {?} steps
     * @return {?}
     */
    function (steps) {
        // if they are already an array just return it
        if (steps instanceof Array) {
            return steps;
        }
        var /** @type {?} */ output = [];
        // otherwise calculate the steps
        for (var /** @type {?} */ idx = this.options.track.min; idx <= this.options.track.max; idx += steps) {
            output.push(idx);
        }
        return output;
    };
    /**
     * @param {?} options
     * @param {?} type
     * @return {?}
     */
    SliderComponent.prototype.getTicks = /**
     * @param {?} options
     * @param {?} type
     * @return {?}
     */
    function (options, type) {
        // create an array to store the ticks and step points
        var /** @type {?} */ steps = this.getSteps(options.steps);
        // get some chart options
        var /** @type {?} */ min = this.options.track.min;
        var /** @type {?} */ max = this.options.track.max;
        // convert each step to a slider tick and remove invalid ticks
        return steps.map(function (step) {
            return {
                showTicks: options.show,
                showLabels: options.labels,
                type: type,
                position: ((step - min) / (max - min)) * 100,
                value: step,
                label: options.formatter(step)
            };
        }).filter(function (tick) { return tick.position >= 0 && tick.position <= 100; });
    };
    /**
     * @param {?} majorTicks
     * @param {?} minorTicks
     * @return {?}
     */
    SliderComponent.prototype.unionTicks = /**
     * @param {?} majorTicks
     * @param {?} minorTicks
     * @return {?}
     */
    function (majorTicks, minorTicks) {
        // get all ticks combined removing any minor ticks with the same value as major ticks
        return majorTicks.concat(minorTicks)
            .filter(function (tick, index, array) { return tick.type === SliderTickType.Major || !array.find(function (tk) { return tk.type === SliderTickType.Major && tk.position === tick.position; }); })
            .sort(function (t1, t2) { return t1.value - t2.value; });
    };
    /**
     * @template T
     * @param {?} destination
     * @param {?} source
     * @return {?}
     */
    SliderComponent.prototype.deepMerge = /**
     * @template T
     * @param {?} destination
     * @param {?} source
     * @return {?}
     */
    function (destination, source) {
        // loop though all of the properties in the source object
        for (var /** @type {?} */ prop in source) {
            // check if the destination object has the property
            if (!destination.hasOwnProperty(prop)) {
                // copy the property across
                destination[prop] = source[prop];
                continue;
            }
            // if the property exists and is not an object then skip
            if (typeof destination[prop] !== 'object') {
                continue;
            }
            // check if property is an array
            if (destination[prop] instanceof Array) {
                continue;
            }
            // if it is an object then perform a recursive check
            destination[prop] = this.deepMerge(destination[prop], source[prop]);
        }
        return destination;
    };
    /**
     * @param {?} value1
     * @param {?} value2
     * @return {?}
     */
    SliderComponent.prototype.detectValueChange = /**
     * @param {?} value1
     * @param {?} value2
     * @return {?}
     */
    function (value1, value2) {
        // compare two slider values
        if (this.isSliderValue(value1) && this.isSliderValue(value2)) {
            // references to the objects in the correct types
            var /** @type {?} */ obj1 = /** @type {?} */ (value1);
            var /** @type {?} */ obj2 = /** @type {?} */ (value2);
            return obj1.low !== obj2.low || obj1.high !== obj2.high;
        }
        // if not a slider value - should be number of nullable type - compare normally
        return value1 !== value2;
    };
    /**
     * Determines whether or not an object conforms to the
     * SliderValue interface.
     * @param {?} value - The object to check - this must be type any
     * @return {?}
     */
    SliderComponent.prototype.isSliderValue = /**
     * Determines whether or not an object conforms to the
     * SliderValue interface.
     * @param {?} value - The object to check - this must be type any
     * @return {?}
     */
    function (value) {
        // check if is an object
        if (typeof value !== 'object') {
            return false;
        }
        // next check if it contains the necessary properties
        return 'low' in value && 'high' in value;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    SliderComponent.prototype.clone = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        // if it is not an object simply return the value
        if (typeof value !== 'object') {
            return value;
        }
        // create a new object from the existing one
        var /** @type {?} */ instance = tslib_1.__assign({}, value);
        // delete remove the value from the old object
        value = undefined;
        // return the new instance of the object
        return instance;
    };
    SliderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-slider',
                    template: "<div class=\"track\" #track [class.narrow]=\"options.track.height === sliderSize.Narrow\" [class.wide]=\"options.track.height === sliderSize.Wide\" [class.range]=\"options.type === sliderType.Range\">\n\n    <!-- Section Beneath Lower Thumb -->\n    <div class=\"track-section track-lower\" [style.flex-grow]=\"tracks.lower.size\" [style.background]=\"tracks.lower.color\"></div>\n\n    <!-- Lower Thumb Button / Line -->\n    <div class=\"thumb lower\"\n        uxDrag\n        role=\"slider\"\n        tabindex=\"0\"\n        #lowerthumb\n        [attr.aria-label]=\"options.type === sliderType.Range ? options.handles.aria.lowerThumb : options.handles.aria.thumb\"\n        [attr.aria-valuemin]=\"options?.track?.min\"\n        [attr.aria-valuemax]=\"options.type === sliderType.Range ? getThumbValue(sliderThumb.Upper) : options?.track?.max\"\n        [attr.aria-valuenow]=\"getThumbValue(sliderThumb.Lower)\"\n        [attr.aria-valuetext]=\"getAriaValueText(sliderThumb.Lower)\"\n        [style.left.%]=\"thumbs.lower.position\"\n        [class.active]=\"thumbs.lower.drag\"\n        [style.z-index]=\"thumbs.lower.order\"\n        [class.button]=\"options.handles.style === sliderStyle.Button\"\n        [class.line]=\"options.handles.style === sliderStyle.Line\"\n        [class.narrow]=\"options.track.height === sliderSize.Narrow\"\n        [class.wide]=\"options.track.height === sliderSize.Wide\"\n        (dragstart)=\"thumbEvent(sliderThumb.Lower, sliderThumbEvent.DragStart); lowerthumb.focus()\"\n        (drag)=\"updateThumbPosition($event, sliderThumb.Lower)\"\n        (dragend)=\"thumbEvent(sliderThumb.Lower, sliderThumbEvent.DragEnd)\"\n        (mouseenter)=\"thumbEvent(sliderThumb.Lower, sliderThumbEvent.MouseOver)\"\n        (mouseleave)=\"thumbEvent(sliderThumb.Lower, sliderThumbEvent.MouseLeave)\"\n        (focus)=\"thumbEvent(sliderThumb.Lower, sliderThumbEvent.MouseOver)\"\n        (blur)=\"thumbEvent(sliderThumb.Lower, sliderThumbEvent.MouseLeave)\"\n        (keydown.ArrowLeft)=\"snapToNearestTick(sliderThumb.Lower, sliderSnap.All, false); $event.preventDefault()\"\n        (keydown.ArrowRight)=\"snapToNearestTick(sliderThumb.Lower, sliderSnap.All, true); $event.preventDefault()\"\n        (keydown.ArrowUp)=\"snapToNearestTick(sliderThumb.Lower, sliderSnap.All, false); $event.preventDefault()\"\n        (keydown.ArrowDown)=\"snapToNearestTick(sliderThumb.Lower, sliderSnap.All, true); $event.preventDefault()\"\n        (keydown.PageDown)=\"snapToNearestTick(sliderThumb.Lower, sliderSnap.Major, false); $event.preventDefault()\"\n        (keydown.PageUp)=\"snapToNearestTick(sliderThumb.Lower, sliderSnap.Major, true); $event.preventDefault()\"\n        (keydown.Home)=\"snapToEnd(sliderThumb.Lower, false); $event.preventDefault()\"\n        (keydown.End)=\"snapToEnd(sliderThumb.Lower, true); $event.preventDefault()\">\n\n        <!-- Lower Thumb Callout -->\n        <div class=\"tooltip top tooltip-lower\" #lowerTooltip\n            [class.tooltip-dynamic]=\"options.handles.callout.trigger === sliderCalloutTrigger.Dynamic && thumbs.lower.drag === false\"\n            [style.opacity]=\"tooltips.lower.visible ? 1 : 0\"\n            [style.left.px]=\"tooltips.lower.position\">\n\n            <div class=\"tooltip-arrow\" [style.border-top-color]=\"options.handles.callout.background\"></div>\n\n            <div class=\"tooltip-inner\"\n                [style.background-color]=\"options.handles.callout.background\"\n                [style.color]=\"options.handles.callout.color\">\n                {{ tooltips.lower.label }}\n            </div>\n        </div>\n\n    </div>\n\n    <!-- Section of Track Between Lower and Upper Thumbs -->\n    <div class=\"track-section track-range\" *ngIf=\"options.type === sliderType.Range\" [style.flex-grow]=\"tracks.middle.size\" [style.background]=\"tracks.middle.color\">\n    </div>\n\n    <!-- Upper Thumb Button / Line -->\n    <div class=\"thumb upper\"\n        uxDrag\n        role=\"slider\"\n        tabindex=\"0\"\n        #upperthumb\n        [attr.aria-label]=\"options.handles.aria.upperThumb\"\n        [attr.aria-valuemin]=\"getThumbValue(sliderThumb.Lower) || options?.track?.min\"\n        [attr.aria-valuemax]=\"options?.track?.max\"\n        [attr.aria-valuenow]=\"getThumbValue(sliderThumb.Upper)\"\n        [attr.aria-valuetext]=\"getAriaValueText(sliderThumb.Upper)\"\n        [hidden]=\"options.type !== sliderType.Range\"\n        [class.active]=\"thumbs.upper.drag\"\n        [style.left.%]=\"thumbs.upper.position\"\n        [style.z-index]=\"thumbs.upper.order\"\n        [class.button]=\"options.handles.style === sliderStyle.Button\"\n        [class.line]=\"options.handles.style === sliderStyle.Line\"\n        [class.narrow]=\"options.track.height === sliderSize.Narrow\"\n        [class.wide]=\"options.track.height === sliderSize.Wide\"\n        (dragstart)=\"thumbEvent(sliderThumb.Upper, sliderThumbEvent.DragStart); upperthumb.focus()\"\n        (drag)=\"updateThumbPosition($event, sliderThumb.Upper)\"\n        (dragend)=\"thumbEvent(sliderThumb.Upper, sliderThumbEvent.DragEnd)\"\n        (mouseenter)=\"thumbEvent(sliderThumb.Upper, sliderThumbEvent.MouseOver)\"\n        (mouseleave)=\"thumbEvent(sliderThumb.Upper, sliderThumbEvent.MouseLeave)\"\n        (focus)=\"thumbEvent(sliderThumb.Upper, sliderThumbEvent.MouseOver)\"\n        (blur)=\"thumbEvent(sliderThumb.Upper, sliderThumbEvent.MouseLeave)\"\n        (keydown.ArrowLeft)=\"snapToNearestTick(sliderThumb.Upper, sliderSnap.All, false); $event.preventDefault()\"\n        (keydown.ArrowRight)=\"snapToNearestTick(sliderThumb.Upper, sliderSnap.All, true); $event.preventDefault()\"\n        (keydown.ArrowUp)=\"snapToNearestTick(sliderThumb.Upper, sliderSnap.All, false); $event.preventDefault()\"\n        (keydown.ArrowDown)=\"snapToNearestTick(sliderThumb.Upper, sliderSnap.All, true); $event.preventDefault()\"\n        (keydown.PageDown)=\"snapToNearestTick(sliderThumb.Upper, sliderSnap.Major, false); $event.preventDefault()\"\n        (keydown.PageUp)=\"snapToNearestTick(sliderThumb.Upper, sliderSnap.Major, true); $event.preventDefault()\"\n        (keydown.Home)=\"snapToEnd(sliderThumb.Upper, false); $event.preventDefault()\"\n        (keydown.End)=\"snapToEnd(sliderThumb.Upper, true); $event.preventDefault()\">\n\n        <!-- Upper Thumb Callout -->\n        <div class=\"tooltip top tooltip-upper\" #upperTooltip\n            [class.tooltip-dynamic]=\"options.handles.callout.trigger === sliderCalloutTrigger.Dynamic && thumbs.upper.drag === false\"\n            [style.opacity]=\"tooltips.upper.visible ? 1 : 0\"\n            [style.left.px]=\"tooltips.upper.position\">\n\n            <div class=\"tooltip-arrow\" [style.border-top-color]=\"options.handles.callout.background\"></div>\n\n            <div class=\"tooltip-inner\"\n                *ngIf=\"options.type === sliderType.Range\"\n                [style.background-color]=\"options.handles.callout.background\"\n                [style.color]=\"options.handles.callout.color\">\n                {{ tooltips.upper.label }}\n            </div>\n        </div>\n    </div>\n\n    <!-- Section of Track Abover Upper Thumb -->\n    <div class=\"track-section track-higher\" [style.flex-grow]=\"tracks.upper.size\" [style.background]=\"tracks.upper.color\"></div>\n\n</div>\n\n<!-- Chart Ticks and Tick Labels -->\n<div class=\"tick-container\"\n    role=\"presentation\"\n    *ngIf=\"(options.track.ticks.major.show || options.track.ticks.minor.show) && options.handles.callout.trigger !== sliderCalloutTrigger.Dynamic\"\n    [class.show-labels]=\"options.track.ticks.major.labels || options.track.ticks.minor.labels\">\n\n    <div class=\"tick\"\n        *ngFor=\"let tick of ticks\"\n        [class.major]=\"tick.type === sliderTickType.Major\"\n        [class.minor]=\"tick.type === sliderTickType.Minor\"\n        [style.left.%]=\"tick.position\"\n        [hidden]=\"!tick.showTicks\">\n\n        <div class=\"tick-indicator\"></div>\n        <div class=\"tick-label\" aria-hidden=\"true\" [hidden]=\"!tick.showLabels\">{{ tick.label }}</div>\n    </div>\n</div>",
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    SliderComponent.ctorParameters = function () { return [
        { type: ColorService, },
        { type: ChangeDetectorRef, },
    ]; };
    SliderComponent.propDecorators = {
        "value": [{ type: Input },],
        "options": [{ type: Input },],
        "valueChange": [{ type: Output },],
        "lowerTooltip": [{ type: ViewChild, args: ['lowerTooltip',] },],
        "upperTooltip": [{ type: ViewChild, args: ['upperTooltip',] },],
        "track": [{ type: ViewChild, args: ['track',] },],
    };
    return SliderComponent;
}());
export { SliderComponent };
function SliderComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    SliderComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    SliderComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    SliderComponent.propDecorators;
    /** @type {?} */
    SliderComponent.prototype.value;
    /** @type {?} */
    SliderComponent.prototype.options;
    /** @type {?} */
    SliderComponent.prototype.valueChange;
    /** @type {?} */
    SliderComponent.prototype.lowerTooltip;
    /** @type {?} */
    SliderComponent.prototype.upperTooltip;
    /** @type {?} */
    SliderComponent.prototype.track;
    /** @type {?} */
    SliderComponent.prototype._value;
    /** @type {?} */
    SliderComponent.prototype.sliderType;
    /** @type {?} */
    SliderComponent.prototype.sliderStyle;
    /** @type {?} */
    SliderComponent.prototype.sliderSize;
    /** @type {?} */
    SliderComponent.prototype.sliderSnap;
    /** @type {?} */
    SliderComponent.prototype.sliderThumb;
    /** @type {?} */
    SliderComponent.prototype.sliderTickType;
    /** @type {?} */
    SliderComponent.prototype.sliderThumbEvent;
    /** @type {?} */
    SliderComponent.prototype.sliderCalloutTrigger;
    /** @type {?} */
    SliderComponent.prototype.tracks;
    /** @type {?} */
    SliderComponent.prototype.tooltips;
    /** @type {?} */
    SliderComponent.prototype.thumbs;
    /** @type {?} */
    SliderComponent.prototype.ticks;
    /** @type {?} */
    SliderComponent.prototype.defaultOptions;
    /** @type {?} */
    SliderComponent.prototype._changeDetectorRef;
}
/** @enum {number} */
var SliderType = {
    Value: 0,
    Range: 1,
};
export { SliderType };
SliderType[SliderType.Value] = "Value";
SliderType[SliderType.Range] = "Range";
/** @enum {number} */
var SliderStyle = {
    Button: 0,
    Line: 1,
};
export { SliderStyle };
SliderStyle[SliderStyle.Button] = "Button";
SliderStyle[SliderStyle.Line] = "Line";
/** @enum {number} */
var SliderSize = {
    Narrow: 0,
    Wide: 1,
};
export { SliderSize };
SliderSize[SliderSize.Narrow] = "Narrow";
SliderSize[SliderSize.Wide] = "Wide";
/** @enum {number} */
var SliderCalloutTrigger = {
    None: 0,
    Hover: 1,
    Drag: 2,
    Persistent: 3,
    Dynamic: 4,
};
export { SliderCalloutTrigger };
SliderCalloutTrigger[SliderCalloutTrigger.None] = "None";
SliderCalloutTrigger[SliderCalloutTrigger.Hover] = "Hover";
SliderCalloutTrigger[SliderCalloutTrigger.Drag] = "Drag";
SliderCalloutTrigger[SliderCalloutTrigger.Persistent] = "Persistent";
SliderCalloutTrigger[SliderCalloutTrigger.Dynamic] = "Dynamic";
/**
 * @record
 */
export function SliderValue() { }
function SliderValue_tsickle_Closure_declarations() {
    /** @type {?} */
    SliderValue.prototype.low;
    /** @type {?} */
    SliderValue.prototype.high;
}
/** @enum {number} */
var SliderSnap = {
    None: 0,
    Minor: 1,
    Major: 2,
    All: 3,
};
export { SliderSnap };
SliderSnap[SliderSnap.None] = "None";
SliderSnap[SliderSnap.Minor] = "Minor";
SliderSnap[SliderSnap.Major] = "Major";
SliderSnap[SliderSnap.All] = "All";
/** @enum {number} */
var SliderTickType = {
    Minor: 0,
    Major: 1,
};
export { SliderTickType };
SliderTickType[SliderTickType.Minor] = "Minor";
SliderTickType[SliderTickType.Major] = "Major";
/**
 * @record
 */
export function SliderOptions() { }
function SliderOptions_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    SliderOptions.prototype.type;
    /** @type {?|undefined} */
    SliderOptions.prototype.handles;
    /** @type {?|undefined} */
    SliderOptions.prototype.track;
}
/**
 * @record
 */
export function SliderHandleOptions() { }
function SliderHandleOptions_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    SliderHandleOptions.prototype.style;
    /** @type {?|undefined} */
    SliderHandleOptions.prototype.callout;
    /** @type {?|undefined} */
    SliderHandleOptions.prototype.keyboard;
    /** @type {?|undefined} */
    SliderHandleOptions.prototype.aria;
}
/**
 * @record
 */
export function SliderAriaOptions() { }
function SliderAriaOptions_tsickle_Closure_declarations() {
    /** @type {?} */
    SliderAriaOptions.prototype.thumb;
    /** @type {?} */
    SliderAriaOptions.prototype.lowerThumb;
    /** @type {?} */
    SliderAriaOptions.prototype.upperThumb;
}
/**
 * @record
 */
export function SliderKeyboardOptions() { }
function SliderKeyboardOptions_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    SliderKeyboardOptions.prototype.major;
    /** @type {?|undefined} */
    SliderKeyboardOptions.prototype.minor;
}
/**
 * @record
 */
export function SliderTrackOptions() { }
function SliderTrackOptions_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    SliderTrackOptions.prototype.height;
    /** @type {?|undefined} */
    SliderTrackOptions.prototype.min;
    /** @type {?|undefined} */
    SliderTrackOptions.prototype.max;
    /** @type {?|undefined} */
    SliderTrackOptions.prototype.ticks;
    /** @type {?|undefined} */
    SliderTrackOptions.prototype.colors;
}
/**
 * @record
 */
export function SliderTicksOptions() { }
function SliderTicksOptions_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    SliderTicksOptions.prototype.snap;
    /** @type {?|undefined} */
    SliderTicksOptions.prototype.major;
    /** @type {?|undefined} */
    SliderTicksOptions.prototype.minor;
}
/**
 * @record
 */
export function SliderTickOptions() { }
function SliderTickOptions_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    SliderTickOptions.prototype.show;
    /** @type {?|undefined} */
    SliderTickOptions.prototype.steps;
    /** @type {?|undefined} */
    SliderTickOptions.prototype.labels;
    /** @type {?|undefined} */
    SliderTickOptions.prototype.formatter;
}
/**
 * @record
 */
export function SliderTick() { }
function SliderTick_tsickle_Closure_declarations() {
    /** @type {?} */
    SliderTick.prototype.showTicks;
    /** @type {?} */
    SliderTick.prototype.showLabels;
    /** @type {?} */
    SliderTick.prototype.type;
    /** @type {?} */
    SliderTick.prototype.position;
    /** @type {?} */
    SliderTick.prototype.value;
    /** @type {?} */
    SliderTick.prototype.label;
}
/**
 * @record
 */
export function SliderTrackColors() { }
function SliderTrackColors_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    SliderTrackColors.prototype.lower;
    /** @type {?|undefined} */
    SliderTrackColors.prototype.range;
    /** @type {?|undefined} */
    SliderTrackColors.prototype.higher;
}
/**
 * @record
 */
export function SliderCallout() { }
function SliderCallout_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    SliderCallout.prototype.trigger;
    /** @type {?|undefined} */
    SliderCallout.prototype.background;
    /** @type {?|undefined} */
    SliderCallout.prototype.color;
    /** @type {?|undefined} */
    SliderCallout.prototype.formatter;
}
/** @enum {number} */
var SliderThumbEvent = {
    None: 0,
    MouseOver: 1,
    MouseLeave: 2,
    DragStart: 3,
    DragEnd: 4,
};
export { SliderThumbEvent };
SliderThumbEvent[SliderThumbEvent.None] = "None";
SliderThumbEvent[SliderThumbEvent.MouseOver] = "MouseOver";
SliderThumbEvent[SliderThumbEvent.MouseLeave] = "MouseLeave";
SliderThumbEvent[SliderThumbEvent.DragStart] = "DragStart";
SliderThumbEvent[SliderThumbEvent.DragEnd] = "DragEnd";
/** @enum {number} */
var SliderThumb = {
    Lower: 0,
    Upper: 1,
};
export { SliderThumb };
SliderThumb[SliderThumb.Lower] = "Lower";
SliderThumb[SliderThumb.Upper] = "Upper";

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3NsaWRlci9zbGlkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFpQix1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQVcsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxSyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7O0lBb050RCx5QkFBWSxZQUEwQixFQUFVLGtCQUFxQztRQUFyQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO3FCQXRFOUMsQ0FBQzsyQkFFb0IsSUFBSSxZQUFZLEVBQXdCOzswQkFVdkYsVUFBVTsyQkFDVCxXQUFXOzBCQUNaLFVBQVU7MEJBQ1YsVUFBVTsyQkFDVCxXQUFXOzhCQUNSLGNBQWM7Z0NBQ1osZ0JBQWdCO29DQUNaLG9CQUFvQjtzQkFFbEM7WUFDTCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLENBQUM7Z0JBQ1AsS0FBSyxFQUFFLEVBQUU7YUFDWjtZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsQ0FBQztnQkFDUCxLQUFLLEVBQUUsRUFBRTthQUNaO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxDQUFDO2dCQUNQLEtBQUssRUFBRSxFQUFFO2FBQ1o7U0FDSjt3QkFFVTtZQUNQLEtBQUssRUFBRTtnQkFDSCxPQUFPLEVBQUUsS0FBSztnQkFDZCxRQUFRLEVBQUUsQ0FBQztnQkFDWCxLQUFLLEVBQUUsRUFBRTthQUNaO1lBQ0QsS0FBSyxFQUFFO2dCQUNILE9BQU8sRUFBRSxLQUFLO2dCQUNkLFFBQVEsRUFBRSxDQUFDO2dCQUNYLEtBQUssRUFBRSxFQUFFO2FBQ1o7U0FDSjtzQkFFUTtZ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aUI7OzswQkErSTdELEtBQUs7NEJBQ0wsS0FBSztnQ0FDTCxNQUFNO2lDQUVOLFNBQVMsU0FBQyxjQUFjO2lDQUN4QixTQUFTLFNBQUMsY0FBYzswQkFDeEIsU0FBUyxTQUFDLE9BQU87OzBCQXJKdEI7O1NBNklhLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRG9DaGVjaywgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29sb3JTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY29sb3IvaW5kZXgnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LXNsaWRlcicsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwidHJhY2tcIiAjdHJhY2sgW2NsYXNzLm5hcnJvd109XCJvcHRpb25zLnRyYWNrLmhlaWdodCA9PT0gc2xpZGVyU2l6ZS5OYXJyb3dcIiBbY2xhc3Mud2lkZV09XCJvcHRpb25zLnRyYWNrLmhlaWdodCA9PT0gc2xpZGVyU2l6ZS5XaWRlXCIgW2NsYXNzLnJhbmdlXT1cIm9wdGlvbnMudHlwZSA9PT0gc2xpZGVyVHlwZS5SYW5nZVwiPlxuXG4gICAgPCEtLSBTZWN0aW9uIEJlbmVhdGggTG93ZXIgVGh1bWIgLS0+XG4gICAgPGRpdiBjbGFzcz1cInRyYWNrLXNlY3Rpb24gdHJhY2stbG93ZXJcIiBbc3R5bGUuZmxleC1ncm93XT1cInRyYWNrcy5sb3dlci5zaXplXCIgW3N0eWxlLmJhY2tncm91bmRdPVwidHJhY2tzLmxvd2VyLmNvbG9yXCI+PC9kaXY+XG5cbiAgICA8IS0tIExvd2VyIFRodW1iIEJ1dHRvbiAvIExpbmUgLS0+XG4gICAgPGRpdiBjbGFzcz1cInRodW1iIGxvd2VyXCJcbiAgICAgICAgdXhEcmFnXG4gICAgICAgIHJvbGU9XCJzbGlkZXJcIlxuICAgICAgICB0YWJpbmRleD1cIjBcIlxuICAgICAgICAjbG93ZXJ0aHVtYlxuICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIm9wdGlvbnMudHlwZSA9PT0gc2xpZGVyVHlwZS5SYW5nZSA/IG9wdGlvbnMuaGFuZGxlcy5hcmlhLmxvd2VyVGh1bWIgOiBvcHRpb25zLmhhbmRsZXMuYXJpYS50aHVtYlwiXG4gICAgICAgIFthdHRyLmFyaWEtdmFsdWVtaW5dPVwib3B0aW9ucz8udHJhY2s/Lm1pblwiXG4gICAgICAgIFthdHRyLmFyaWEtdmFsdWVtYXhdPVwib3B0aW9ucy50eXBlID09PSBzbGlkZXJUeXBlLlJhbmdlID8gZ2V0VGh1bWJWYWx1ZShzbGlkZXJUaHVtYi5VcHBlcikgOiBvcHRpb25zPy50cmFjaz8ubWF4XCJcbiAgICAgICAgW2F0dHIuYXJpYS12YWx1ZW5vd109XCJnZXRUaHVtYlZhbHVlKHNsaWRlclRodW1iLkxvd2VyKVwiXG4gICAgICAgIFthdHRyLmFyaWEtdmFsdWV0ZXh0XT1cImdldEFyaWFWYWx1ZVRleHQoc2xpZGVyVGh1bWIuTG93ZXIpXCJcbiAgICAgICAgW3N0eWxlLmxlZnQuJV09XCJ0aHVtYnMubG93ZXIucG9zaXRpb25cIlxuICAgICAgICBbY2xhc3MuYWN0aXZlXT1cInRodW1icy5sb3dlci5kcmFnXCJcbiAgICAgICAgW3N0eWxlLnotaW5kZXhdPVwidGh1bWJzLmxvd2VyLm9yZGVyXCJcbiAgICAgICAgW2NsYXNzLmJ1dHRvbl09XCJvcHRpb25zLmhhbmRsZXMuc3R5bGUgPT09IHNsaWRlclN0eWxlLkJ1dHRvblwiXG4gICAgICAgIFtjbGFzcy5saW5lXT1cIm9wdGlvbnMuaGFuZGxlcy5zdHlsZSA9PT0gc2xpZGVyU3R5bGUuTGluZVwiXG4gICAgICAgIFtjbGFzcy5uYXJyb3ddPVwib3B0aW9ucy50cmFjay5oZWlnaHQgPT09IHNsaWRlclNpemUuTmFycm93XCJcbiAgICAgICAgW2NsYXNzLndpZGVdPVwib3B0aW9ucy50cmFjay5oZWlnaHQgPT09IHNsaWRlclNpemUuV2lkZVwiXG4gICAgICAgIChkcmFnc3RhcnQpPVwidGh1bWJFdmVudChzbGlkZXJUaHVtYi5Mb3dlciwgc2xpZGVyVGh1bWJFdmVudC5EcmFnU3RhcnQpOyBsb3dlcnRodW1iLmZvY3VzKClcIlxuICAgICAgICAoZHJhZyk9XCJ1cGRhdGVUaHVtYlBvc2l0aW9uKCRldmVudCwgc2xpZGVyVGh1bWIuTG93ZXIpXCJcbiAgICAgICAgKGRyYWdlbmQpPVwidGh1bWJFdmVudChzbGlkZXJUaHVtYi5Mb3dlciwgc2xpZGVyVGh1bWJFdmVudC5EcmFnRW5kKVwiXG4gICAgICAgIChtb3VzZWVudGVyKT1cInRodW1iRXZlbnQoc2xpZGVyVGh1bWIuTG93ZXIsIHNsaWRlclRodW1iRXZlbnQuTW91c2VPdmVyKVwiXG4gICAgICAgIChtb3VzZWxlYXZlKT1cInRodW1iRXZlbnQoc2xpZGVyVGh1bWIuTG93ZXIsIHNsaWRlclRodW1iRXZlbnQuTW91c2VMZWF2ZSlcIlxuICAgICAgICAoZm9jdXMpPVwidGh1bWJFdmVudChzbGlkZXJUaHVtYi5Mb3dlciwgc2xpZGVyVGh1bWJFdmVudC5Nb3VzZU92ZXIpXCJcbiAgICAgICAgKGJsdXIpPVwidGh1bWJFdmVudChzbGlkZXJUaHVtYi5Mb3dlciwgc2xpZGVyVGh1bWJFdmVudC5Nb3VzZUxlYXZlKVwiXG4gICAgICAgIChrZXlkb3duLkFycm93TGVmdCk9XCJzbmFwVG9OZWFyZXN0VGljayhzbGlkZXJUaHVtYi5Mb3dlciwgc2xpZGVyU25hcC5BbGwsIGZhbHNlKTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIlxuICAgICAgICAoa2V5ZG93bi5BcnJvd1JpZ2h0KT1cInNuYXBUb05lYXJlc3RUaWNrKHNsaWRlclRodW1iLkxvd2VyLCBzbGlkZXJTbmFwLkFsbCwgdHJ1ZSk7ICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCJcbiAgICAgICAgKGtleWRvd24uQXJyb3dVcCk9XCJzbmFwVG9OZWFyZXN0VGljayhzbGlkZXJUaHVtYi5Mb3dlciwgc2xpZGVyU25hcC5BbGwsIGZhbHNlKTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIlxuICAgICAgICAoa2V5ZG93bi5BcnJvd0Rvd24pPVwic25hcFRvTmVhcmVzdFRpY2soc2xpZGVyVGh1bWIuTG93ZXIsIHNsaWRlclNuYXAuQWxsLCB0cnVlKTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIlxuICAgICAgICAoa2V5ZG93bi5QYWdlRG93bik9XCJzbmFwVG9OZWFyZXN0VGljayhzbGlkZXJUaHVtYi5Mb3dlciwgc2xpZGVyU25hcC5NYWpvciwgZmFsc2UpOyAkZXZlbnQucHJldmVudERlZmF1bHQoKVwiXG4gICAgICAgIChrZXlkb3duLlBhZ2VVcCk9XCJzbmFwVG9OZWFyZXN0VGljayhzbGlkZXJUaHVtYi5Mb3dlciwgc2xpZGVyU25hcC5NYWpvciwgdHJ1ZSk7ICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCJcbiAgICAgICAgKGtleWRvd24uSG9tZSk9XCJzbmFwVG9FbmQoc2xpZGVyVGh1bWIuTG93ZXIsIGZhbHNlKTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIlxuICAgICAgICAoa2V5ZG93bi5FbmQpPVwic25hcFRvRW5kKHNsaWRlclRodW1iLkxvd2VyLCB0cnVlKTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIj5cblxuICAgICAgICA8IS0tIExvd2VyIFRodW1iIENhbGxvdXQgLS0+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0b29sdGlwIHRvcCB0b29sdGlwLWxvd2VyXCIgI2xvd2VyVG9vbHRpcFxuICAgICAgICAgICAgW2NsYXNzLnRvb2x0aXAtZHluYW1pY109XCJvcHRpb25zLmhhbmRsZXMuY2FsbG91dC50cmlnZ2VyID09PSBzbGlkZXJDYWxsb3V0VHJpZ2dlci5EeW5hbWljICYmIHRodW1icy5sb3dlci5kcmFnID09PSBmYWxzZVwiXG4gICAgICAgICAgICBbc3R5bGUub3BhY2l0eV09XCJ0b29sdGlwcy5sb3dlci52aXNpYmxlID8gMSA6IDBcIlxuICAgICAgICAgICAgW3N0eWxlLmxlZnQucHhdPVwidG9vbHRpcHMubG93ZXIucG9zaXRpb25cIj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvb2x0aXAtYXJyb3dcIiBbc3R5bGUuYm9yZGVyLXRvcC1jb2xvcl09XCJvcHRpb25zLmhhbmRsZXMuY2FsbG91dC5iYWNrZ3JvdW5kXCI+PC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b29sdGlwLWlubmVyXCJcbiAgICAgICAgICAgICAgICBbc3R5bGUuYmFja2dyb3VuZC1jb2xvcl09XCJvcHRpb25zLmhhbmRsZXMuY2FsbG91dC5iYWNrZ3JvdW5kXCJcbiAgICAgICAgICAgICAgICBbc3R5bGUuY29sb3JdPVwib3B0aW9ucy5oYW5kbGVzLmNhbGxvdXQuY29sb3JcIj5cbiAgICAgICAgICAgICAgICB7eyB0b29sdGlwcy5sb3dlci5sYWJlbCB9fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgPC9kaXY+XG5cbiAgICA8IS0tIFNlY3Rpb24gb2YgVHJhY2sgQmV0d2VlbiBMb3dlciBhbmQgVXBwZXIgVGh1bWJzIC0tPlxuICAgIDxkaXYgY2xhc3M9XCJ0cmFjay1zZWN0aW9uIHRyYWNrLXJhbmdlXCIgKm5nSWY9XCJvcHRpb25zLnR5cGUgPT09IHNsaWRlclR5cGUuUmFuZ2VcIiBbc3R5bGUuZmxleC1ncm93XT1cInRyYWNrcy5taWRkbGUuc2l6ZVwiIFtzdHlsZS5iYWNrZ3JvdW5kXT1cInRyYWNrcy5taWRkbGUuY29sb3JcIj5cbiAgICA8L2Rpdj5cblxuICAgIDwhLS0gVXBwZXIgVGh1bWIgQnV0dG9uIC8gTGluZSAtLT5cbiAgICA8ZGl2IGNsYXNzPVwidGh1bWIgdXBwZXJcIlxuICAgICAgICB1eERyYWdcbiAgICAgICAgcm9sZT1cInNsaWRlclwiXG4gICAgICAgIHRhYmluZGV4PVwiMFwiXG4gICAgICAgICN1cHBlcnRodW1iXG4gICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwib3B0aW9ucy5oYW5kbGVzLmFyaWEudXBwZXJUaHVtYlwiXG4gICAgICAgIFthdHRyLmFyaWEtdmFsdWVtaW5dPVwiZ2V0VGh1bWJWYWx1ZShzbGlkZXJUaHVtYi5Mb3dlcikgfHwgb3B0aW9ucz8udHJhY2s/Lm1pblwiXG4gICAgICAgIFthdHRyLmFyaWEtdmFsdWVtYXhdPVwib3B0aW9ucz8udHJhY2s/Lm1heFwiXG4gICAgICAgIFthdHRyLmFyaWEtdmFsdWVub3ddPVwiZ2V0VGh1bWJWYWx1ZShzbGlkZXJUaHVtYi5VcHBlcilcIlxuICAgICAgICBbYXR0ci5hcmlhLXZhbHVldGV4dF09XCJnZXRBcmlhVmFsdWVUZXh0KHNsaWRlclRodW1iLlVwcGVyKVwiXG4gICAgICAgIFtoaWRkZW5dPVwib3B0aW9ucy50eXBlICE9PSBzbGlkZXJUeXBlLlJhbmdlXCJcbiAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJ0aHVtYnMudXBwZXIuZHJhZ1wiXG4gICAgICAgIFtzdHlsZS5sZWZ0LiVdPVwidGh1bWJzLnVwcGVyLnBvc2l0aW9uXCJcbiAgICAgICAgW3N0eWxlLnotaW5kZXhdPVwidGh1bWJzLnVwcGVyLm9yZGVyXCJcbiAgICAgICAgW2NsYXNzLmJ1dHRvbl09XCJvcHRpb25zLmhhbmRsZXMuc3R5bGUgPT09IHNsaWRlclN0eWxlLkJ1dHRvblwiXG4gICAgICAgIFtjbGFzcy5saW5lXT1cIm9wdGlvbnMuaGFuZGxlcy5zdHlsZSA9PT0gc2xpZGVyU3R5bGUuTGluZVwiXG4gICAgICAgIFtjbGFzcy5uYXJyb3ddPVwib3B0aW9ucy50cmFjay5oZWlnaHQgPT09IHNsaWRlclNpemUuTmFycm93XCJcbiAgICAgICAgW2NsYXNzLndpZGVdPVwib3B0aW9ucy50cmFjay5oZWlnaHQgPT09IHNsaWRlclNpemUuV2lkZVwiXG4gICAgICAgIChkcmFnc3RhcnQpPVwidGh1bWJFdmVudChzbGlkZXJUaHVtYi5VcHBlciwgc2xpZGVyVGh1bWJFdmVudC5EcmFnU3RhcnQpOyB1cHBlcnRodW1iLmZvY3VzKClcIlxuICAgICAgICAoZHJhZyk9XCJ1cGRhdGVUaHVtYlBvc2l0aW9uKCRldmVudCwgc2xpZGVyVGh1bWIuVXBwZXIpXCJcbiAgICAgICAgKGRyYWdlbmQpPVwidGh1bWJFdmVudChzbGlkZXJUaHVtYi5VcHBlciwgc2xpZGVyVGh1bWJFdmVudC5EcmFnRW5kKVwiXG4gICAgICAgIChtb3VzZWVudGVyKT1cInRodW1iRXZlbnQoc2xpZGVyVGh1bWIuVXBwZXIsIHNsaWRlclRodW1iRXZlbnQuTW91c2VPdmVyKVwiXG4gICAgICAgIChtb3VzZWxlYXZlKT1cInRodW1iRXZlbnQoc2xpZGVyVGh1bWIuVXBwZXIsIHNsaWRlclRodW1iRXZlbnQuTW91c2VMZWF2ZSlcIlxuICAgICAgICAoZm9jdXMpPVwidGh1bWJFdmVudChzbGlkZXJUaHVtYi5VcHBlciwgc2xpZGVyVGh1bWJFdmVudC5Nb3VzZU92ZXIpXCJcbiAgICAgICAgKGJsdXIpPVwidGh1bWJFdmVudChzbGlkZXJUaHVtYi5VcHBlciwgc2xpZGVyVGh1bWJFdmVudC5Nb3VzZUxlYXZlKVwiXG4gICAgICAgIChrZXlkb3duLkFycm93TGVmdCk9XCJzbmFwVG9OZWFyZXN0VGljayhzbGlkZXJUaHVtYi5VcHBlciwgc2xpZGVyU25hcC5BbGwsIGZhbHNlKTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIlxuICAgICAgICAoa2V5ZG93bi5BcnJvd1JpZ2h0KT1cInNuYXBUb05lYXJlc3RUaWNrKHNsaWRlclRodW1iLlVwcGVyLCBzbGlkZXJTbmFwLkFsbCwgdHJ1ZSk7ICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCJcbiAgICAgICAgKGtleWRvd24uQXJyb3dVcCk9XCJzbmFwVG9OZWFyZXN0VGljayhzbGlkZXJUaHVtYi5VcHBlciwgc2xpZGVyU25hcC5BbGwsIGZhbHNlKTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIlxuICAgICAgICAoa2V5ZG93bi5BcnJvd0Rvd24pPVwic25hcFRvTmVhcmVzdFRpY2soc2xpZGVyVGh1bWIuVXBwZXIsIHNsaWRlclNuYXAuQWxsLCB0cnVlKTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIlxuICAgICAgICAoa2V5ZG93bi5QYWdlRG93bik9XCJzbmFwVG9OZWFyZXN0VGljayhzbGlkZXJUaHVtYi5VcHBlciwgc2xpZGVyU25hcC5NYWpvciwgZmFsc2UpOyAkZXZlbnQucHJldmVudERlZmF1bHQoKVwiXG4gICAgICAgIChrZXlkb3duLlBhZ2VVcCk9XCJzbmFwVG9OZWFyZXN0VGljayhzbGlkZXJUaHVtYi5VcHBlciwgc2xpZGVyU25hcC5NYWpvciwgdHJ1ZSk7ICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXCJcbiAgICAgICAgKGtleWRvd24uSG9tZSk9XCJzbmFwVG9FbmQoc2xpZGVyVGh1bWIuVXBwZXIsIGZhbHNlKTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIlxuICAgICAgICAoa2V5ZG93bi5FbmQpPVwic25hcFRvRW5kKHNsaWRlclRodW1iLlVwcGVyLCB0cnVlKTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIj5cblxuICAgICAgICA8IS0tIFVwcGVyIFRodW1iIENhbGxvdXQgLS0+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0b29sdGlwIHRvcCB0b29sdGlwLXVwcGVyXCIgI3VwcGVyVG9vbHRpcFxuICAgICAgICAgICAgW2NsYXNzLnRvb2x0aXAtZHluYW1pY109XCJvcHRpb25zLmhhbmRsZXMuY2FsbG91dC50cmlnZ2VyID09PSBzbGlkZXJDYWxsb3V0VHJpZ2dlci5EeW5hbWljICYmIHRodW1icy51cHBlci5kcmFnID09PSBmYWxzZVwiXG4gICAgICAgICAgICBbc3R5bGUub3BhY2l0eV09XCJ0b29sdGlwcy51cHBlci52aXNpYmxlID8gMSA6IDBcIlxuICAgICAgICAgICAgW3N0eWxlLmxlZnQucHhdPVwidG9vbHRpcHMudXBwZXIucG9zaXRpb25cIj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvb2x0aXAtYXJyb3dcIiBbc3R5bGUuYm9yZGVyLXRvcC1jb2xvcl09XCJvcHRpb25zLmhhbmRsZXMuY2FsbG91dC5iYWNrZ3JvdW5kXCI+PC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b29sdGlwLWlubmVyXCJcbiAgICAgICAgICAgICAgICAqbmdJZj1cIm9wdGlvbnMudHlwZSA9PT0gc2xpZGVyVHlwZS5SYW5nZVwiXG4gICAgICAgICAgICAgICAgW3N0eWxlLmJhY2tncm91bmQtY29sb3JdPVwib3B0aW9ucy5oYW5kbGVzLmNhbGxvdXQuYmFja2dyb3VuZFwiXG4gICAgICAgICAgICAgICAgW3N0eWxlLmNvbG9yXT1cIm9wdGlvbnMuaGFuZGxlcy5jYWxsb3V0LmNvbG9yXCI+XG4gICAgICAgICAgICAgICAge3sgdG9vbHRpcHMudXBwZXIubGFiZWwgfX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDwhLS0gU2VjdGlvbiBvZiBUcmFjayBBYm92ZXIgVXBwZXIgVGh1bWIgLS0+XG4gICAgPGRpdiBjbGFzcz1cInRyYWNrLXNlY3Rpb24gdHJhY2staGlnaGVyXCIgW3N0eWxlLmZsZXgtZ3Jvd109XCJ0cmFja3MudXBwZXIuc2l6ZVwiIFtzdHlsZS5iYWNrZ3JvdW5kXT1cInRyYWNrcy51cHBlci5jb2xvclwiPjwvZGl2PlxuXG48L2Rpdj5cblxuPCEtLSBDaGFydCBUaWNrcyBhbmQgVGljayBMYWJlbHMgLS0+XG48ZGl2IGNsYXNzPVwidGljay1jb250YWluZXJcIlxuICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICAgICpuZ0lmPVwiKG9wdGlvbnMudHJhY2sudGlja3MubWFqb3Iuc2hvdyB8fCBvcHRpb25zLnRyYWNrLnRpY2tzLm1pbm9yLnNob3cpICYmIG9wdGlvbnMuaGFuZGxlcy5jYWxsb3V0LnRyaWdnZXIgIT09IHNsaWRlckNhbGxvdXRUcmlnZ2VyLkR5bmFtaWNcIlxuICAgIFtjbGFzcy5zaG93LWxhYmVsc109XCJvcHRpb25zLnRyYWNrLnRpY2tzLm1ham9yLmxhYmVscyB8fCBvcHRpb25zLnRyYWNrLnRpY2tzLm1pbm9yLmxhYmVsc1wiPlxuXG4gICAgPGRpdiBjbGFzcz1cInRpY2tcIlxuICAgICAgICAqbmdGb3I9XCJsZXQgdGljayBvZiB0aWNrc1wiXG4gICAgICAgIFtjbGFzcy5tYWpvcl09XCJ0aWNrLnR5cGUgPT09IHNsaWRlclRpY2tUeXBlLk1ham9yXCJcbiAgICAgICAgW2NsYXNzLm1pbm9yXT1cInRpY2sudHlwZSA9PT0gc2xpZGVyVGlja1R5cGUuTWlub3JcIlxuICAgICAgICBbc3R5bGUubGVmdC4lXT1cInRpY2sucG9zaXRpb25cIlxuICAgICAgICBbaGlkZGVuXT1cIiF0aWNrLnNob3dUaWNrc1wiPlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0aWNrLWluZGljYXRvclwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGljay1sYWJlbFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIFtoaWRkZW5dPVwiIXRpY2suc2hvd0xhYmVsc1wiPnt7IHRpY2subGFiZWwgfX08L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2PmAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgU2xpZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBEb0NoZWNrIHtcblxuICAgIEBJbnB1dCgpIHZhbHVlOiBTbGlkZXJWYWx1ZSB8IG51bWJlciA9IDA7XG4gICAgQElucHV0KCkgb3B0aW9uczogU2xpZGVyT3B0aW9ucztcbiAgICBAT3V0cHV0KCkgdmFsdWVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxTbGlkZXJWYWx1ZSB8IG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPFNsaWRlclZhbHVlIHwgbnVtYmVyPigpO1xuXG4gICAgQFZpZXdDaGlsZCgnbG93ZXJUb29sdGlwJykgbG93ZXJUb29sdGlwOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoJ3VwcGVyVG9vbHRpcCcpIHVwcGVyVG9vbHRpcDogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKCd0cmFjaycpIHRyYWNrOiBFbGVtZW50UmVmO1xuXG4gICAgLy8gc3RvcmUgY3VycmVudCB2YWx1ZXMgZm9yIGRlZXAgY2hhbmdlIGRldGVjdGlvblxuICAgIHByaXZhdGUgX3ZhbHVlOiBTbGlkZXJWYWx1ZSB8IG51bWJlcjtcblxuICAgIC8vIGV4cG9zZSBlbnVtcyB0byBBbmd1bGFyIHZpZXdcbiAgICBzbGlkZXJUeXBlID0gU2xpZGVyVHlwZTtcbiAgICBzbGlkZXJTdHlsZSA9IFNsaWRlclN0eWxlO1xuICAgIHNsaWRlclNpemUgPSBTbGlkZXJTaXplO1xuICAgIHNsaWRlclNuYXAgPSBTbGlkZXJTbmFwO1xuICAgIHNsaWRlclRodW1iID0gU2xpZGVyVGh1bWI7XG4gICAgc2xpZGVyVGlja1R5cGUgPSBTbGlkZXJUaWNrVHlwZTtcbiAgICBzbGlkZXJUaHVtYkV2ZW50ID0gU2xpZGVyVGh1bWJFdmVudDtcbiAgICBzbGlkZXJDYWxsb3V0VHJpZ2dlciA9IFNsaWRlckNhbGxvdXRUcmlnZ2VyO1xuXG4gICAgdHJhY2tzID0ge1xuICAgICAgICBsb3dlcjoge1xuICAgICAgICAgICAgc2l6ZTogMCxcbiAgICAgICAgICAgIGNvbG9yOiAnJ1xuICAgICAgICB9LFxuICAgICAgICBtaWRkbGU6IHtcbiAgICAgICAgICAgIHNpemU6IDAsXG4gICAgICAgICAgICBjb2xvcjogJydcbiAgICAgICAgfSxcbiAgICAgICAgdXBwZXI6IHtcbiAgICAgICAgICAgIHNpemU6IDAsXG4gICAgICAgICAgICBjb2xvcjogJydcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0b29sdGlwcyA9IHtcbiAgICAgICAgbG93ZXI6IHtcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAgcG9zaXRpb246IDAsXG4gICAgICAgICAgICBsYWJlbDogJydcbiAgICAgICAgfSxcbiAgICAgICAgdXBwZXI6IHtcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAgcG9zaXRpb246IDAsXG4gICAgICAgICAgICBsYWJlbDogJydcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aHVtYnMgPSB7XG4gICAgICAgIGxvd2VyOiB7XG4gICAgICAgICAgICBob3ZlcjogZmFsc2UsXG4gICAgICAgICAgICBkcmFnOiBmYWxzZSxcbiAgICAgICAgICAgIHBvc2l0aW9uOiAwLFxuICAgICAgICAgICAgb3JkZXI6IDEwMCxcbiAgICAgICAgICAgIHZhbHVlOiBudWxsIGFzIG51bWJlclxuICAgICAgICB9LFxuICAgICAgICB1cHBlcjoge1xuICAgICAgICAgICAgaG92ZXI6IGZhbHNlLFxuICAgICAgICAgICAgZHJhZzogZmFsc2UsXG4gICAgICAgICAgICBwb3NpdGlvbjogMCxcbiAgICAgICAgICAgIG9yZGVyOiAxMDEsXG4gICAgICAgICAgICB2YWx1ZTogbnVsbCBhcyBudW1iZXJcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBzdG9yZSBhbGwgdGhlIHRpY2tzIHRvIGRpc3BsYXlcbiAgICB0aWNrczogU2xpZGVyVGlja1tdID0gW107XG4gICAgZGVmYXVsdE9wdGlvbnM6IFNsaWRlck9wdGlvbnM7XG5cbiAgICBjb25zdHJ1Y3Rvcihjb2xvclNlcnZpY2U6IENvbG9yU2VydmljZSwgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG5cbiAgICAgICAgLy8gc2V0dXAgZGVmYXVsdCBvcHRpb25zXG4gICAgICAgIHRoaXMuZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgICAgICAgICB0eXBlOiBTbGlkZXJUeXBlLlZhbHVlLFxuICAgICAgICAgICAgaGFuZGxlczoge1xuICAgICAgICAgICAgICAgIHN0eWxlOiBTbGlkZXJTdHlsZS5CdXR0b24sXG4gICAgICAgICAgICAgICAgY2FsbG91dDoge1xuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyOiBTbGlkZXJDYWxsb3V0VHJpZ2dlci5Ob25lLFxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBjb2xvclNlcnZpY2UuZ2V0Q29sb3IoJ2dyZXkyJykudG9IZXgoKSxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjZmZmJyxcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVyOiAodmFsdWU6IG51bWJlcik6IHN0cmluZyB8IG51bWJlciA9PiB2YWx1ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAga2V5Ym9hcmQ6IHtcbiAgICAgICAgICAgICAgICAgICAgbWFqb3I6IDUsXG4gICAgICAgICAgICAgICAgICAgIG1pbm9yOiAxXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBhcmlhOiB7XG4gICAgICAgICAgICAgICAgICAgIHRodW1iOiAnU2xpZGVyIHZhbHVlJyxcbiAgICAgICAgICAgICAgICAgICAgbG93ZXJUaHVtYjogJ1NsaWRlciBsb3dlciB2YWx1ZScsXG4gICAgICAgICAgICAgICAgICAgIHVwcGVyVGh1bWI6ICdTbGlkZXIgdXBwZXIgdmFsdWUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRyYWNrOiB7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBTbGlkZXJTaXplLldpZGUsXG4gICAgICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgICAgIG1heDogMTAwLFxuICAgICAgICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNuYXA6IFNsaWRlclNuYXAuTm9uZSxcbiAgICAgICAgICAgICAgICAgICAgbWFqb3I6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwczogMTAsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbHM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6ICh2YWx1ZTogbnVtYmVyKTogc3RyaW5nIHwgbnVtYmVyID0+IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG1pbm9yOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RlcHM6IDUsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVyOiAodmFsdWU6IG51bWJlcik6IHN0cmluZyB8IG51bWJlciA9PiB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjb2xvcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgbG93ZXI6IGNvbG9yU2VydmljZS5nZXRDb2xvcignZ3JleTYnKS50b0hleCgpLFxuICAgICAgICAgICAgICAgICAgICByYW5nZTogY29sb3JTZXJ2aWNlLmdldENvbG9yKCdhY2NlbnQnKS5zZXRBbHBoYSgwLjc1KS50b1JnYmEoKSxcbiAgICAgICAgICAgICAgICAgICAgaGlnaGVyOiBjb2xvclNlcnZpY2UuZ2V0Q29sb3IoJ2dyZXk2JykudG9IZXgoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcblxuICAgICAgICB0aGlzLnVwZGF0ZU9wdGlvbnMoKTtcbiAgICAgICAgdGhpcy51cGRhdGVWYWx1ZXMoKTtcblxuICAgICAgICB0aGlzLnNldFRodW1iU3RhdGUoU2xpZGVyVGh1bWIuTG93ZXIsIGZhbHNlLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuc2V0VGh1bWJTdGF0ZShTbGlkZXJUaHVtYi5VcHBlciwgZmFsc2UsIGZhbHNlKTtcblxuICAgICAgICAvLyBlbWl0IHRoZSBpbml0aWFsIHZhbHVlXG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2UubmV4dCh0aGlzLmNsb25lKHRoaXMudmFsdWUpKTtcbiAgICB9XG5cbiAgICBuZ0RvQ2hlY2soKTogdm9pZCB7XG5cbiAgICAgICAgaWYgKHRoaXMuZGV0ZWN0VmFsdWVDaGFuZ2UodGhpcy52YWx1ZSwgdGhpcy5fdmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlcygpO1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSB0aGlzLmNsb25lKHRoaXMudmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICAvLyBwZXJzaXN0ZW50IHRvb2x0aXBzIHdpbGwgbmVlZCBwb3NpdGlvbmVkIGNvcnJlY3RseSBhdCB0aGlzIHN0YWdlXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVUb29sdGlwUG9zaXRpb24oU2xpZGVyVGh1bWIuTG93ZXIpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVUb29sdGlwUG9zaXRpb24oU2xpZGVyVGh1bWIuVXBwZXIpO1xuXG4gICAgICAgICAgICAvLyBtYXJrIGFzIGRpcnR5XG4gICAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc25hcFRvTmVhcmVzdFRpY2sodGh1bWI6IFNsaWRlclRodW1iLCBzbmFwVGFyZ2V0OiBTbGlkZXJTbmFwLCBmb3J3YXJkczogYm9vbGVhbik6IHZvaWQge1xuXG4gICAgICAgIC8vIGdldCB0aGUgdmFsdWUgZm9yIHRoZSB0aHVtYlxuICAgICAgICBjb25zdCB7IHZhbHVlIH0gPSB0aGlzLmdldFRodW1iU3RhdGUodGh1bWIpO1xuXG4gICAgICAgIC8vIGdldCB0aGUgY2xvc2VzdCB0aWNrcyAtIHJlbW92ZSBhbnkgdGljayBpZiB3ZSBhcmUgY3VycmVudGx5IG9uIGl0XG4gICAgICAgIGNvbnN0IGNsb3Nlc3QgPSB0aGlzLmdldFRpY2tEaXN0YW5jZXModmFsdWUsIHRodW1iLCBzbmFwVGFyZ2V0KVxuICAgICAgICAgICAgLmZpbHRlcih0aWNrID0+IHRpY2sudmFsdWUgIT09IHZhbHVlKVxuICAgICAgICAgICAgLmZpbmQodGljayA9PiBmb3J3YXJkcyA/IHRpY2sudmFsdWUgPiB2YWx1ZSA6IHRpY2sudmFsdWUgPCB2YWx1ZSk7XG5cbiAgICAgICAgLy8gSWYgd2UgaGF2ZSBubyB0aWNrcyB0aGVuIG1vdmUgYnkgYSBwcmVkZWZpbmVkIGFtb3VudFxuICAgICAgICBpZiAoY2xvc2VzdCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0VGh1bWJWYWx1ZSh0aHVtYiwgdGhpcy52YWxpZGF0ZVZhbHVlKHRodW1iLCBjbG9zZXN0LnZhbHVlKSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzdGVwID0gc25hcFRhcmdldCA9PT0gU2xpZGVyU25hcC5NYWpvciA/IHRoaXMub3B0aW9ucy5oYW5kbGVzLmtleWJvYXJkLm1ham9yIDogdGhpcy5vcHRpb25zLmhhbmRsZXMua2V5Ym9hcmQubWlub3I7XG5cbiAgICAgICAgdGhpcy5zZXRUaHVtYlZhbHVlKHRodW1iLCB0aGlzLnZhbGlkYXRlVmFsdWUodGh1bWIsIHZhbHVlICsgKGZvcndhcmRzID8gc3RlcCA6IC1zdGVwKSkpO1xuXG4gICAgfVxuXG4gICAgc25hcFRvRW5kKHRodW1iOiBTbGlkZXJUaHVtYiwgZm9yd2FyZHM6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXRUaHVtYlZhbHVlKHRodW1iLCB0aGlzLnZhbGlkYXRlVmFsdWUodGh1bWIsIGZvcndhcmRzID8gdGhpcy5vcHRpb25zLnRyYWNrLm1heCA6IHRoaXMub3B0aW9ucy50cmFjay5taW4pKTtcbiAgICB9XG5cbiAgICBnZXRUaHVtYlZhbHVlKHRodW1iOiBTbGlkZXJUaHVtYik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFRodW1iU3RhdGUodGh1bWIpLnZhbHVlO1xuICAgIH1cblxuICAgIGdldEZvcm1hdHRlZFZhbHVlKHRodW1iOiBTbGlkZXJUaHVtYik6IHN0cmluZyB8IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuaGFuZGxlcy5jYWxsb3V0LmZvcm1hdHRlcih0aGlzLmdldFRodW1iU3RhdGUodGh1bWIpLnZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRodW1iU3RhdGUodGh1bWI6IFNsaWRlclRodW1iKSB7XG4gICAgICAgIHJldHVybiB0aHVtYiA9PT0gU2xpZGVyVGh1bWIuTG93ZXIgPyB0aGlzLnRodW1icy5sb3dlciA6IHRoaXMudGh1bWJzLnVwcGVyO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0VGh1bWJTdGF0ZSh0aHVtYjogU2xpZGVyVGh1bWIsIGhvdmVyOiBib29sZWFuLCBkcmFnOiBib29sZWFuKSB7XG5cbiAgICAgICAgaWYgKHRodW1iID09PSBTbGlkZXJUaHVtYi5Mb3dlcikge1xuICAgICAgICAgICAgdGhpcy50aHVtYnMubG93ZXIuaG92ZXIgPSBob3ZlcjtcbiAgICAgICAgICAgIHRoaXMudGh1bWJzLmxvd2VyLmRyYWcgPSBkcmFnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50aHVtYnMudXBwZXIuaG92ZXIgPSBob3ZlcjtcbiAgICAgICAgICAgIHRoaXMudGh1bWJzLnVwcGVyLmRyYWcgPSBkcmFnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSB0b29sdGlwc1xuICAgICAgICB0aGlzLnVwZGF0ZVRvb2x0aXBzKHRodW1iKTtcbiAgICB9XG5cbiAgICB0aHVtYkV2ZW50KHRodW1iOiBTbGlkZXJUaHVtYiwgZXZlbnQ6IFNsaWRlclRodW1iRXZlbnQpOiB2b2lkIHtcblxuICAgICAgICAvLyBnZXQgdGhlIGN1cnJlbnQgdGh1bWIgc3RhdGVcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLmdldFRodW1iU3RhdGUodGh1bWIpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBiYXNlZCB1cG9uIGV2ZW50XG4gICAgICAgIHN3aXRjaCAoZXZlbnQpIHtcblxuICAgICAgICAgICAgY2FzZSBTbGlkZXJUaHVtYkV2ZW50LkRyYWdTdGFydDpcbiAgICAgICAgICAgICAgICBzdGF0ZS5kcmFnID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBTbGlkZXJUaHVtYkV2ZW50LkRyYWdFbmQ6XG4gICAgICAgICAgICAgICAgc3RhdGUuZHJhZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFNsaWRlclRodW1iRXZlbnQuTW91c2VPdmVyOlxuICAgICAgICAgICAgICAgIHN0YXRlLmhvdmVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBTbGlkZXJUaHVtYkV2ZW50Lk1vdXNlTGVhdmU6XG4gICAgICAgICAgICAgICAgc3RhdGUuaG92ZXIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBTbGlkZXJUaHVtYkV2ZW50Lk5vbmU6XG4gICAgICAgICAgICAgICAgc3RhdGUuZHJhZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHN0YXRlLmhvdmVyID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB1cGRhdGUgdGhlIHRodW1iIHN0YXRlXG4gICAgICAgIHRoaXMuc2V0VGh1bWJTdGF0ZSh0aHVtYiwgc3RhdGUuaG92ZXIsIHN0YXRlLmRyYWcpO1xuICAgIH1cblxuICAgIGdldEFyaWFWYWx1ZVRleHQodGh1bWI6IFNsaWRlclRodW1iKTogc3RyaW5nIHwgbnVtYmVyIHtcbiAgICAgICAgLy8gZ2V0IHRoZSBjdXJyZW50IHRodW1iIHZhbHVlXG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXRUaHVtYlZhbHVlKHRodW1iKTtcblxuICAgICAgICAvLyBnZXQgYWxsIHRoZSB0aWNrc1xuICAgICAgICBjb25zdCB0aWNrID0gdGhpcy50aWNrcy5maW5kKF90aWNrID0+IF90aWNrLnZhbHVlID09PSB2YWx1ZSk7XG5cbiAgICAgICAgaWYgKHRpY2sgJiYgdGljay5sYWJlbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRpY2subGFiZWw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBvdGhlcndpc2Ugc2ltcGx5IGRpc3BsYXkgdGhlIGZvcm1hdHRlZCB2YWx1ZVxuICAgICAgICByZXR1cm4gdGhpcy5nZXRGb3JtYXR0ZWRWYWx1ZSh0aHVtYik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVUb29sdGlwcyh0aHVtYjogU2xpZGVyVGh1bWIpOiB2b2lkIHtcblxuICAgICAgICBsZXQgdmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHRoaXMuZ2V0VGh1bWJTdGF0ZSh0aHVtYik7XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLm9wdGlvbnMuaGFuZGxlcy5jYWxsb3V0LnRyaWdnZXIpIHtcblxuICAgICAgICAgICAgY2FzZSBTbGlkZXJDYWxsb3V0VHJpZ2dlci5QZXJzaXN0ZW50OlxuICAgICAgICAgICAgICAgIHZpc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFNsaWRlckNhbGxvdXRUcmlnZ2VyLkRyYWc6XG4gICAgICAgICAgICAgICAgdmlzaWJsZSA9IHN0YXRlLmRyYWc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgU2xpZGVyQ2FsbG91dFRyaWdnZXIuSG92ZXI6XG4gICAgICAgICAgICAgICAgdmlzaWJsZSA9IHN0YXRlLmhvdmVyIHx8IHN0YXRlLmRyYWc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgU2xpZGVyQ2FsbG91dFRyaWdnZXIuRHluYW1pYzpcbiAgICAgICAgICAgICAgICB2aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgc3RhdGUgZm9yIHRoZSBjb3JyZXNwb25kaW5nIHRodW1iXG4gICAgICAgIHRoaXMuZ2V0VG9vbHRpcCh0aHVtYikudmlzaWJsZSA9IHZpc2libGU7XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSB0b29sdGlwIHRleHRcbiAgICAgICAgdGhpcy51cGRhdGVUb29sdGlwVGV4dCh0aHVtYik7XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSB0b29sdGlwIHBvc2l0aW9uc1xuICAgICAgICB0aGlzLnVwZGF0ZVRvb2x0aXBQb3NpdGlvbih0aHVtYik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVUb29sdGlwVGV4dCh0aHVtYjogU2xpZGVyVGh1bWIpIHtcblxuICAgICAgICAvLyBnZXQgdGhlIHRodW1iIHZhbHVlXG4gICAgICAgIGxldCBzdGF0ZSA9IHRoaXMuZ2V0VGh1bWJTdGF0ZSh0aHVtYik7XG4gICAgICAgIGxldCB0b29sdGlwID0gdGhpcy5nZXRUb29sdGlwKHRodW1iKTtcblxuICAgICAgICAvLyBzdG9yZSB0aGUgZm9ybWF0dGVkIGxhYmVsXG4gICAgICAgIHRvb2x0aXAubGFiZWwgPSB0aGlzLmdldEZvcm1hdHRlZFZhbHVlKHRodW1iKS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0VG9vbHRpcEVsZW1lbnQodGh1bWI6IFNsaWRlclRodW1iKTogRWxlbWVudFJlZiB7XG4gICAgICAgIHJldHVybiB0aHVtYiA9PT0gU2xpZGVyVGh1bWIuTG93ZXIgPyB0aGlzLmxvd2VyVG9vbHRpcCA6IHRoaXMudXBwZXJUb29sdGlwO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0VG9vbHRpcCh0aHVtYjogU2xpZGVyVGh1bWIpIHtcbiAgICAgICAgcmV0dXJuIHRodW1iID09PSBTbGlkZXJUaHVtYi5Mb3dlciA/IHRoaXMudG9vbHRpcHMubG93ZXIgOiB0aGlzLnRvb2x0aXBzLnVwcGVyO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlVG9vbHRpcFBvc2l0aW9uKHRodW1iOiBTbGlkZXJUaHVtYik6IHZvaWQge1xuXG4gICAgICAgIGNvbnN0IHRvb2x0aXAgPSB0aGlzLmdldFRvb2x0aXAodGh1bWIpO1xuXG4gICAgICAgIC8vIGlmIHRvb2x0aXAgaXMgbm90IHZpc2libGUgdGhlbiBzdG9wIGhlcmVcbiAgICAgICAgaWYgKHRvb2x0aXAudmlzaWJsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB0b29sdGlwRWxlbWVudCA9IHRoaXMuZ2V0VG9vbHRpcEVsZW1lbnQodGh1bWIpO1xuXG4gICAgICAgIC8vIGdldCB0aGUgZWxlbWVudCB3aWR0aHNcbiAgICAgICAgbGV0IHRodW1iV2lkdGg6IG51bWJlcjtcblxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmhhbmRsZXMuc3R5bGUgPT09IFNsaWRlclN0eWxlLkJ1dHRvbikge1xuICAgICAgICAgICAgdGh1bWJXaWR0aCA9IHRoaXMub3B0aW9ucy50cmFjay5oZWlnaHQgPT09IFNsaWRlclNpemUuTmFycm93ID8gMTYgOiAyNDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRodW1iV2lkdGggPSAyO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHRvb2x0aXBXaWR0aCA9IHRvb2x0aXBFbGVtZW50Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XG5cbiAgICAgICAgLy8gY2FsY3VsYXRlIHRoZSB0b29sdGlwcyBuZXcgcG9zaXRpb25cbiAgICAgICAgbGV0IHRvb2x0aXBQb3NpdGlvbiA9IE1hdGguY2VpbCgodG9vbHRpcFdpZHRoIC0gdGh1bWJXaWR0aCkgLyAyKTtcblxuICAgICAgICAvLyB1cGRhdGUgdG9vbHRpcCBwb3NpdGlvblxuICAgICAgICB0b29sdGlwLnBvc2l0aW9uID0gLXRvb2x0aXBQb3NpdGlvbjtcblxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnR5cGUgPT09IFNsaWRlclR5cGUuUmFuZ2UgJiYgdGhpcy5vcHRpb25zLmhhbmRsZXMuY2FsbG91dC50cmlnZ2VyID09PSBTbGlkZXJDYWxsb3V0VHJpZ2dlci5EeW5hbWljKSB7XG4gICAgICAgICAgICB0aGlzLnByZXZlbnRUb29sdGlwT3ZlcmxhcCh0b29sdGlwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcHJldmVudFRvb2x0aXBPdmVybGFwKHRvb2x0aXA6IGFueSk6IHZvaWQge1xuICAgICAgICBjb25zdCB0cmFja1dpZHRoID0gdGhpcy50cmFjay5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xuXG4gICAgICAgIGNvbnN0IGxvd2VyID0gKHRyYWNrV2lkdGggLyAxMDApICogdGhpcy50aHVtYnMubG93ZXIucG9zaXRpb247XG4gICAgICAgIGNvbnN0IHVwcGVyID0gKHRyYWNrV2lkdGggLyAxMDApICogdGhpcy50aHVtYnMudXBwZXIucG9zaXRpb247XG5cbiAgICAgICAgY29uc3QgbG93ZXJXaWR0aCA9IHRoaXMubG93ZXJUb29sdGlwLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGggLyAyO1xuICAgICAgICBjb25zdCB1cHBlcldpZHRoID0gdGhpcy51cHBlclRvb2x0aXAubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCAvIDI7XG5cbiAgICAgICAgY29uc3QgZGlmZiA9IChsb3dlciArIGxvd2VyV2lkdGgpIC0gKHVwcGVyIC0gdXBwZXJXaWR0aCk7XG5cbiAgICAgICAgLy8gaWYgdGhlIHRvb2x0aXBzIGFyZSBjbG9zZXIgdGhhbiAxNnB4IHRoZW4gYWRqdXN0IHNvIHRoZSBkb250IG1vdmUgYW55IGNsb3NlXG4gICAgICAgIGlmIChkaWZmID4gMCkge1xuICAgICAgICAgICAgaWYgKHRvb2x0aXAgPT09IHRoaXMudG9vbHRpcHMubG93ZXIgJiYgdGhpcy50aHVtYnMubG93ZXIuZHJhZyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0b29sdGlwLnBvc2l0aW9uIC09IChkaWZmIC8gMik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRvb2x0aXAgPT09IHRoaXMudG9vbHRpcHMudXBwZXIgJiYgdGhpcy50aHVtYnMudXBwZXIuZHJhZyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0b29sdGlwLnBvc2l0aW9uICs9IChkaWZmIC8gMik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNsYW1wKHZhbHVlOiBudW1iZXIsIG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBNYXRoLm1pbihNYXRoLm1heCh2YWx1ZSwgbWluKSwgbWF4KTtcbiAgICB9XG5cbiAgICB1cGRhdGVUaHVtYlBvc2l0aW9uKGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCwgdGh1bWI6IFNsaWRlclRodW1iKTogdm9pZCB7XG5cbiAgICAgICAgLy8gZ2V0IGV2ZW50IHBvc2l0aW9uIC0gZWl0aGVyIG1vdXNlIG9yIHRvdWNoXG4gICAgICAgIGxldCBldmVudFBvc2l0aW9uID0gZXZlbnQgaW5zdGFuY2VvZiBNb3VzZUV2ZW50ID8gZXZlbnQuY2xpZW50WCA6IGV2ZW50LnRvdWNoZXMgJiYgZXZlbnQudG91Y2hlcy5sZW5ndGggPiAwID8gZXZlbnQudG91Y2hlc1swXS5jbGllbnRYIDogbnVsbDtcblxuICAgICAgICAvLyBpZiBldmVudCBwb3NpdGlvbiBpcyBudWxsIGRvIG5vdGhpbmdcbiAgICAgICAgaWYgKGV2ZW50UG9zaXRpb24gPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCBtb3VzZSBwb3NpdGlvblxuICAgICAgICBsZXQgbW91c2VYID0gd2luZG93LnBhZ2VYT2Zmc2V0ICsgZXZlbnRQb3NpdGlvbjtcblxuICAgICAgICAvLyBnZXQgdHJhY2sgc2l6ZSBhbmQgcG9zaXRpb25cbiAgICAgICAgbGV0IHRyYWNrQm91bmRzID0gdGhpcy50cmFjay5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIC8vIHJlc3RyaWN0IHRoZSB2YWx1ZSB3aXRoaW4gdGhlIHJhbmdlIHNpemVcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gdGhpcy5jbGFtcChtb3VzZVggLSB0cmFja0JvdW5kcy5sZWZ0LCAwLCB0cmFja0JvdW5kcy53aWR0aCk7XG5cbiAgICAgICAgLy8gZ2V0IGZyYWN0aW9uIHJlcHJlc2VudGF0aW9uIG9mIGxvY2F0aW9uIHdpdGhpbiB0aGUgdHJhY2tcbiAgICAgICAgbGV0IGZyYWN0aW9uID0gKHBvc2l0aW9uIC8gdHJhY2tCb3VuZHMud2lkdGgpO1xuXG4gICAgICAgIC8vIGNvbnZlcnQgdG8gdmFsdWUgd2l0aGluIHRoZSByYW5nZVxuICAgICAgICBsZXQgdmFsdWUgPSAoKHRoaXMub3B0aW9ucy50cmFjay5tYXggLSB0aGlzLm9wdGlvbnMudHJhY2subWluKSAqIGZyYWN0aW9uKSArIHRoaXMub3B0aW9ucy50cmFjay5taW47XG5cbiAgICAgICAgLy8gZW5zdXJlIHZhbHVlIGlzIHZhbGlkXG4gICAgICAgIHZhbHVlID0gdGhpcy52YWxpZGF0ZVZhbHVlKHRodW1iLCB2YWx1ZSk7XG5cbiAgICAgICAgLy8gc25hcCB0byBhIHRpY2sgaWYgcmVxdWlyZWRcbiAgICAgICAgdmFsdWUgPSB0aGlzLnNuYXBUb1RpY2sodmFsdWUsIHRodW1iKTtcblxuICAgICAgICAvLyB1cGRhdGUgdGhlIHZhbHVlIGFjY29yZGluZ2x5XG4gICAgICAgIHRoaXMuc2V0VGh1bWJWYWx1ZSh0aHVtYiwgdmFsdWUpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlT3JkZXIodGh1bWIpO1xuICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlcygpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0b29sdGlwIHRleHQgJiBwb3NpdGlvblxuICAgICAgICB0aGlzLnVwZGF0ZVRvb2x0aXBUZXh0KHRodW1iKTtcblxuICAgICAgICAvLyB1cGRhdGUgdGhlIHBvc2l0aW9uIG9mIGFsbCB2aXNpYmxlIHRvb2x0aXBzXG4gICAgICAgIHRoaXMudXBkYXRlVG9vbHRpcFBvc2l0aW9uKFNsaWRlclRodW1iLkxvd2VyKTtcbiAgICAgICAgdGhpcy51cGRhdGVUb29sdGlwUG9zaXRpb24oU2xpZGVyVGh1bWIuVXBwZXIpO1xuXG4gICAgICAgIC8vIG1hcmsgYXMgZGlydHkgZm9yIGNoYW5nZSBkZXRlY3Rpb25cbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVPcmRlcih0aHVtYjogU2xpZGVyVGh1bWIpOiB2b2lkIHtcblxuICAgICAgICBsZXQgbG93ZXIgPSB0aHVtYiA9PT0gU2xpZGVyVGh1bWIuTG93ZXIgPyAxMDEgOiAxMDA7XG4gICAgICAgIGxldCB1cHBlciA9IHRodW1iID09PSBTbGlkZXJUaHVtYi5Mb3dlciA/IDEwMCA6IDEwMTtcblxuICAgICAgICAvLyBUaGUgbW9zdCByZWNlbnRseSB1c2VkIHRodW1iIHNob3VsZCBiZSBhYm92ZVxuICAgICAgICB0aGlzLnRodW1icy5sb3dlci5vcmRlciA9IGxvd2VyO1xuICAgICAgICB0aGlzLnRodW1icy51cHBlci5vcmRlciA9IHVwcGVyO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0VGlja0Rpc3RhbmNlcyh2YWx1ZTogbnVtYmVyLCB0aHVtYjogU2xpZGVyVGh1bWIsIHNuYXBUYXJnZXQ6IFNsaWRlclNuYXApOiBTbGlkZXJUaWNrW10ge1xuXG4gICAgICAgIC8vIGlmIHNuYXAgdGFyZ2V0IGlzIG5vbmUgdGhlbiByZXR1cm4gb3JpZ2luYWwgdmFsdWVcbiAgICAgICAgaWYgKHNuYXBUYXJnZXQgPT09IFNsaWRlclNuYXAuTm9uZSkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2V0IGZpbHRlcmVkIHRpY2tzXG4gICAgICAgIGxldCB0aWNrczogU2xpZGVyVGlja1tdO1xuXG4gICAgICAgIHN3aXRjaCAoc25hcFRhcmdldCkge1xuXG4gICAgICAgICAgICBjYXNlIFNsaWRlclNuYXAuTWlub3I6XG4gICAgICAgICAgICAgICAgdGlja3MgPSB0aGlzLnRpY2tzLmZpbHRlcih0aWNrID0+IHRpY2sudHlwZSA9PT0gU2xpZGVyVGlja1R5cGUuTWlub3IpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFNsaWRlclNuYXAuTWFqb3I6XG4gICAgICAgICAgICAgICAgdGlja3MgPSB0aGlzLnRpY2tzLmZpbHRlcih0aWNrID0+IHRpY2sudHlwZSA9PT0gU2xpZGVyVGlja1R5cGUuTWFqb3IpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRpY2tzID0gdGhpcy50aWNrcy5zbGljZSgwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCB0aGUgdHJhY2sgbGltaXRcbiAgICAgICAgbGV0IGxvd2VyTGltaXQgPSB0aGlzLm9wdGlvbnMudHJhY2subWluO1xuICAgICAgICBsZXQgdXBwZXJMaW1pdCA9IHRoaXMub3B0aW9ucy50cmFjay5tYXg7XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy50eXBlID09PSBTbGlkZXJUeXBlLlJhbmdlICYmIHRodW1iID09PSBTbGlkZXJUaHVtYi5Mb3dlcikge1xuICAgICAgICAgICAgdXBwZXJMaW1pdCA9IHRoaXMudGh1bWJzLnVwcGVyLnZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy50eXBlID09PSBTbGlkZXJUeXBlLlJhbmdlICYmIHRodW1iID09PSBTbGlkZXJUaHVtYi5VcHBlcikge1xuICAgICAgICAgICAgbG93ZXJMaW1pdCA9IHRoaXMudGh1bWJzLmxvd2VyLnZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRmluZCB0aGUgY2xvc2VzdCB0aWNrIHRvIHRoZSBjdXJyZW50IHBvc2l0aW9uXG4gICAgICAgIGNvbnN0IHJhbmdlID0gdGlja3MuZmlsdGVyKHRpY2sgPT4gdGljay52YWx1ZSA+PSBsb3dlckxpbWl0ICYmIHRpY2sudmFsdWUgPD0gdXBwZXJMaW1pdCk7XG5cbiAgICAgICAgLy8gSWYgdGhlcmUgYXJlIG5vIGNsb3NlIHRpY2tzIGluIHRoZSB2YWxpZCByYW5nZSB0aGVuIGRvbnQgc25hcFxuICAgICAgICBpZiAocmFuZ2UubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmFuZ2Uuc29ydCgodGlja09uZSwgdGlja1R3bykgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCB0aWNrT25lRGVsdGEgPSBNYXRoLm1heCh0aWNrT25lLnZhbHVlLCB2YWx1ZSkgLSBNYXRoLm1pbih0aWNrT25lLnZhbHVlLCB2YWx1ZSk7XG4gICAgICAgICAgICBjb25zdCB0aWNrVHdvRGVsdGEgPSBNYXRoLm1heCh0aWNrVHdvLnZhbHVlLCB2YWx1ZSkgLSBNYXRoLm1pbih0aWNrVHdvLnZhbHVlLCB2YWx1ZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiB0aWNrT25lRGVsdGEgLSB0aWNrVHdvRGVsdGE7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgc25hcFRvVGljayh2YWx1ZTogbnVtYmVyLCB0aHVtYjogU2xpZGVyVGh1bWIpOiBudW1iZXIge1xuXG4gICAgICAgIGNvbnN0IHRpY2tEaXN0YW5jZXMgPSB0aGlzLmdldFRpY2tEaXN0YW5jZXModmFsdWUsIHRodW1iLCB0aGlzLm9wdGlvbnMudHJhY2sudGlja3Muc25hcCk7XG5cbiAgICAgICAgLy8gaWYgdGhlcmUgYXJlIG5vIHRpY2tzIHJldHVybiB0aGUgY3VycmVudCB2YWx1ZVxuICAgICAgICBpZiAodGlja0Rpc3RhbmNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCB0aGUgY2xvc2VzdCB0aWNrXG4gICAgICAgIHJldHVybiB0aWNrRGlzdGFuY2VzWzBdLnZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgdmFsaWRhdGVWYWx1ZSh0aHVtYjogU2xpZGVyVGh1bWIsIHZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xuXG4gICAgICAgIC8vIGlmIHNsaWRlciBpcyBub3QgYSByYW5nZSB2YWx1ZSBpcyBhbHdheXMgdmFsaWQgcHJvdmlkaW5nIGl0IGlzIHdpdGhpbiB0aGUgY2hhcnQgbWluIGFuZCBtYXggdmFsdWVzXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMudHlwZSA9PT0gU2xpZGVyVHlwZS5WYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4KE1hdGgubWluKHZhbHVlLCB0aGlzLm9wdGlvbnMudHJhY2subWF4KSwgdGhpcy5vcHRpb25zLnRyYWNrLm1pbik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayBpZiB2YWx1ZSBpcyB3aXRoIGNoYXJ0IHJhbmdlc1xuICAgICAgICBpZiAodmFsdWUgPiB0aGlzLm9wdGlvbnMudHJhY2subWF4KSB7XG4gICAgICAgICAgICByZXR1cm4gdGh1bWIgPT09IFNsaWRlclRodW1iLkxvd2VyID8gTWF0aC5taW4odGhpcy5vcHRpb25zLnRyYWNrLm1heCwgdGhpcy50aHVtYnMudXBwZXIudmFsdWUpIDogdGhpcy5vcHRpb25zLnRyYWNrLm1heDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZSA8IHRoaXMub3B0aW9ucy50cmFjay5taW4pIHtcbiAgICAgICAgICAgIHJldHVybiB0aHVtYiA9PT0gU2xpZGVyVGh1bWIuVXBwZXIgPyBNYXRoLm1heCh0aGlzLm9wdGlvbnMudHJhY2subWluLCB0aGlzLnRodW1icy5sb3dlci52YWx1ZSkgOiB0aGlzLm9wdGlvbnMudHJhY2subWluO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gb3RoZXJ3aXNlIHdlIG5lZWQgdG8gY2hlY2sgdG8gbWFrZSBzdXJlIGxvd2VyIHRodW1iIGNhbm5vdCBnbyBhYm92ZSBoaWdoZXIgYW5kIHZpY2UgdmVyc2FcbiAgICAgICAgaWYgKHRodW1iID09PSBTbGlkZXJUaHVtYi5Mb3dlcikge1xuXG4gICAgICAgICAgICBpZiAodGhpcy50aHVtYnMudXBwZXIudmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSA8PSB0aGlzLnRodW1icy51cHBlci52YWx1ZSA/IHZhbHVlIDogdGhpcy50aHVtYnMudXBwZXIudmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGh1bWIgPT09IFNsaWRlclRodW1iLlVwcGVyKSB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnRodW1icy5sb3dlci52YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlID49IHRoaXMudGh1bWJzLmxvd2VyLnZhbHVlID8gdmFsdWUgOiB0aGlzLnRodW1icy5sb3dlci52YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlT3B0aW9ucygpOiB2b2lkIHtcblxuICAgICAgICAvLyBhZGQgaW4gdGhlIGRlZmF1bHQgb3B0aW9ucyB0aGF0IHVzZXIgaGFzbid0IHNwZWNpZmllZFxuICAgICAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLmRlZXBNZXJnZSh0aGlzLm9wdGlvbnMgfHwge30sIHRoaXMuZGVmYXVsdE9wdGlvbnMpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlVHJhY2tDb2xvcnMoKTtcbiAgICAgICAgdGhpcy51cGRhdGVUaWNrcygpO1xuICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlcygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlVmFsdWVzKCk6IHZvaWQge1xuXG4gICAgICAgIGlmICh0aGlzLnZhbHVlID09PSB1bmRlZmluZWQgfHwgdGhpcy52YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbG93ZXJWYWx1ZSA9IHR5cGVvZiB0aGlzLnZhbHVlID09PSAnbnVtYmVyJyA/IHRoaXMudmFsdWUgOiB0aGlzLnZhbHVlLmxvdztcbiAgICAgICAgbGV0IHVwcGVyVmFsdWUgPSB0eXBlb2YgdGhpcy52YWx1ZSA9PT0gJ251bWJlcicgPyB0aGlzLnZhbHVlIDogdGhpcy52YWx1ZS5oaWdoO1xuXG4gICAgICAgIC8vIHZhbGlkYXRlIHZhbHVlc1xuICAgICAgICBsb3dlclZhbHVlID0gdGhpcy52YWxpZGF0ZVZhbHVlKFNsaWRlclRodW1iLkxvd2VyLCBOdW1iZXIobG93ZXJWYWx1ZS50b0ZpeGVkKDQpKSk7XG4gICAgICAgIHVwcGVyVmFsdWUgPSB0aGlzLnZhbGlkYXRlVmFsdWUoU2xpZGVyVGh1bWIuVXBwZXIsIE51bWJlcih1cHBlclZhbHVlLnRvRml4ZWQoNCkpKTtcblxuICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIHBvc2l0aW9ucyBhcyBwZXJjZW50YWdlc1xuICAgICAgICBsZXQgbG93ZXJQb3NpdGlvbiA9ICgoKGxvd2VyVmFsdWUgLSB0aGlzLm9wdGlvbnMudHJhY2subWluKSAvICh0aGlzLm9wdGlvbnMudHJhY2subWF4IC0gdGhpcy5vcHRpb25zLnRyYWNrLm1pbikpICogMTAwKTtcbiAgICAgICAgbGV0IHVwcGVyUG9zaXRpb24gPSAoKCh1cHBlclZhbHVlIC0gdGhpcy5vcHRpb25zLnRyYWNrLm1pbikgLyAodGhpcy5vcHRpb25zLnRyYWNrLm1heCAtIHRoaXMub3B0aW9ucy50cmFjay5taW4pKSAqIDEwMCk7XG5cbiAgICAgICAgLy8gdXBkYXRlIHRodW1iIHBvc2l0aW9uc1xuICAgICAgICB0aGlzLnRodW1icy5sb3dlci5wb3NpdGlvbiA9IGxvd2VyUG9zaXRpb247XG4gICAgICAgIHRoaXMudGh1bWJzLnVwcGVyLnBvc2l0aW9uID0gdXBwZXJQb3NpdGlvbjtcblxuICAgICAgICAvLyBjYWxjdWxhdGUgdGhlIHRyYWNrIHNpemVzXG4gICAgICAgIHRoaXMudHJhY2tzLmxvd2VyLnNpemUgPSBsb3dlclBvc2l0aW9uO1xuICAgICAgICB0aGlzLnRyYWNrcy5taWRkbGUuc2l6ZSA9IHVwcGVyUG9zaXRpb24gLSBsb3dlclBvc2l0aW9uO1xuICAgICAgICB0aGlzLnRyYWNrcy51cHBlci5zaXplID0gdGhpcy5vcHRpb25zLnR5cGUgPT09IFNsaWRlclR5cGUuVmFsdWUgPyAxMDAgLSBsb3dlclBvc2l0aW9uIDogMTAwIC0gdXBwZXJQb3NpdGlvbjtcblxuICAgICAgICAvLyB1cGRhdGUgdGhlIHZhbHVlIGlucHV0XG4gICAgICAgIHRoaXMuc2V0VmFsdWUobG93ZXJWYWx1ZSwgdXBwZXJWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRWYWx1ZShsb3c6IG51bWJlciwgaGlnaD86IG51bWJlcik6IHZvaWQge1xuXG4gICAgICAgIHRoaXMudGh1bWJzLmxvd2VyLnZhbHVlID0gbG93O1xuICAgICAgICB0aGlzLnRodW1icy51cHBlci52YWx1ZSA9IGhpZ2g7XG5cbiAgICAgICAgbGV0IHByZXZpb3VzVmFsdWUgPSB0aGlzLmNsb25lKHRoaXMuX3ZhbHVlKTtcblxuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5vcHRpb25zLnR5cGUgPT09IFNsaWRlclR5cGUuVmFsdWUgPyBsb3cgOiB7IGxvdzogbG93LCBoaWdoOiBoaWdoIH07XG5cbiAgICAgICAgLy8gY2FsbCB0aGUgZXZlbnQgZW1pdHRlciBpZiBjaGFuZ2VzIG9jY3VyZWRcbiAgICAgICAgaWYgKHRoaXMuZGV0ZWN0VmFsdWVDaGFuZ2UodGhpcy52YWx1ZSwgcHJldmlvdXNWYWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh0aGlzLmNsb25lKHRoaXMudmFsdWUpKTtcblxuICAgICAgICAgICAgdGhpcy51cGRhdGVUb29sdGlwVGV4dChTbGlkZXJUaHVtYi5Mb3dlcik7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRvb2x0aXBUZXh0KFNsaWRlclRodW1iLlVwcGVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh0aGlzLmNsb25lKHRoaXMudmFsdWUpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2V0VGh1bWJWYWx1ZSh0aHVtYjogU2xpZGVyVGh1bWIsIHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcblxuICAgICAgICAvLyB1cGRhdGUgdGhlIHRodW1iIHZhbHVlXG4gICAgICAgIHRoaXMuZ2V0VGh1bWJTdGF0ZSh0aHVtYikudmFsdWUgPSB2YWx1ZTtcblxuICAgICAgICAvLyBmb3J3YXJkIHRoZXNlIGNoYW5nZXMgdG8gdGhlIHZhbHVlXG4gICAgICAgIHRoaXMuc2V0VmFsdWUodGhpcy50aHVtYnMubG93ZXIudmFsdWUsIHRoaXMudGh1bWJzLnVwcGVyLnZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVRpY2tzKCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGdldCB0aWNrIG9wdGlvbnNcbiAgICAgICAgY29uc3QgbWFqb3JPcHRpb25zID0gdGhpcy5vcHRpb25zLnRyYWNrLnRpY2tzLm1ham9yO1xuICAgICAgICBjb25zdCBtaW5vck9wdGlvbnMgPSB0aGlzLm9wdGlvbnMudHJhY2sudGlja3MubWlub3I7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgd2Ugc2hvdWxkIHNob3cgdGlja3NcbiAgICAgICAgaWYgKG1ham9yT3B0aW9ucy5zaG93ID09PSBmYWxzZSAmJiBtaW5vck9wdGlvbnMuc2hvdyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMudGlja3MgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNyZWF0ZSB0aWNrcyBmb3IgYm90aCBtYWpvciBhbmQgbWlub3IgLSBvbmx5IGdldCB0aGUgb25lcyB0byBiZSBzaG93blxuICAgICAgICBjb25zdCBtYWpvclRpY2tzID0gdGhpcy5nZXRUaWNrcyhtYWpvck9wdGlvbnMsIFNsaWRlclRpY2tUeXBlLk1ham9yKS5maWx0ZXIodGljayA9PiB0aWNrLnNob3dUaWNrcyk7XG4gICAgICAgIGNvbnN0IG1pbm9yVGlja3MgPSB0aGlzLmdldFRpY2tzKG1pbm9yT3B0aW9ucywgU2xpZGVyVGlja1R5cGUuTWlub3IpLmZpbHRlcih0aWNrID0+IHRpY2suc2hvd1RpY2tzKTtcblxuICAgICAgICAvLyByZW1vdmUgYW55IG1pbm9yIHRpY2tzIHRoYXQgYXJlIG9uIGEgbWFqb3IgaW50ZXJ2YWxcbiAgICAgICAgdGhpcy50aWNrcyA9IHRoaXMudW5pb25UaWNrcyhtYWpvclRpY2tzLCBtaW5vclRpY2tzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVRyYWNrQ29sb3JzKCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGdldCBjb2xvcnMgZm9yIGVhY2ggcGFydCBvZiB0aGUgdHJhY2tcbiAgICAgICAgY29uc3QgeyBsb3dlciwgcmFuZ2UsIGhpZ2hlciB9ID0gdGhpcy5vcHRpb25zLnRyYWNrLmNvbG9ycztcblxuICAgICAgICAvLyB1cGRhdGUgdGhlIGNvbnRyb2xsZXIgdmFsdWVcbiAgICAgICAgdGhpcy50cmFja3MubG93ZXIuY29sb3IgPSB0eXBlb2YgbG93ZXIgPT09ICdzdHJpbmcnID8gbG93ZXIgOiBgbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCAke2xvd2VyLmpvaW4oJywgJyl9KWA7XG4gICAgICAgIHRoaXMudHJhY2tzLm1pZGRsZS5jb2xvciA9IHR5cGVvZiByYW5nZSA9PT0gJ3N0cmluZycgPyByYW5nZSA6IGBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICR7cmFuZ2Uuam9pbignLCAnKX0pYDtcbiAgICAgICAgdGhpcy50cmFja3MudXBwZXIuY29sb3IgPSB0eXBlb2YgaGlnaGVyID09PSAnc3RyaW5nJyA/IGhpZ2hlciA6IGBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICR7aGlnaGVyLmpvaW4oJywgJyl9KWA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRTdGVwcyhzdGVwczogbnVtYmVyIHwgbnVtYmVyW10pOiBudW1iZXJbXSB7XG5cbiAgICAgICAgLy8gaWYgdGhleSBhcmUgYWxyZWFkeSBhbiBhcnJheSBqdXN0IHJldHVybiBpdFxuICAgICAgICBpZiAoc3RlcHMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgcmV0dXJuIHN0ZXBzO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG91dHB1dDogbnVtYmVyW10gPSBbXTtcblxuICAgICAgICAvLyBvdGhlcndpc2UgY2FsY3VsYXRlIHRoZSBzdGVwc1xuICAgICAgICBmb3IgKGxldCBpZHggPSB0aGlzLm9wdGlvbnMudHJhY2subWluOyBpZHggPD0gdGhpcy5vcHRpb25zLnRyYWNrLm1heDsgaWR4ICs9IHN0ZXBzKSB7XG4gICAgICAgICAgICBvdXRwdXQucHVzaChpZHgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRpY2tzKG9wdGlvbnM6IFNsaWRlclRpY2tPcHRpb25zLCB0eXBlOiBTbGlkZXJUaWNrVHlwZSk6IFNsaWRlclRpY2tbXSB7XG5cbiAgICAgICAgLy8gY3JlYXRlIGFuIGFycmF5IHRvIHN0b3JlIHRoZSB0aWNrcyBhbmQgc3RlcCBwb2ludHNcbiAgICAgICAgbGV0IHN0ZXBzID0gdGhpcy5nZXRTdGVwcyhvcHRpb25zLnN0ZXBzKTtcblxuICAgICAgICAvLyBnZXQgc29tZSBjaGFydCBvcHRpb25zXG4gICAgICAgIGxldCBtaW4gPSB0aGlzLm9wdGlvbnMudHJhY2subWluO1xuICAgICAgICBsZXQgbWF4ID0gdGhpcy5vcHRpb25zLnRyYWNrLm1heDtcblxuICAgICAgICAvLyBjb252ZXJ0IGVhY2ggc3RlcCB0byBhIHNsaWRlciB0aWNrIGFuZCByZW1vdmUgaW52YWxpZCB0aWNrc1xuICAgICAgICByZXR1cm4gc3RlcHMubWFwKHN0ZXAgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzaG93VGlja3M6IG9wdGlvbnMuc2hvdyxcbiAgICAgICAgICAgICAgICBzaG93TGFiZWxzOiBvcHRpb25zLmxhYmVscyxcbiAgICAgICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAoKHN0ZXAgLSBtaW4pIC8gKG1heCAtIG1pbikpICogMTAwLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBzdGVwLFxuICAgICAgICAgICAgICAgIGxhYmVsOiBvcHRpb25zLmZvcm1hdHRlcihzdGVwKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSkuZmlsdGVyKHRpY2sgPT4gdGljay5wb3NpdGlvbiA+PSAwICYmIHRpY2sucG9zaXRpb24gPD0gMTAwKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVuaW9uVGlja3MobWFqb3JUaWNrczogU2xpZGVyVGlja1tdLCBtaW5vclRpY2tzOiBTbGlkZXJUaWNrW10pOiBTbGlkZXJUaWNrW10ge1xuXG4gICAgICAgIC8vIGdldCBhbGwgdGlja3MgY29tYmluZWQgcmVtb3ZpbmcgYW55IG1pbm9yIHRpY2tzIHdpdGggdGhlIHNhbWUgdmFsdWUgYXMgbWFqb3IgdGlja3NcbiAgICAgICAgcmV0dXJuIG1ham9yVGlja3MuY29uY2F0KG1pbm9yVGlja3MpXG4gICAgICAgICAgICAuZmlsdGVyKCh0aWNrLCBpbmRleCwgYXJyYXkpID0+IHRpY2sudHlwZSA9PT0gU2xpZGVyVGlja1R5cGUuTWFqb3IgfHwgIWFycmF5LmZpbmQodGsgPT4gdGsudHlwZSA9PT0gU2xpZGVyVGlja1R5cGUuTWFqb3IgJiYgdGsucG9zaXRpb24gPT09IHRpY2sucG9zaXRpb24pKVxuICAgICAgICAgICAgLnNvcnQoKHQxLCB0MikgPT4gdDEudmFsdWUgLSB0Mi52YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkZWVwTWVyZ2U8VD4oZGVzdGluYXRpb246IFQsIHNvdXJjZTogVCk6IFQge1xuXG4gICAgICAgIC8vIGxvb3AgdGhvdWdoIGFsbCBvZiB0aGUgcHJvcGVydGllcyBpbiB0aGUgc291cmNlIG9iamVjdFxuICAgICAgICBmb3IgKGxldCBwcm9wIGluIHNvdXJjZSkge1xuXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgZGVzdGluYXRpb24gb2JqZWN0IGhhcyB0aGUgcHJvcGVydHlcbiAgICAgICAgICAgIGlmICghZGVzdGluYXRpb24uaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgICAgICAgICAvLyBjb3B5IHRoZSBwcm9wZXJ0eSBhY3Jvc3NcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbltwcm9wXSA9IHNvdXJjZVtwcm9wXTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgdGhlIHByb3BlcnR5IGV4aXN0cyBhbmQgaXMgbm90IGFuIG9iamVjdCB0aGVuIHNraXBcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGVzdGluYXRpb25bcHJvcF0gIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHByb3BlcnR5IGlzIGFuIGFycmF5XG4gICAgICAgICAgICBpZiAoZGVzdGluYXRpb25bcHJvcF0gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpZiBpdCBpcyBhbiBvYmplY3QgdGhlbiBwZXJmb3JtIGEgcmVjdXJzaXZlIGNoZWNrXG4gICAgICAgICAgICBkZXN0aW5hdGlvbltwcm9wXSA9IHRoaXMuZGVlcE1lcmdlKGRlc3RpbmF0aW9uW3Byb3BdLCBzb3VyY2VbcHJvcF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRlc3RpbmF0aW9uO1xuICAgIH1cblxuICAgIHByaXZhdGUgZGV0ZWN0VmFsdWVDaGFuZ2UodmFsdWUxOiBudW1iZXIgfCBTbGlkZXJWYWx1ZSwgdmFsdWUyOiBudW1iZXIgfCBTbGlkZXJWYWx1ZSk6IGJvb2xlYW4ge1xuXG4gICAgICAgIC8vIGNvbXBhcmUgdHdvIHNsaWRlciB2YWx1ZXNcbiAgICAgICAgaWYgKHRoaXMuaXNTbGlkZXJWYWx1ZSh2YWx1ZTEpICYmIHRoaXMuaXNTbGlkZXJWYWx1ZSh2YWx1ZTIpKSB7XG5cbiAgICAgICAgICAgIC8vIHJlZmVyZW5jZXMgdG8gdGhlIG9iamVjdHMgaW4gdGhlIGNvcnJlY3QgdHlwZXNcbiAgICAgICAgICAgIGNvbnN0IG9iajEgPSB2YWx1ZTEgYXMgU2xpZGVyVmFsdWU7XG4gICAgICAgICAgICBjb25zdCBvYmoyID0gdmFsdWUyIGFzIFNsaWRlclZhbHVlO1xuXG4gICAgICAgICAgICByZXR1cm4gb2JqMS5sb3cgIT09IG9iajIubG93IHx8IG9iajEuaGlnaCAhPT0gb2JqMi5oaWdoO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgbm90IGEgc2xpZGVyIHZhbHVlIC0gc2hvdWxkIGJlIG51bWJlciBvZiBudWxsYWJsZSB0eXBlIC0gY29tcGFyZSBub3JtYWxseVxuICAgICAgICByZXR1cm4gdmFsdWUxICE9PSB2YWx1ZTI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lcyB3aGV0aGVyIG9yIG5vdCBhbiBvYmplY3QgY29uZm9ybXMgdG8gdGhlXG4gICAgICogU2xpZGVyVmFsdWUgaW50ZXJmYWNlLlxuICAgICAqIEBwYXJhbSB2YWx1ZSAtIFRoZSBvYmplY3QgdG8gY2hlY2sgLSB0aGlzIG11c3QgYmUgdHlwZSBhbnlcbiAgICAgKi9cbiAgICBwcml2YXRlIGlzU2xpZGVyVmFsdWUodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIGlzIGFuIG9iamVjdFxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbmV4dCBjaGVjayBpZiBpdCBjb250YWlucyB0aGUgbmVjZXNzYXJ5IHByb3BlcnRpZXNcbiAgICAgICAgcmV0dXJuICdsb3cnIGluIHZhbHVlICYmICdoaWdoJyBpbiB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNsb25lKHZhbHVlOiBudW1iZXIgfCBTbGlkZXJWYWx1ZSk6IG51bWJlciB8IFNsaWRlclZhbHVlIHtcblxuICAgICAgICAvLyBpZiBpdCBpcyBub3QgYW4gb2JqZWN0IHNpbXBseSByZXR1cm4gdGhlIHZhbHVlXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjcmVhdGUgYSBuZXcgb2JqZWN0IGZyb20gdGhlIGV4aXN0aW5nIG9uZVxuICAgICAgICBjb25zdCBpbnN0YW5jZSA9IHsgLi4udmFsdWUgfTtcblxuICAgICAgICAvLyBkZWxldGUgcmVtb3ZlIHRoZSB2YWx1ZSBmcm9tIHRoZSBvbGQgb2JqZWN0XG4gICAgICAgIHZhbHVlID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIC8vIHJldHVybiB0aGUgbmV3IGluc3RhbmNlIG9mIHRoZSBvYmplY3RcbiAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xuICAgIH1cbn1cblxuZXhwb3J0IGVudW0gU2xpZGVyVHlwZSB7XG4gICAgVmFsdWUsXG4gICAgUmFuZ2Vcbn1cblxuZXhwb3J0IGVudW0gU2xpZGVyU3R5bGUge1xuICAgIEJ1dHRvbixcbiAgICBMaW5lXG59XG5cbmV4cG9ydCBlbnVtIFNsaWRlclNpemUge1xuICAgIE5hcnJvdyxcbiAgICBXaWRlXG59XG5cbmV4cG9ydCBlbnVtIFNsaWRlckNhbGxvdXRUcmlnZ2VyIHtcbiAgICBOb25lLFxuICAgIEhvdmVyLFxuICAgIERyYWcsXG4gICAgUGVyc2lzdGVudCxcbiAgICBEeW5hbWljXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2xpZGVyVmFsdWUge1xuICAgIGxvdzogbnVtYmVyO1xuICAgIGhpZ2g6IG51bWJlcjtcbn1cblxuZXhwb3J0IGVudW0gU2xpZGVyU25hcCB7XG4gICAgTm9uZSxcbiAgICBNaW5vcixcbiAgICBNYWpvcixcbiAgICBBbGxcbn1cblxuZXhwb3J0IGVudW0gU2xpZGVyVGlja1R5cGUge1xuICAgIE1pbm9yLFxuICAgIE1ham9yXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2xpZGVyT3B0aW9ucyB7XG4gICAgdHlwZT86IFNsaWRlclR5cGU7XG4gICAgaGFuZGxlcz86IFNsaWRlckhhbmRsZU9wdGlvbnM7XG4gICAgdHJhY2s/OiBTbGlkZXJUcmFja09wdGlvbnM7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2xpZGVySGFuZGxlT3B0aW9ucyB7XG4gICAgc3R5bGU/OiBTbGlkZXJTdHlsZTtcbiAgICBjYWxsb3V0PzogU2xpZGVyQ2FsbG91dDtcbiAgICBrZXlib2FyZD86IFNsaWRlcktleWJvYXJkT3B0aW9ucztcbiAgICBhcmlhPzogU2xpZGVyQXJpYU9wdGlvbnM7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2xpZGVyQXJpYU9wdGlvbnMge1xuICAgIHRodW1iOiBzdHJpbmc7XG4gICAgbG93ZXJUaHVtYjogc3RyaW5nO1xuICAgIHVwcGVyVGh1bWI6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTbGlkZXJLZXlib2FyZE9wdGlvbnMge1xuICAgIG1ham9yPzogbnVtYmVyO1xuICAgIG1pbm9yPzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNsaWRlclRyYWNrT3B0aW9ucyB7XG4gICAgaGVpZ2h0PzogU2xpZGVyU2l6ZTtcbiAgICBtaW4/OiBudW1iZXI7XG4gICAgbWF4PzogbnVtYmVyO1xuICAgIHRpY2tzPzogU2xpZGVyVGlja3NPcHRpb25zO1xuICAgIGNvbG9ycz86IFNsaWRlclRyYWNrQ29sb3JzO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNsaWRlclRpY2tzT3B0aW9ucyB7XG4gICAgc25hcD86IFNsaWRlclNuYXA7XG4gICAgbWFqb3I/OiBTbGlkZXJUaWNrT3B0aW9ucztcbiAgICBtaW5vcj86IFNsaWRlclRpY2tPcHRpb25zO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNsaWRlclRpY2tPcHRpb25zIHtcbiAgICBzaG93PzogYm9vbGVhbjtcbiAgICBzdGVwcz86IG51bWJlciB8IG51bWJlcltdO1xuICAgIGxhYmVscz86IGJvb2xlYW47XG4gICAgZm9ybWF0dGVyPzogKHZhbHVlOiBudW1iZXIpID0+IHN0cmluZyB8IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTbGlkZXJUaWNrIHtcbiAgICBzaG93VGlja3M6IGJvb2xlYW47XG4gICAgc2hvd0xhYmVsczogYm9vbGVhbjtcbiAgICB0eXBlOiBTbGlkZXJUaWNrVHlwZTtcbiAgICBwb3NpdGlvbjogbnVtYmVyO1xuICAgIHZhbHVlOiBudW1iZXI7XG4gICAgbGFiZWw6IHN0cmluZyB8IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTbGlkZXJUcmFja0NvbG9ycyB7XG4gICAgbG93ZXI/OiBzdHJpbmcgfCBzdHJpbmdbXTtcbiAgICByYW5nZT86IHN0cmluZyB8IHN0cmluZ1tdO1xuICAgIGhpZ2hlcj86IHN0cmluZyB8IHN0cmluZ1tdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNsaWRlckNhbGxvdXQge1xuICAgIHRyaWdnZXI/OiBTbGlkZXJDYWxsb3V0VHJpZ2dlcjtcbiAgICBiYWNrZ3JvdW5kPzogc3RyaW5nO1xuICAgIGNvbG9yPzogc3RyaW5nO1xuICAgIGZvcm1hdHRlcj86ICh2YWx1ZTogbnVtYmVyKSA9PiBzdHJpbmcgfCBudW1iZXI7XG59XG5cbmV4cG9ydCBlbnVtIFNsaWRlclRodW1iRXZlbnQge1xuICAgIE5vbmUsXG4gICAgTW91c2VPdmVyLFxuICAgIE1vdXNlTGVhdmUsXG4gICAgRHJhZ1N0YXJ0LFxuICAgIERyYWdFbmRcbn1cblxuZXhwb3J0IGVudW0gU2xpZGVyVGh1bWIge1xuICAgIExvd2VyLFxuICAgIFVwcGVyXG59Il19