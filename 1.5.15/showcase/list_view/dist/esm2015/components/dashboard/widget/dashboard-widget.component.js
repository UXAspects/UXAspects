/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, HostBinding } from '@angular/core';
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
        this.x = 0;
        this.y = 0;
        this.width = 100;
        this.height = 100;
        this.padding = 0;
        this.zIndex = 0;
        this._column = { regular: undefined, stacked: undefined };
        this._row = { regular: undefined, stacked: undefined };
        this._columnSpan = { regular: 1, stacked: 1 };
        this._rowSpan = { regular: 1, stacked: 1 };
        this._subscription = dashboardService.options$.subscribe(() => this.update());
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
        this._subscription.unsubscribe();
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
        this.dashboardService.onResizeStart({ widget: this, direction: direction, event: event, handle: handle });
    }
    /**
     * @param {?} handle
     * @param {?} event
     * @param {?} direction
     * @return {?}
     */
    drag(handle, event, direction) {
        this.dashboardService.onResizeDrag({ widget: this, direction: direction, event: event, handle: handle });
    }
    /**
     * @return {?}
     */
    dragend() {
        this.dashboardService.onResizeEnd();
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
                template: `<div class="widget-content widget-col-span-{{ getColumnSpan() }} widget-row-span-{{ getRowSpan() }}">
    <ng-content></ng-content>
</div>

<div uxDrag #handleTop class="resizer-handle handle-top" 
    (dragstart)="dragstart(handleTop, $event, 0)"
    (drag)="drag(handleTop, $event, 0)"
    (dragend)="dragend()"
    [style.top.px]="padding" 
    [hidden]="!resizable">
</div>

<div uxDrag #handleTopRight class="resizer-handle handle-top-right" 
    (dragstart)="dragstart(handleTopRight, $event, 1)"
    (drag)="drag(handleTopRight, $event, 1)"
    (dragend)="dragend()"
    [style.top.px]="padding" 
    [style.right.px]="padding" 
    [hidden]="!resizable && !(dashboardService.stacked$ | async)">
</div>

<div uxDrag #handleRight class="resizer-handle handle-right" 
    (dragstart)="dragstart(handleRight, $event, 2)"
    (drag)="drag(handleRight, $event, 2)"
    (dragend)="dragend()"
    [style.right.px]="padding" 
    [hidden]="!resizable || (dashboardService.stacked$ | async)">
</div>

<div uxDrag #handleBottomRight class="resizer-handle handle-bottom-right" 
    (dragstart)="dragstart(handleBottomRight, $event, 3)"
    (drag)="drag(handleBottomRight, $event, 3)"
    (dragend)="dragend()"
    [style.bottom.px]="padding" 
    [style.right.px]="padding" 
    [hidden]="!resizable && !(dashboardService.stacked$ | async)">
</div>

<div uxDrag #handleBottom class="resizer-handle handle-bottom" 
    (dragstart)="dragstart(handleBottom, $event, 4)"
    (drag)="drag(handleBottom, $event, 4)"
    (dragend)="dragend()"
    [style.bottom.px]="padding" 
    [hidden]="!resizable">
</div>

<div uxDrag #handleBottomLeft class="resizer-handle handle-bottom-left" 
    (dragstart)="dragstart(handleBottomLeft, $event, 5)"
    (drag)="drag(handleBottomLeft, $event, 5)"
    (dragend)="dragend()"
    [style.bottom.px]="padding" 
    [style.left.px]="padding" 
    [hidden]="!resizable && !(dashboardService.stacked$ | async)">
</div>

<div uxDrag #handleLeft class="resizer-handle handle-left" 
    (dragstart)="dragstart(handleLeft, $event, 6)"
    (drag)="drag(handleLeft, $event, 6)"
    (dragend)="dragend()"
    [style.left.px]="padding" 
    [hidden]="!resizable || (dashboardService.stacked$ | async)">
</div>

<div uxDrag #handleTopLeft class="resizer-handle handle-top-left" 
    (dragstart)="dragstart(handleTopLeft, $event, 7)"
    (drag)="drag(handleTopLeft, $event, 7)"
    (dragend)="dragend()"
    [style.top.px]="padding" 
    [style.left.px]="padding" 
    [hidden]="!resizable && !(dashboardService.stacked$ | async)">
</div>`
            },] },
];
/** @nocollapse */
DashboardWidgetComponent.ctorParameters = () => [
    { type: DashboardService, },
];
DashboardWidgetComponent.propDecorators = {
    "id": [{ type: Input },],
    "col": [{ type: Input },],
    "row": [{ type: Input },],
    "colSpan": [{ type: Input },],
    "rowSpan": [{ type: Input },],
    "resizable": [{ type: Input },],
    "x": [{ type: HostBinding, args: ['style.left.px',] },],
    "y": [{ type: HostBinding, args: ['style.top.px',] },],
    "width": [{ type: HostBinding, args: ['style.width.px',] },],
    "height": [{ type: HostBinding, args: ['style.height.px',] },],
    "padding": [{ type: HostBinding, args: ['style.padding.px',] },],
    "zIndex": [{ type: HostBinding, args: ['style.z-index',] },],
};
function DashboardWidgetComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    DashboardWidgetComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    DashboardWidgetComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    DashboardWidgetComponent.propDecorators;
    /** @type {?} */
    DashboardWidgetComponent.prototype.id;
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
    DashboardWidgetComponent.prototype._column;
    /** @type {?} */
    DashboardWidgetComponent.prototype._row;
    /** @type {?} */
    DashboardWidgetComponent.prototype._columnSpan;
    /** @type {?} */
    DashboardWidgetComponent.prototype._rowSpan;
    /** @type {?} */
    DashboardWidgetComponent.prototype._subscription;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLXdpZGdldC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXNoYm9hcmQvd2lkZ2V0L2Rhc2hib2FyZC13aWRnZXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBcUIsV0FBVyxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNoRyxPQUFPLEVBQUUsZ0JBQWdCLEVBQW1CLE1BQU0sc0JBQXNCLENBQUM7QUE2RXpFLE1BQU07Ozs7SUFzQkYsWUFBbUIsZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7dUJBakIxQixDQUFDO3VCQUNELENBQUM7eUJBQ0UsS0FBSztpQkFFTyxDQUFDO2lCQUNGLENBQUM7cUJBQ0ssR0FBRztzQkFDRCxHQUFHO3VCQUNELENBQUM7c0JBQ0wsQ0FBQzt1QkFFZCxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRTtvQkFDN0MsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUU7MkJBQ25DLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFO3dCQUM3QixFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRTtRQUl6RCxJQUFJLENBQUMsYUFBYSxHQUFHLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztLQUNqRjs7OztJQUVELFFBQVE7UUFFSixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFFckMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNYLE9BQU8sQ0FBQyxJQUFJLENBQUMsb0NBQW9DLENBQUMsQ0FBQzs7WUFHbkQsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUMzRDtLQUNKOzs7O0lBRUQsZUFBZTs7UUFFWCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDOztRQUd0QyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDakI7Ozs7O0lBS0QsV0FBVztRQUNQLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM1Qzs7Ozs7SUFLRCxNQUFNOztRQUdGLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQztRQUUzRCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7S0FDdEM7Ozs7O0lBS0QsTUFBTTtRQUNGLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNuRSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDOUQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzNFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUMxRTs7OztJQUVELFNBQVM7UUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUMvQzs7OztJQUVELE1BQU07UUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM1Qzs7Ozs7O0lBRUQsU0FBUyxDQUFDLE1BQWMsRUFBRSxTQUFrQixJQUFJO1FBQzVDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRTdDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDVCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDakI7S0FDSjs7Ozs7O0lBRUQsTUFBTSxDQUFDLEdBQVcsRUFBRSxTQUFrQixJQUFJO1FBQ3RDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRXZDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDVCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDakI7S0FDSjs7OztJQUVELGFBQWE7UUFDVCxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztLQUNuRDs7OztJQUVELFVBQVU7UUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUNoRDs7Ozs7O0lBRUQsYUFBYSxDQUFDLFVBQWtCLEVBQUUsU0FBa0IsSUFBSTtRQUNwRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUVyRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1QsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2pCO0tBQ0o7Ozs7OztJQUVELFVBQVUsQ0FBQyxPQUFlLEVBQUUsU0FBa0IsSUFBSTtRQUM5QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUUvQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1QsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2pCO0tBQ0o7Ozs7SUFFRCxZQUFZO1FBQ1IsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7S0FDbkI7Ozs7SUFFRCxVQUFVO1FBQ04sSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7S0FDbkI7Ozs7Ozs7O0lBRUQsU0FBUyxDQUFDLENBQVMsRUFBRSxDQUFTLEVBQUUsS0FBYSxFQUFFLE1BQWM7UUFDekQsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNYLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0tBQ3hCOzs7Ozs7O0lBRUQsU0FBUyxDQUFDLE1BQW1CLEVBQUUsS0FBaUIsRUFBRSxTQUEwQjtRQUN4RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7S0FDN0c7Ozs7Ozs7SUFFRCxJQUFJLENBQUMsTUFBbUIsRUFBRSxLQUFpQixFQUFFLFNBQTBCO1FBQ25FLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztLQUM1Rzs7OztJQUVELE9BQU87UUFDSCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDdkM7Ozs7Ozs7SUFPTyxpQkFBaUIsQ0FBQyxRQUF3QixFQUFFLEtBQWE7UUFFN0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDaEMsUUFBUSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7U0FDNUI7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLFFBQVEsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1NBQzVCOzs7Ozs7O0lBT0csaUJBQWlCLENBQUMsUUFBd0I7UUFDOUMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDOzs7O1lBclBsRixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bc0VQO2FBQ047Ozs7WUE1RVEsZ0JBQWdCOzs7bUJBK0VwQixLQUFLO29CQUNMLEtBQUs7b0JBQ0wsS0FBSzt3QkFDTCxLQUFLO3dCQUNMLEtBQUs7MEJBQ0wsS0FBSztrQkFFTCxXQUFXLFNBQUMsZUFBZTtrQkFDM0IsV0FBVyxTQUFDLGNBQWM7c0JBQzFCLFdBQVcsU0FBQyxnQkFBZ0I7dUJBQzVCLFdBQVcsU0FBQyxpQkFBaUI7d0JBQzdCLFdBQVcsU0FBQyxrQkFBa0I7dUJBQzlCLFdBQVcsU0FBQyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPbkRlc3Ryb3ksIEhvc3RCaW5kaW5nLCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXNoYm9hcmRTZXJ2aWNlLCBBY3Rpb25EaXJlY3Rpb24gfSBmcm9tICcuLi9kYXNoYm9hcmQuc2VydmljZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtZGFzaGJvYXJkLXdpZGdldCcsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwid2lkZ2V0LWNvbnRlbnQgd2lkZ2V0LWNvbC1zcGFuLXt7IGdldENvbHVtblNwYW4oKSB9fSB3aWRnZXQtcm93LXNwYW4te3sgZ2V0Um93U3BhbigpIH19XCI+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuPC9kaXY+XG5cbjxkaXYgdXhEcmFnICNoYW5kbGVUb3AgY2xhc3M9XCJyZXNpemVyLWhhbmRsZSBoYW5kbGUtdG9wXCIgXG4gICAgKGRyYWdzdGFydCk9XCJkcmFnc3RhcnQoaGFuZGxlVG9wLCAkZXZlbnQsIDApXCJcbiAgICAoZHJhZyk9XCJkcmFnKGhhbmRsZVRvcCwgJGV2ZW50LCAwKVwiXG4gICAgKGRyYWdlbmQpPVwiZHJhZ2VuZCgpXCJcbiAgICBbc3R5bGUudG9wLnB4XT1cInBhZGRpbmdcIiBcbiAgICBbaGlkZGVuXT1cIiFyZXNpemFibGVcIj5cbjwvZGl2PlxuXG48ZGl2IHV4RHJhZyAjaGFuZGxlVG9wUmlnaHQgY2xhc3M9XCJyZXNpemVyLWhhbmRsZSBoYW5kbGUtdG9wLXJpZ2h0XCIgXG4gICAgKGRyYWdzdGFydCk9XCJkcmFnc3RhcnQoaGFuZGxlVG9wUmlnaHQsICRldmVudCwgMSlcIlxuICAgIChkcmFnKT1cImRyYWcoaGFuZGxlVG9wUmlnaHQsICRldmVudCwgMSlcIlxuICAgIChkcmFnZW5kKT1cImRyYWdlbmQoKVwiXG4gICAgW3N0eWxlLnRvcC5weF09XCJwYWRkaW5nXCIgXG4gICAgW3N0eWxlLnJpZ2h0LnB4XT1cInBhZGRpbmdcIiBcbiAgICBbaGlkZGVuXT1cIiFyZXNpemFibGUgJiYgIShkYXNoYm9hcmRTZXJ2aWNlLnN0YWNrZWQkIHwgYXN5bmMpXCI+XG48L2Rpdj5cblxuPGRpdiB1eERyYWcgI2hhbmRsZVJpZ2h0IGNsYXNzPVwicmVzaXplci1oYW5kbGUgaGFuZGxlLXJpZ2h0XCIgXG4gICAgKGRyYWdzdGFydCk9XCJkcmFnc3RhcnQoaGFuZGxlUmlnaHQsICRldmVudCwgMilcIlxuICAgIChkcmFnKT1cImRyYWcoaGFuZGxlUmlnaHQsICRldmVudCwgMilcIlxuICAgIChkcmFnZW5kKT1cImRyYWdlbmQoKVwiXG4gICAgW3N0eWxlLnJpZ2h0LnB4XT1cInBhZGRpbmdcIiBcbiAgICBbaGlkZGVuXT1cIiFyZXNpemFibGUgfHwgKGRhc2hib2FyZFNlcnZpY2Uuc3RhY2tlZCQgfCBhc3luYylcIj5cbjwvZGl2PlxuXG48ZGl2IHV4RHJhZyAjaGFuZGxlQm90dG9tUmlnaHQgY2xhc3M9XCJyZXNpemVyLWhhbmRsZSBoYW5kbGUtYm90dG9tLXJpZ2h0XCIgXG4gICAgKGRyYWdzdGFydCk9XCJkcmFnc3RhcnQoaGFuZGxlQm90dG9tUmlnaHQsICRldmVudCwgMylcIlxuICAgIChkcmFnKT1cImRyYWcoaGFuZGxlQm90dG9tUmlnaHQsICRldmVudCwgMylcIlxuICAgIChkcmFnZW5kKT1cImRyYWdlbmQoKVwiXG4gICAgW3N0eWxlLmJvdHRvbS5weF09XCJwYWRkaW5nXCIgXG4gICAgW3N0eWxlLnJpZ2h0LnB4XT1cInBhZGRpbmdcIiBcbiAgICBbaGlkZGVuXT1cIiFyZXNpemFibGUgJiYgIShkYXNoYm9hcmRTZXJ2aWNlLnN0YWNrZWQkIHwgYXN5bmMpXCI+XG48L2Rpdj5cblxuPGRpdiB1eERyYWcgI2hhbmRsZUJvdHRvbSBjbGFzcz1cInJlc2l6ZXItaGFuZGxlIGhhbmRsZS1ib3R0b21cIiBcbiAgICAoZHJhZ3N0YXJ0KT1cImRyYWdzdGFydChoYW5kbGVCb3R0b20sICRldmVudCwgNClcIlxuICAgIChkcmFnKT1cImRyYWcoaGFuZGxlQm90dG9tLCAkZXZlbnQsIDQpXCJcbiAgICAoZHJhZ2VuZCk9XCJkcmFnZW5kKClcIlxuICAgIFtzdHlsZS5ib3R0b20ucHhdPVwicGFkZGluZ1wiIFxuICAgIFtoaWRkZW5dPVwiIXJlc2l6YWJsZVwiPlxuPC9kaXY+XG5cbjxkaXYgdXhEcmFnICNoYW5kbGVCb3R0b21MZWZ0IGNsYXNzPVwicmVzaXplci1oYW5kbGUgaGFuZGxlLWJvdHRvbS1sZWZ0XCIgXG4gICAgKGRyYWdzdGFydCk9XCJkcmFnc3RhcnQoaGFuZGxlQm90dG9tTGVmdCwgJGV2ZW50LCA1KVwiXG4gICAgKGRyYWcpPVwiZHJhZyhoYW5kbGVCb3R0b21MZWZ0LCAkZXZlbnQsIDUpXCJcbiAgICAoZHJhZ2VuZCk9XCJkcmFnZW5kKClcIlxuICAgIFtzdHlsZS5ib3R0b20ucHhdPVwicGFkZGluZ1wiIFxuICAgIFtzdHlsZS5sZWZ0LnB4XT1cInBhZGRpbmdcIiBcbiAgICBbaGlkZGVuXT1cIiFyZXNpemFibGUgJiYgIShkYXNoYm9hcmRTZXJ2aWNlLnN0YWNrZWQkIHwgYXN5bmMpXCI+XG48L2Rpdj5cblxuPGRpdiB1eERyYWcgI2hhbmRsZUxlZnQgY2xhc3M9XCJyZXNpemVyLWhhbmRsZSBoYW5kbGUtbGVmdFwiIFxuICAgIChkcmFnc3RhcnQpPVwiZHJhZ3N0YXJ0KGhhbmRsZUxlZnQsICRldmVudCwgNilcIlxuICAgIChkcmFnKT1cImRyYWcoaGFuZGxlTGVmdCwgJGV2ZW50LCA2KVwiXG4gICAgKGRyYWdlbmQpPVwiZHJhZ2VuZCgpXCJcbiAgICBbc3R5bGUubGVmdC5weF09XCJwYWRkaW5nXCIgXG4gICAgW2hpZGRlbl09XCIhcmVzaXphYmxlIHx8IChkYXNoYm9hcmRTZXJ2aWNlLnN0YWNrZWQkIHwgYXN5bmMpXCI+XG48L2Rpdj5cblxuPGRpdiB1eERyYWcgI2hhbmRsZVRvcExlZnQgY2xhc3M9XCJyZXNpemVyLWhhbmRsZSBoYW5kbGUtdG9wLWxlZnRcIiBcbiAgICAoZHJhZ3N0YXJ0KT1cImRyYWdzdGFydChoYW5kbGVUb3BMZWZ0LCAkZXZlbnQsIDcpXCJcbiAgICAoZHJhZyk9XCJkcmFnKGhhbmRsZVRvcExlZnQsICRldmVudCwgNylcIlxuICAgIChkcmFnZW5kKT1cImRyYWdlbmQoKVwiXG4gICAgW3N0eWxlLnRvcC5weF09XCJwYWRkaW5nXCIgXG4gICAgW3N0eWxlLmxlZnQucHhdPVwicGFkZGluZ1wiIFxuICAgIFtoaWRkZW5dPVwiIXJlc2l6YWJsZSAmJiAhKGRhc2hib2FyZFNlcnZpY2Uuc3RhY2tlZCQgfCBhc3luYylcIj5cbjwvZGl2PmBcbn0pXG5leHBvcnQgY2xhc3MgRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgaWQ6IHN0cmluZztcbiAgICBASW5wdXQoKSBjb2w6IG51bWJlcjtcbiAgICBASW5wdXQoKSByb3c6IG51bWJlcjtcbiAgICBASW5wdXQoKSBjb2xTcGFuOiBudW1iZXIgPSAxO1xuICAgIEBJbnB1dCgpIHJvd1NwYW46IG51bWJlciA9IDE7XG4gICAgQElucHV0KCkgcmVzaXphYmxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASG9zdEJpbmRpbmcoJ3N0eWxlLmxlZnQucHgnKSB4OiBudW1iZXIgPSAwO1xuICAgIEBIb3N0QmluZGluZygnc3R5bGUudG9wLnB4JykgeTogbnVtYmVyID0gMDtcbiAgICBASG9zdEJpbmRpbmcoJ3N0eWxlLndpZHRoLnB4Jykgd2lkdGg6IG51bWJlciA9IDEwMDtcbiAgICBASG9zdEJpbmRpbmcoJ3N0eWxlLmhlaWdodC5weCcpIGhlaWdodDogbnVtYmVyID0gMTAwO1xuICAgIEBIb3N0QmluZGluZygnc3R5bGUucGFkZGluZy5weCcpIHBhZGRpbmc6IG51bWJlciA9IDA7XG4gICAgQEhvc3RCaW5kaW5nKCdzdHlsZS56LWluZGV4JykgekluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgcHJpdmF0ZSBfY29sdW1uOiBTdGFja2FibGVWYWx1ZSA9IHsgcmVndWxhcjogdW5kZWZpbmVkLCBzdGFja2VkOiB1bmRlZmluZWQgfTtcbiAgICBwcml2YXRlIF9yb3c6IFN0YWNrYWJsZVZhbHVlID0geyByZWd1bGFyOiB1bmRlZmluZWQsIHN0YWNrZWQ6IHVuZGVmaW5lZCB9O1xuICAgIHByaXZhdGUgX2NvbHVtblNwYW46IFN0YWNrYWJsZVZhbHVlID0geyByZWd1bGFyOiAxLCBzdGFja2VkOiAxIH07XG4gICAgcHJpdmF0ZSBfcm93U3BhbjogU3RhY2thYmxlVmFsdWUgPSB7IHJlZ3VsYXI6IDEsIHN0YWNrZWQ6IDEgfTtcbiAgICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkYXNoYm9hcmRTZXJ2aWNlOiBEYXNoYm9hcmRTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IGRhc2hib2FyZFNlcnZpY2Uub3B0aW9ucyQuc3Vic2NyaWJlKCgpID0+IHRoaXMudXBkYXRlKCkpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuXG4gICAgICAgIHRoaXMuX2NvbHVtblNwYW4ucmVndWxhciA9IHRoaXMuY29sU3BhbjtcbiAgICAgICAgdGhpcy5fcm93U3Bhbi5yZWd1bGFyID0gdGhpcy5yb3dTcGFuO1xuXG4gICAgICAgIGlmICghdGhpcy5pZCkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdEYXNoYm9hcmQgV2lkZ2V0IGlzIG1pc3NpbmcgYW4gSUQuJyk7XG5cbiAgICAgICAgICAgIC8vIHNldCByYW5kb20gaWQgLSBrZWVwcyB0aGluZ3Mgd29ya2luZyBidXQgcHJldmVudHMgZXhwb3J0aW5nIG9mIHBvc2l0aW9uc1xuICAgICAgICAgICAgdGhpcy5pZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwMCkudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgLy8gYWRkIHRoZSB3aWRnZXQgdG8gdGhlIGRhc2hib2FyZFxuICAgICAgICB0aGlzLmRhc2hib2FyZFNlcnZpY2UuYWRkV2lkZ2V0KHRoaXMpO1xuXG4gICAgICAgIC8vIGFwcGx5IHRoZSBjdXJyZW50IG9wdGlvbnNcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJZiBjb21wb25lbnQgaXMgcmVtb3ZlZCwgdGhlbiB1bnJlZ2lzdGVyIGl0IGZyb20gdGhlIHNlcnZpY2VcbiAgICAgKi9cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMuZGFzaGJvYXJkU2VydmljZS5yZW1vdmVXaWRnZXQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXBwbHkgdGhlIGN1cnJlbnQgZGFzaGJvYXJkIG9wdGlvbnNcbiAgICAgKi9cbiAgICB1cGRhdGUoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gZ2V0IHRoZSBjdXJyZW50IG9wdGlvbnMgYXQgdGhlIHRpbWUgXG4gICAgICAgIGNvbnN0IHsgcGFkZGluZywgY29sdW1ucyB9ID0gdGhpcy5kYXNoYm9hcmRTZXJ2aWNlLm9wdGlvbnM7XG5cbiAgICAgICAgdGhpcy5wYWRkaW5nID0gcGFkZGluZztcbiAgICAgICAgdGhpcy5fY29sdW1uU3Bhbi5zdGFja2VkID0gY29sdW1ucztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGFjdHVhbCBwb3NpdGlvbiBhbmQgc2l6ZSB2YWx1ZXNcbiAgICAgKi9cbiAgICByZW5kZXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMueCA9IHRoaXMuZ2V0Q29sdW1uKCkgKiB0aGlzLmRhc2hib2FyZFNlcnZpY2UuZ2V0Q29sdW1uV2lkdGgoKTtcbiAgICAgICAgdGhpcy55ID0gdGhpcy5nZXRSb3coKSAqIHRoaXMuZGFzaGJvYXJkU2VydmljZS5nZXRSb3dIZWlnaHQoKTtcbiAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuZ2V0Q29sdW1uU3BhbigpICogdGhpcy5kYXNoYm9hcmRTZXJ2aWNlLmdldENvbHVtbldpZHRoKCk7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5nZXRSb3dTcGFuKCkgKiB0aGlzLmRhc2hib2FyZFNlcnZpY2UuZ2V0Um93SGVpZ2h0KCk7XG4gICAgfVxuXG4gICAgZ2V0Q29sdW1uKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFN0YWNrYWJsZVZhbHVlKHRoaXMuX2NvbHVtbik7XG4gICAgfVxuXG4gICAgZ2V0Um93KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFN0YWNrYWJsZVZhbHVlKHRoaXMuX3Jvdyk7XG4gICAgfVxuXG4gICAgc2V0Q29sdW1uKGNvbHVtbjogbnVtYmVyLCByZW5kZXI6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0U3RhY2thYmxlVmFsdWUodGhpcy5fY29sdW1uLCBjb2x1bW4pO1xuXG4gICAgICAgIGlmIChyZW5kZXIpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRSb3cocm93OiBudW1iZXIsIHJlbmRlcjogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXRTdGFja2FibGVWYWx1ZSh0aGlzLl9yb3csIHJvdyk7XG5cbiAgICAgICAgaWYgKHJlbmRlcikge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldENvbHVtblNwYW4oKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3RhY2thYmxlVmFsdWUodGhpcy5fY29sdW1uU3Bhbik7XG4gICAgfVxuXG4gICAgZ2V0Um93U3BhbigpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTdGFja2FibGVWYWx1ZSh0aGlzLl9yb3dTcGFuKTtcbiAgICB9XG5cbiAgICBzZXRDb2x1bW5TcGFuKGNvbHVtblNwYW46IG51bWJlciwgcmVuZGVyOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xuICAgICAgICB0aGlzLnNldFN0YWNrYWJsZVZhbHVlKHRoaXMuX2NvbHVtblNwYW4sIGNvbHVtblNwYW4pO1xuXG4gICAgICAgIGlmIChyZW5kZXIpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRSb3dTcGFuKHJvd1NwYW46IG51bWJlciwgcmVuZGVyOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xuICAgICAgICB0aGlzLnNldFN0YWNrYWJsZVZhbHVlKHRoaXMuX3Jvd1NwYW4sIHJvd1NwYW4pO1xuXG4gICAgICAgIGlmIChyZW5kZXIpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBicmluZ1RvRnJvbnQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuekluZGV4ID0gMTtcbiAgICB9XG5cbiAgICBzZW5kVG9CYWNrKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnpJbmRleCA9IDA7XG4gICAgfVxuXG4gICAgc2V0Qm91bmRzKHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIH1cblxuICAgIGRyYWdzdGFydChoYW5kbGU6IEhUTUxFbGVtZW50LCBldmVudDogTW91c2VFdmVudCwgZGlyZWN0aW9uOiBBY3Rpb25EaXJlY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kYXNoYm9hcmRTZXJ2aWNlLm9uUmVzaXplU3RhcnQoeyB3aWRnZXQ6IHRoaXMsIGRpcmVjdGlvbjogZGlyZWN0aW9uLCBldmVudDogZXZlbnQsIGhhbmRsZTogaGFuZGxlIH0pO1xuICAgIH1cblxuICAgIGRyYWcoaGFuZGxlOiBIVE1MRWxlbWVudCwgZXZlbnQ6IE1vdXNlRXZlbnQsIGRpcmVjdGlvbjogQWN0aW9uRGlyZWN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGFzaGJvYXJkU2VydmljZS5vblJlc2l6ZURyYWcoeyB3aWRnZXQ6IHRoaXMsIGRpcmVjdGlvbjogZGlyZWN0aW9uLCBldmVudDogZXZlbnQsIGhhbmRsZTogaGFuZGxlIH0pO1xuICAgIH1cblxuICAgIGRyYWdlbmQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGFzaGJvYXJkU2VydmljZS5vblJlc2l6ZUVuZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFsbG93cyBhdXRvbWF0aWMgc2V0dGluZyBvZiBzdGFja2FibGUgdmFsdWVcbiAgICAgKiBAcGFyYW0gcHJvcGVydHkgVGhlIGN1cnJlbnQgU3RhY2thYmxlVmFsdWUgb2JqZWN0XG4gICAgICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQgaW4gdGhlIGFwcHJvcHJpYXRlIGZpZWxkXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZXRTdGFja2FibGVWYWx1ZShwcm9wZXJ0eTogU3RhY2thYmxlVmFsdWUsIHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcblxuICAgICAgICBpZiAodGhpcy5kYXNoYm9hcmRTZXJ2aWNlLnN0YWNrZWQpIHtcbiAgICAgICAgICAgIHByb3BlcnR5LnN0YWNrZWQgPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByb3BlcnR5LnJlZ3VsYXIgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgYXBwcm9wcmlhdGUgdmFsdWUgZnJvbSBhIHN0YWNrYWJsZSB2YWx1ZVxuICAgICAqIEBwYXJhbSBwcm9wZXJ0eSBUaGUgU3RhY2thYmxlIHZhbHVlIG9iamVjdFxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0U3RhY2thYmxlVmFsdWUocHJvcGVydHk6IFN0YWNrYWJsZVZhbHVlKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGFzaGJvYXJkU2VydmljZS5zdGFja2VkID8gcHJvcGVydHkuc3RhY2tlZCA6IHByb3BlcnR5LnJlZ3VsYXI7XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN0YWNrYWJsZVZhbHVlIHtcbiAgICByZWd1bGFyOiBudW1iZXI7XG4gICAgc3RhY2tlZDogbnVtYmVyO1xufSJdfQ==