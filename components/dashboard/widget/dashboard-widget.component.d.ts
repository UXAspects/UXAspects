import { AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { ActionDirection, DashboardService } from '../dashboard.service';
export declare class DashboardWidgetComponent implements OnInit, AfterViewInit, OnDestroy {
    dashboardService: DashboardService;
    id: string;
    name: string;
    col: number;
    row: number;
    colSpan: number;
    rowSpan: number;
    resizable: boolean;
    widgetAriaLabel: (widgets: DashboardWidgetComponent) => string | string;
    x: number;
    y: number;
    width: number;
    height: number;
    padding: number;
    zIndex: number;
    ariaLabel: string;
    isDragging: boolean;
    isGrabbing: boolean;
    isDraggable: boolean;
    private _column;
    private _row;
    private _columnSpan;
    private _rowSpan;
    private _onDestroy;
    constructor(dashboardService: DashboardService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    /**
     * If component is removed, then unregister it from the service
     */
    ngOnDestroy(): void;
    /**
     * Apply the current dashboard options
     */
    update(): void;
    /**
     * Set the actual position and size values
     */
    render(): void;
    getColumn(): number;
    getRow(): number;
    setColumn(column: number, render?: boolean): void;
    setRow(row: number, render?: boolean): void;
    getColumnSpan(): number;
    getRowSpan(): number;
    setColumnSpan(columnSpan: number, render?: boolean): void;
    setRowSpan(rowSpan: number, render?: boolean): void;
    bringToFront(): void;
    sendToBack(): void;
    setBounds(x: number, y: number, width: number, height: number): void;
    dragstart(handle: HTMLElement, event: MouseEvent, direction: ActionDirection): void;
    drag(handle: HTMLElement, event: MouseEvent, direction: ActionDirection): void;
    dragend(): void;
    getAriaLabel(): string;
    private getDefaultAriaLabel(widget);
    /**
     * Allows automatic setting of stackable value
     * @param property The current StackableValue object
     * @param value The value to set in the appropriate field
     */
    private setStackableValue(property, value);
    /**
     * Return the appropriate value from a stackable value
     * @param property The Stackable value object
     */
    private getStackableValue(property);
}
export interface StackableValue {
    regular: number;
    stacked: number;
}
