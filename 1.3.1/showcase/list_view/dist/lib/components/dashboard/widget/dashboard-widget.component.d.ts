import { ElementRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { DashboardService, ActionDirection } from '../dashboard.service';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/takeUntil';
export declare class DashboardWidgetComponent implements OnInit, AfterViewInit, OnDestroy {
    private _dashboardService;
    private _elementRef;
    id: string;
    col: number;
    row: number;
    colSpan: number;
    rowSpan: number;
    resizable: boolean;
    actualX: number;
    actualY: number;
    actualWidth: number;
    actualHeight: number;
    padding: number;
    zIndex: number;
    stacked: boolean;
    private _column;
    private _row;
    private _columnSpan;
    private _rowSpan;
    private _nativeElement;
    private _handles;
    private _dragMove;
    private _dragEnd;
    constructor(_dashboardService: DashboardService, _elementRef: ElementRef);
    ngOnInit(): void;
    /**
     * Once component is initialised link the resize handle elements with their direction
     */
    ngAfterViewInit(): void;
    /**
     * If component is removed, then unregister it from the service
     */
    ngOnDestroy(): void;
    /**
     * Return the ID of the widget
     */
    getId(): string;
    /**
     * Set the actual position and size values
     */
    render(): void;
    /**
     * Returns all the resize handles and their associated directions
     */
    getHandles(): ResizeHandle[];
    /**
     * Indicates whether or not the widget should be displayed in stacked mode
     * @param stacked indicates the stacked mode
     */
    setStacked(stacked: boolean): void;
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
    /**
     * Create data representations of the resize handle elements and the direction they will resize in
     */
    private initialiseHandles();
    /**
     * This will apply event listeners to each resize handle
     * @param handle The element and direction to subscribe to
     */
    private bindResize(handle);
}
export interface ResizeHandle {
    element: Element;
    direction: ActionDirection;
    listener?: Subscription;
}
export interface StackableValue {
    regular: number;
    stacked: number;
}
