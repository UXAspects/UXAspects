/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ColorService } from '../../services/color/index';
var SliderComponent = /** @class */ (function () {
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
                }] }
    ];
    /** @nocollapse */
    SliderComponent.ctorParameters = function () { return [
        { type: ColorService },
        { type: ChangeDetectorRef }
    ]; };
    SliderComponent.propDecorators = {
        value: [{ type: Input }],
        options: [{ type: Input }],
        valueChange: [{ type: Output }],
        lowerTooltip: [{ type: ViewChild, args: ['lowerTooltip',] }],
        upperTooltip: [{ type: ViewChild, args: ['upperTooltip',] }],
        track: [{ type: ViewChild, args: ['track',] }]
    };
    return SliderComponent;
}());
export { SliderComponent };
function SliderComponent_tsickle_Closure_declarations() {
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
    /** @type {?|undefined} */
    SliderAriaOptions.prototype.thumb;
    /** @type {?|undefined} */
    SliderAriaOptions.prototype.lowerThumb;
    /** @type {?|undefined} */
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3NsaWRlci9zbGlkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFpQix1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQVcsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxSyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7O0lBK0V0RCx5QkFBWSxZQUEwQixFQUFVLGtCQUFxQztRQUFyQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO3FCQXRFOUMsQ0FBQzsyQkFFb0IsSUFBSSxZQUFZLEVBQXdCOzswQkFVdkYsVUFBVTsyQkFDVCxXQUFXOzBCQUNaLFVBQVU7MEJBQ1YsVUFBVTsyQkFDVCxXQUFXOzhCQUNSLGNBQWM7Z0NBQ1osZ0JBQWdCO29DQUNaLG9CQUFvQjtzQkFFbEM7WUFDTCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLENBQUM7Z0JBQ1AsS0FBSyxFQUFFLEVBQUU7YUFDWjtZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsQ0FBQztnQkFDUCxLQUFLLEVBQUUsRUFBRTthQUNaO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxDQUFDO2dCQUNQLEtBQUssRUFBRSxFQUFFO2FBQ1o7U0FDSjt3QkFFVTtZQUNQLEtBQUssRUFBRTtnQkFDSCxPQUFPLEVBQUUsS0FBSztnQkFDZCxRQUFRLEVBQUUsQ0FBQztnQkFDWCxLQUFLLEVBQUUsRUFBRTthQUNaO1lBQ0QsS0FBSyxFQUFFO2dCQUNILE9BQU8sRUFBRSxLQUFLO2dCQUNkLFFBQVEsRUFBRSxDQUFDO2dCQUNYLEtBQUssRUFBRSxFQUFFO2FBQ1o7U0FDSjtzQkFFUTtZ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QUFDLENBQUMsQ0FBQztZQUNqQyxNQUFNLENBQUMsS0FBSyxLQUFLLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7U0FDM0g7O1FBR0QsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBRTlCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxNQUFNLENBQUMsS0FBSyxDQUFDO2FBQ2hCO1lBRUQsTUFBTSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1NBQzdFO1FBRUQsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBRTlCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxNQUFNLENBQUMsS0FBSyxDQUFDO2FBQ2hCO1lBRUQsTUFBTSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1NBQzdFOzs7OztJQUdHLHVDQUFhOzs7OztRQUdqQixJQUFJLENBQUMsT0FB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SyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDNUIsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUNoQjs7UUFHRCxNQUFNLENBQUMsS0FBSyxJQUFJLEtBQUssSUFBSSxNQUFNLElBQUksS0FBSyxDQUFDOzs7Ozs7SUFHckMsK0JBQUs7Ozs7Y0FBQyxLQUEyQjs7UUFHckMsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUM1QixNQUFNLENBQUMsS0FBSyxDQUFDO1NBQ2hCOztRQUdELHFCQUFNLFFBQVEsd0JBQVEsS0FBSyxDQUFFLENBQUM7O1FBRzlCLEtBQUssR0FBRyxTQUFTLENBQUM7O1FBR2xCLE1BQU0sQ0FBQyxRQUFRLENBQUM7OztnQkE5dUJ2QixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLG05UEFBc0M7b0JBQ3RDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNsRDs7OztnQkFOUSxZQUFZO2dCQUQ0QixpQkFBaUI7Ozt3QkFVN0QsS0FBSzswQkFDTCxLQUFLOzhCQUNMLE1BQU07K0JBRU4sU0FBUyxTQUFDLGNBQWM7K0JBQ3hCLFNBQVMsU0FBQyxjQUFjO3dCQUN4QixTQUFTLFNBQUMsT0FBTzs7MEJBaEJ0Qjs7U0FRYSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIERvQ2hlY2ssIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbG9yU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NvbG9yL2luZGV4JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1zbGlkZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9zbGlkZXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFNsaWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgRG9DaGVjayB7XG5cbiAgICBASW5wdXQoKSB2YWx1ZTogU2xpZGVyVmFsdWUgfCBudW1iZXIgPSAwO1xuICAgIEBJbnB1dCgpIG9wdGlvbnM6IFNsaWRlck9wdGlvbnM7XG4gICAgQE91dHB1dCgpIHZhbHVlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8U2xpZGVyVmFsdWUgfCBudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxTbGlkZXJWYWx1ZSB8IG51bWJlcj4oKTtcblxuICAgIEBWaWV3Q2hpbGQoJ2xvd2VyVG9vbHRpcCcpIGxvd2VyVG9vbHRpcDogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKCd1cHBlclRvb2x0aXAnKSB1cHBlclRvb2x0aXA6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZCgndHJhY2snKSB0cmFjazogRWxlbWVudFJlZjtcblxuICAgIC8vIHN0b3JlIGN1cnJlbnQgdmFsdWVzIGZvciBkZWVwIGNoYW5nZSBkZXRlY3Rpb25cbiAgICBwcml2YXRlIF92YWx1ZTogU2xpZGVyVmFsdWUgfCBudW1iZXI7XG5cbiAgICAvLyBleHBvc2UgZW51bXMgdG8gQW5ndWxhciB2aWV3XG4gICAgc2xpZGVyVHlwZSA9IFNsaWRlclR5cGU7XG4gICAgc2xpZGVyU3R5bGUgPSBTbGlkZXJTdHlsZTtcbiAgICBzbGlkZXJTaXplID0gU2xpZGVyU2l6ZTtcbiAgICBzbGlkZXJTbmFwID0gU2xpZGVyU25hcDtcbiAgICBzbGlkZXJUaHVtYiA9IFNsaWRlclRodW1iO1xuICAgIHNsaWRlclRpY2tUeXBlID0gU2xpZGVyVGlja1R5cGU7XG4gICAgc2xpZGVyVGh1bWJFdmVudCA9IFNsaWRlclRodW1iRXZlbnQ7XG4gICAgc2xpZGVyQ2FsbG91dFRyaWdnZXIgPSBTbGlkZXJDYWxsb3V0VHJpZ2dlcjtcblxuICAgIHRyYWNrcyA9IHtcbiAgICAgICAgbG93ZXI6IHtcbiAgICAgICAgICAgIHNpemU6IDAsXG4gICAgICAgICAgICBjb2xvcjogJydcbiAgICAgICAgfSxcbiAgICAgICAgbWlkZGxlOiB7XG4gICAgICAgICAgICBzaXplOiAwLFxuICAgICAgICAgICAgY29sb3I6ICcnXG4gICAgICAgIH0sXG4gICAgICAgIHVwcGVyOiB7XG4gICAgICAgICAgICBzaXplOiAwLFxuICAgICAgICAgICAgY29sb3I6ICcnXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdG9vbHRpcHMgPSB7XG4gICAgICAgIGxvd2VyOiB7XG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHBvc2l0aW9uOiAwLFxuICAgICAgICAgICAgbGFiZWw6ICcnXG4gICAgICAgIH0sXG4gICAgICAgIHVwcGVyOiB7XG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHBvc2l0aW9uOiAwLFxuICAgICAgICAgICAgbGFiZWw6ICcnXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGh1bWJzID0ge1xuICAgICAgICBsb3dlcjoge1xuICAgICAgICAgICAgaG92ZXI6IGZhbHNlLFxuICAgICAgICAgICAgZHJhZzogZmFsc2UsXG4gICAgICAgICAgICBwb3NpdGlvbjogMCxcbiAgICAgICAgICAgIG9yZGVyOiAxMDAsXG4gICAgICAgICAgICB2YWx1ZTogbnVsbCBhcyBudW1iZXJcbiAgICAgICAgfSxcbiAgICAgICAgdXBwZXI6IHtcbiAgICAgICAgICAgIGhvdmVyOiBmYWxzZSxcbiAgICAgICAgICAgIGRyYWc6IGZhbHNlLFxuICAgICAgICAgICAgcG9zaXRpb246IDAsXG4gICAgICAgICAgICBvcmRlcjogMTAxLFxuICAgICAgICAgICAgdmFsdWU6IG51bGwgYXMgbnVtYmVyXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gc3RvcmUgYWxsIHRoZSB0aWNrcyB0byBkaXNwbGF5XG4gICAgdGlja3M6IFNsaWRlclRpY2tbXSA9IFtdO1xuICAgIGRlZmF1bHRPcHRpb25zOiBTbGlkZXJPcHRpb25zO1xuXG4gICAgY29uc3RydWN0b3IoY29sb3JTZXJ2aWNlOiBDb2xvclNlcnZpY2UsIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuXG4gICAgICAgIC8vIHNldHVwIGRlZmF1bHQgb3B0aW9uc1xuICAgICAgICB0aGlzLmRlZmF1bHRPcHRpb25zID0ge1xuICAgICAgICAgICAgdHlwZTogU2xpZGVyVHlwZS5WYWx1ZSxcbiAgICAgICAgICAgIGhhbmRsZXM6IHtcbiAgICAgICAgICAgICAgICBzdHlsZTogU2xpZGVyU3R5bGUuQnV0dG9uLFxuICAgICAgICAgICAgICAgIGNhbGxvdXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcjogU2xpZGVyQ2FsbG91dFRyaWdnZXIuTm9uZSxcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogY29sb3JTZXJ2aWNlLmdldENvbG9yKCdncmV5MicpLnRvSGV4KCksXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnI2ZmZicsXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlcjogKHZhbHVlOiBudW1iZXIpOiBzdHJpbmcgfCBudW1iZXIgPT4gdmFsdWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGtleWJvYXJkOiB7XG4gICAgICAgICAgICAgICAgICAgIG1ham9yOiA1LFxuICAgICAgICAgICAgICAgICAgICBtaW5vcjogMVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYXJpYToge1xuICAgICAgICAgICAgICAgICAgICB0aHVtYjogJ1NsaWRlciB2YWx1ZScsXG4gICAgICAgICAgICAgICAgICAgIGxvd2VyVGh1bWI6ICdTbGlkZXIgbG93ZXIgdmFsdWUnLFxuICAgICAgICAgICAgICAgICAgICB1cHBlclRodW1iOiAnU2xpZGVyIHVwcGVyIHZhbHVlJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0cmFjazoge1xuICAgICAgICAgICAgICAgIGhlaWdodDogU2xpZGVyU2l6ZS5XaWRlLFxuICAgICAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgICAgICBtYXg6IDEwMCxcbiAgICAgICAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgICAgICAgICBzbmFwOiBTbGlkZXJTbmFwLk5vbmUsXG4gICAgICAgICAgICAgICAgICAgIG1ham9yOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RlcHM6IDEwLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVyOiAodmFsdWU6IG51bWJlcik6IHN0cmluZyB8IG51bWJlciA9PiB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBtaW5vcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXBzOiA1LFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlcjogKHZhbHVlOiBudW1iZXIpOiBzdHJpbmcgfCBudW1iZXIgPT4gdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY29sb3JzOiB7XG4gICAgICAgICAgICAgICAgICAgIGxvd2VyOiBjb2xvclNlcnZpY2UuZ2V0Q29sb3IoJ2dyZXk2JykudG9IZXgoKSxcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2U6IGNvbG9yU2VydmljZS5nZXRDb2xvcignYWNjZW50Jykuc2V0QWxwaGEoMC43NSkudG9SZ2JhKCksXG4gICAgICAgICAgICAgICAgICAgIGhpZ2hlcjogY29sb3JTZXJ2aWNlLmdldENvbG9yKCdncmV5NicpLnRvSGV4KClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG5cbiAgICAgICAgdGhpcy51cGRhdGVPcHRpb25zKCk7XG4gICAgICAgIHRoaXMudXBkYXRlVmFsdWVzKCk7XG5cbiAgICAgICAgdGhpcy5zZXRUaHVtYlN0YXRlKFNsaWRlclRodW1iLkxvd2VyLCBmYWxzZSwgZmFsc2UpO1xuICAgICAgICB0aGlzLnNldFRodW1iU3RhdGUoU2xpZGVyVGh1bWIuVXBwZXIsIGZhbHNlLCBmYWxzZSk7XG5cbiAgICAgICAgLy8gZW1pdCB0aGUgaW5pdGlhbCB2YWx1ZVxuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLm5leHQodGhpcy5jbG9uZSh0aGlzLnZhbHVlKSk7XG4gICAgfVxuXG4gICAgbmdEb0NoZWNrKCk6IHZvaWQge1xuXG4gICAgICAgIGlmICh0aGlzLmRldGVjdFZhbHVlQ2hhbmdlKHRoaXMudmFsdWUsIHRoaXMuX3ZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZXMoKTtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gdGhpcy5jbG9uZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgLy8gcGVyc2lzdGVudCB0b29sdGlwcyB3aWxsIG5lZWQgcG9zaXRpb25lZCBjb3JyZWN0bHkgYXQgdGhpcyBzdGFnZVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVG9vbHRpcFBvc2l0aW9uKFNsaWRlclRodW1iLkxvd2VyKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVG9vbHRpcFBvc2l0aW9uKFNsaWRlclRodW1iLlVwcGVyKTtcblxuICAgICAgICAgICAgLy8gbWFyayBhcyBkaXJ0eVxuICAgICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNuYXBUb05lYXJlc3RUaWNrKHRodW1iOiBTbGlkZXJUaHVtYiwgc25hcFRhcmdldDogU2xpZGVyU25hcCwgZm9yd2FyZHM6IGJvb2xlYW4pOiB2b2lkIHtcblxuICAgICAgICAvLyBnZXQgdGhlIHZhbHVlIGZvciB0aGUgdGh1bWJcbiAgICAgICAgY29uc3QgeyB2YWx1ZSB9ID0gdGhpcy5nZXRUaHVtYlN0YXRlKHRodW1iKTtcblxuICAgICAgICAvLyBnZXQgdGhlIGNsb3Nlc3QgdGlja3MgLSByZW1vdmUgYW55IHRpY2sgaWYgd2UgYXJlIGN1cnJlbnRseSBvbiBpdFxuICAgICAgICBjb25zdCBjbG9zZXN0ID0gdGhpcy5nZXRUaWNrRGlzdGFuY2VzKHZhbHVlLCB0aHVtYiwgc25hcFRhcmdldClcbiAgICAgICAgICAgIC5maWx0ZXIodGljayA9PiB0aWNrLnZhbHVlICE9PSB2YWx1ZSlcbiAgICAgICAgICAgIC5maW5kKHRpY2sgPT4gZm9yd2FyZHMgPyB0aWNrLnZhbHVlID4gdmFsdWUgOiB0aWNrLnZhbHVlIDwgdmFsdWUpO1xuXG4gICAgICAgIC8vIElmIHdlIGhhdmUgbm8gdGlja3MgdGhlbiBtb3ZlIGJ5IGEgcHJlZGVmaW5lZCBhbW91bnRcbiAgICAgICAgaWYgKGNsb3Nlc3QpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldFRodW1iVmFsdWUodGh1bWIsIHRoaXMudmFsaWRhdGVWYWx1ZSh0aHVtYiwgY2xvc2VzdC52YWx1ZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc3RlcCA9IHNuYXBUYXJnZXQgPT09IFNsaWRlclNuYXAuTWFqb3IgPyB0aGlzLm9wdGlvbnMuaGFuZGxlcy5rZXlib2FyZC5tYWpvciA6IHRoaXMub3B0aW9ucy5oYW5kbGVzLmtleWJvYXJkLm1pbm9yO1xuXG4gICAgICAgIHRoaXMuc2V0VGh1bWJWYWx1ZSh0aHVtYiwgdGhpcy52YWxpZGF0ZVZhbHVlKHRodW1iLCB2YWx1ZSArIChmb3J3YXJkcyA/IHN0ZXAgOiAtc3RlcCkpKTtcblxuICAgIH1cblxuICAgIHNuYXBUb0VuZCh0aHVtYjogU2xpZGVyVGh1bWIsIGZvcndhcmRzOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0VGh1bWJWYWx1ZSh0aHVtYiwgdGhpcy52YWxpZGF0ZVZhbHVlKHRodW1iLCBmb3J3YXJkcyA/IHRoaXMub3B0aW9ucy50cmFjay5tYXggOiB0aGlzLm9wdGlvbnMudHJhY2subWluKSk7XG4gICAgfVxuXG4gICAgZ2V0VGh1bWJWYWx1ZSh0aHVtYjogU2xpZGVyVGh1bWIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRUaHVtYlN0YXRlKHRodW1iKS52YWx1ZTtcbiAgICB9XG5cbiAgICBnZXRGb3JtYXR0ZWRWYWx1ZSh0aHVtYjogU2xpZGVyVGh1bWIpOiBzdHJpbmcgfCBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmhhbmRsZXMuY2FsbG91dC5mb3JtYXR0ZXIodGhpcy5nZXRUaHVtYlN0YXRlKHRodW1iKS52YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRUaHVtYlN0YXRlKHRodW1iOiBTbGlkZXJUaHVtYikge1xuICAgICAgICByZXR1cm4gdGh1bWIgPT09IFNsaWRlclRodW1iLkxvd2VyID8gdGhpcy50aHVtYnMubG93ZXIgOiB0aGlzLnRodW1icy51cHBlcjtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFRodW1iU3RhdGUodGh1bWI6IFNsaWRlclRodW1iLCBob3ZlcjogYm9vbGVhbiwgZHJhZzogYm9vbGVhbikge1xuXG4gICAgICAgIGlmICh0aHVtYiA9PT0gU2xpZGVyVGh1bWIuTG93ZXIpIHtcbiAgICAgICAgICAgIHRoaXMudGh1bWJzLmxvd2VyLmhvdmVyID0gaG92ZXI7XG4gICAgICAgICAgICB0aGlzLnRodW1icy5sb3dlci5kcmFnID0gZHJhZztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudGh1bWJzLnVwcGVyLmhvdmVyID0gaG92ZXI7XG4gICAgICAgICAgICB0aGlzLnRodW1icy51cHBlci5kcmFnID0gZHJhZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgdG9vbHRpcHNcbiAgICAgICAgdGhpcy51cGRhdGVUb29sdGlwcyh0aHVtYik7XG4gICAgfVxuXG4gICAgdGh1bWJFdmVudCh0aHVtYjogU2xpZGVyVGh1bWIsIGV2ZW50OiBTbGlkZXJUaHVtYkV2ZW50KTogdm9pZCB7XG5cbiAgICAgICAgLy8gZ2V0IHRoZSBjdXJyZW50IHRodW1iIHN0YXRlXG4gICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5nZXRUaHVtYlN0YXRlKHRodW1iKTtcblxuICAgICAgICAvLyB1cGRhdGUgYmFzZWQgdXBvbiBldmVudFxuICAgICAgICBzd2l0Y2ggKGV2ZW50KSB7XG5cbiAgICAgICAgICAgIGNhc2UgU2xpZGVyVGh1bWJFdmVudC5EcmFnU3RhcnQ6XG4gICAgICAgICAgICAgICAgc3RhdGUuZHJhZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgU2xpZGVyVGh1bWJFdmVudC5EcmFnRW5kOlxuICAgICAgICAgICAgICAgIHN0YXRlLmRyYWcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBTbGlkZXJUaHVtYkV2ZW50Lk1vdXNlT3ZlcjpcbiAgICAgICAgICAgICAgICBzdGF0ZS5ob3ZlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgU2xpZGVyVGh1bWJFdmVudC5Nb3VzZUxlYXZlOlxuICAgICAgICAgICAgICAgIHN0YXRlLmhvdmVyID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgU2xpZGVyVGh1bWJFdmVudC5Ob25lOlxuICAgICAgICAgICAgICAgIHN0YXRlLmRyYWcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBzdGF0ZS5ob3ZlciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSB0aHVtYiBzdGF0ZVxuICAgICAgICB0aGlzLnNldFRodW1iU3RhdGUodGh1bWIsIHN0YXRlLmhvdmVyLCBzdGF0ZS5kcmFnKTtcbiAgICB9XG5cbiAgICBnZXRBcmlhVmFsdWVUZXh0KHRodW1iOiBTbGlkZXJUaHVtYik6IHN0cmluZyB8IG51bWJlciB7XG4gICAgICAgIC8vIGdldCB0aGUgY3VycmVudCB0aHVtYiB2YWx1ZVxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0VGh1bWJWYWx1ZSh0aHVtYik7XG5cbiAgICAgICAgLy8gZ2V0IGFsbCB0aGUgdGlja3NcbiAgICAgICAgY29uc3QgdGljayA9IHRoaXMudGlja3MuZmluZChfdGljayA9PiBfdGljay52YWx1ZSA9PT0gdmFsdWUpO1xuXG4gICAgICAgIGlmICh0aWNrICYmIHRpY2subGFiZWwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aWNrLmxhYmVsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gb3RoZXJ3aXNlIHNpbXBseSBkaXNwbGF5IHRoZSBmb3JtYXR0ZWQgdmFsdWVcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Rm9ybWF0dGVkVmFsdWUodGh1bWIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlVG9vbHRpcHModGh1bWI6IFNsaWRlclRodW1iKTogdm9pZCB7XG5cbiAgICAgICAgbGV0IHZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLmdldFRodW1iU3RhdGUodGh1bWIpO1xuXG4gICAgICAgIHN3aXRjaCAodGhpcy5vcHRpb25zLmhhbmRsZXMuY2FsbG91dC50cmlnZ2VyKSB7XG5cbiAgICAgICAgICAgIGNhc2UgU2xpZGVyQ2FsbG91dFRyaWdnZXIuUGVyc2lzdGVudDpcbiAgICAgICAgICAgICAgICB2aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBTbGlkZXJDYWxsb3V0VHJpZ2dlci5EcmFnOlxuICAgICAgICAgICAgICAgIHZpc2libGUgPSBzdGF0ZS5kcmFnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFNsaWRlckNhbGxvdXRUcmlnZ2VyLkhvdmVyOlxuICAgICAgICAgICAgICAgIHZpc2libGUgPSBzdGF0ZS5ob3ZlciB8fCBzdGF0ZS5kcmFnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFNsaWRlckNhbGxvdXRUcmlnZ2VyLkR5bmFtaWM6XG4gICAgICAgICAgICAgICAgdmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB1cGRhdGUgdGhlIHN0YXRlIGZvciB0aGUgY29ycmVzcG9uZGluZyB0aHVtYlxuICAgICAgICB0aGlzLmdldFRvb2x0aXAodGh1bWIpLnZpc2libGUgPSB2aXNpYmxlO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgdG9vbHRpcCB0ZXh0XG4gICAgICAgIHRoaXMudXBkYXRlVG9vbHRpcFRleHQodGh1bWIpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgdG9vbHRpcCBwb3NpdGlvbnNcbiAgICAgICAgdGhpcy51cGRhdGVUb29sdGlwUG9zaXRpb24odGh1bWIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlVG9vbHRpcFRleHQodGh1bWI6IFNsaWRlclRodW1iKSB7XG5cbiAgICAgICAgLy8gZ2V0IHRoZSB0aHVtYiB2YWx1ZVxuICAgICAgICBsZXQgc3RhdGUgPSB0aGlzLmdldFRodW1iU3RhdGUodGh1bWIpO1xuICAgICAgICBsZXQgdG9vbHRpcCA9IHRoaXMuZ2V0VG9vbHRpcCh0aHVtYik7XG5cbiAgICAgICAgLy8gc3RvcmUgdGhlIGZvcm1hdHRlZCBsYWJlbFxuICAgICAgICB0b29sdGlwLmxhYmVsID0gdGhpcy5nZXRGb3JtYXR0ZWRWYWx1ZSh0aHVtYikudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRvb2x0aXBFbGVtZW50KHRodW1iOiBTbGlkZXJUaHVtYik6IEVsZW1lbnRSZWYge1xuICAgICAgICByZXR1cm4gdGh1bWIgPT09IFNsaWRlclRodW1iLkxvd2VyID8gdGhpcy5sb3dlclRvb2x0aXAgOiB0aGlzLnVwcGVyVG9vbHRpcDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRvb2x0aXAodGh1bWI6IFNsaWRlclRodW1iKSB7XG4gICAgICAgIHJldHVybiB0aHVtYiA9PT0gU2xpZGVyVGh1bWIuTG93ZXIgPyB0aGlzLnRvb2x0aXBzLmxvd2VyIDogdGhpcy50b29sdGlwcy51cHBlcjtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVRvb2x0aXBQb3NpdGlvbih0aHVtYjogU2xpZGVyVGh1bWIpOiB2b2lkIHtcblxuICAgICAgICBjb25zdCB0b29sdGlwID0gdGhpcy5nZXRUb29sdGlwKHRodW1iKTtcblxuICAgICAgICAvLyBpZiB0b29sdGlwIGlzIG5vdCB2aXNpYmxlIHRoZW4gc3RvcCBoZXJlXG4gICAgICAgIGlmICh0b29sdGlwLnZpc2libGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdG9vbHRpcEVsZW1lbnQgPSB0aGlzLmdldFRvb2x0aXBFbGVtZW50KHRodW1iKTtcblxuICAgICAgICAvLyBnZXQgdGhlIGVsZW1lbnQgd2lkdGhzXG4gICAgICAgIGxldCB0aHVtYldpZHRoOiBudW1iZXI7XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5oYW5kbGVzLnN0eWxlID09PSBTbGlkZXJTdHlsZS5CdXR0b24pIHtcbiAgICAgICAgICAgIHRodW1iV2lkdGggPSB0aGlzLm9wdGlvbnMudHJhY2suaGVpZ2h0ID09PSBTbGlkZXJTaXplLk5hcnJvdyA/IDE2IDogMjQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHVtYldpZHRoID0gMjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB0b29sdGlwV2lkdGggPSB0b29sdGlwRWxlbWVudC5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xuXG4gICAgICAgIC8vIGNhbGN1bGF0ZSB0aGUgdG9vbHRpcHMgbmV3IHBvc2l0aW9uXG4gICAgICAgIGxldCB0b29sdGlwUG9zaXRpb24gPSBNYXRoLmNlaWwoKHRvb2x0aXBXaWR0aCAtIHRodW1iV2lkdGgpIC8gMik7XG5cbiAgICAgICAgLy8gdXBkYXRlIHRvb2x0aXAgcG9zaXRpb25cbiAgICAgICAgdG9vbHRpcC5wb3NpdGlvbiA9IC10b29sdGlwUG9zaXRpb247XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy50eXBlID09PSBTbGlkZXJUeXBlLlJhbmdlICYmIHRoaXMub3B0aW9ucy5oYW5kbGVzLmNhbGxvdXQudHJpZ2dlciA9PT0gU2xpZGVyQ2FsbG91dFRyaWdnZXIuRHluYW1pYykge1xuICAgICAgICAgICAgdGhpcy5wcmV2ZW50VG9vbHRpcE92ZXJsYXAodG9vbHRpcCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHByZXZlbnRUb29sdGlwT3ZlcmxhcCh0b29sdGlwOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgdHJhY2tXaWR0aCA9IHRoaXMudHJhY2submF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcblxuICAgICAgICBjb25zdCBsb3dlciA9ICh0cmFja1dpZHRoIC8gMTAwKSAqIHRoaXMudGh1bWJzLmxvd2VyLnBvc2l0aW9uO1xuICAgICAgICBjb25zdCB1cHBlciA9ICh0cmFja1dpZHRoIC8gMTAwKSAqIHRoaXMudGh1bWJzLnVwcGVyLnBvc2l0aW9uO1xuXG4gICAgICAgIGNvbnN0IGxvd2VyV2lkdGggPSB0aGlzLmxvd2VyVG9vbHRpcC5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoIC8gMjtcbiAgICAgICAgY29uc3QgdXBwZXJXaWR0aCA9IHRoaXMudXBwZXJUb29sdGlwLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGggLyAyO1xuXG4gICAgICAgIGNvbnN0IGRpZmYgPSAobG93ZXIgKyBsb3dlcldpZHRoKSAtICh1cHBlciAtIHVwcGVyV2lkdGgpO1xuXG4gICAgICAgIC8vIGlmIHRoZSB0b29sdGlwcyBhcmUgY2xvc2VyIHRoYW4gMTZweCB0aGVuIGFkanVzdCBzbyB0aGUgZG9udCBtb3ZlIGFueSBjbG9zZVxuICAgICAgICBpZiAoZGlmZiA+IDApIHtcbiAgICAgICAgICAgIGlmICh0b29sdGlwID09PSB0aGlzLnRvb2x0aXBzLmxvd2VyICYmIHRoaXMudGh1bWJzLmxvd2VyLmRyYWcgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgdG9vbHRpcC5wb3NpdGlvbiAtPSAoZGlmZiAvIDIpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0b29sdGlwID09PSB0aGlzLnRvb2x0aXBzLnVwcGVyICYmIHRoaXMudGh1bWJzLnVwcGVyLmRyYWcgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgdG9vbHRpcC5wb3NpdGlvbiArPSAoZGlmZiAvIDIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjbGFtcCh2YWx1ZTogbnVtYmVyLCBtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgodmFsdWUsIG1pbiksIG1heCk7XG4gICAgfVxuXG4gICAgdXBkYXRlVGh1bWJQb3NpdGlvbihldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQsIHRodW1iOiBTbGlkZXJUaHVtYik6IHZvaWQge1xuXG4gICAgICAgIC8vIGdldCBldmVudCBwb3NpdGlvbiAtIGVpdGhlciBtb3VzZSBvciB0b3VjaFxuICAgICAgICBsZXQgZXZlbnRQb3NpdGlvbiA9IGV2ZW50IGluc3RhbmNlb2YgTW91c2VFdmVudCA/IGV2ZW50LmNsaWVudFggOiBldmVudC50b3VjaGVzICYmIGV2ZW50LnRvdWNoZXMubGVuZ3RoID4gMCA/IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WCA6IG51bGw7XG5cbiAgICAgICAgLy8gaWYgZXZlbnQgcG9zaXRpb24gaXMgbnVsbCBkbyBub3RoaW5nXG4gICAgICAgIGlmIChldmVudFBvc2l0aW9uID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnZXQgbW91c2UgcG9zaXRpb25cbiAgICAgICAgbGV0IG1vdXNlWCA9IHdpbmRvdy5wYWdlWE9mZnNldCArIGV2ZW50UG9zaXRpb247XG5cbiAgICAgICAgLy8gZ2V0IHRyYWNrIHNpemUgYW5kIHBvc2l0aW9uXG4gICAgICAgIGxldCB0cmFja0JvdW5kcyA9IHRoaXMudHJhY2submF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICAvLyByZXN0cmljdCB0aGUgdmFsdWUgd2l0aGluIHRoZSByYW5nZSBzaXplXG4gICAgICAgIGxldCBwb3NpdGlvbiA9IHRoaXMuY2xhbXAobW91c2VYIC0gdHJhY2tCb3VuZHMubGVmdCwgMCwgdHJhY2tCb3VuZHMud2lkdGgpO1xuXG4gICAgICAgIC8vIGdldCBmcmFjdGlvbiByZXByZXNlbnRhdGlvbiBvZiBsb2NhdGlvbiB3aXRoaW4gdGhlIHRyYWNrXG4gICAgICAgIGxldCBmcmFjdGlvbiA9IChwb3NpdGlvbiAvIHRyYWNrQm91bmRzLndpZHRoKTtcblxuICAgICAgICAvLyBjb252ZXJ0IHRvIHZhbHVlIHdpdGhpbiB0aGUgcmFuZ2VcbiAgICAgICAgbGV0IHZhbHVlID0gKCh0aGlzLm9wdGlvbnMudHJhY2subWF4IC0gdGhpcy5vcHRpb25zLnRyYWNrLm1pbikgKiBmcmFjdGlvbikgKyB0aGlzLm9wdGlvbnMudHJhY2subWluO1xuXG4gICAgICAgIC8vIGVuc3VyZSB2YWx1ZSBpcyB2YWxpZFxuICAgICAgICB2YWx1ZSA9IHRoaXMudmFsaWRhdGVWYWx1ZSh0aHVtYiwgdmFsdWUpO1xuXG4gICAgICAgIC8vIHNuYXAgdG8gYSB0aWNrIGlmIHJlcXVpcmVkXG4gICAgICAgIHZhbHVlID0gdGhpcy5zbmFwVG9UaWNrKHZhbHVlLCB0aHVtYik7XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSB2YWx1ZSBhY2NvcmRpbmdseVxuICAgICAgICB0aGlzLnNldFRodW1iVmFsdWUodGh1bWIsIHZhbHVlKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZU9yZGVyKHRodW1iKTtcbiAgICAgICAgdGhpcy51cGRhdGVWYWx1ZXMoKTtcblxuICAgICAgICAvLyB1cGRhdGUgdG9vbHRpcCB0ZXh0ICYgcG9zaXRpb25cbiAgICAgICAgdGhpcy51cGRhdGVUb29sdGlwVGV4dCh0aHVtYik7XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBwb3NpdGlvbiBvZiBhbGwgdmlzaWJsZSB0b29sdGlwc1xuICAgICAgICB0aGlzLnVwZGF0ZVRvb2x0aXBQb3NpdGlvbihTbGlkZXJUaHVtYi5Mb3dlcik7XG4gICAgICAgIHRoaXMudXBkYXRlVG9vbHRpcFBvc2l0aW9uKFNsaWRlclRodW1iLlVwcGVyKTtcblxuICAgICAgICAvLyBtYXJrIGFzIGRpcnR5IGZvciBjaGFuZ2UgZGV0ZWN0aW9uXG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlT3JkZXIodGh1bWI6IFNsaWRlclRodW1iKTogdm9pZCB7XG5cbiAgICAgICAgbGV0IGxvd2VyID0gdGh1bWIgPT09IFNsaWRlclRodW1iLkxvd2VyID8gMTAxIDogMTAwO1xuICAgICAgICBsZXQgdXBwZXIgPSB0aHVtYiA9PT0gU2xpZGVyVGh1bWIuTG93ZXIgPyAxMDAgOiAxMDE7XG5cbiAgICAgICAgLy8gVGhlIG1vc3QgcmVjZW50bHkgdXNlZCB0aHVtYiBzaG91bGQgYmUgYWJvdmVcbiAgICAgICAgdGhpcy50aHVtYnMubG93ZXIub3JkZXIgPSBsb3dlcjtcbiAgICAgICAgdGhpcy50aHVtYnMudXBwZXIub3JkZXIgPSB1cHBlcjtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRpY2tEaXN0YW5jZXModmFsdWU6IG51bWJlciwgdGh1bWI6IFNsaWRlclRodW1iLCBzbmFwVGFyZ2V0OiBTbGlkZXJTbmFwKTogU2xpZGVyVGlja1tdIHtcblxuICAgICAgICAvLyBpZiBzbmFwIHRhcmdldCBpcyBub25lIHRoZW4gcmV0dXJuIG9yaWdpbmFsIHZhbHVlXG4gICAgICAgIGlmIChzbmFwVGFyZ2V0ID09PSBTbGlkZXJTbmFwLk5vbmUpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCBmaWx0ZXJlZCB0aWNrc1xuICAgICAgICBsZXQgdGlja3M6IFNsaWRlclRpY2tbXTtcblxuICAgICAgICBzd2l0Y2ggKHNuYXBUYXJnZXQpIHtcblxuICAgICAgICAgICAgY2FzZSBTbGlkZXJTbmFwLk1pbm9yOlxuICAgICAgICAgICAgICAgIHRpY2tzID0gdGhpcy50aWNrcy5maWx0ZXIodGljayA9PiB0aWNrLnR5cGUgPT09IFNsaWRlclRpY2tUeXBlLk1pbm9yKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBTbGlkZXJTbmFwLk1ham9yOlxuICAgICAgICAgICAgICAgIHRpY2tzID0gdGhpcy50aWNrcy5maWx0ZXIodGljayA9PiB0aWNrLnR5cGUgPT09IFNsaWRlclRpY2tUeXBlLk1ham9yKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aWNrcyA9IHRoaXMudGlja3Muc2xpY2UoMCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnZXQgdGhlIHRyYWNrIGxpbWl0XG4gICAgICAgIGxldCBsb3dlckxpbWl0ID0gdGhpcy5vcHRpb25zLnRyYWNrLm1pbjtcbiAgICAgICAgbGV0IHVwcGVyTGltaXQgPSB0aGlzLm9wdGlvbnMudHJhY2subWF4O1xuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMudHlwZSA9PT0gU2xpZGVyVHlwZS5SYW5nZSAmJiB0aHVtYiA9PT0gU2xpZGVyVGh1bWIuTG93ZXIpIHtcbiAgICAgICAgICAgIHVwcGVyTGltaXQgPSB0aGlzLnRodW1icy51cHBlci52YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMudHlwZSA9PT0gU2xpZGVyVHlwZS5SYW5nZSAmJiB0aHVtYiA9PT0gU2xpZGVyVGh1bWIuVXBwZXIpIHtcbiAgICAgICAgICAgIGxvd2VyTGltaXQgPSB0aGlzLnRodW1icy5sb3dlci52YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZpbmQgdGhlIGNsb3Nlc3QgdGljayB0byB0aGUgY3VycmVudCBwb3NpdGlvblxuICAgICAgICBjb25zdCByYW5nZSA9IHRpY2tzLmZpbHRlcih0aWNrID0+IHRpY2sudmFsdWUgPj0gbG93ZXJMaW1pdCAmJiB0aWNrLnZhbHVlIDw9IHVwcGVyTGltaXQpO1xuXG4gICAgICAgIC8vIElmIHRoZXJlIGFyZSBubyBjbG9zZSB0aWNrcyBpbiB0aGUgdmFsaWQgcmFuZ2UgdGhlbiBkb250IHNuYXBcbiAgICAgICAgaWYgKHJhbmdlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJhbmdlLnNvcnQoKHRpY2tPbmUsIHRpY2tUd28pID0+IHtcblxuICAgICAgICAgICAgY29uc3QgdGlja09uZURlbHRhID0gTWF0aC5tYXgodGlja09uZS52YWx1ZSwgdmFsdWUpIC0gTWF0aC5taW4odGlja09uZS52YWx1ZSwgdmFsdWUpO1xuICAgICAgICAgICAgY29uc3QgdGlja1R3b0RlbHRhID0gTWF0aC5tYXgodGlja1R3by52YWx1ZSwgdmFsdWUpIC0gTWF0aC5taW4odGlja1R3by52YWx1ZSwgdmFsdWUpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gdGlja09uZURlbHRhIC0gdGlja1R3b0RlbHRhO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNuYXBUb1RpY2sodmFsdWU6IG51bWJlciwgdGh1bWI6IFNsaWRlclRodW1iKTogbnVtYmVyIHtcblxuICAgICAgICBjb25zdCB0aWNrRGlzdGFuY2VzID0gdGhpcy5nZXRUaWNrRGlzdGFuY2VzKHZhbHVlLCB0aHVtYiwgdGhpcy5vcHRpb25zLnRyYWNrLnRpY2tzLnNuYXApO1xuXG4gICAgICAgIC8vIGlmIHRoZXJlIGFyZSBubyB0aWNrcyByZXR1cm4gdGhlIGN1cnJlbnQgdmFsdWVcbiAgICAgICAgaWYgKHRpY2tEaXN0YW5jZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnZXQgdGhlIGNsb3Nlc3QgdGlja1xuICAgICAgICByZXR1cm4gdGlja0Rpc3RhbmNlc1swXS52YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHZhbGlkYXRlVmFsdWUodGh1bWI6IFNsaWRlclRodW1iLCB2YWx1ZTogbnVtYmVyKTogbnVtYmVyIHtcblxuICAgICAgICAvLyBpZiBzbGlkZXIgaXMgbm90IGEgcmFuZ2UgdmFsdWUgaXMgYWx3YXlzIHZhbGlkIHByb3ZpZGluZyBpdCBpcyB3aXRoaW4gdGhlIGNoYXJ0IG1pbiBhbmQgbWF4IHZhbHVlc1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnR5cGUgPT09IFNsaWRlclR5cGUuVmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLm1heChNYXRoLm1pbih2YWx1ZSwgdGhpcy5vcHRpb25zLnRyYWNrLm1heCksIHRoaXMub3B0aW9ucy50cmFjay5taW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgdmFsdWUgaXMgd2l0aCBjaGFydCByYW5nZXNcbiAgICAgICAgaWYgKHZhbHVlID4gdGhpcy5vcHRpb25zLnRyYWNrLm1heCkge1xuICAgICAgICAgICAgcmV0dXJuIHRodW1iID09PSBTbGlkZXJUaHVtYi5Mb3dlciA/IE1hdGgubWluKHRoaXMub3B0aW9ucy50cmFjay5tYXgsIHRoaXMudGh1bWJzLnVwcGVyLnZhbHVlKSA6IHRoaXMub3B0aW9ucy50cmFjay5tYXg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWUgPCB0aGlzLm9wdGlvbnMudHJhY2subWluKSB7XG4gICAgICAgICAgICByZXR1cm4gdGh1bWIgPT09IFNsaWRlclRodW1iLlVwcGVyID8gTWF0aC5tYXgodGhpcy5vcHRpb25zLnRyYWNrLm1pbiwgdGhpcy50aHVtYnMubG93ZXIudmFsdWUpIDogdGhpcy5vcHRpb25zLnRyYWNrLm1pbjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG90aGVyd2lzZSB3ZSBuZWVkIHRvIGNoZWNrIHRvIG1ha2Ugc3VyZSBsb3dlciB0aHVtYiBjYW5ub3QgZ28gYWJvdmUgaGlnaGVyIGFuZCB2aWNlIHZlcnNhXG4gICAgICAgIGlmICh0aHVtYiA9PT0gU2xpZGVyVGh1bWIuTG93ZXIpIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMudGh1bWJzLnVwcGVyLnZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgPD0gdGhpcy50aHVtYnMudXBwZXIudmFsdWUgPyB2YWx1ZSA6IHRoaXMudGh1bWJzLnVwcGVyLnZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRodW1iID09PSBTbGlkZXJUaHVtYi5VcHBlcikge1xuXG4gICAgICAgICAgICBpZiAodGhpcy50aHVtYnMubG93ZXIudmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSA+PSB0aGlzLnRodW1icy5sb3dlci52YWx1ZSA/IHZhbHVlIDogdGhpcy50aHVtYnMubG93ZXIudmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZU9wdGlvbnMoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gYWRkIGluIHRoZSBkZWZhdWx0IG9wdGlvbnMgdGhhdCB1c2VyIGhhc24ndCBzcGVjaWZpZWRcbiAgICAgICAgdGhpcy5vcHRpb25zID0gdGhpcy5kZWVwTWVyZ2UodGhpcy5vcHRpb25zIHx8IHt9LCB0aGlzLmRlZmF1bHRPcHRpb25zKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZVRyYWNrQ29sb3JzKCk7XG4gICAgICAgIHRoaXMudXBkYXRlVGlja3MoKTtcbiAgICAgICAgdGhpcy51cGRhdGVWYWx1ZXMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVZhbHVlcygpOiB2b2lkIHtcblxuICAgICAgICBpZiAodGhpcy52YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHRoaXMudmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGxvd2VyVmFsdWUgPSB0eXBlb2YgdGhpcy52YWx1ZSA9PT0gJ251bWJlcicgPyB0aGlzLnZhbHVlIDogdGhpcy52YWx1ZS5sb3c7XG4gICAgICAgIGxldCB1cHBlclZhbHVlID0gdHlwZW9mIHRoaXMudmFsdWUgPT09ICdudW1iZXInID8gdGhpcy52YWx1ZSA6IHRoaXMudmFsdWUuaGlnaDtcblxuICAgICAgICAvLyB2YWxpZGF0ZSB2YWx1ZXNcbiAgICAgICAgbG93ZXJWYWx1ZSA9IHRoaXMudmFsaWRhdGVWYWx1ZShTbGlkZXJUaHVtYi5Mb3dlciwgTnVtYmVyKGxvd2VyVmFsdWUudG9GaXhlZCg0KSkpO1xuICAgICAgICB1cHBlclZhbHVlID0gdGhpcy52YWxpZGF0ZVZhbHVlKFNsaWRlclRodW1iLlVwcGVyLCBOdW1iZXIodXBwZXJWYWx1ZS50b0ZpeGVkKDQpKSk7XG5cbiAgICAgICAgLy8gY2FsY3VsYXRlIHRoZSBwb3NpdGlvbnMgYXMgcGVyY2VudGFnZXNcbiAgICAgICAgbGV0IGxvd2VyUG9zaXRpb24gPSAoKChsb3dlclZhbHVlIC0gdGhpcy5vcHRpb25zLnRyYWNrLm1pbikgLyAodGhpcy5vcHRpb25zLnRyYWNrLm1heCAtIHRoaXMub3B0aW9ucy50cmFjay5taW4pKSAqIDEwMCk7XG4gICAgICAgIGxldCB1cHBlclBvc2l0aW9uID0gKCgodXBwZXJWYWx1ZSAtIHRoaXMub3B0aW9ucy50cmFjay5taW4pIC8gKHRoaXMub3B0aW9ucy50cmFjay5tYXggLSB0aGlzLm9wdGlvbnMudHJhY2subWluKSkgKiAxMDApO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aHVtYiBwb3NpdGlvbnNcbiAgICAgICAgdGhpcy50aHVtYnMubG93ZXIucG9zaXRpb24gPSBsb3dlclBvc2l0aW9uO1xuICAgICAgICB0aGlzLnRodW1icy51cHBlci5wb3NpdGlvbiA9IHVwcGVyUG9zaXRpb247XG5cbiAgICAgICAgLy8gY2FsY3VsYXRlIHRoZSB0cmFjayBzaXplc1xuICAgICAgICB0aGlzLnRyYWNrcy5sb3dlci5zaXplID0gbG93ZXJQb3NpdGlvbjtcbiAgICAgICAgdGhpcy50cmFja3MubWlkZGxlLnNpemUgPSB1cHBlclBvc2l0aW9uIC0gbG93ZXJQb3NpdGlvbjtcbiAgICAgICAgdGhpcy50cmFja3MudXBwZXIuc2l6ZSA9IHRoaXMub3B0aW9ucy50eXBlID09PSBTbGlkZXJUeXBlLlZhbHVlID8gMTAwIC0gbG93ZXJQb3NpdGlvbiA6IDEwMCAtIHVwcGVyUG9zaXRpb247XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSB2YWx1ZSBpbnB1dFxuICAgICAgICB0aGlzLnNldFZhbHVlKGxvd2VyVmFsdWUsIHVwcGVyVmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0VmFsdWUobG93OiBudW1iZXIsIGhpZ2g/OiBudW1iZXIpOiB2b2lkIHtcblxuICAgICAgICB0aGlzLnRodW1icy5sb3dlci52YWx1ZSA9IGxvdztcbiAgICAgICAgdGhpcy50aHVtYnMudXBwZXIudmFsdWUgPSBoaWdoO1xuXG4gICAgICAgIGxldCBwcmV2aW91c1ZhbHVlID0gdGhpcy5jbG9uZSh0aGlzLl92YWx1ZSk7XG5cbiAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMub3B0aW9ucy50eXBlID09PSBTbGlkZXJUeXBlLlZhbHVlID8gbG93IDogeyBsb3c6IGxvdywgaGlnaDogaGlnaCB9O1xuXG4gICAgICAgIC8vIGNhbGwgdGhlIGV2ZW50IGVtaXR0ZXIgaWYgY2hhbmdlcyBvY2N1cmVkXG4gICAgICAgIGlmICh0aGlzLmRldGVjdFZhbHVlQ2hhbmdlKHRoaXMudmFsdWUsIHByZXZpb3VzVmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodGhpcy5jbG9uZSh0aGlzLnZhbHVlKSk7XG5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlVG9vbHRpcFRleHQoU2xpZGVyVGh1bWIuTG93ZXIpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVUb29sdGlwVGV4dChTbGlkZXJUaHVtYi5VcHBlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodGhpcy5jbG9uZSh0aGlzLnZhbHVlKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFRodW1iVmFsdWUodGh1bWI6IFNsaWRlclRodW1iLCB2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSB0aHVtYiB2YWx1ZVxuICAgICAgICB0aGlzLmdldFRodW1iU3RhdGUodGh1bWIpLnZhbHVlID0gdmFsdWU7XG5cbiAgICAgICAgLy8gZm9yd2FyZCB0aGVzZSBjaGFuZ2VzIHRvIHRoZSB2YWx1ZVxuICAgICAgICB0aGlzLnNldFZhbHVlKHRoaXMudGh1bWJzLmxvd2VyLnZhbHVlLCB0aGlzLnRodW1icy51cHBlci52YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVUaWNrcygpOiB2b2lkIHtcblxuICAgICAgICAvLyBnZXQgdGljayBvcHRpb25zXG4gICAgICAgIGNvbnN0IG1ham9yT3B0aW9ucyA9IHRoaXMub3B0aW9ucy50cmFjay50aWNrcy5tYWpvcjtcbiAgICAgICAgY29uc3QgbWlub3JPcHRpb25zID0gdGhpcy5vcHRpb25zLnRyYWNrLnRpY2tzLm1pbm9yO1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIHdlIHNob3VsZCBzaG93IHRpY2tzXG4gICAgICAgIGlmIChtYWpvck9wdGlvbnMuc2hvdyA9PT0gZmFsc2UgJiYgbWlub3JPcHRpb25zLnNob3cgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLnRpY2tzID0gW107XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjcmVhdGUgdGlja3MgZm9yIGJvdGggbWFqb3IgYW5kIG1pbm9yIC0gb25seSBnZXQgdGhlIG9uZXMgdG8gYmUgc2hvd25cbiAgICAgICAgY29uc3QgbWFqb3JUaWNrcyA9IHRoaXMuZ2V0VGlja3MobWFqb3JPcHRpb25zLCBTbGlkZXJUaWNrVHlwZS5NYWpvcikuZmlsdGVyKHRpY2sgPT4gdGljay5zaG93VGlja3MpO1xuICAgICAgICBjb25zdCBtaW5vclRpY2tzID0gdGhpcy5nZXRUaWNrcyhtaW5vck9wdGlvbnMsIFNsaWRlclRpY2tUeXBlLk1pbm9yKS5maWx0ZXIodGljayA9PiB0aWNrLnNob3dUaWNrcyk7XG5cbiAgICAgICAgLy8gcmVtb3ZlIGFueSBtaW5vciB0aWNrcyB0aGF0IGFyZSBvbiBhIG1ham9yIGludGVydmFsXG4gICAgICAgIHRoaXMudGlja3MgPSB0aGlzLnVuaW9uVGlja3MobWFqb3JUaWNrcywgbWlub3JUaWNrcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVUcmFja0NvbG9ycygpOiB2b2lkIHtcblxuICAgICAgICAvLyBnZXQgY29sb3JzIGZvciBlYWNoIHBhcnQgb2YgdGhlIHRyYWNrXG4gICAgICAgIGNvbnN0IHsgbG93ZXIsIHJhbmdlLCBoaWdoZXIgfSA9IHRoaXMub3B0aW9ucy50cmFjay5jb2xvcnM7XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBjb250cm9sbGVyIHZhbHVlXG4gICAgICAgIHRoaXMudHJhY2tzLmxvd2VyLmNvbG9yID0gdHlwZW9mIGxvd2VyID09PSAnc3RyaW5nJyA/IGxvd2VyIDogYGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgJHtsb3dlci5qb2luKCcsICcpfSlgO1xuICAgICAgICB0aGlzLnRyYWNrcy5taWRkbGUuY29sb3IgPSB0eXBlb2YgcmFuZ2UgPT09ICdzdHJpbmcnID8gcmFuZ2UgOiBgbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCAke3JhbmdlLmpvaW4oJywgJyl9KWA7XG4gICAgICAgIHRoaXMudHJhY2tzLnVwcGVyLmNvbG9yID0gdHlwZW9mIGhpZ2hlciA9PT0gJ3N0cmluZycgPyBoaWdoZXIgOiBgbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCAke2hpZ2hlci5qb2luKCcsICcpfSlgO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0U3RlcHMoc3RlcHM6IG51bWJlciB8IG51bWJlcltdKTogbnVtYmVyW10ge1xuXG4gICAgICAgIC8vIGlmIHRoZXkgYXJlIGFscmVhZHkgYW4gYXJyYXkganVzdCByZXR1cm4gaXRcbiAgICAgICAgaWYgKHN0ZXBzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIHJldHVybiBzdGVwcztcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBvdXRwdXQ6IG51bWJlcltdID0gW107XG5cbiAgICAgICAgLy8gb3RoZXJ3aXNlIGNhbGN1bGF0ZSB0aGUgc3RlcHNcbiAgICAgICAgZm9yIChsZXQgaWR4ID0gdGhpcy5vcHRpb25zLnRyYWNrLm1pbjsgaWR4IDw9IHRoaXMub3B0aW9ucy50cmFjay5tYXg7IGlkeCArPSBzdGVwcykge1xuICAgICAgICAgICAgb3V0cHV0LnB1c2goaWR4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRUaWNrcyhvcHRpb25zOiBTbGlkZXJUaWNrT3B0aW9ucywgdHlwZTogU2xpZGVyVGlja1R5cGUpOiBTbGlkZXJUaWNrW10ge1xuXG4gICAgICAgIC8vIGNyZWF0ZSBhbiBhcnJheSB0byBzdG9yZSB0aGUgdGlja3MgYW5kIHN0ZXAgcG9pbnRzXG4gICAgICAgIGxldCBzdGVwcyA9IHRoaXMuZ2V0U3RlcHMob3B0aW9ucy5zdGVwcyk7XG5cbiAgICAgICAgLy8gZ2V0IHNvbWUgY2hhcnQgb3B0aW9uc1xuICAgICAgICBsZXQgbWluID0gdGhpcy5vcHRpb25zLnRyYWNrLm1pbjtcbiAgICAgICAgbGV0IG1heCA9IHRoaXMub3B0aW9ucy50cmFjay5tYXg7XG5cbiAgICAgICAgLy8gY29udmVydCBlYWNoIHN0ZXAgdG8gYSBzbGlkZXIgdGljayBhbmQgcmVtb3ZlIGludmFsaWQgdGlja3NcbiAgICAgICAgcmV0dXJuIHN0ZXBzLm1hcChzdGVwID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc2hvd1RpY2tzOiBvcHRpb25zLnNob3csXG4gICAgICAgICAgICAgICAgc2hvd0xhYmVsczogb3B0aW9ucy5sYWJlbHMsXG4gICAgICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogKChzdGVwIC0gbWluKSAvIChtYXggLSBtaW4pKSAqIDEwMCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogc3RlcCxcbiAgICAgICAgICAgICAgICBsYWJlbDogb3B0aW9ucy5mb3JtYXR0ZXIoc3RlcClcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pLmZpbHRlcih0aWNrID0+IHRpY2sucG9zaXRpb24gPj0gMCAmJiB0aWNrLnBvc2l0aW9uIDw9IDEwMCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1bmlvblRpY2tzKG1ham9yVGlja3M6IFNsaWRlclRpY2tbXSwgbWlub3JUaWNrczogU2xpZGVyVGlja1tdKTogU2xpZGVyVGlja1tdIHtcblxuICAgICAgICAvLyBnZXQgYWxsIHRpY2tzIGNvbWJpbmVkIHJlbW92aW5nIGFueSBtaW5vciB0aWNrcyB3aXRoIHRoZSBzYW1lIHZhbHVlIGFzIG1ham9yIHRpY2tzXG4gICAgICAgIHJldHVybiBtYWpvclRpY2tzLmNvbmNhdChtaW5vclRpY2tzKVxuICAgICAgICAgICAgLmZpbHRlcigodGljaywgaW5kZXgsIGFycmF5KSA9PiB0aWNrLnR5cGUgPT09IFNsaWRlclRpY2tUeXBlLk1ham9yIHx8ICFhcnJheS5maW5kKHRrID0+IHRrLnR5cGUgPT09IFNsaWRlclRpY2tUeXBlLk1ham9yICYmIHRrLnBvc2l0aW9uID09PSB0aWNrLnBvc2l0aW9uKSlcbiAgICAgICAgICAgIC5zb3J0KCh0MSwgdDIpID0+IHQxLnZhbHVlIC0gdDIudmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZGVlcE1lcmdlPFQ+KGRlc3RpbmF0aW9uOiBULCBzb3VyY2U6IFQpOiBUIHtcblxuICAgICAgICAvLyBsb29wIHRob3VnaCBhbGwgb2YgdGhlIHByb3BlcnRpZXMgaW4gdGhlIHNvdXJjZSBvYmplY3RcbiAgICAgICAgZm9yIChsZXQgcHJvcCBpbiBzb3VyY2UpIHtcblxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGRlc3RpbmF0aW9uIG9iamVjdCBoYXMgdGhlIHByb3BlcnR5XG4gICAgICAgICAgICBpZiAoIWRlc3RpbmF0aW9uLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgICAgICAgLy8gY29weSB0aGUgcHJvcGVydHkgYWNyb3NzXG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb25bcHJvcF0gPSBzb3VyY2VbcHJvcF07XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGlmIHRoZSBwcm9wZXJ0eSBleGlzdHMgYW5kIGlzIG5vdCBhbiBvYmplY3QgdGhlbiBza2lwXG4gICAgICAgICAgICBpZiAodHlwZW9mIGRlc3RpbmF0aW9uW3Byb3BdICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjaGVjayBpZiBwcm9wZXJ0eSBpcyBhbiBhcnJheVxuICAgICAgICAgICAgaWYgKGRlc3RpbmF0aW9uW3Byb3BdIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgaXQgaXMgYW4gb2JqZWN0IHRoZW4gcGVyZm9ybSBhIHJlY3Vyc2l2ZSBjaGVja1xuICAgICAgICAgICAgZGVzdGluYXRpb25bcHJvcF0gPSB0aGlzLmRlZXBNZXJnZShkZXN0aW5hdGlvbltwcm9wXSwgc291cmNlW3Byb3BdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkZXN0aW5hdGlvbjtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRldGVjdFZhbHVlQ2hhbmdlKHZhbHVlMTogbnVtYmVyIHwgU2xpZGVyVmFsdWUsIHZhbHVlMjogbnVtYmVyIHwgU2xpZGVyVmFsdWUpOiBib29sZWFuIHtcblxuICAgICAgICAvLyBjb21wYXJlIHR3byBzbGlkZXIgdmFsdWVzXG4gICAgICAgIGlmICh0aGlzLmlzU2xpZGVyVmFsdWUodmFsdWUxKSAmJiB0aGlzLmlzU2xpZGVyVmFsdWUodmFsdWUyKSkge1xuXG4gICAgICAgICAgICAvLyByZWZlcmVuY2VzIHRvIHRoZSBvYmplY3RzIGluIHRoZSBjb3JyZWN0IHR5cGVzXG4gICAgICAgICAgICBjb25zdCBvYmoxID0gdmFsdWUxIGFzIFNsaWRlclZhbHVlO1xuICAgICAgICAgICAgY29uc3Qgb2JqMiA9IHZhbHVlMiBhcyBTbGlkZXJWYWx1ZTtcblxuICAgICAgICAgICAgcmV0dXJuIG9iajEubG93ICE9PSBvYmoyLmxvdyB8fCBvYmoxLmhpZ2ggIT09IG9iajIuaGlnaDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIG5vdCBhIHNsaWRlciB2YWx1ZSAtIHNob3VsZCBiZSBudW1iZXIgb2YgbnVsbGFibGUgdHlwZSAtIGNvbXBhcmUgbm9ybWFsbHlcbiAgICAgICAgcmV0dXJuIHZhbHVlMSAhPT0gdmFsdWUyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGVybWluZXMgd2hldGhlciBvciBub3QgYW4gb2JqZWN0IGNvbmZvcm1zIHRvIHRoZVxuICAgICAqIFNsaWRlclZhbHVlIGludGVyZmFjZS5cbiAgICAgKiBAcGFyYW0gdmFsdWUgLSBUaGUgb2JqZWN0IHRvIGNoZWNrIC0gdGhpcyBtdXN0IGJlIHR5cGUgYW55XG4gICAgICovXG4gICAgcHJpdmF0ZSBpc1NsaWRlclZhbHVlKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcblxuICAgICAgICAvLyBjaGVjayBpZiBpcyBhbiBvYmplY3RcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG5leHQgY2hlY2sgaWYgaXQgY29udGFpbnMgdGhlIG5lY2Vzc2FyeSBwcm9wZXJ0aWVzXG4gICAgICAgIHJldHVybiAnbG93JyBpbiB2YWx1ZSAmJiAnaGlnaCcgaW4gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjbG9uZSh2YWx1ZTogbnVtYmVyIHwgU2xpZGVyVmFsdWUpOiBudW1iZXIgfCBTbGlkZXJWYWx1ZSB7XG5cbiAgICAgICAgLy8gaWYgaXQgaXMgbm90IGFuIG9iamVjdCBzaW1wbHkgcmV0dXJuIHRoZSB2YWx1ZVxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY3JlYXRlIGEgbmV3IG9iamVjdCBmcm9tIHRoZSBleGlzdGluZyBvbmVcbiAgICAgICAgY29uc3QgaW5zdGFuY2UgPSB7IC4uLnZhbHVlIH07XG5cbiAgICAgICAgLy8gZGVsZXRlIHJlbW92ZSB0aGUgdmFsdWUgZnJvbSB0aGUgb2xkIG9iamVjdFxuICAgICAgICB2YWx1ZSA9IHVuZGVmaW5lZDtcblxuICAgICAgICAvLyByZXR1cm4gdGhlIG5ldyBpbnN0YW5jZSBvZiB0aGUgb2JqZWN0XG4gICAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICB9XG59XG5cbmV4cG9ydCBlbnVtIFNsaWRlclR5cGUge1xuICAgIFZhbHVlLFxuICAgIFJhbmdlXG59XG5cbmV4cG9ydCBlbnVtIFNsaWRlclN0eWxlIHtcbiAgICBCdXR0b24sXG4gICAgTGluZVxufVxuXG5leHBvcnQgZW51bSBTbGlkZXJTaXplIHtcbiAgICBOYXJyb3csXG4gICAgV2lkZVxufVxuXG5leHBvcnQgZW51bSBTbGlkZXJDYWxsb3V0VHJpZ2dlciB7XG4gICAgTm9uZSxcbiAgICBIb3ZlcixcbiAgICBEcmFnLFxuICAgIFBlcnNpc3RlbnQsXG4gICAgRHluYW1pY1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNsaWRlclZhbHVlIHtcbiAgICBsb3c6IG51bWJlcjtcbiAgICBoaWdoOiBudW1iZXI7XG59XG5cbmV4cG9ydCBlbnVtIFNsaWRlclNuYXAge1xuICAgIE5vbmUsXG4gICAgTWlub3IsXG4gICAgTWFqb3IsXG4gICAgQWxsXG59XG5cbmV4cG9ydCBlbnVtIFNsaWRlclRpY2tUeXBlIHtcbiAgICBNaW5vcixcbiAgICBNYWpvclxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNsaWRlck9wdGlvbnMge1xuICAgIHR5cGU/OiBTbGlkZXJUeXBlO1xuICAgIGhhbmRsZXM/OiBTbGlkZXJIYW5kbGVPcHRpb25zO1xuICAgIHRyYWNrPzogU2xpZGVyVHJhY2tPcHRpb25zO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNsaWRlckhhbmRsZU9wdGlvbnMge1xuICAgIHN0eWxlPzogU2xpZGVyU3R5bGU7XG4gICAgY2FsbG91dD86IFNsaWRlckNhbGxvdXQ7XG4gICAga2V5Ym9hcmQ/OiBTbGlkZXJLZXlib2FyZE9wdGlvbnM7XG4gICAgYXJpYT86IFNsaWRlckFyaWFPcHRpb25zO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNsaWRlckFyaWFPcHRpb25zIHtcbiAgICB0aHVtYj86IHN0cmluZztcbiAgICBsb3dlclRodW1iPzogc3RyaW5nO1xuICAgIHVwcGVyVGh1bWI/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2xpZGVyS2V5Ym9hcmRPcHRpb25zIHtcbiAgICBtYWpvcj86IG51bWJlcjtcbiAgICBtaW5vcj86IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTbGlkZXJUcmFja09wdGlvbnMge1xuICAgIGhlaWdodD86IFNsaWRlclNpemU7XG4gICAgbWluPzogbnVtYmVyO1xuICAgIG1heD86IG51bWJlcjtcbiAgICB0aWNrcz86IFNsaWRlclRpY2tzT3B0aW9ucztcbiAgICBjb2xvcnM/OiBTbGlkZXJUcmFja0NvbG9ycztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTbGlkZXJUaWNrc09wdGlvbnMge1xuICAgIHNuYXA/OiBTbGlkZXJTbmFwO1xuICAgIG1ham9yPzogU2xpZGVyVGlja09wdGlvbnM7XG4gICAgbWlub3I/OiBTbGlkZXJUaWNrT3B0aW9ucztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTbGlkZXJUaWNrT3B0aW9ucyB7XG4gICAgc2hvdz86IGJvb2xlYW47XG4gICAgc3RlcHM/OiBudW1iZXIgfCBudW1iZXJbXTtcbiAgICBsYWJlbHM/OiBib29sZWFuO1xuICAgIGZvcm1hdHRlcj86ICh2YWx1ZTogbnVtYmVyKSA9PiBzdHJpbmcgfCBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2xpZGVyVGljayB7XG4gICAgc2hvd1RpY2tzOiBib29sZWFuO1xuICAgIHNob3dMYWJlbHM6IGJvb2xlYW47XG4gICAgdHlwZTogU2xpZGVyVGlja1R5cGU7XG4gICAgcG9zaXRpb246IG51bWJlcjtcbiAgICB2YWx1ZTogbnVtYmVyO1xuICAgIGxhYmVsOiBzdHJpbmcgfCBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2xpZGVyVHJhY2tDb2xvcnMge1xuICAgIGxvd2VyPzogc3RyaW5nIHwgc3RyaW5nW107XG4gICAgcmFuZ2U/OiBzdHJpbmcgfCBzdHJpbmdbXTtcbiAgICBoaWdoZXI/OiBzdHJpbmcgfCBzdHJpbmdbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTbGlkZXJDYWxsb3V0IHtcbiAgICB0cmlnZ2VyPzogU2xpZGVyQ2FsbG91dFRyaWdnZXI7XG4gICAgYmFja2dyb3VuZD86IHN0cmluZztcbiAgICBjb2xvcj86IHN0cmluZztcbiAgICBmb3JtYXR0ZXI/OiAodmFsdWU6IG51bWJlcikgPT4gc3RyaW5nIHwgbnVtYmVyO1xufVxuXG5leHBvcnQgZW51bSBTbGlkZXJUaHVtYkV2ZW50IHtcbiAgICBOb25lLFxuICAgIE1vdXNlT3ZlcixcbiAgICBNb3VzZUxlYXZlLFxuICAgIERyYWdTdGFydCxcbiAgICBEcmFnRW5kXG59XG5cbmV4cG9ydCBlbnVtIFNsaWRlclRodW1iIHtcbiAgICBMb3dlcixcbiAgICBVcHBlclxufSJdfQ==