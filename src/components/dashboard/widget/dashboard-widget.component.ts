import { Component, Input, OnInit, OnDestroy, HostBinding, AfterViewInit } from '@angular/core';
import { DashboardService, ActionDirection } from '../dashboard.service';

@Component({
    selector: 'ux-dashboard-widget',
    templateUrl: './dashboard-widget.component.html'
})
export class DashboardWidgetComponent implements OnInit, AfterViewInit, OnDestroy {

    @Input() id: string;
    @Input() col: number;
    @Input() row: number;
    @Input() colSpan: number = 1;
    @Input() rowSpan: number = 1;
    @Input() resizable: boolean = false;

    @HostBinding('style.left.px') x: number = 0;
    @HostBinding('style.top.px') y: number = 0;
    @HostBinding('style.width.px') width: number = 100;
    @HostBinding('style.height.px') height: number = 100;
    @HostBinding('style.padding.px') padding: number = 0;
    @HostBinding('style.z-index') zIndex: number = 0;

    private _column: StackableValue = { regular: undefined, stacked: undefined };
    private _row: StackableValue = { regular: undefined, stacked: undefined };
    private _columnSpan: StackableValue = { regular: 1, stacked: 1 };
    private _rowSpan: StackableValue = { regular: 1, stacked: 1 };

    ActionDirection = ActionDirection;

    constructor(public dashboardService: DashboardService) {

        // watch for changes to the options
        dashboardService.options$.subscribe(() => this.update());
    }

    ngOnInit(): void {

        this._columnSpan.regular = this.colSpan;
        this._rowSpan.regular = this.rowSpan;

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
        this.y = this.getRow() * this.dashboardService.getRowHeight();
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
        this.dashboardService.onResizeStart({ widget: this, direction: direction, event: event, handle: handle });
    }

    drag(handle: HTMLElement, event: MouseEvent, direction: ActionDirection): void {
        this.dashboardService.onResizeDrag({ widget: this, direction: direction, event: event, handle: handle });
    }

    dragend(): void {
        this.dashboardService.onResizeEnd();
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