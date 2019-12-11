import { AfterViewInit, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActionDirection, DashboardService } from '../dashboard.service';

@Component({
    selector: 'ux-dashboard-widget',
    templateUrl: './dashboard-widget.component.html'
})
export class DashboardWidgetComponent implements OnInit, AfterViewInit, OnDestroy {

    /** Sets the ID of the widget. Each widget should be given a unique ID. */
    @Input() id: string;

    /** Defines a name for the widget used for accessibility */
    @Input() name: string;

    /** Defines the column the widget is placed in */
    @Input() col: number;

    /** Defines the row the widget is placed in */
    @Input() row: number;

    /** Defines the number of columns this widget should occupy. */
    @Input() colSpan: number = 1;

    /** Defines the number of rows this widget should occupy. */
    @Input() rowSpan: number = 1;

    /** Defines whether or not this widget can be resized. */
    @Input() resizable: boolean = false;

    /** Defines a function that returns an aria label for the widget */
    @Input() widgetAriaLabel: (widgets: DashboardWidgetComponent) => string | string = this.getDefaultAriaLabel;

    @HostBinding('style.left.px') x: number = 0;
    @HostBinding('style.top.px') y: number = 0;
    @HostBinding('style.width.px') width: number = 100;
    @HostBinding('style.height.px') height: number = 100;
    @HostBinding('style.padding.px') padding: number = 0;
    @HostBinding('style.z-index') zIndex: number = 0;
    @HostBinding('attr.aria-label') ariaLabel: string;
    @HostBinding('class.dragging') isDragging: boolean = false;
    @HostBinding('class.grabbing') isGrabbing: boolean = false;
    @HostBinding('class.resizing') isResizing: boolean = false;

    isDraggable: boolean = false;

    private _column: StackableValue = { regular: undefined, stacked: undefined };
    private _row: StackableValue = { regular: undefined, stacked: undefined };
    private _columnSpan: StackableValue = { regular: 1, stacked: 1 };
    private _rowSpan: StackableValue = { regular: 1, stacked: 1 };
    private _onDestroy = new Subject<void>();

    constructor(public dashboardService: DashboardService) {
        // subscribe to option changes
        dashboardService.options$.pipe(takeUntil(this._onDestroy))
            .subscribe(() => this.update());

        // every time the layout changes we want to update the aria label
        dashboardService.layout$.pipe(takeUntil(this._onDestroy))
            .subscribe(() => this.ariaLabel = this.getAriaLabel());

        // allow widget movements to be animated
        dashboardService.isDragging$.pipe(takeUntil(this._onDestroy), map(widget => widget === this))
            .subscribe(isDragging => this.isDragging = isDragging);

        // allow widget movements to be animated
        dashboardService.isGrabbing$.pipe(takeUntil(this._onDestroy), map(widget => widget === this))
            .subscribe(isGrabbing => this.isGrabbing = isGrabbing);
    }

    ngOnInit(): void {

        this._columnSpan.regular = this.colSpan;
        this._rowSpan.regular = this.rowSpan;

        // added the 2 below lines
        this._rowSpan.stacked = this.rowSpan;

        this.render();

        if (!this.id) {
            console.warn('Dashboard Widget is missing an ID.');

            // set random id - keeps things working but prevents exporting of positions
            this.id = Math.floor(Math.random() * 100000).toString();
        }
    }

    ngAfterViewInit(): void {
        // add the widget to the dashboard
        this.dashboardService.addWidget(this);

        // apply the current options
        this.update();
    }

    /**
     * If component is removed, then unregister it from the service
     */
    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
        this.dashboardService.removeWidget(this);
    }

    /**
     * Apply the current dashboard options
     */
    update(): void {

        // get the current options at the time
        const { padding, columns } = this.dashboardService.options;

        this.padding = padding;
        this._columnSpan.stacked = columns;
    }

    /**
     * Set the actual position and size values
     */
    render(): void {
        this.x = this.getColumn() * this.dashboardService.getColumnWidth();
        // added previously this.y = this.getRow() * this.dashboardService.getRowHeight();
        this.y = this.getRow() * this.width;

        this.width = this.getColumnSpan() * this.dashboardService.getColumnWidth();
        this.height = this.getRowSpan() * this.dashboardService.getRowHeight();
    }

    getColumn(): number {
        return this.getStackableValue(this._column);
    }

    getRow(): number {
        return this.getStackableValue(this._row);
    }

    setColumn(column: number, render: boolean = true): void {
        this.setStackableValue(this._column, column);

        if (render) {
            this.render();
        }
    }

    setRow(row: number, render: boolean = true): void {
        this.setStackableValue(this._row, row);

        if (render) {
            this.render();
        }
    }

    getColumnSpan(): number {
        return this.getStackableValue(this._columnSpan);
    }

    getRowSpan(): number {
        return this.getStackableValue(this._rowSpan);
    }

    setColumnSpan(columnSpan: number, render: boolean = true): void {
        this.setStackableValue(this._columnSpan, columnSpan);

        if (render) {
            this.render();
        }
    }

    setRowSpan(rowSpan: number, render: boolean = true): void {
        this.setStackableValue(this._rowSpan, rowSpan);

        if (render) {
            this.render();
        }
    }

    bringToFront(): void {
        this.zIndex = 1;
    }

    sendToBack(): void {
        this.zIndex = 0;
    }

    setBounds(x: number, y: number, width: number, height: number): void {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    dragstart(handle: HTMLElement, event: MouseEvent, direction: ActionDirection): void {
        this.isResizing = true;
        this.dashboardService.isGrabbing$.next(null);
        this.dashboardService.onResizeStart({ widget: this, direction, event, handle });
    }

    drag(handle: HTMLElement, event: MouseEvent, direction: ActionDirection): void {
        this.dashboardService.onResizeDrag({ widget: this, direction, event, handle });
    }

    dragend(): void {
        this.isResizing = false;
        this.dashboardService.onResizeEnd();
    }

    getAriaLabel(): string {
        if (this.widgetAriaLabel && typeof this.widgetAriaLabel === 'string') {
            return this.widgetAriaLabel;
        } else if (this.widgetAriaLabel && typeof this.widgetAriaLabel === 'function') {
            return this.widgetAriaLabel(this);
        }

        return this.ariaLabel;
    }

    private getDefaultAriaLabel(widget: DashboardWidgetComponent): string {

        let options: string = '';

        if (widget.resizable && widget.isDraggable) {
            options = 'It can be moved and resized.';
        } else if (widget.resizable) {
            options = 'It can be resized.';
        } else if (widget.isDraggable) {
            options = 'It can be moved.';
        }

        return `${widget.name} panel in row ${widget.getRow()}, column ${widget.getColumn()}, is ${widget.getColumnSpan()} columns wide and ${widget.getRowSpan()} rows high. ${options}`;
    }

    /**
     * Allows automatic setting of stackable value
     * @param property The current StackableValue object
     * @param value The value to set in the appropriate field
     */
    private setStackableValue(property: StackableValue, value: number): void {

        if (this.dashboardService.stacked) {
            property.stacked = value;
        } else {
            property.regular = value;
        }
    }

    /**
     * Return the appropriate value from a stackable value
     * @param property The Stackable value object
     */
    private getStackableValue(property: StackableValue): number {
        return this.dashboardService.stacked ? property.stacked : property.regular;
    }
}

export interface StackableValue {
    regular: number;
    stacked: number;
}