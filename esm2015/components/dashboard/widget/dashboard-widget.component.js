/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, HostBinding, Input } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { DashboardService } from '../dashboard.service';
export class DashboardWidgetComponent {
    /**
     * @param {?} dashboardService
     */
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
        this.colSpan = 1;
        this.rowSpan = 1;
        this.resizable = false;
        this.widgetAriaLabel = this.getDefaultAriaLabel;
        this.x = 0;
        this.y = 0;
        this.width = 100;
        this.height = 100;
        this.padding = 0;
        this.zIndex = 0;
        this.isDragging = false;
        this.isGrabbing = false;
        this.isDraggable = false;
        this._column = { regular: undefined, stacked: undefined };
        this._row = { regular: undefined, stacked: undefined };
        this._columnSpan = { regular: 1, stacked: 1 };
        this._rowSpan = { regular: 1, stacked: 1 };
        this._onDestroy = new Subject();
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
    /**
     * @return {?}
     */
    ngOnInit() {
        this._columnSpan.regular = this.colSpan;
        this._rowSpan.regular = this.rowSpan;
        if (!this.id) {
            console.warn('Dashboard Widget is missing an ID.');
            // set random id - keeps things working but prevents exporting of positions
            this.id = Math.floor(Math.random() * 100000).toString();
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // add the widget to the dashboard
        this.dashboardService.addWidget(this);
        // apply the current options
        this.update();
    }
    /**
     * If component is removed, then unregister it from the service
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
        this.dashboardService.removeWidget(this);
    }
    /**
     * Apply the current dashboard options
     * @return {?}
     */
    update() {
        // get the current options at the time
        const { padding, columns } = this.dashboardService.options;
        this.padding = padding;
        this._columnSpan.stacked = columns;
    }
    /**
     * Set the actual position and size values
     * @return {?}
     */
    render() {
        this.x = this.getColumn() * this.dashboardService.getColumnWidth();
        this.y = this.getRow() * this.dashboardService.getRowHeight();
        this.width = this.getColumnSpan() * this.dashboardService.getColumnWidth();
        this.height = this.getRowSpan() * this.dashboardService.getRowHeight();
    }
    /**
     * @return {?}
     */
    getColumn() {
        return this.getStackableValue(this._column);
    }
    /**
     * @return {?}
     */
    getRow() {
        return this.getStackableValue(this._row);
    }
    /**
     * @param {?} column
     * @param {?=} render
     * @return {?}
     */
    setColumn(column, render = true) {
        this.setStackableValue(this._column, column);
        if (render) {
            this.render();
        }
    }
    /**
     * @param {?} row
     * @param {?=} render
     * @return {?}
     */
    setRow(row, render = true) {
        this.setStackableValue(this._row, row);
        if (render) {
            this.render();
        }
    }
    /**
     * @return {?}
     */
    getColumnSpan() {
        return this.getStackableValue(this._columnSpan);
    }
    /**
     * @return {?}
     */
    getRowSpan() {
        return this.getStackableValue(this._rowSpan);
    }
    /**
     * @param {?} columnSpan
     * @param {?=} render
     * @return {?}
     */
    setColumnSpan(columnSpan, render = true) {
        this.setStackableValue(this._columnSpan, columnSpan);
        if (render) {
            this.render();
        }
    }
    /**
     * @param {?} rowSpan
     * @param {?=} render
     * @return {?}
     */
    setRowSpan(rowSpan, render = true) {
        this.setStackableValue(this._rowSpan, rowSpan);
        if (render) {
            this.render();
        }
    }
    /**
     * @return {?}
     */
    bringToFront() {
        this.zIndex = 1;
    }
    /**
     * @return {?}
     */
    sendToBack() {
        this.zIndex = 0;
    }
    /**
     * @param {?} x
     * @param {?} y
     * @param {?} width
     * @param {?} height
     * @return {?}
     */
    setBounds(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    /**
     * @param {?} handle
     * @param {?} event
     * @param {?} direction
     * @return {?}
     */
    dragstart(handle, event, direction) {
        this.dashboardService.isGrabbing$.next(null);
        this.dashboardService.onResizeStart({ widget: this, direction, event, handle });
    }
    /**
     * @param {?} handle
     * @param {?} event
     * @param {?} direction
     * @return {?}
     */
    drag(handle, event, direction) {
        this.dashboardService.onResizeDrag({ widget: this, direction, event, handle });
    }
    /**
     * @return {?}
     */
    dragend() {
        this.dashboardService.onResizeEnd();
    }
    /**
     * @return {?}
     */
    getAriaLabel() {
        if (this.widgetAriaLabel && typeof this.widgetAriaLabel === 'string') {
            return this.widgetAriaLabel;
        }
        else if (this.widgetAriaLabel && typeof this.widgetAriaLabel === 'function') {
            return this.widgetAriaLabel(this);
        }
        return this.ariaLabel;
    }
    /**
     * @param {?} widget
     * @return {?}
     */
    getDefaultAriaLabel(widget) {
        let /** @type {?} */ options = '';
        if (widget.resizable && widget.isDraggable) {
            options = 'It can be moved and resized.';
        }
        else if (widget.resizable) {
            options = 'It can be resized.';
        }
        else if (widget.isDraggable) {
            options = 'It can be moved.';
        }
        return `${widget.name} panel in row ${widget.getRow()}, column ${widget.getColumn()}, is ${widget.getColumnSpan()} columns wide and ${widget.getRowSpan()} rows high. ${options}`;
    }
    /**
     * Allows automatic setting of stackable value
     * @param {?} property The current StackableValue object
     * @param {?} value The value to set in the appropriate field
     * @return {?}
     */
    setStackableValue(property, value) {
        if (this.dashboardService.stacked) {
            property.stacked = value;
        }
        else {
            property.regular = value;
        }
    }
    /**
     * Return the appropriate value from a stackable value
     * @param {?} property The Stackable value object
     * @return {?}
     */
    getStackableValue(property) {
        return this.dashboardService.stacked ? property.stacked : property.regular;
    }
}
DashboardWidgetComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-dashboard-widget',
                template: "<div class=\"widget-content widget-col-span-{{ getColumnSpan() }} widget-row-span-{{ getRowSpan() }}\">\n    <ng-content></ng-content>\n</div>\n\n<div uxDrag\n     #handleTop\n     class=\"resizer-handle handle-top\"\n     (onDragStart)=\"dragstart(handleTop, $event, 0)\"\n     (onDrag)=\"drag(handleTop, $event, 0)\"\n     (onDragEnd)=\"dragend()\"\n     [style.top.px]=\"padding\"\n     [hidden]=\"!resizable\">\n</div>\n\n<div uxDrag\n     #handleTopRight\n     class=\"resizer-handle handle-top-right\"\n     (onDragStart)=\"dragstart(handleTopRight, $event, 1)\"\n     (onDrag)=\"drag(handleTopRight, $event, 1)\"\n     (onDragEnd)=\"dragend()\"\n     [style.top.px]=\"padding\"\n     [style.right.px]=\"padding\"\n     [hidden]=\"!resizable && !(dashboardService.stacked$ | async)\">\n</div>\n\n<div uxDrag\n     #handleRight\n     class=\"resizer-handle handle-right\"\n     (onDragStart)=\"dragstart(handleRight, $event, 2)\"\n     (onDrag)=\"drag(handleRight, $event, 2)\"\n     (onDragEnd)=\"dragend()\"\n     [style.right.px]=\"padding\"\n     [hidden]=\"!resizable || (dashboardService.stacked$ | async)\">\n</div>\n\n<div uxDrag\n     #handleBottomRight\n     class=\"resizer-handle handle-bottom-right\"\n     (onDragStart)=\"dragstart(handleBottomRight, $event, 3)\"\n     (onDrag)=\"drag(handleBottomRight, $event, 3)\"\n     (onDragEnd)=\"dragend()\"\n     [style.bottom.px]=\"padding\"\n     [style.right.px]=\"padding\"\n     [hidden]=\"!resizable && !(dashboardService.stacked$ | async)\">\n</div>\n\n<div uxDrag\n     #handleBottom\n     class=\"resizer-handle handle-bottom\"\n     (onDragStart)=\"dragstart(handleBottom, $event, 4)\"\n     (onDrag)=\"drag(handleBottom, $event, 4)\"\n     (onDragEnd)=\"dragend()\"\n     [style.bottom.px]=\"padding\"\n     [hidden]=\"!resizable\">\n</div>\n\n<div uxDrag\n     #handleBottomLeft\n     class=\"resizer-handle handle-bottom-left\"\n     (onDragStart)=\"dragstart(handleBottomLeft, $event, 5)\"\n     (onDrag)=\"drag(handleBottomLeft, $event, 5)\"\n     (onDragEnd)=\"dragend()\"\n     [style.bottom.px]=\"padding\"\n     [style.left.px]=\"padding\"\n     [hidden]=\"!resizable && !(dashboardService.stacked$ | async)\">\n</div>\n\n<div uxDrag\n     #handleLeft\n     class=\"resizer-handle handle-left\"\n     (onDragStart)=\"dragstart(handleLeft, $event, 6)\"\n     (onDrag)=\"drag(handleLeft, $event, 6)\"\n     (onDragEnd)=\"dragend()\"\n     [style.left.px]=\"padding\"\n     [hidden]=\"!resizable || (dashboardService.stacked$ | async)\">\n</div>\n\n<div uxDrag\n     #handleTopLeft\n     class=\"resizer-handle handle-top-left\"\n     (onDragStart)=\"dragstart(handleTopLeft, $event, 7)\"\n     (onDrag)=\"drag(handleTopLeft, $event, 7)\"\n     (onDragEnd)=\"dragend()\"\n     [style.top.px]=\"padding\"\n     [style.left.px]=\"padding\"\n     [hidden]=\"!resizable && !(dashboardService.stacked$ | async)\">\n</div>"
            }] }
];
/** @nocollapse */
DashboardWidgetComponent.ctorParameters = () => [
    { type: DashboardService }
];
DashboardWidgetComponent.propDecorators = {
    id: [{ type: Input }],
    name: [{ type: Input }],
    col: [{ type: Input }],
    row: [{ type: Input }],
    colSpan: [{ type: Input }],
    rowSpan: [{ type: Input }],
    resizable: [{ type: Input }],
    widgetAriaLabel: [{ type: Input }],
    x: [{ type: HostBinding, args: ['style.left.px',] }],
    y: [{ type: HostBinding, args: ['style.top.px',] }],
    width: [{ type: HostBinding, args: ['style.width.px',] }],
    height: [{ type: HostBinding, args: ['style.height.px',] }],
    padding: [{ type: HostBinding, args: ['style.padding.px',] }],
    zIndex: [{ type: HostBinding, args: ['style.z-index',] }],
    ariaLabel: [{ type: HostBinding, args: ['attr.aria-label',] }],
    isDragging: [{ type: HostBinding, args: ['class.dragging',] }],
    isGrabbing: [{ type: HostBinding, args: ['class.grabbing',] }]
};
function DashboardWidgetComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    DashboardWidgetComponent.prototype.id;
    /** @type {?} */
    DashboardWidgetComponent.prototype.name;
    /** @type {?} */
    DashboardWidgetComponent.prototype.col;
    /** @type {?} */
    DashboardWidgetComponent.prototype.row;
    /** @type {?} */
    DashboardWidgetComponent.prototype.colSpan;
    /** @type {?} */
    DashboardWidgetComponent.prototype.rowSpan;
    /** @type {?} */
    DashboardWidgetComponent.prototype.resizable;
    /** @type {?} */
    DashboardWidgetComponent.prototype.widgetAriaLabel;
    /** @type {?} */
    DashboardWidgetComponent.prototype.x;
    /** @type {?} */
    DashboardWidgetComponent.prototype.y;
    /** @type {?} */
    DashboardWidgetComponent.prototype.width;
    /** @type {?} */
    DashboardWidgetComponent.prototype.height;
    /** @type {?} */
    DashboardWidgetComponent.prototype.padding;
    /** @type {?} */
    DashboardWidgetComponent.prototype.zIndex;
    /** @type {?} */
    DashboardWidgetComponent.prototype.ariaLabel;
    /** @type {?} */
    DashboardWidgetComponent.prototype.isDragging;
    /** @type {?} */
    DashboardWidgetComponent.prototype.isGrabbing;
    /** @type {?} */
    DashboardWidgetComponent.prototype.isDraggable;
    /** @type {?} */
    DashboardWidgetComponent.prototype._column;
    /** @type {?} */
    DashboardWidgetComponent.prototype._row;
    /** @type {?} */
    DashboardWidgetComponent.prototype._columnSpan;
    /** @type {?} */
    DashboardWidgetComponent.prototype._rowSpan;
    /** @type {?} */
    DashboardWidgetComponent.prototype._onDestroy;
    /** @type {?} */
    DashboardWidgetComponent.prototype.dashboardService;
}
/**
 * @record
 */
export function StackableValue() { }
function StackableValue_tsickle_Closure_declarations() {
    /** @type {?} */
    StackableValue.prototype.regular;
    /** @type {?} */
    StackableValue.prototype.stacked;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLXdpZGdldC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXNoYm9hcmQvd2lkZ2V0L2Rhc2hib2FyZC13aWRnZXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUNoRyxPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdkMsT0FBTyxFQUFtQixnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBTXpFLE1BQU07Ozs7SUE2QkYsWUFBbUIsZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7dUJBdkIxQixDQUFDO3VCQUNELENBQUM7eUJBQ0UsS0FBSzsrQkFDZ0QsSUFBSSxDQUFDLG1CQUFtQjtpQkFFakUsQ0FBQztpQkFDRixDQUFDO3FCQUNLLEdBQUc7c0JBQ0QsR0FBRzt1QkFDRCxDQUFDO3NCQUNMLENBQUM7MEJBRUssS0FBSzswQkFDTCxLQUFLOzJCQUVuQyxLQUFLO3VCQUVNLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFO29CQUM3QyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRTsyQkFDbkMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUU7d0JBQzdCLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFOzBCQUN4QyxJQUFJLE9BQU8sRUFBUTs7UUFJcEMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMs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QUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNoQyxRQUFRLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztTQUM1QjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osUUFBUSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7U0FDNUI7Ozs7Ozs7SUFPRyxpQkFBaUIsQ0FBQyxRQUF3QjtRQUM5QyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQzs7OztZQS9ObEYsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLDAxRkFBZ0Q7YUFDbkQ7Ozs7WUFMeUIsZ0JBQWdCOzs7aUJBUXJDLEtBQUs7bUJBQ0wsS0FBSztrQkFDTCxLQUFLO2tCQUNMLEtBQUs7c0JBQ0wsS0FBSztzQkFDTCxLQUFLO3dCQUNMLEtBQUs7OEJBQ0wsS0FBSztnQkFFTCxXQUFXLFNBQUMsZUFBZTtnQkFDM0IsV0FBVyxTQUFDLGNBQWM7b0JBQzFCLFdBQVcsU0FBQyxnQkFBZ0I7cUJBQzVCLFdBQVcsU0FBQyxpQkFBaUI7c0JBQzdCLFdBQVcsU0FBQyxrQkFBa0I7cUJBQzlCLFdBQVcsU0FBQyxlQUFlO3dCQUMzQixXQUFXLFNBQUMsaUJBQWlCO3lCQUM3QixXQUFXLFNBQUMsZ0JBQWdCO3lCQUM1QixXQUFXLFNBQUMsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBIb3N0QmluZGluZywgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBtYXAsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgQWN0aW9uRGlyZWN0aW9uLCBEYXNoYm9hcmRTZXJ2aWNlIH0gZnJvbSAnLi4vZGFzaGJvYXJkLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LWRhc2hib2FyZC13aWRnZXQnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9kYXNoYm9hcmQtd2lkZ2V0LmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBpZDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcbiAgICBASW5wdXQoKSBjb2w6IG51bWJlcjtcbiAgICBASW5wdXQoKSByb3c6IG51bWJlcjtcbiAgICBASW5wdXQoKSBjb2xTcGFuOiBudW1iZXIgPSAxO1xuICAgIEBJbnB1dCgpIHJvd1NwYW46IG51bWJlciA9IDE7XG4gICAgQElucHV0KCkgcmVzaXphYmxlOiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgd2lkZ2V0QXJpYUxhYmVsOiAod2lkZ2V0czogRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50KSA9PiBzdHJpbmcgfCBzdHJpbmcgPSB0aGlzLmdldERlZmF1bHRBcmlhTGFiZWw7XG5cbiAgICBASG9zdEJpbmRpbmcoJ3N0eWxlLmxlZnQucHgnKSB4OiBudW1iZXIgPSAwO1xuICAgIEBIb3N0QmluZGluZygnc3R5bGUudG9wLnB4JykgeTogbnVtYmVyID0gMDtcbiAgICBASG9zdEJpbmRpbmcoJ3N0eWxlLndpZHRoLnB4Jykgd2lkdGg6IG51bWJlciA9IDEwMDtcbiAgICBASG9zdEJpbmRpbmcoJ3N0eWxlLmhlaWdodC5weCcpIGhlaWdodDogbnVtYmVyID0gMTAwO1xuICAgIEBIb3N0QmluZGluZygnc3R5bGUucGFkZGluZy5weCcpIHBhZGRpbmc6IG51bWJlciA9IDA7XG4gICAgQEhvc3RCaW5kaW5nKCdzdHlsZS56LWluZGV4JykgekluZGV4OiBudW1iZXIgPSAwO1xuICAgIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLWxhYmVsJykgYXJpYUxhYmVsOiBzdHJpbmc7XG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5kcmFnZ2luZycpIGlzRHJhZ2dpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmdyYWJiaW5nJykgaXNHcmFiYmluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgaXNEcmFnZ2FibGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHByaXZhdGUgX2NvbHVtbjogU3RhY2thYmxlVmFsdWUgPSB7IHJlZ3VsYXI6IHVuZGVmaW5lZCwgc3RhY2tlZDogdW5kZWZpbmVkIH07XG4gICAgcHJpdmF0ZSBfcm93OiBTdGFja2FibGVWYWx1ZSA9IHsgcmVndWxhcjogdW5kZWZpbmVkLCBzdGFja2VkOiB1bmRlZmluZWQgfTtcbiAgICBwcml2YXRlIF9jb2x1bW5TcGFuOiBTdGFja2FibGVWYWx1ZSA9IHsgcmVndWxhcjogMSwgc3RhY2tlZDogMSB9O1xuICAgIHByaXZhdGUgX3Jvd1NwYW46IFN0YWNrYWJsZVZhbHVlID0geyByZWd1bGFyOiAxLCBzdGFja2VkOiAxIH07XG4gICAgcHJpdmF0ZSBfb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkYXNoYm9hcmRTZXJ2aWNlOiBEYXNoYm9hcmRTZXJ2aWNlKSB7XG4gICAgICAgIC8vIHN1YnNjcmliZSB0byBvcHRpb24gY2hhbmdlc1xuICAgICAgICBkYXNoYm9hcmRTZXJ2aWNlLm9wdGlvbnMkLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMudXBkYXRlKCkpO1xuXG4gICAgICAgIC8vIGV2ZXJ5IHRpbWUgdGhlIGxheW91dCBjaGFuZ2VzIHdlIHdhbnQgdG8gdXBkYXRlIHRoZSBhcmlhIGxhYmVsXG4gICAgICAgIGRhc2hib2FyZFNlcnZpY2UubGF5b3V0JC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmFyaWFMYWJlbCA9IHRoaXMuZ2V0QXJpYUxhYmVsKCkpO1xuXG4gICAgICAgIC8vIGFsbG93IHdpZGdldCBtb3ZlbWVudHMgdG8gYmUgYW5pbWF0ZWRcbiAgICAgICAgZGFzaGJvYXJkU2VydmljZS5pc0RyYWdnaW5nJC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpLCBtYXAod2lkZ2V0ID0+IHdpZGdldCA9PT0gdGhpcykpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGlzRHJhZ2dpbmcgPT4gdGhpcy5pc0RyYWdnaW5nID0gaXNEcmFnZ2luZyk7XG5cbiAgICAgICAgLy8gYWxsb3cgd2lkZ2V0IG1vdmVtZW50cyB0byBiZSBhbmltYXRlZFxuICAgICAgICBkYXNoYm9hcmRTZXJ2aWNlLmlzR3JhYmJpbmckLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSksIG1hcCh3aWRnZXQgPT4gd2lkZ2V0ID09PSB0aGlzKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoaXNHcmFiYmluZyA9PiB0aGlzLmlzR3JhYmJpbmcgPSBpc0dyYWJiaW5nKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcblxuICAgICAgICB0aGlzLl9jb2x1bW5TcGFuLnJlZ3VsYXIgPSB0aGlzLmNvbFNwYW47XG4gICAgICAgIHRoaXMuX3Jvd1NwYW4ucmVndWxhciA9IHRoaXMucm93U3BhbjtcblxuICAgICAgICBpZiAoIXRoaXMuaWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignRGFzaGJvYXJkIFdpZGdldCBpcyBtaXNzaW5nIGFuIElELicpO1xuXG4gICAgICAgICAgICAvLyBzZXQgcmFuZG9tIGlkIC0ga2VlcHMgdGhpbmdzIHdvcmtpbmcgYnV0IHByZXZlbnRzIGV4cG9ydGluZyBvZiBwb3NpdGlvbnNcbiAgICAgICAgICAgIHRoaXMuaWQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMDApLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIC8vIGFkZCB0aGUgd2lkZ2V0IHRvIHRoZSBkYXNoYm9hcmRcbiAgICAgICAgdGhpcy5kYXNoYm9hcmRTZXJ2aWNlLmFkZFdpZGdldCh0aGlzKTtcblxuICAgICAgICAvLyBhcHBseSB0aGUgY3VycmVudCBvcHRpb25zXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSWYgY29tcG9uZW50IGlzIHJlbW92ZWQsIHRoZW4gdW5yZWdpc3RlciBpdCBmcm9tIHRoZSBzZXJ2aWNlXG4gICAgICovXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICAgICAgICB0aGlzLmRhc2hib2FyZFNlcnZpY2UucmVtb3ZlV2lkZ2V0KHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFwcGx5IHRoZSBjdXJyZW50IGRhc2hib2FyZCBvcHRpb25zXG4gICAgICovXG4gICAgdXBkYXRlKCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGdldCB0aGUgY3VycmVudCBvcHRpb25zIGF0IHRoZSB0aW1lXG4gICAgICAgIGNvbnN0IHsgcGFkZGluZywgY29sdW1ucyB9ID0gdGhpcy5kYXNoYm9hcmRTZXJ2aWNlLm9wdGlvbnM7XG5cbiAgICAgICAgdGhpcy5wYWRkaW5nID0gcGFkZGluZztcbiAgICAgICAgdGhpcy5fY29sdW1uU3Bhbi5zdGFja2VkID0gY29sdW1ucztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGFjdHVhbCBwb3NpdGlvbiBhbmQgc2l6ZSB2YWx1ZXNcbiAgICAgKi9cbiAgICByZW5kZXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMueCA9IHRoaXMuZ2V0Q29sdW1uKCkgKiB0aGlzLmRhc2hib2FyZFNlcnZpY2UuZ2V0Q29sdW1uV2lkdGgoKTtcbiAgICAgICAgdGhpcy55ID0gdGhpcy5nZXRSb3coKSAqIHRoaXMuZGFzaGJvYXJkU2VydmljZS5nZXRSb3dIZWlnaHQoKTtcbiAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuZ2V0Q29sdW1uU3BhbigpICogdGhpcy5kYXNoYm9hcmRTZXJ2aWNlLmdldENvbHVtbldpZHRoKCk7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5nZXRSb3dTcGFuKCkgKiB0aGlzLmRhc2hib2FyZFNlcnZpY2UuZ2V0Um93SGVpZ2h0KCk7XG4gICAgfVxuXG4gICAgZ2V0Q29sdW1uKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFN0YWNrYWJsZVZhbHVlKHRoaXMuX2NvbHVtbik7XG4gICAgfVxuXG4gICAgZ2V0Um93KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFN0YWNrYWJsZVZhbHVlKHRoaXMuX3Jvdyk7XG4gICAgfVxuXG4gICAgc2V0Q29sdW1uKGNvbHVtbjogbnVtYmVyLCByZW5kZXI6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0U3RhY2thYmxlVmFsdWUodGhpcy5fY29sdW1uLCBjb2x1bW4pO1xuXG4gICAgICAgIGlmIChyZW5kZXIpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRSb3cocm93OiBudW1iZXIsIHJlbmRlcjogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXRTdGFja2FibGVWYWx1ZSh0aGlzLl9yb3csIHJvdyk7XG5cbiAgICAgICAgaWYgKHJlbmRlcikge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldENvbHVtblNwYW4oKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3RhY2thYmxlVmFsdWUodGhpcy5fY29sdW1uU3Bhbik7XG4gICAgfVxuXG4gICAgZ2V0Um93U3BhbigpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTdGFja2FibGVWYWx1ZSh0aGlzLl9yb3dTcGFuKTtcbiAgICB9XG5cbiAgICBzZXRDb2x1bW5TcGFuKGNvbHVtblNwYW46IG51bWJlciwgcmVuZGVyOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xuICAgICAgICB0aGlzLnNldFN0YWNrYWJsZVZhbHVlKHRoaXMuX2NvbHVtblNwYW4sIGNvbHVtblNwYW4pO1xuXG4gICAgICAgIGlmIChyZW5kZXIpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRSb3dTcGFuKHJvd1NwYW46IG51bWJlciwgcmVuZGVyOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xuICAgICAgICB0aGlzLnNldFN0YWNrYWJsZVZhbHVlKHRoaXMuX3Jvd1NwYW4sIHJvd1NwYW4pO1xuXG4gICAgICAgIGlmIChyZW5kZXIpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBicmluZ1RvRnJvbnQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuekluZGV4ID0gMTtcbiAgICB9XG5cbiAgICBzZW5kVG9CYWNrKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnpJbmRleCA9IDA7XG4gICAgfVxuXG4gICAgc2V0Qm91bmRzKHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIH1cblxuICAgIGRyYWdzdGFydChoYW5kbGU6IEhUTUxFbGVtZW50LCBldmVudDogTW91c2VFdmVudCwgZGlyZWN0aW9uOiBBY3Rpb25EaXJlY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kYXNoYm9hcmRTZXJ2aWNlLmlzR3JhYmJpbmckLm5leHQobnVsbCk7XG4gICAgICAgIHRoaXMuZGFzaGJvYXJkU2VydmljZS5vblJlc2l6ZVN0YXJ0KHsgd2lkZ2V0OiB0aGlzLCBkaXJlY3Rpb24sIGV2ZW50LCBoYW5kbGUgfSk7XG4gICAgfVxuXG4gICAgZHJhZyhoYW5kbGU6IEhUTUxFbGVtZW50LCBldmVudDogTW91c2VFdmVudCwgZGlyZWN0aW9uOiBBY3Rpb25EaXJlY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kYXNoYm9hcmRTZXJ2aWNlLm9uUmVzaXplRHJhZyh7IHdpZGdldDogdGhpcywgZGlyZWN0aW9uLCBldmVudCwgaGFuZGxlIH0pO1xuICAgIH1cblxuICAgIGRyYWdlbmQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGFzaGJvYXJkU2VydmljZS5vblJlc2l6ZUVuZCgpO1xuICAgIH1cblxuICAgIGdldEFyaWFMYWJlbCgpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy53aWRnZXRBcmlhTGFiZWwgJiYgdHlwZW9mIHRoaXMud2lkZ2V0QXJpYUxhYmVsID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMud2lkZ2V0QXJpYUxhYmVsO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMud2lkZ2V0QXJpYUxhYmVsICYmIHR5cGVvZiB0aGlzLndpZGdldEFyaWFMYWJlbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMud2lkZ2V0QXJpYUxhYmVsKHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuYXJpYUxhYmVsO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RGVmYXVsdEFyaWFMYWJlbCh3aWRnZXQ6IERhc2hib2FyZFdpZGdldENvbXBvbmVudCk6IHN0cmluZyB7XG5cbiAgICAgICAgbGV0IG9wdGlvbnM6IHN0cmluZyA9ICcnO1xuXG4gICAgICAgIGlmICh3aWRnZXQucmVzaXphYmxlICYmIHdpZGdldC5pc0RyYWdnYWJsZSkge1xuICAgICAgICAgICAgb3B0aW9ucyA9ICdJdCBjYW4gYmUgbW92ZWQgYW5kIHJlc2l6ZWQuJztcbiAgICAgICAgfSBlbHNlIGlmICh3aWRnZXQucmVzaXphYmxlKSB7XG4gICAgICAgICAgICBvcHRpb25zID0gJ0l0IGNhbiBiZSByZXNpemVkLic7XG4gICAgICAgIH0gZWxzZSBpZiAod2lkZ2V0LmlzRHJhZ2dhYmxlKSB7XG4gICAgICAgICAgICBvcHRpb25zID0gJ0l0IGNhbiBiZSBtb3ZlZC4nO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGAke3dpZGdldC5uYW1lfSBwYW5lbCBpbiByb3cgJHt3aWRnZXQuZ2V0Um93KCl9LCBjb2x1bW4gJHt3aWRnZXQuZ2V0Q29sdW1uKCl9LCBpcyAke3dpZGdldC5nZXRDb2x1bW5TcGFuKCl9IGNvbHVtbnMgd2lkZSBhbmQgJHt3aWRnZXQuZ2V0Um93U3BhbigpfSByb3dzIGhpZ2guICR7b3B0aW9uc31gO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFsbG93cyBhdXRvbWF0aWMgc2V0dGluZyBvZiBzdGFja2FibGUgdmFsdWVcbiAgICAgKiBAcGFyYW0gcHJvcGVydHkgVGhlIGN1cnJlbnQgU3RhY2thYmxlVmFsdWUgb2JqZWN0XG4gICAgICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQgaW4gdGhlIGFwcHJvcHJpYXRlIGZpZWxkXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZXRTdGFja2FibGVWYWx1ZShwcm9wZXJ0eTogU3RhY2thYmxlVmFsdWUsIHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcblxuICAgICAgICBpZiAodGhpcy5kYXNoYm9hcmRTZXJ2aWNlLnN0YWNrZWQpIHtcbiAgICAgICAgICAgIHByb3BlcnR5LnN0YWNrZWQgPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByb3BlcnR5LnJlZ3VsYXIgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgYXBwcm9wcmlhdGUgdmFsdWUgZnJvbSBhIHN0YWNrYWJsZSB2YWx1ZVxuICAgICAqIEBwYXJhbSBwcm9wZXJ0eSBUaGUgU3RhY2thYmxlIHZhbHVlIG9iamVjdFxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0U3RhY2thYmxlVmFsdWUocHJvcGVydHk6IFN0YWNrYWJsZVZhbHVlKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGFzaGJvYXJkU2VydmljZS5zdGFja2VkID8gcHJvcGVydHkuc3RhY2tlZCA6IHByb3BlcnR5LnJlZ3VsYXI7XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN0YWNrYWJsZVZhbHVlIHtcbiAgICByZWd1bGFyOiBudW1iZXI7XG4gICAgc3RhY2tlZDogbnVtYmVyO1xufSJdfQ==