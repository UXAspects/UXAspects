/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, HostBinding, Input } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { DashboardService } from '../dashboard.service';
var DashboardWidgetComponent = /** @class */ (function () {
    function DashboardWidgetComponent(dashboardService) {
        var _this = this;
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
            .subscribe(function () { return _this.update(); });
        // every time the layout changes we want to update the aria label
        dashboardService.layout$.pipe(takeUntil(this._onDestroy))
            .subscribe(function () { return _this.ariaLabel = _this.getAriaLabel(); });
        // allow widget movements to be animated
        dashboardService.isDragging$.pipe(takeUntil(this._onDestroy), map(function (widget) { return widget === _this; }))
            .subscribe(function (isDragging) { return _this.isDragging = isDragging; });
        // allow widget movements to be animated
        dashboardService.isGrabbing$.pipe(takeUntil(this._onDestroy), map(function (widget) { return widget === _this; }))
            .subscribe(function (isGrabbing) { return _this.isGrabbing = isGrabbing; });
    }
    /**
     * @return {?}
     */
    DashboardWidgetComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._columnSpan.regular = this.colSpan;
        this._rowSpan.regular = this.rowSpan;
        if (!this.id) {
            console.warn('Dashboard Widget is missing an ID.');
            // set random id - keeps things working but prevents exporting of positions
            this.id = Math.floor(Math.random() * 100000).toString();
        }
    };
    /**
     * @return {?}
     */
    DashboardWidgetComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        // add the widget to the dashboard
        this.dashboardService.addWidget(this);
        // apply the current options
        this.update();
    };
    /**
     * If component is removed, then unregister it from the service
     */
    /**
     * If component is removed, then unregister it from the service
     * @return {?}
     */
    DashboardWidgetComponent.prototype.ngOnDestroy = /**
     * If component is removed, then unregister it from the service
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
        this.dashboardService.removeWidget(this);
    };
    /**
     * Apply the current dashboard options
     */
    /**
     * Apply the current dashboard options
     * @return {?}
     */
    DashboardWidgetComponent.prototype.update = /**
     * Apply the current dashboard options
     * @return {?}
     */
    function () {
        // get the current options at the time
        var _a = this.dashboardService.options, padding = _a.padding, columns = _a.columns;
        this.padding = padding;
        this._columnSpan.stacked = columns;
    };
    /**
     * Set the actual position and size values
     */
    /**
     * Set the actual position and size values
     * @return {?}
     */
    DashboardWidgetComponent.prototype.render = /**
     * Set the actual position and size values
     * @return {?}
     */
    function () {
        this.x = this.getColumn() * this.dashboardService.getColumnWidth();
        this.y = this.getRow() * this.dashboardService.getRowHeight();
        this.width = this.getColumnSpan() * this.dashboardService.getColumnWidth();
        this.height = this.getRowSpan() * this.dashboardService.getRowHeight();
    };
    /**
     * @return {?}
     */
    DashboardWidgetComponent.prototype.getColumn = /**
     * @return {?}
     */
    function () {
        return this.getStackableValue(this._column);
    };
    /**
     * @return {?}
     */
    DashboardWidgetComponent.prototype.getRow = /**
     * @return {?}
     */
    function () {
        return this.getStackableValue(this._row);
    };
    /**
     * @param {?} column
     * @param {?=} render
     * @return {?}
     */
    DashboardWidgetComponent.prototype.setColumn = /**
     * @param {?} column
     * @param {?=} render
     * @return {?}
     */
    function (column, render) {
        if (render === void 0) { render = true; }
        this.setStackableValue(this._column, column);
        if (render) {
            this.render();
        }
    };
    /**
     * @param {?} row
     * @param {?=} render
     * @return {?}
     */
    DashboardWidgetComponent.prototype.setRow = /**
     * @param {?} row
     * @param {?=} render
     * @return {?}
     */
    function (row, render) {
        if (render === void 0) { render = true; }
        this.setStackableValue(this._row, row);
        if (render) {
            this.render();
        }
    };
    /**
     * @return {?}
     */
    DashboardWidgetComponent.prototype.getColumnSpan = /**
     * @return {?}
     */
    function () {
        return this.getStackableValue(this._columnSpan);
    };
    /**
     * @return {?}
     */
    DashboardWidgetComponent.prototype.getRowSpan = /**
     * @return {?}
     */
    function () {
        return this.getStackableValue(this._rowSpan);
    };
    /**
     * @param {?} columnSpan
     * @param {?=} render
     * @return {?}
     */
    DashboardWidgetComponent.prototype.setColumnSpan = /**
     * @param {?} columnSpan
     * @param {?=} render
     * @return {?}
     */
    function (columnSpan, render) {
        if (render === void 0) { render = true; }
        this.setStackableValue(this._columnSpan, columnSpan);
        if (render) {
            this.render();
        }
    };
    /**
     * @param {?} rowSpan
     * @param {?=} render
     * @return {?}
     */
    DashboardWidgetComponent.prototype.setRowSpan = /**
     * @param {?} rowSpan
     * @param {?=} render
     * @return {?}
     */
    function (rowSpan, render) {
        if (render === void 0) { render = true; }
        this.setStackableValue(this._rowSpan, rowSpan);
        if (render) {
            this.render();
        }
    };
    /**
     * @return {?}
     */
    DashboardWidgetComponent.prototype.bringToFront = /**
     * @return {?}
     */
    function () {
        this.zIndex = 1;
    };
    /**
     * @return {?}
     */
    DashboardWidgetComponent.prototype.sendToBack = /**
     * @return {?}
     */
    function () {
        this.zIndex = 0;
    };
    /**
     * @param {?} x
     * @param {?} y
     * @param {?} width
     * @param {?} height
     * @return {?}
     */
    DashboardWidgetComponent.prototype.setBounds = /**
     * @param {?} x
     * @param {?} y
     * @param {?} width
     * @param {?} height
     * @return {?}
     */
    function (x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    };
    /**
     * @param {?} handle
     * @param {?} event
     * @param {?} direction
     * @return {?}
     */
    DashboardWidgetComponent.prototype.dragstart = /**
     * @param {?} handle
     * @param {?} event
     * @param {?} direction
     * @return {?}
     */
    function (handle, event, direction) {
        this.dashboardService.isGrabbing$.next(null);
        this.dashboardService.onResizeStart({ widget: this, direction: direction, event: event, handle: handle });
    };
    /**
     * @param {?} handle
     * @param {?} event
     * @param {?} direction
     * @return {?}
     */
    DashboardWidgetComponent.prototype.drag = /**
     * @param {?} handle
     * @param {?} event
     * @param {?} direction
     * @return {?}
     */
    function (handle, event, direction) {
        this.dashboardService.onResizeDrag({ widget: this, direction: direction, event: event, handle: handle });
    };
    /**
     * @return {?}
     */
    DashboardWidgetComponent.prototype.dragend = /**
     * @return {?}
     */
    function () {
        this.dashboardService.onResizeEnd();
    };
    /**
     * @return {?}
     */
    DashboardWidgetComponent.prototype.getAriaLabel = /**
     * @return {?}
     */
    function () {
        if (this.widgetAriaLabel && typeof this.widgetAriaLabel === 'string') {
            return this.widgetAriaLabel;
        }
        else if (this.widgetAriaLabel && typeof this.widgetAriaLabel === 'function') {
            return this.widgetAriaLabel(this);
        }
        return this.ariaLabel;
    };
    /**
     * @param {?} widget
     * @return {?}
     */
    DashboardWidgetComponent.prototype.getDefaultAriaLabel = /**
     * @param {?} widget
     * @return {?}
     */
    function (widget) {
        var /** @type {?} */ options = '';
        if (widget.resizable && widget.isDraggable) {
            options = 'It can be moved and resized.';
        }
        else if (widget.resizable) {
            options = 'It can be resized.';
        }
        else if (widget.isDraggable) {
            options = 'It can be moved.';
        }
        return widget.name + " panel in row " + widget.getRow() + ", column " + widget.getColumn() + ", is " + widget.getColumnSpan() + " columns wide and " + widget.getRowSpan() + " rows high. " + options;
    };
    /**
     * Allows automatic setting of stackable value
     * @param {?} property The current StackableValue object
     * @param {?} value The value to set in the appropriate field
     * @return {?}
     */
    DashboardWidgetComponent.prototype.setStackableValue = /**
     * Allows automatic setting of stackable value
     * @param {?} property The current StackableValue object
     * @param {?} value The value to set in the appropriate field
     * @return {?}
     */
    function (property, value) {
        if (this.dashboardService.stacked) {
            property.stacked = value;
        }
        else {
            property.regular = value;
        }
    };
    /**
     * Return the appropriate value from a stackable value
     * @param {?} property The Stackable value object
     * @return {?}
     */
    DashboardWidgetComponent.prototype.getStackableValue = /**
     * Return the appropriate value from a stackable value
     * @param {?} property The Stackable value object
     * @return {?}
     */
    function (property) {
        return this.dashboardService.stacked ? property.stacked : property.regular;
    };
    DashboardWidgetComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-dashboard-widget',
                    template: "<div class=\"widget-content widget-col-span-{{ getColumnSpan() }} widget-row-span-{{ getRowSpan() }}\">\n    <ng-content></ng-content>\n</div>\n\n<div uxDrag\n     #handleTop\n     class=\"resizer-handle handle-top\"\n     (onDragStart)=\"dragstart(handleTop, $event, 0)\"\n     (onDrag)=\"drag(handleTop, $event, 0)\"\n     (onDragEnd)=\"dragend()\"\n     [style.top.px]=\"padding\"\n     [hidden]=\"!resizable\">\n</div>\n\n<div uxDrag\n     #handleTopRight\n     class=\"resizer-handle handle-top-right\"\n     (onDragStart)=\"dragstart(handleTopRight, $event, 1)\"\n     (onDrag)=\"drag(handleTopRight, $event, 1)\"\n     (onDragEnd)=\"dragend()\"\n     [style.top.px]=\"padding\"\n     [style.right.px]=\"padding\"\n     [hidden]=\"!resizable && !(dashboardService.stacked$ | async)\">\n</div>\n\n<div uxDrag\n     #handleRight\n     class=\"resizer-handle handle-right\"\n     (onDragStart)=\"dragstart(handleRight, $event, 2)\"\n     (onDrag)=\"drag(handleRight, $event, 2)\"\n     (onDragEnd)=\"dragend()\"\n     [style.right.px]=\"padding\"\n     [hidden]=\"!resizable || (dashboardService.stacked$ | async)\">\n</div>\n\n<div uxDrag\n     #handleBottomRight\n     class=\"resizer-handle handle-bottom-right\"\n     (onDragStart)=\"dragstart(handleBottomRight, $event, 3)\"\n     (onDrag)=\"drag(handleBottomRight, $event, 3)\"\n     (onDragEnd)=\"dragend()\"\n     [style.bottom.px]=\"padding\"\n     [style.right.px]=\"padding\"\n     [hidden]=\"!resizable && !(dashboardService.stacked$ | async)\">\n</div>\n\n<div uxDrag\n     #handleBottom\n     class=\"resizer-handle handle-bottom\"\n     (onDragStart)=\"dragstart(handleBottom, $event, 4)\"\n     (onDrag)=\"drag(handleBottom, $event, 4)\"\n     (onDragEnd)=\"dragend()\"\n     [style.bottom.px]=\"padding\"\n     [hidden]=\"!resizable\">\n</div>\n\n<div uxDrag\n     #handleBottomLeft\n     class=\"resizer-handle handle-bottom-left\"\n     (onDragStart)=\"dragstart(handleBottomLeft, $event, 5)\"\n     (onDrag)=\"drag(handleBottomLeft, $event, 5)\"\n     (onDragEnd)=\"dragend()\"\n     [style.bottom.px]=\"padding\"\n     [style.left.px]=\"padding\"\n     [hidden]=\"!resizable && !(dashboardService.stacked$ | async)\">\n</div>\n\n<div uxDrag\n     #handleLeft\n     class=\"resizer-handle handle-left\"\n     (onDragStart)=\"dragstart(handleLeft, $event, 6)\"\n     (onDrag)=\"drag(handleLeft, $event, 6)\"\n     (onDragEnd)=\"dragend()\"\n     [style.left.px]=\"padding\"\n     [hidden]=\"!resizable || (dashboardService.stacked$ | async)\">\n</div>\n\n<div uxDrag\n     #handleTopLeft\n     class=\"resizer-handle handle-top-left\"\n     (onDragStart)=\"dragstart(handleTopLeft, $event, 7)\"\n     (onDrag)=\"drag(handleTopLeft, $event, 7)\"\n     (onDragEnd)=\"dragend()\"\n     [style.top.px]=\"padding\"\n     [style.left.px]=\"padding\"\n     [hidden]=\"!resizable && !(dashboardService.stacked$ | async)\">\n</div>"
                }] }
    ];
    /** @nocollapse */
    DashboardWidgetComponent.ctorParameters = function () { return [
        { type: DashboardService }
    ]; };
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
    return DashboardWidgetComponent;
}());
export { DashboardWidgetComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLXdpZGdldC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXNoYm9hcmQvd2lkZ2V0L2Rhc2hib2FyZC13aWRnZXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUNoRyxPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdkMsT0FBTyxFQUFtQixnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDOztJQW1DckUsa0NBQW1CLGdCQUFrQztRQUFyRCxpQkFnQkM7UUFoQmtCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7dUJBdkIxQixDQUFDO3VCQUNELENBQUM7eUJBQ0UsS0FBSzsrQkFDZ0QsSUFBSSxDQUFDLG1CQUFtQjtpQkFFakUsQ0FBQztpQkFDRixDQUFDO3FCQUNLLEdBQUc7c0JBQ0QsR0FBRzt1QkFDRCxDQUFDO3NCQUNMLENBQUM7MEJBRUssS0FBSzswQkFDTCxLQUFLOzJCQUVuQyxLQUFLO3VCQUVNLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFO29CQUM3QyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRTsyQkFDbkMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUU7d0JBQzdCLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFOzBCQUN4QyxJQUFJLE9BQU8sRUFBUTs7UUFJcEMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3JELFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLE1BQU0sRUFBRSxFQUFiLENBQWEsQ0FBQyxDQUFDOztRQUdwQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDcEQsU0FBUyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUksQ0FBQyxZQUFZLEVBQUUsRUFBcEMsQ0FBb0MsQ0FBQyxDQUFDOztRQUczRCxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxLQUFLLEtBQUksRUFBZixDQUFlLENBQUMsQ0FBQzthQUN4RixTQUFTLENBQUMsVUFBQSxVQUFVLElBQUksT0FBQSxLQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsRUFBNUIsQ0FBNEIsQ0FBQyxDQUFDOztRQUczRCxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxLQUFLLEtBQUksRUFBZixDQUFlLENBQUMsQ0FBQzthQUN4RixTQUFTLENBQUMsVUFBQSxVQUFVLElBQUksT0FBQSxLQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsRUFBNUIsQ0FBNEIsQ0FBQyxDQUFDO0tBQzlEOzs7O0lBRUQsMkNBQVE7OztJQUFSO1FBRUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBRXJDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDWCxPQUFPLENBQUMsSUFBSSxDQUFDLG9DQUFvQyxDQUFDLENBQUM7O1lBR25ELElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDM0Q7S0FDSjs7OztJQUVELGtEQUFlOzs7SUFBZjs7UUFFSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDOztRQUd0QyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDakI7SUFFRDs7T0FFRzs7Ozs7SUFDSCw4Q0FBVzs7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDNUM7SUFFRDs7T0FFRzs7Ozs7SUFDSCx5Q0FBTTs7OztJQUFOOztRQUdJLHdDQUFRLG9CQUFPLEVBQUUsb0JBQU8sQ0FBbUM7UUFFM0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0tBQ3RDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gseUNBQU07Ozs7SUFBTjtRQUNJLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNuRSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDOUQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzNFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUMxRTs7OztJQUVELDRDQUFTOzs7SUFBVDtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQy9DOzs7O0lBRUQseUNBQU07OztJQUFOO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDNUM7Ozs7OztJQUVELDRDQUFTOzs7OztJQUFULFVBQVUsTUFBYyxFQUFFLE1BQXNCO1FBQXRCLHVCQUFBLEVBQUEsYUFBc0I7UUFDNUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFN0MsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNULElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNqQjtLQUNKOzs7Ozs7SUFFRCx5Q0FBTTs7Ozs7SUFBTixVQUFPLEdBQVcsRUFBRSxNQUFzQjtRQUF0Qix1QkFBQSxFQUFBLGFBQXNCO1FBQ3RDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRXZDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDVCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDakI7S0FDSjs7OztJQUVELGdEQUFhOzs7SUFBYjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQ25EOzs7O0lBRUQsNkNBQVU7OztJQUFWO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDaEQ7Ozs7OztJQUVELGdEQUFhOzs7OztJQUFiLFVBQWMsVUFBa0IsRUFBRSxNQUFzQjtRQUF0Qix1QkFBQSxFQUFBLGFBQXNCO1FBQ3BELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBRXJELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDVCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDakI7S0FDSjs7Ozs7O0lBRUQsNkNBQVU7Ozs7O0lBQVYsVUFBVyxPQUFlLEVBQUUsTUFBc0I7UUFBdEIsdUJBQUEsRUFBQSxhQUFzQjtRQUM5QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUUvQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1QsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2pCO0tBQ0o7Ozs7SUFFRCwrQ0FBWTs7O0lBQVo7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztLQUNuQjs7OztJQUVELDZDQUFVOzs7SUFBVjtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0tBQ25COzs7Ozs7OztJQUVELDRDQUFTOzs7Ozs7O0lBQVQsVUFBVSxDQUFTLEVBQUUsQ0FBUyxFQUFFLEtBQWEsRUFBRSxNQUFjO1FBQ3pELElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztLQUN4Qjs7Ozs7OztJQUVELDRDQUFTOzs7Ozs7SUFBVCxVQUFVLE1BQW1CLEVBQUUsS0FBaUIsRUFBRSxTQUEwQjtRQUN4RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxTQUFTLFdBQUEsRUFBRSxLQUFLLE9BQUEsRUFBRSxNQUFNLFFBQUEsRUFBRSxDQUFDLENBQUM7S0FDbkY7Ozs7Ozs7SUFFRCx1Q0FBSTs7Ozs7O0lBQUosVUFBSyxNQUFtQixFQUFFLEtBQWlCLEVBQUUsU0FBMEI7UUFDbkUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsU0FBUyxXQUFBLEVBQUUsS0FBSyxPQUFBLEVBQUUsTUFBTSxRQUFBLEVBQUUsQ0FBQyxDQUFDO0tBQ2xGOzs7O0lBRUQsMENBQU87OztJQUFQO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3ZDOzs7O0lBRUQsK0NBQVk7OztJQUFaO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsSUFBSSxPQUFPLElBQUksQ0FBQyxlQUFlLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNuRSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztTQUMvQjtRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxJQUFJLE9BQU8sSUFBSSxDQUFDLGVBQWUsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzVFLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3JDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7S0FDekI7Ozs7O0lBRU8sc0RBQW1COzs7O2NBQUMsTUFBZ0M7UUFFeEQscUJBQUksT0FBTyxHQUFXLEVBQUUsQ0FBQztRQUV6QixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLE9BQU8sR0FBRyw4QkFBOEIsQ0FBQztTQUM1QztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUMxQixPQUFPLEdBQUcsb0JBQW9CLENBQUM7U0FDbEM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDNUIsT0FBTyxHQUFHLGtCQUFrQixDQUFDO1NBQ2hDO1FBRUQsTUFBTSxDQUFJLE1BQU0sQ0FBQyxJQUFJLHNCQUFpQixNQUFNLENBQUMsTUFBTSxFQUFFLGlCQUFZLE1BQU0sQ0FBQyxTQUFTLEVBQUUsYUFBUSxNQUFNLENBQUMsYUFBYSxFQUFFLDBCQUFxQixNQUFNLENBQUMsVUFBVSxFQUFFLG9CQUFlLE9BQVMsQ0FBQzs7Ozs7Ozs7SUFROUssb0RBQWlCOzs7Ozs7Y0FBQyxRQUF3QixFQUFFLEtBQWE7UUFFN0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDaEMsUUFBUSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7U0FDNUI7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLFFBQVEsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1NBQzVCOzs7Ozs7O0lBT0csb0RBQWlCOzs7OztjQUFDLFFBQXdCO1FBQzlDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDOzs7Z0JBL05sRixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsMDFGQUFnRDtpQkFDbkQ7Ozs7Z0JBTHlCLGdCQUFnQjs7O3FCQVFyQyxLQUFLO3VCQUNMLEtBQUs7c0JBQ0wsS0FBSztzQkFDTCxLQUFLOzBCQUNMLEtBQUs7MEJBQ0wsS0FBSzs0QkFDTCxLQUFLO2tDQUNMLEtBQUs7b0JBRUwsV0FBVyxTQUFDLGVBQWU7b0JBQzNCLFdBQVcsU0FBQyxjQUFjO3dCQUMxQixXQUFXLFNBQUMsZ0JBQWdCO3lCQUM1QixXQUFXLFNBQUMsaUJBQWlCOzBCQUM3QixXQUFXLFNBQUMsa0JBQWtCO3lCQUM5QixXQUFXLFNBQUMsZUFBZTs0QkFDM0IsV0FBVyxTQUFDLGlCQUFpQjs2QkFDN0IsV0FBVyxTQUFDLGdCQUFnQjs2QkFDNUIsV0FBVyxTQUFDLGdCQUFnQjs7bUNBNUJqQzs7U0FTYSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG1hcCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyBBY3Rpb25EaXJlY3Rpb24sIERhc2hib2FyZFNlcnZpY2UgfSBmcm9tICcuLi9kYXNoYm9hcmQuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtZGFzaGJvYXJkLXdpZGdldCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2Rhc2hib2FyZC13aWRnZXQuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIERhc2hib2FyZFdpZGdldENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG4gICAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGNvbDogbnVtYmVyO1xuICAgIEBJbnB1dCgpIHJvdzogbnVtYmVyO1xuICAgIEBJbnB1dCgpIGNvbFNwYW46IG51bWJlciA9IDE7XG4gICAgQElucHV0KCkgcm93U3BhbjogbnVtYmVyID0gMTtcbiAgICBASW5wdXQoKSByZXNpemFibGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSB3aWRnZXRBcmlhTGFiZWw6ICh3aWRnZXRzOiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQpID0+IHN0cmluZyB8IHN0cmluZyA9IHRoaXMuZ2V0RGVmYXVsdEFyaWFMYWJlbDtcblxuICAgIEBIb3N0QmluZGluZygnc3R5bGUubGVmdC5weCcpIHg6IG51bWJlciA9IDA7XG4gICAgQEhvc3RCaW5kaW5nKCdzdHlsZS50b3AucHgnKSB5OiBudW1iZXIgPSAwO1xuICAgIEBIb3N0QmluZGluZygnc3R5bGUud2lkdGgucHgnKSB3aWR0aDogbnVtYmVyID0gMTAwO1xuICAgIEBIb3N0QmluZGluZygnc3R5bGUuaGVpZ2h0LnB4JykgaGVpZ2h0OiBudW1iZXIgPSAxMDA7XG4gICAgQEhvc3RCaW5kaW5nKCdzdHlsZS5wYWRkaW5nLnB4JykgcGFkZGluZzogbnVtYmVyID0gMDtcbiAgICBASG9zdEJpbmRpbmcoJ3N0eWxlLnotaW5kZXgnKSB6SW5kZXg6IG51bWJlciA9IDA7XG4gICAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtbGFiZWwnKSBhcmlhTGFiZWw6IHN0cmluZztcbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmRyYWdnaW5nJykgaXNEcmFnZ2luZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBIb3N0QmluZGluZygnY2xhc3MuZ3JhYmJpbmcnKSBpc0dyYWJiaW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBpc0RyYWdnYWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBfY29sdW1uOiBTdGFja2FibGVWYWx1ZSA9IHsgcmVndWxhcjogdW5kZWZpbmVkLCBzdGFja2VkOiB1bmRlZmluZWQgfTtcbiAgICBwcml2YXRlIF9yb3c6IFN0YWNrYWJsZVZhbHVlID0geyByZWd1bGFyOiB1bmRlZmluZWQsIHN0YWNrZWQ6IHVuZGVmaW5lZCB9O1xuICAgIHByaXZhdGUgX2NvbHVtblNwYW46IFN0YWNrYWJsZVZhbHVlID0geyByZWd1bGFyOiAxLCBzdGFja2VkOiAxIH07XG4gICAgcHJpdmF0ZSBfcm93U3BhbjogU3RhY2thYmxlVmFsdWUgPSB7IHJlZ3VsYXI6IDEsIHN0YWNrZWQ6IDEgfTtcbiAgICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGRhc2hib2FyZFNlcnZpY2U6IERhc2hib2FyZFNlcnZpY2UpIHtcbiAgICAgICAgLy8gc3Vic2NyaWJlIHRvIG9wdGlvbiBjaGFuZ2VzXG4gICAgICAgIGRhc2hib2FyZFNlcnZpY2Uub3B0aW9ucyQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy51cGRhdGUoKSk7XG5cbiAgICAgICAgLy8gZXZlcnkgdGltZSB0aGUgbGF5b3V0IGNoYW5nZXMgd2Ugd2FudCB0byB1cGRhdGUgdGhlIGFyaWEgbGFiZWxcbiAgICAgICAgZGFzaGJvYXJkU2VydmljZS5sYXlvdXQkLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuYXJpYUxhYmVsID0gdGhpcy5nZXRBcmlhTGFiZWwoKSk7XG5cbiAgICAgICAgLy8gYWxsb3cgd2lkZ2V0IG1vdmVtZW50cyB0byBiZSBhbmltYXRlZFxuICAgICAgICBkYXNoYm9hcmRTZXJ2aWNlLmlzRHJhZ2dpbmckLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSksIG1hcCh3aWRnZXQgPT4gd2lkZ2V0ID09PSB0aGlzKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoaXNEcmFnZ2luZyA9PiB0aGlzLmlzRHJhZ2dpbmcgPSBpc0RyYWdnaW5nKTtcblxuICAgICAgICAvLyBhbGxvdyB3aWRnZXQgbW92ZW1lbnRzIHRvIGJlIGFuaW1hdGVkXG4gICAgICAgIGRhc2hib2FyZFNlcnZpY2UuaXNHcmFiYmluZyQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSwgbWFwKHdpZGdldCA9PiB3aWRnZXQgPT09IHRoaXMpKVxuICAgICAgICAgICAgLnN1YnNjcmliZShpc0dyYWJiaW5nID0+IHRoaXMuaXNHcmFiYmluZyA9IGlzR3JhYmJpbmcpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuXG4gICAgICAgIHRoaXMuX2NvbHVtblNwYW4ucmVndWxhciA9IHRoaXMuY29sU3BhbjtcbiAgICAgICAgdGhpcy5fcm93U3Bhbi5yZWd1bGFyID0gdGhpcy5yb3dTcGFuO1xuXG4gICAgICAgIGlmICghdGhpcy5pZCkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdEYXNoYm9hcmQgV2lkZ2V0IGlzIG1pc3NpbmcgYW4gSUQuJyk7XG5cbiAgICAgICAgICAgIC8vIHNldCByYW5kb20gaWQgLSBrZWVwcyB0aGluZ3Mgd29ya2luZyBidXQgcHJldmVudHMgZXhwb3J0aW5nIG9mIHBvc2l0aW9uc1xuICAgICAgICAgICAgdGhpcy5pZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwMCkudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgLy8gYWRkIHRoZSB3aWRnZXQgdG8gdGhlIGRhc2hib2FyZFxuICAgICAgICB0aGlzLmRhc2hib2FyZFNlcnZpY2UuYWRkV2lkZ2V0KHRoaXMpO1xuXG4gICAgICAgIC8vIGFwcGx5IHRoZSBjdXJyZW50IG9wdGlvbnNcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJZiBjb21wb25lbnQgaXMgcmVtb3ZlZCwgdGhlbiB1bnJlZ2lzdGVyIGl0IGZyb20gdGhlIHNlcnZpY2VcbiAgICAgKi9cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95Lm5leHQoKTtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gICAgICAgIHRoaXMuZGFzaGJvYXJkU2VydmljZS5yZW1vdmVXaWRnZXQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXBwbHkgdGhlIGN1cnJlbnQgZGFzaGJvYXJkIG9wdGlvbnNcbiAgICAgKi9cbiAgICB1cGRhdGUoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gZ2V0IHRoZSBjdXJyZW50IG9wdGlvbnMgYXQgdGhlIHRpbWVcbiAgICAgICAgY29uc3QgeyBwYWRkaW5nLCBjb2x1bW5zIH0gPSB0aGlzLmRhc2hib2FyZFNlcnZpY2Uub3B0aW9ucztcblxuICAgICAgICB0aGlzLnBhZGRpbmcgPSBwYWRkaW5nO1xuICAgICAgICB0aGlzLl9jb2x1bW5TcGFuLnN0YWNrZWQgPSBjb2x1bW5zO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgYWN0dWFsIHBvc2l0aW9uIGFuZCBzaXplIHZhbHVlc1xuICAgICAqL1xuICAgIHJlbmRlcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy54ID0gdGhpcy5nZXRDb2x1bW4oKSAqIHRoaXMuZGFzaGJvYXJkU2VydmljZS5nZXRDb2x1bW5XaWR0aCgpO1xuICAgICAgICB0aGlzLnkgPSB0aGlzLmdldFJvdygpICogdGhpcy5kYXNoYm9hcmRTZXJ2aWNlLmdldFJvd0hlaWdodCgpO1xuICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5nZXRDb2x1bW5TcGFuKCkgKiB0aGlzLmRhc2hib2FyZFNlcnZpY2UuZ2V0Q29sdW1uV2lkdGgoKTtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmdldFJvd1NwYW4oKSAqIHRoaXMuZGFzaGJvYXJkU2VydmljZS5nZXRSb3dIZWlnaHQoKTtcbiAgICB9XG5cbiAgICBnZXRDb2x1bW4oKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3RhY2thYmxlVmFsdWUodGhpcy5fY29sdW1uKTtcbiAgICB9XG5cbiAgICBnZXRSb3coKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3RhY2thYmxlVmFsdWUodGhpcy5fcm93KTtcbiAgICB9XG5cbiAgICBzZXRDb2x1bW4oY29sdW1uOiBudW1iZXIsIHJlbmRlcjogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXRTdGFja2FibGVWYWx1ZSh0aGlzLl9jb2x1bW4sIGNvbHVtbik7XG5cbiAgICAgICAgaWYgKHJlbmRlcikge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldFJvdyhyb3c6IG51bWJlciwgcmVuZGVyOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xuICAgICAgICB0aGlzLnNldFN0YWNrYWJsZVZhbHVlKHRoaXMuX3Jvdywgcm93KTtcblxuICAgICAgICBpZiAocmVuZGVyKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Q29sdW1uU3BhbigpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTdGFja2FibGVWYWx1ZSh0aGlzLl9jb2x1bW5TcGFuKTtcbiAgICB9XG5cbiAgICBnZXRSb3dTcGFuKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFN0YWNrYWJsZVZhbHVlKHRoaXMuX3Jvd1NwYW4pO1xuICAgIH1cblxuICAgIHNldENvbHVtblNwYW4oY29sdW1uU3BhbjogbnVtYmVyLCByZW5kZXI6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0U3RhY2thYmxlVmFsdWUodGhpcy5fY29sdW1uU3BhbiwgY29sdW1uU3Bhbik7XG5cbiAgICAgICAgaWYgKHJlbmRlcikge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldFJvd1NwYW4ocm93U3BhbjogbnVtYmVyLCByZW5kZXI6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0U3RhY2thYmxlVmFsdWUodGhpcy5fcm93U3Bhbiwgcm93U3Bhbik7XG5cbiAgICAgICAgaWYgKHJlbmRlcikge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJyaW5nVG9Gcm9udCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy56SW5kZXggPSAxO1xuICAgIH1cblxuICAgIHNlbmRUb0JhY2soKTogdm9pZCB7XG4gICAgICAgIHRoaXMuekluZGV4ID0gMDtcbiAgICB9XG5cbiAgICBzZXRCb3VuZHMoeDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgfVxuXG4gICAgZHJhZ3N0YXJ0KGhhbmRsZTogSFRNTEVsZW1lbnQsIGV2ZW50OiBNb3VzZUV2ZW50LCBkaXJlY3Rpb246IEFjdGlvbkRpcmVjdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRhc2hib2FyZFNlcnZpY2UuaXNHcmFiYmluZyQubmV4dChudWxsKTtcbiAgICAgICAgdGhpcy5kYXNoYm9hcmRTZXJ2aWNlLm9uUmVzaXplU3RhcnQoeyB3aWRnZXQ6IHRoaXMsIGRpcmVjdGlvbiwgZXZlbnQsIGhhbmRsZSB9KTtcbiAgICB9XG5cbiAgICBkcmFnKGhhbmRsZTogSFRNTEVsZW1lbnQsIGV2ZW50OiBNb3VzZUV2ZW50LCBkaXJlY3Rpb246IEFjdGlvbkRpcmVjdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRhc2hib2FyZFNlcnZpY2Uub25SZXNpemVEcmFnKHsgd2lkZ2V0OiB0aGlzLCBkaXJlY3Rpb24sIGV2ZW50LCBoYW5kbGUgfSk7XG4gICAgfVxuXG4gICAgZHJhZ2VuZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kYXNoYm9hcmRTZXJ2aWNlLm9uUmVzaXplRW5kKCk7XG4gICAgfVxuXG4gICAgZ2V0QXJpYUxhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLndpZGdldEFyaWFMYWJlbCAmJiB0eXBlb2YgdGhpcy53aWRnZXRBcmlhTGFiZWwgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy53aWRnZXRBcmlhTGFiZWw7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy53aWRnZXRBcmlhTGFiZWwgJiYgdHlwZW9mIHRoaXMud2lkZ2V0QXJpYUxhYmVsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy53aWRnZXRBcmlhTGFiZWwodGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5hcmlhTGFiZWw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXREZWZhdWx0QXJpYUxhYmVsKHdpZGdldDogRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50KTogc3RyaW5nIHtcblxuICAgICAgICBsZXQgb3B0aW9uczogc3RyaW5nID0gJyc7XG5cbiAgICAgICAgaWYgKHdpZGdldC5yZXNpemFibGUgJiYgd2lkZ2V0LmlzRHJhZ2dhYmxlKSB7XG4gICAgICAgICAgICBvcHRpb25zID0gJ0l0IGNhbiBiZSBtb3ZlZCBhbmQgcmVzaXplZC4nO1xuICAgICAgICB9IGVsc2UgaWYgKHdpZGdldC5yZXNpemFibGUpIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSAnSXQgY2FuIGJlIHJlc2l6ZWQuJztcbiAgICAgICAgfSBlbHNlIGlmICh3aWRnZXQuaXNEcmFnZ2FibGUpIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSAnSXQgY2FuIGJlIG1vdmVkLic7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYCR7d2lkZ2V0Lm5hbWV9IHBhbmVsIGluIHJvdyAke3dpZGdldC5nZXRSb3coKX0sIGNvbHVtbiAke3dpZGdldC5nZXRDb2x1bW4oKX0sIGlzICR7d2lkZ2V0LmdldENvbHVtblNwYW4oKX0gY29sdW1ucyB3aWRlIGFuZCAke3dpZGdldC5nZXRSb3dTcGFuKCl9IHJvd3MgaGlnaC4gJHtvcHRpb25zfWA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWxsb3dzIGF1dG9tYXRpYyBzZXR0aW5nIG9mIHN0YWNrYWJsZSB2YWx1ZVxuICAgICAqIEBwYXJhbSBwcm9wZXJ0eSBUaGUgY3VycmVudCBTdGFja2FibGVWYWx1ZSBvYmplY3RcbiAgICAgKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldCBpbiB0aGUgYXBwcm9wcmlhdGUgZmllbGRcbiAgICAgKi9cbiAgICBwcml2YXRlIHNldFN0YWNrYWJsZVZhbHVlKHByb3BlcnR5OiBTdGFja2FibGVWYWx1ZSwgdmFsdWU6IG51bWJlcik6IHZvaWQge1xuXG4gICAgICAgIGlmICh0aGlzLmRhc2hib2FyZFNlcnZpY2Uuc3RhY2tlZCkge1xuICAgICAgICAgICAgcHJvcGVydHkuc3RhY2tlZCA9IHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJvcGVydHkucmVndWxhciA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSBhcHByb3ByaWF0ZSB2YWx1ZSBmcm9tIGEgc3RhY2thYmxlIHZhbHVlXG4gICAgICogQHBhcmFtIHByb3BlcnR5IFRoZSBTdGFja2FibGUgdmFsdWUgb2JqZWN0XG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRTdGFja2FibGVWYWx1ZShwcm9wZXJ0eTogU3RhY2thYmxlVmFsdWUpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXNoYm9hcmRTZXJ2aWNlLnN0YWNrZWQgPyBwcm9wZXJ0eS5zdGFja2VkIDogcHJvcGVydHkucmVndWxhcjtcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhY2thYmxlVmFsdWUge1xuICAgIHJlZ3VsYXI6IG51bWJlcjtcbiAgICBzdGFja2VkOiBudW1iZXI7XG59Il19