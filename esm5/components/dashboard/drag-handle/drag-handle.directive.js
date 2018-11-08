/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef, NgZone, Renderer2 } from '@angular/core';
import { takeUntil, tap } from 'rxjs/operators';
import { DragDirective } from '../../../directives/drag/drag.directive';
import { DragService } from '../../../directives/drag/index';
import { ActionDirection, DashboardService } from '../dashboard.service';
import { DashboardWidgetComponent } from '../widget/dashboard-widget.component';
var DashboardDragHandleDirective = /** @class */ (function (_super) {
    tslib_1.__extends(DashboardDragHandleDirective, _super);
    function DashboardDragHandleDirective(widget, dashboardService, elementRef, ngZone, renderer, drag) {
        var _this = _super.call(this, elementRef, ngZone, renderer, drag) || this;
        // inform the widget that it can be dragged
        widget.isDraggable = true;
        _this.onDragStart.pipe(takeUntil(_this._onDestroy), tap(function () { return dashboardService.isGrabbing$.next(null); }))
            .subscribe(function (event) { return dashboardService.onDragStart({ widget: widget, direction: ActionDirection.Move, event: event }); });
        _this.onDrag.pipe(takeUntil(_this._onDestroy))
            .subscribe(function (event) { return dashboardService.onDrag({ widget: widget, direction: ActionDirection.Move, event: event }); });
        _this.onDragEnd.pipe(takeUntil(_this._onDestroy))
            .subscribe(function () { return dashboardService.onDragEnd(); });
        return _this;
    }
    DashboardDragHandleDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxDashboardWidgetDragHandle], [ux-dashboard-widget-drag-handle]'
                },] }
    ];
    /** @nocollapse */
    DashboardDragHandleDirective.ctorParameters = function () { return [
        { type: DashboardWidgetComponent },
        { type: DashboardService },
        { type: ElementRef },
        { type: NgZone },
        { type: Renderer2 },
        { type: DragService }
    ]; };
    return DashboardDragHandleDirective;
}(DragDirective));
export { DashboardDragHandleDirective };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1oYW5kbGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZGFzaGJvYXJkL2RyYWctaGFuZGxlL2RyYWctaGFuZGxlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekUsT0FBTyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDeEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzdELE9BQU8sRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQzs7SUFLOUIsd0RBQWE7SUFFM0Qsc0NBQVksTUFBZ0MsRUFBRSxnQkFBa0MsRUFBRSxVQUFzQixFQUNwRyxNQUFjLEVBQUUsUUFBbUIsRUFBRSxJQUFpQjtRQUQxRCxZQUdJLGtCQUFNLFVBQVUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxTQWE1Qzs7UUFWRyxNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUUxQixLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxjQUFNLE9BQUEsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBdkMsQ0FBdUMsQ0FBQyxDQUFDO2FBQ2hHLFNBQVMsQ0FBQyxVQUFDLEtBQWlCLElBQUssT0FBQSxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxlQUFlLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUEvRixDQUErRixDQUFDLENBQUM7UUFFdkksS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUN2QyxTQUFTLENBQUMsVUFBQyxLQUFpQixJQUFLLE9BQUEsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsZUFBZSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBMUYsQ0FBMEYsQ0FBQyxDQUFDO1FBRWxJLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDMUMsU0FBUyxDQUFDLGNBQU0sT0FBQSxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsRUFBNUIsQ0FBNEIsQ0FBQyxDQUFDOztLQUN0RDs7Z0JBckJKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsa0VBQWtFO2lCQUMvRTs7OztnQkFKUSx3QkFBd0I7Z0JBRFAsZ0JBQWdCO2dCQUp0QixVQUFVO2dCQUFFLE1BQU07Z0JBQUUsU0FBUztnQkFHeEMsV0FBVzs7dUNBSHBCO0VBVWtELGFBQWE7U0FBbEQsNEJBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBOZ1pvbmUsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdGFrZVVudGlsLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEcmFnRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vLi4vZGlyZWN0aXZlcy9kcmFnL2RyYWcuZGlyZWN0aXZlJztcbmltcG9ydCB7IERyYWdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vZGlyZWN0aXZlcy9kcmFnL2luZGV4JztcbmltcG9ydCB7IEFjdGlvbkRpcmVjdGlvbiwgRGFzaGJvYXJkU2VydmljZSB9IGZyb20gJy4uL2Rhc2hib2FyZC5zZXJ2aWNlJztcbmltcG9ydCB7IERhc2hib2FyZFdpZGdldENvbXBvbmVudCB9IGZyb20gJy4uL3dpZGdldC9kYXNoYm9hcmQtd2lkZ2V0LmNvbXBvbmVudCc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3V4RGFzaGJvYXJkV2lkZ2V0RHJhZ0hhbmRsZV0sIFt1eC1kYXNoYm9hcmQtd2lkZ2V0LWRyYWctaGFuZGxlXSdcbn0pXG5leHBvcnQgY2xhc3MgRGFzaGJvYXJkRHJhZ0hhbmRsZURpcmVjdGl2ZSBleHRlbmRzIERyYWdEaXJlY3RpdmUge1xuXG4gICAgY29uc3RydWN0b3Iod2lkZ2V0OiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQsIGRhc2hib2FyZFNlcnZpY2U6IERhc2hib2FyZFNlcnZpY2UsIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIG5nWm9uZTogTmdab25lLCByZW5kZXJlcjogUmVuZGVyZXIyLCBkcmFnOiBEcmFnU2VydmljZSkge1xuXG4gICAgICAgIHN1cGVyKGVsZW1lbnRSZWYsIG5nWm9uZSwgcmVuZGVyZXIsIGRyYWcpO1xuXG4gICAgICAgIC8vIGluZm9ybSB0aGUgd2lkZ2V0IHRoYXQgaXQgY2FuIGJlIGRyYWdnZWRcbiAgICAgICAgd2lkZ2V0LmlzRHJhZ2dhYmxlID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLm9uRHJhZ1N0YXJ0LnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSksIHRhcCgoKSA9PiBkYXNoYm9hcmRTZXJ2aWNlLmlzR3JhYmJpbmckLm5leHQobnVsbCkpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IGRhc2hib2FyZFNlcnZpY2Uub25EcmFnU3RhcnQoeyB3aWRnZXQ6IHdpZGdldCwgZGlyZWN0aW9uOiBBY3Rpb25EaXJlY3Rpb24uTW92ZSwgZXZlbnQ6IGV2ZW50IH0pKTtcblxuICAgICAgICB0aGlzLm9uRHJhZy5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IGRhc2hib2FyZFNlcnZpY2Uub25EcmFnKHsgd2lkZ2V0OiB3aWRnZXQsIGRpcmVjdGlvbjogQWN0aW9uRGlyZWN0aW9uLk1vdmUsIGV2ZW50OiBldmVudCB9KSk7XG5cbiAgICAgICAgdGhpcy5vbkRyYWdFbmQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gZGFzaGJvYXJkU2VydmljZS5vbkRyYWdFbmQoKSk7XG4gICAgfVxufSJdfQ==