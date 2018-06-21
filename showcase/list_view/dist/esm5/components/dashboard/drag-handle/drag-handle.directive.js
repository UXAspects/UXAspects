/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, NgZone, ElementRef } from '@angular/core';
import { DashboardWidgetComponent } from '../widget/dashboard-widget.component';
import { DashboardService, ActionDirection } from '../dashboard.service';
import { DragDirective } from '../../../directives/drag/drag.directive';
var DashboardDragHandleDirective = (function (_super) {
    tslib_1.__extends(DashboardDragHandleDirective, _super);
    function DashboardDragHandleDirective(widget, dashboardService, elementRef, ngZone) {
        var _this = _super.call(this, elementRef, ngZone) || this;
        _this.dragstart.subscribe(function (event) { return dashboardService.onDragStart({ widget: widget, direction: ActionDirection.Move, event: event }); });
        _this.drag.subscribe(function (event) { return dashboardService.onDrag({ widget: widget, direction: ActionDirection.Move, event: event }); });
        _this.dragend.subscribe(function () { return dashboardService.onDragEnd(); });
        return _this;
    }
    DashboardDragHandleDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxDashboardWidgetDragHandle], [ux-dashboard-widget-drag-handle]'
                },] },
    ];
    /** @nocollapse */
    DashboardDragHandleDirective.ctorParameters = function () { return [
        { type: DashboardWidgetComponent, },
        { type: DashboardService, },
        { type: ElementRef, },
        { type: NgZone, },
    ]; };
    return DashboardDragHandleDirective;
}(DragDirective));
export { DashboardDragHandleDirective };
function DashboardDragHandleDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    DashboardDragHandleDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    DashboardDragHandleDirective.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1oYW5kbGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZGFzaGJvYXJkL2RyYWctaGFuZGxlL2RyYWctaGFuZGxlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU5RCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNoRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDekUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlDQUF5QyxDQUFDOztJQUt0Qix3REFBYTtJQUUzRCxzQ0FBWSxNQUFnQyxFQUFFLGdCQUFrQyxFQUFFLFVBQXNCLEVBQUUsTUFBYztRQUF4SCxZQUNJLGtCQUFNLFVBQVUsRUFBRSxNQUFNLENBQUMsU0FLNUI7UUFIRyxLQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxVQUFDLEtBQWlCLElBQUssT0FBQSxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxlQUFlLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUEvRixDQUErRixDQUFDLENBQUM7UUFDakosS0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBQyxLQUFpQixJQUFLLE9BQUEsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsZUFBZSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBMUYsQ0FBMEYsQ0FBQyxDQUFDO1FBQ3ZJLEtBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLGNBQU0sT0FBQSxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsRUFBNUIsQ0FBNEIsQ0FBQyxDQUFDOztLQUM5RDs7Z0JBWEosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxrRUFBa0U7aUJBQy9FOzs7O2dCQU5RLHdCQUF3QjtnQkFDeEIsZ0JBQWdCO2dCQUhHLFVBQVU7Z0JBQWxCLE1BQU07O3VDQUExQjtFQVNrRCxhQUFhO1NBQWxELDRCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgTmdab25lLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERhc2hib2FyZFdpZGdldENvbXBvbmVudCB9IGZyb20gJy4uL3dpZGdldC9kYXNoYm9hcmQtd2lkZ2V0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXNoYm9hcmRTZXJ2aWNlLCBBY3Rpb25EaXJlY3Rpb24gfSBmcm9tICcuLi9kYXNoYm9hcmQuc2VydmljZSc7XG5pbXBvcnQgeyBEcmFnRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vLi4vZGlyZWN0aXZlcy9kcmFnL2RyYWcuZGlyZWN0aXZlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdXhEYXNoYm9hcmRXaWRnZXREcmFnSGFuZGxlXSwgW3V4LWRhc2hib2FyZC13aWRnZXQtZHJhZy1oYW5kbGVdJ1xufSlcbmV4cG9ydCBjbGFzcyBEYXNoYm9hcmREcmFnSGFuZGxlRGlyZWN0aXZlIGV4dGVuZHMgRHJhZ0RpcmVjdGl2ZSB7XG5cbiAgICBjb25zdHJ1Y3Rvcih3aWRnZXQ6IERhc2hib2FyZFdpZGdldENvbXBvbmVudCwgZGFzaGJvYXJkU2VydmljZTogRGFzaGJvYXJkU2VydmljZSwgZWxlbWVudFJlZjogRWxlbWVudFJlZiwgbmdab25lOiBOZ1pvbmUpIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZiwgbmdab25lKTtcblxuICAgICAgICB0aGlzLmRyYWdzdGFydC5zdWJzY3JpYmUoKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiBkYXNoYm9hcmRTZXJ2aWNlLm9uRHJhZ1N0YXJ0KHsgd2lkZ2V0OiB3aWRnZXQsIGRpcmVjdGlvbjogQWN0aW9uRGlyZWN0aW9uLk1vdmUsIGV2ZW50OiBldmVudCB9KSk7XG4gICAgICAgIHRoaXMuZHJhZy5zdWJzY3JpYmUoKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiBkYXNoYm9hcmRTZXJ2aWNlLm9uRHJhZyh7IHdpZGdldDogd2lkZ2V0LCBkaXJlY3Rpb246IEFjdGlvbkRpcmVjdGlvbi5Nb3ZlLCBldmVudDogZXZlbnQgfSkpO1xuICAgICAgICB0aGlzLmRyYWdlbmQuc3Vic2NyaWJlKCgpID0+IGRhc2hib2FyZFNlcnZpY2Uub25EcmFnRW5kKCkpO1xuICAgIH1cbn0iXX0=