import { Component, Input, ElementRef, QueryList, ViewChildren, Directive, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { DashboardService, ActionDirection } from '../dashboard.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/takeUntil';

@Component({
    selector: 'ux-dashboard-widget',
    templateUrl: './dashboard-widget.component.html',
    host: {
        '[style.left.px]': 'actualX',
        '[style.top.px]': 'actualY',
        '[style.width.px]': 'actualWidth',
        '[style.height.px]': 'actualHeight',
        '[style.padding.px]': 'padding',
        '[style.zIndex]': 'zIndex'
    }
})
export class DashboardWidgetComponent implements OnInit, AfterViewInit, OnDestroy {

    @Input() id: string;
    @Input() col: number;
    @Input() row: number;
    @Input() colSpan: number = 1;
    @Input() rowSpan: number = 1;
    @Input() resizable: boolean = false;

    actualX: number = 0;
    actualY: number = 0;
    actualWidth: number = 100;
    actualHeight: number = 100;
    padding: number = 0;
    zIndex: number = 0;
    stacked: boolean = false;

    private _column: StackableValue = { regular: undefined, stacked: undefined };
    private _row: StackableValue = { regular: undefined, stacked: undefined };
    private _columnSpan: StackableValue = { regular: 1, stacked: 1 };
    private _rowSpan: StackableValue = { regular: 1, stacked: 1 };
    private _nativeElement: HTMLElement;
    private _handles: ResizeHandle[];
    private _dragMove: Observable<MouseEvent> = Observable.fromEvent(document, 'mousemove');
    private _dragEnd: Observable<MouseEvent> = Observable.fromEvent(document, 'mouseup');

    constructor(private _dashboardService: DashboardService, private _elementRef: ElementRef) {
        this._nativeElement = _elementRef.nativeElement;

        // add the widget to the dashboard
        _dashboardService.addWidget(this);

        // watch for changes to the options
        _dashboardService.options().subscribe(options => {
            this.padding = options.padding;
            this._columnSpan.stacked = options.columns;
        });
    }

    ngOnInit(): void {

        // check to ensure values are numbers and not strings
        if (typeof this.col === 'string') {
            this.col = parseFloat(this.col);
        }

        if (typeof this.row === 'string') {
            this.row = parseFloat(this.row);
        }

        if (typeof this.colSpan === 'string') {
            this.colSpan = parseFloat(this.colSpan);
        }

        if (typeof this.rowSpan === 'string') {
            this.rowSpan = parseFloat(this.rowSpan);
        }

        this._columnSpan.regular = this.colSpan;
        this._rowSpan.regular = this.rowSpan;

        if (!this.id) {
            console.warn('Dashboard Widget is missing an ID.');

            // set random id - keeps things working but prevents exporting of positions
            this.id = Math.floor(Math.random() * 100000).toString();
        }
    }

    /**
     * Once component is initialised link the resize handle elements with their direction
     */
    ngAfterViewInit(): void {
        this.initialiseHandles();
    }

    /**
     * If component is removed, then unregister it from the service
     */
    ngOnDestroy(): void {
        this._dashboardService.removeWidget(this);
    }

    /**
     * Return the ID of the widget
     */
    getId(): string {
        return this.id;
    }

    /**
     * Set the actual position and size values
     */
    render(): void {
        this.actualX = this.getColumn() * this._dashboardService.getColumnWidth();
        this.actualY = this.getRow() * this._dashboardService.getRowHeight();
        this.actualWidth = this.getColumnSpan() * this._dashboardService.getColumnWidth();
        this.actualHeight = this.getRowSpan() * this._dashboardService.getRowHeight();
    }

    /**
     * Returns all the resize handles and their associated directions
     */
    getHandles(): ResizeHandle[] {
        return this._handles;
    }

    /**
     * Indicates whether or not the widget should be displayed in stacked mode
     * @param stacked indicates the stacked mode
     */
    setStacked(stacked: boolean): void {
        this.stacked = stacked;
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
        this.actualX = x;
        this.actualY = y;
        this.actualWidth = width;
        this.actualHeight = height;
    }

    /**
     * Allows automatic setting of stackable value
     * @param property The current StackableValue object
     * @param value The value to set in the appropriate field
     */
    private setStackableValue(property: StackableValue, value: number): void {
        if (this.stacked) {
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
        return this.stacked ? property.stacked : property.regular;
    }

    /**
     * Create data representations of the resize handle elements and the direction they will resize in
     */
    private initialiseHandles() {

        this._handles = [
            {
                element: this._nativeElement.querySelector('.resizer-handle.handle-top'),
                direction: ActionDirection.Top
            },
            {
                element: this._nativeElement.querySelector('.resizer-handle.handle-top-right'),
                direction: ActionDirection.TopRight
            },
            {
                element: this._nativeElement.querySelector('.resizer-handle.handle-right'),
                direction: ActionDirection.Right
            },
            {
                element: this._nativeElement.querySelector('.resizer-handle.handle-bottom-right'),
                direction: ActionDirection.BottomRight
            },
            {
                element: this._nativeElement.querySelector('.resizer-handle.handle-bottom'),
                direction: ActionDirection.Bottom
            },
            {
                element: this._nativeElement.querySelector('.resizer-handle.handle-bottom-left'),
                direction: ActionDirection.BottomLeft
            },
            {
                element: this._nativeElement.querySelector('.resizer-handle.handle-left'),
                direction: ActionDirection.Left
            },
            {
                element: this._nativeElement.querySelector('.resizer-handle.handle-top-left'),
                direction: ActionDirection.TopLeft
            }
        ];

        // bind resize events to each handle
        this._handles.forEach(handle => this.bindResize(handle));
    }

    /**
     * This will apply event listeners to each resize handle
     * @param handle The element and direction to subscribe to
     */
    private bindResize(handle: ResizeHandle): void {

        // bind to resize events
        handle.listener = Observable.fromEvent(handle.element, 'mousedown').subscribe((downEvent: MouseEvent) => {

            downEvent.preventDefault();

            // inform service that we are beginning to drag
            this._dashboardService.onResizeStart({ widget: this, direction: handle.direction, event: downEvent });

            let move$ = this._dragMove.takeUntil(this._dragEnd).subscribe((moveEvent: MouseEvent) => {
                moveEvent.preventDefault();
                this._dashboardService.onResizeDrag({ widget: this, direction: handle.direction, event: moveEvent });
            }, null, () => {
                move$.unsubscribe();
                this._dashboardService.onResizeEnd();
            });

        });
    }
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