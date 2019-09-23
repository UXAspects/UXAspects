import { END, HOME, LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import { NgModule } from '@angular/core';

const timelineDefaultOptions: TimelineChartOptions & TimelineChartState = {
    timeline: {
        backgroundColor: '#f1f2f3',
        selectionColor: 'rgba(198, 23, 157, 0.15)',
        onChange: () => { },
        keyboard: {
            step: 2_592_000_000 // 30 days
        },
        handles: {
            backgroundColor: '#000',
            foregroundColor: '#dcdedf',
            focusIndicatorColor: 'rgba(0, 115, 231, 0.5)'
        },
        range: {
            lower: null,
            upper: null,
            minimum: 0,
            maximum: Infinity
        },
        state: {
            lowerHandleFocus: false,
            upperHandleFocus: false,
            rangeHandleFocus: false
        }
    }
};

export class TimelineChartPlugin {

    /** We only want to register the plugin once per application */
    private static _isRegistered: boolean = false;

    /** Register this plugin */
    static register(): void {
        /**
         * We have to register this plugin globally because
         * ng2-charts doesn't support plugins on an invidual
         * basis. We must check in all lifecycle hooks that
         * it is an timeline chart before performing any actions.
         *
         * We also need to have it inside the class otherwise it
         * will be included in every application by default.
         * Having it here allows it to be tree-shaken.
         */
        if (!this._isRegistered) {

            if (!(window as any).Chart) {
                throw new Error('Please import Chart.js to use the timeline chart.');
            }

            // register the plugin
            (window as any).Chart.pluginService.register(new TimelineChartPlugin());

            this._isRegistered = true;
        }
    }

    /**
     * When chart is initialised store the chart instance and context
     * for use outside lifecycle hooks.
     *
     * We should also supply default options for any options that have
     * not been specified by the consuming application.
     *
     * We also need to add some event listeners for events that Chart.js
     * does not inform us of.
     */
    beforeInit(chart: TimelineChart) {

        // provide the default options for any missing properties
        if (this.getEnabled(chart)) {
            // chart.config.options.timeline = { ...timelineDefaultOptions.timeline, ...this.getOptions(chart) };
            chart.config.options.timeline = this.getOptionsWithDefaults(this.getOptions(chart));

            // get the range
            const { lower, upper } = this.getRange(chart);

            // ensure we have an initial range set
            if (lower === null || upper === null) {
                throw new Error('Timeline Chart - Ensure that both an upper and lower range are initially provided.');
            }

            // setup the function
            chart.config.options.timeline.state.onMouseDown = () => this.onMouseDown(chart);
            chart.config.options.timeline.state.onMouseUp = () => this.onMouseUp(chart);

            // add mouse down and mouseup event listeners
            chart.canvas.addEventListener('mousedown', chart.config.options.timeline.state.onMouseDown);
            document.addEventListener('mouseup', chart.config.options.timeline.state.onMouseUp);
        }
    }

    /**
     * We want to setup some additional functionality
     * after the chart has initialized.
     */
    afterInit(chart: TimelineChart): void {
        if (this.getEnabled(chart)) {

            // add accessibility attributes and elements to the chart
            this.setupAccessibility(chart);

            // intially call the onChange function
            this.triggerOnChange(chart);
        }
    }

    /**
     * The timeline chart should have a subtle background
     * color behind the main chart area (excluding the axis area).
     * Suprisingly Chart.js does not support this out of the box
     * so we need to add this functionality but it should be behind
     * all chart elements.
     */
    beforeDraw(chart: TimelineChart): void {
        if (this.getEnabled(chart)) {
            this.drawBackgroundColor(chart);
        }
    }

    /**
     * Once the Chart elements have been drawn we want to draw the drag
     * handles and the overlay showing the selected region
     */
    afterDraw(chart: TimelineChart) {
        if (this.getEnabled(chart)) {
            this.drawSelection(chart);
            this.drawHandles(chart);
        }
    }

    /**
     * We want to update the cursor whenever the mouse is over
     * one of the drag handles. We have do calculate this manually
     * as there are no DOM element to add CSS to.
     */
    afterEvent(chart: TimelineChart, event: MouseEvent) {
        // skip this if timeline is not enabled
        if (!this.getEnabled(chart)) {
            return;
        }

        switch (event.type) {

            case 'mousemove':
                this.setCursor(chart, event as MouseEvent);
                this.setRangeOnDrag(chart, event as MouseEvent);

                // store the latest mouse position
                this.setState(chart, { mouseX: event.x });
                break;

            case 'mouseout':
                this.resetCursor(chart);
                break;
        }
    }

    /**
     * Unbind from the event listeners we manually set up
     */
    destroy(chart: TimelineChart): void {
        if (this.getEnabled(chart)) {
            document.removeEventListener('mouseup', chart.config.options.timeline.state.onMouseUp, true);
        }
    }

    /** Get the timeline options from the chart instance */
    private getOptions(chart: TimelineChart) {
        return chart.config.options.timeline;
    }

    /** Determine if this chart is using the timeline */
    private getEnabled(chart: TimelineChart): boolean {
        return !!this.getOptions(chart);
    }

    /** Get the timeline range from the chart instance */
    private getRange(chart: TimelineChart) {
        return this.getOptions(chart).range;
    }

    /** Get the chart area but include any padding */
    private getChartArea(chart: TimelineChart): Chart.ChartArea {
        const { top, right, bottom, left } = chart.chartArea;
        const padding = chart.config.options.layout && chart.config.options.layout.padding ? chart.config.options.layout.padding : 0;

        if (typeof padding === 'number') {
            return { top: top - padding, right: right - padding, left: left - padding, bottom: bottom - padding };
        } else if (typeof padding === 'object') {
            return { top: top - padding.top, right: right - padding.right, left: left - padding.left, bottom: bottom - padding.bottom };
        }

        return chart.chartArea;
    }

    /** Get stored state inside the chart options */
    private getState(chart: TimelineChart) {
        return this.getOptions(chart).state;
    }

    /** Store state inside the chart options */
    private setState(chart: TimelineChart, state: TimelineChartState): void {
        // store the latest state
        chart.config.options.timeline.state = { ...chart.config.options.timeline.state, ...state };

        // trigger a chart re-render
        chart.update();
    }

    /** Call the callback with the latest range */
    private triggerOnChange(chart: TimelineChart): void {

        // get the current date range
        const { lower, upper } = this.getRange(chart);

        // get the callback function
        const { onChange } = this.getOptions(chart);

        // call the callback with the lower and upper values
        requestAnimationFrame(() => onChange(lower, upper));

        // get the handle elements
        const { lowerHandleElement, upperHandleElement } = this.getState(chart);

        // update the aria properties
        lowerHandleElement.setAttribute('aria-valuemin', new Date(this.getHandleMinimum(chart, TimelineHandle.Lower)).toDateString());
        lowerHandleElement.setAttribute('aria-valuenow', lower.toDateString());
        lowerHandleElement.setAttribute('aria-valuemax', new Date(this.getHandleMaximum(chart, TimelineHandle.Lower)).toDateString());
        upperHandleElement.setAttribute('aria-valuemin', new Date(this.getHandleMinimum(chart, TimelineHandle.Upper)).toDateString());
        upperHandleElement.setAttribute('aria-valuenow', upper.toDateString());
        upperHandleElement.setAttribute('aria-valuemax', new Date(this.getHandleMaximum(chart, TimelineHandle.Upper)).toDateString());
    }

    /** To make the chart accessible add some internal elements that can be focused */
    private setupAccessibility(chart: TimelineChart): void {

        // create the invisible elements
        const lowerHandle = document.createElement('div');
        const upperHandle = document.createElement('div');
        const rangeHandle = document.createElement('div');

        // make the items focusable
        lowerHandle.setAttribute('tabindex', '0');
        upperHandle.setAttribute('tabindex', '0');
        rangeHandle.setAttribute('tabindex', '0');

        // insert the elements
        chart.canvas.appendChild(lowerHandle);
        chart.canvas.appendChild(upperHandle);
        chart.canvas.appendChild(rangeHandle);

        // add the event handlers
        lowerHandle.addEventListener('focus', () => this.setState(chart, { lowerHandleFocus: true }));
        lowerHandle.addEventListener('blur', () => this.setState(chart, { lowerHandleFocus: false }));
        lowerHandle.addEventListener('keydown', (event: KeyboardEvent) => this.onKeydown(chart, event, TimelineHandle.Lower));

        upperHandle.addEventListener('focus', () => this.setState(chart, { upperHandleFocus: true }));
        upperHandle.addEventListener('blur', () => this.setState(chart, { upperHandleFocus: false }));
        upperHandle.addEventListener('keydown', (event: KeyboardEvent) => this.onKeydown(chart, event, TimelineHandle.Upper));

        rangeHandle.addEventListener('focus', () => this.setState(chart, { rangeHandleFocus: true }));
        rangeHandle.addEventListener('blur', () => this.setState(chart, { rangeHandleFocus: false }));
        rangeHandle.addEventListener('keydown', (event: KeyboardEvent) => this.onRangeKeydown(chart, event));

        // store the items in the state object
        this.setState(chart, { lowerHandleElement: lowerHandle, upperHandleElement: upperHandle, rangeHandleElement: rangeHandle });
    }

    /** Handle keyboard accessibility events */
    private onKeydown(chart: TimelineChart, event: KeyboardEvent, handle: TimelineHandle): void {

        // get the current value for the given handle
        const value = this.getHandleValue(chart, handle).getTime();
        const step = this.getOptions(chart).keyboard.step;
        const [minimum, maximum] = this.getChartRange(chart);

        switch (event.keyCode) {
            case LEFT_ARROW:
                this.setHandleValue(chart, handle, new Date(value - step));
                event.preventDefault();
                break;

            case HOME:
                this.setHandleValue(chart, handle, new Date(minimum));
                event.preventDefault();
                break;

            case RIGHT_ARROW:
                this.setHandleValue(chart, handle, new Date(value + step));
                event.preventDefault();
                break;

            case END:
                this.setHandleValue(chart, handle, new Date(maximum));
                event.preventDefault();
                break;
        }
    }

    /**
     * Handle range changes made with the keyboard as these are exempt from
     * many of the validation checks that are required when dragging only one
     * handle at a time.
     */
    private onRangeKeydown(chart: TimelineChart, event: KeyboardEvent): void {

        // get the current handle values
        let lowerValue = this.getHandleValue(chart, TimelineHandle.Lower).getTime();
        let upperValue = this.getHandleValue(chart, TimelineHandle.Upper).getTime();
        const step = this.getOptions(chart).keyboard.step;
        const difference = upperValue - lowerValue;

        // get the chart boundaries
        const [minimum, maximum] = this.getChartRange(chart);

        switch (event.keyCode) {
            case LEFT_ARROW:
                lowerValue = Math.max(lowerValue - step, minimum);
                upperValue = lowerValue + difference;
                event.preventDefault();
                break;

            case RIGHT_ARROW:
                upperValue = Math.min(upperValue + step, maximum);
                lowerValue = upperValue - difference;
                event.preventDefault();
                break;

            case HOME:
                lowerValue = minimum;
                upperValue = lowerValue + difference;
                event.preventDefault();
                break;

            case END:
                upperValue = maximum;
                lowerValue = upperValue - difference;
                event.preventDefault();
                break;
        }

        // store the new values
        chart.config.options.timeline.range[TimelineHandle.Lower] = new Date(lowerValue);
        chart.config.options.timeline.range[TimelineHandle.Upper] = new Date(upperValue);

        // update the chart
        chart.update();

        // emit the latest range
        this.triggerOnChange(chart);
    }

    /**
     * When the mouse is first pressed within a chart we should see if we are
     * currently over a drag handle to start the dragging
     */
    private onMouseDown(chart: TimelineChart): void {

        // get the position from the chart area
        const { top } = this.getChartArea(chart);

        // get the properties from the state
        const { mouseX } = this.getState(chart);

        // check if the event started within a drag handle
        const handle = this.isWithinHandle(chart, { x: mouseX, y: top });

        // if it did then we are now dragging the handle and should store it
        this.setState(chart, { handle: handle !== null ? handle : null });
    }

    /** When the mouse is released we are no longer dragging */
    private onMouseUp(chart: TimelineChart): void {
        if (chart.canvas) {
            this.setState(chart, { handle: null });
        }
    }

    /** Update the range when dragged */
    private setRangeOnDrag(chart: TimelineChart, event: Partial<MouseEvent>): void {

        const { handle, mouseX } = this.getState(chart);

        // if we are not dragging then do nothing
        if (handle === null) {
            return;
        }

        // get the chart area
        const { left, right } = this.getChartArea(chart);

        // get the current range
        const { lower, upper } = this.getRange(chart);

        // get the difference in x position since the last mouse position
        const delta = event.x - mouseX;

        // get the width of the chart area
        const width = right - left;

        // get the time range on the x-axis
        const [minimum, maximum] = this.getChartRange(chart);

        // determine how much of the time range was spanned in the move
        const percentageDiff = (delta / width) * 100;

        // calculate the time difference in the movement
        const valueDiff = (((maximum - minimum) / 100) * percentageDiff);

        if (handle === TimelineHandle.Lower) {
            this.setHandleValue(chart, TimelineHandle.Lower, new Date(lower.getTime() + valueDiff));
        }

        if (handle === TimelineHandle.Upper) {
            this.setHandleValue(chart, TimelineHandle.Upper, new Date(upper.getTime() + valueDiff));
        }

        if (handle === TimelineHandle.Range) {
            // get the current range
            const range = upper.getTime() - lower.getTime();

            // update the values
            if (valueDiff < 0) {
                this.setHandleValue(chart, TimelineHandle.Upper, new Date(upper.getTime() + valueDiff));
                this.setHandleValue(chart, TimelineHandle.Lower, new Date(lower.getTime() + valueDiff));
            } else {
                this.setHandleValue(chart, TimelineHandle.Lower, new Date(lower.getTime() + valueDiff));
                this.setHandleValue(chart, TimelineHandle.Upper, new Date(upper.getTime() + valueDiff));
            }

            // calculate the new range
            const currentRange = chart.config.options.timeline.range.upper.getTime() - chart.config.options.timeline.range.lower.getTime();

            // ensure the range is still the same
            if (currentRange !== range) {
                if (valueDiff < 0) {
                    this.setHandleValue(chart, TimelineHandle.Upper, new Date(chart.config.options.timeline.range.upper.getTime() + (range - currentRange)));
                } else {
                    this.setHandleValue(chart, TimelineHandle.Lower, new Date(chart.config.options.timeline.range.lower.getTime() + (currentRange - range)));
                }
            }
        }
    }

    /**
     * Draw the background color in the region that sits behind all the chart content
     */
    private drawBackgroundColor(chart: TimelineChart): void {

        // get the region that the chart is drawn on (excluding axis)
        const { top, right, bottom, left } = this.getChartArea(chart);

        // fill the background color
        chart.ctx.save();
        chart.ctx.fillStyle = this.getOptions(chart).backgroundColor as string | CanvasGradient | CanvasPattern;
        chart.ctx.fillRect(left, top, right - left, bottom - top);
        chart.ctx.restore();
    }

    /** Draw the overlay that indicates the selected region */
    private drawSelection(chart: TimelineChart): void {
        // get the region that the chart is drawn on (excluding axis)
        const { top, bottom } = this.getChartArea(chart);

        // get the fill color
        const selectionColor = this.getOptions(chart).selectionColor;

        // get the focus indicator color
        const { focusIndicatorColor } = this.getOptions(chart).handles;

        // get the lower and upper handle render regions
        const lower = this.getHandleArea(chart, TimelineHandle.Lower);
        const upper = this.getHandleArea(chart, TimelineHandle.Upper);

        // draw selection region
        chart.ctx.save();

        chart.ctx.fillStyle = selectionColor as string | CanvasGradient | CanvasPattern;
        chart.ctx.fillRect(lower.left, 0, upper.right - lower.left, bottom - top);

        // check if we are focused on the range handle
        if (this.isHandleFocused(chart, TimelineHandle.Range)) {
            chart.ctx.strokeStyle = focusIndicatorColor as string | CanvasGradient | CanvasPattern;
            const handleWidth = 4;
            const lineWidth = 2;
            chart.ctx.lineWidth = lineWidth;
            chart.ctx.strokeRect(lower.left + handleWidth + lineWidth, lineWidth / 2, (upper.right - lower.left) - ((handleWidth + lineWidth) * 2), (bottom - top) - lineWidth);
        }

        chart.ctx.restore();
    }

    /** Darw the drag handles */
    private drawHandles(chart: TimelineChart): void {

        // get the region that the chart is drawn on (excluding axis)
        const { top, bottom } = this.getChartArea(chart);

        // get the handle colors
        const { backgroundColor, foregroundColor, focusIndicatorColor } = this.getOptions(chart).handles;

        // draw each handle
        [TimelineHandle.Lower, TimelineHandle.Upper].forEach(handle => {
            // get the area of the handle
            const area = this.getHandleArea(chart, handle);
            const handleWidth = 5;
            const chartHeight = bottom - top;

            chart.ctx.save();

            // if the handle is focused draw an outline
            if (this.isHandleFocused(chart, handle)) {
                chart.ctx.fillStyle = focusIndicatorColor as string | CanvasGradient | CanvasPattern;
                chart.ctx.fillRect(area.left - 2, 0, handleWidth + 4, chartHeight);
            }

            // draw the handle
            chart.ctx.fillStyle = backgroundColor as string | CanvasGradient | CanvasPattern;
            chart.ctx.fillRect(area.left, 0, handleWidth, chartHeight);

            // draw the 3 drag handles within the drag handle
            chart.ctx.fillStyle = foregroundColor as string | CanvasGradient | CanvasPattern;

            // calculate size and position
            const width = 3;
            const height = 3;
            const x = area.left + (handleWidth - width) / 2;
            const midpoint = area.top + (chartHeight / 2);
            const topY = midpoint - (height * 2.5);
            const middleY = midpoint - (height / 2);
            const bottomY = midpoint + (height * 1.5);

            chart.ctx.fillRect(x, topY, width, height);
            chart.ctx.fillRect(x, middleY, width, height);
            chart.ctx.fillRect(x, bottomY, width, height);

            chart.ctx.restore();
        });
    }

    /**
     * Update the CSS cursor on the canvas element if we are hovering over a drag handle
     */
    private setCursor(chart: TimelineChart, event: MouseEvent): void {
        // get the handle if we are hovering over one
        const handle = this.getState(chart).handle || this.isWithinHandle(chart, event);

        if (handle === TimelineHandle.Lower || handle === TimelineHandle.Upper) {
            chart.canvas.style.cursor = 'ew-resize';
        } else if (handle === TimelineHandle.Range) {
            chart.canvas.style.cursor = 'move';
        } else {
            this.resetCursor(chart);
        }
    }

    // restore the cursor to the default
    private resetCursor(chart: TimelineChart): void {
        if (chart.canvas.style.cursor !== '') {
            chart.canvas.style.cursor = '';
        }
    }

    private isHandleFocused(chart: TimelineChart, handle: TimelineHandle): boolean {
        if (handle === TimelineHandle.Lower) {
            return this.getState(chart).lowerHandleFocus;
        }

        if (handle === TimelineHandle.Upper) {
            return this.getState(chart).upperHandleFocus;
        }

        if (handle === TimelineHandle.Range) {
            return this.getState(chart).rangeHandleFocus;
        }

        return false;
    }

    /** Determine if a position is within one of the drag handles */
    private isWithinHandle(chart: TimelineChart, event: Partial<MouseEvent>): TimelineHandle {
        // get the lower and upper handle render regions
        const lower = this.getHandleArea(chart, TimelineHandle.Lower);
        const upper = this.getHandleArea(chart, TimelineHandle.Upper);

        // get the position co-ordinates
        const { x, y } = event;

        if (x >= lower.left && x <= lower.right && y >= lower.top && y <= lower.bottom) {
            return TimelineHandle.Lower;
        }

        if (x >= upper.left && x <= upper.right && y >= upper.top && y <= upper.bottom) {
            return TimelineHandle.Upper;
        }

        if (x > lower.right && x < upper.left && y >= lower.top && y <= lower.bottom) {
            return TimelineHandle.Range;
        }

        return null;
    }

    /** Get the area a specific handle covers within the chart */
    private getHandleArea(chart: TimelineChart, handle: TimelineHandle): Chart.ChartArea {
        // get the region that the chart is drawn on (excluding axis)
        const { left, top, right, bottom } = this.getChartArea(chart);

        // perform some calculations on the chart area
        const width = right - left;

        // get the minimum and maximum ticks on the chart
        const [minimum, maximum] = this.getChartRange(chart);

        // get the lower and upper range values
        const { lower, upper } = this.getOptions(chart).range;

        if (handle === TimelineHandle.Lower) {
            const percentage = ((lower.getTime() - minimum) / (maximum - minimum) * 100);
            const position = left + ((width / 100) * percentage);

            return { top: top, left: position - 5, right: position, bottom: bottom };
        }

        if (handle === TimelineHandle.Upper) {
            const percentage = ((upper.getTime() - minimum) / (maximum - minimum) * 100);
            const position = left + ((width / 100) * percentage);

            return { top: top, left: position, right: position + 5, bottom: bottom };
        }
    }

    /**
     * Get the minimum and maximum values on the x-axis
     */
    private getChartRange(chart: TimelineChart): [number, number] {
        // get the current data
        const { data } = chart.getDatasetMeta(0);

        // get the range on the x-axis
        const minimum: number = (data[0] as any)._xScale.min;
        const maximum: number = (data[0] as any)._xScale.max;

        return [minimum, maximum];
    }

    /** Get the value for a given handle */
    private getHandleValue(chart: TimelineChart, handle: TimelineHandle): Date {
        const { lower, upper } = this.getOptions(chart).range;

        return handle === TimelineHandle.Lower ? lower : upper;
    }

    private setHandleValue(chart: TimelineChart, handle: TimelineHandle, value: Date): void {

        // perform lower handle validation
        if (handle === TimelineHandle.Lower) {
            value = new Date(Math.min(Math.max(this.getHandleMinimum(chart, handle), value.getTime()), this.getHandleMaximum(chart, handle)));
        }

        // perform upper handle validation
        if (handle === TimelineHandle.Upper) {
            value = new Date(Math.max(Math.min(this.getHandleMaximum(chart, handle), value.getTime()), this.getHandleMinimum(chart, handle)));
        }

        // store the new value
        chart.config.options.timeline.range[handle] = value;

        // update the chart
        chart.update();

        // emit the latest range
        this.triggerOnChange(chart);
    }

    private getHandleMinimum(chart: TimelineChart, handle: TimelineHandle): number {
        // get the minimum distance
        const minDistance = this.getOptions(chart).range.minimum || 0;
        const maxDistance = this.getOptions(chart).range.maximum || Infinity;

        // get the chart boundaries
        const [minimum] = this.getChartRange(chart);

        // get the current date range
        const { lower, upper } = this.getRange(chart);

        if (handle === TimelineHandle.Lower) {
            return Math.max((upper.getTime() - maxDistance), minimum);
        }

        if (handle === TimelineHandle.Upper) {
            return lower.getTime() + minDistance;
        }
    }

    private getHandleMaximum(chart: TimelineChart, handle: TimelineHandle): number {
        // get the minimum distance
        const minDistance = this.getOptions(chart).range.minimum || 0;
        const maxDistance = this.getOptions(chart).range.maximum || Infinity;

        // get the chart boundaries
        const [, maximum] = this.getChartRange(chart);

        // get the current date range
        const { lower, upper } = this.getRange(chart);

        if (handle === TimelineHandle.Lower) {
            return upper.getTime() - minDistance;
        }

        if (handle === TimelineHandle.Upper) {
            return Math.min((lower.getTime() + maxDistance), maximum);
        }
    }

    private getOptionsWithDefaults<T>(options: T): T {
        const merge = (target: T, source: T) => {
            for (let key of Object.keys(source)) {
                if (source[key] instanceof Object && !(source[key] instanceof Date) && typeof source[key] !== 'function') {
                    Object.assign(source[key], merge(target[key], source[key]));
                }
            }

            return Object.assign(target || {}, source);
        };

        return merge({ ...timelineDefaultOptions.timeline } as any, options);
    }
}


/**
 * Directly exporting a file that is not an Angular component, module, etc..
 * can cause build issues. We can use a module that instantiates the plugin
 * instead of directly exporting the Chart.js plugin.
 */
@NgModule({})
export class TimelineChartModule {
    constructor() {
        TimelineChartPlugin.register();
    }
}

export enum TimelineHandle {
    Lower = 'lower',
    Upper = 'upper',
    Range = 'range'
}

export interface TimelineChartOptions {
    timeline?: {
        backgroundColor?: Chart.ChartColor;
        selectionColor?: Chart.ChartColor;
        onChange?: (lower: Date, upper: Date) => void;
        keyboard?: {
            step?: number;
        },
        handles?: {
            backgroundColor?: Chart.ChartColor;
            foregroundColor?: Chart.ChartColor;
            focusIndicatorColor?: Chart.ChartColor;
        }
        range: {
            lower: Date,
            upper: Date,
            minimum?: number,
            maximum?: number
        }
    };
}

/**
 * Store internal state of the chart but don't expose it
 * in the public options interface
 */
export interface TimelineChartStateOptions {
    timeline?: {
        state: TimelineChartState
    };
}

export interface TimelineChartState {
    handle?: TimelineHandle | null;
    mouseX?: number;
    onMouseDown?: (event: MouseEvent) => void;
    onMouseUp?: (event: MouseEvent) => void;
    onKeydown?: (event: KeyboardEvent) => void;
    lowerHandleFocus?: boolean;
    upperHandleFocus?: boolean;
    rangeHandleFocus?: boolean;
    lowerHandleElement?: HTMLDivElement;
    upperHandleElement?: HTMLDivElement;
    rangeHandleElement?: HTMLDivElement;
}

export interface TimelineChartConfig {
    config: {
        options: TimelineChartOptions & TimelineChartStateOptions;
    };
    chart: Chart;
}

export type TimelineChart = Chart & TimelineChartConfig;