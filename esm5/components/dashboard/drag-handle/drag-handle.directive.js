/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef, NgZone, Renderer2 } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { DragDirective } from '../../../directives/drag/drag.directive';
import { DragService } from '../../../directives/drag/index';
import { ActionDirection, DashboardService } from '../dashboard.service';
import { DashboardWidgetComponent } from '../widget/dashboard-widget.component';
var DashboardDragHandleDirective = /** @class */ (function (_super) {
    tslib_1.__extends(DashboardDragHandleDirective, _super);
    function DashboardDragHandleDirective(widget, dashboardService, elementRef, ngZone, renderer, drag) {
        var _this = _super.call(this, elementRef, ngZone, renderer, drag) || this;
        _this.onDragStart.pipe(takeUntil(_this._onDestroy))
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1oYW5kbGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZGFzaGJvYXJkL2RyYWctaGFuZGxlL2RyYWctaGFuZGxlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDN0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDOztJQUs5Qix3REFBYTtJQUUzRCxzQ0FBWSxNQUFnQyxFQUFFLGdCQUFrQyxFQUFFLFVBQXNCLEVBQ3BHLE1BQWMsRUFBRSxRQUFtQixFQUFFLElBQWlCO1FBRDFELFlBR0ksa0JBQU0sVUFBVSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBVTVDO1FBUkcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUM1QyxTQUFTLENBQUMsVUFBQyxLQUFpQixJQUFLLE9BQUEsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsZUFBZSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBL0YsQ0FBK0YsQ0FBQyxDQUFDO1FBRXZJLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDdkMsU0FBUyxDQUFDLFVBQUMsS0FBaUIsSUFBSyxPQUFBLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLGVBQWUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQTFGLENBQTBGLENBQUMsQ0FBQztRQUVsSSxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQzFDLFNBQVMsQ0FBQyxjQUFNLE9BQUEsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLEVBQTVCLENBQTRCLENBQUMsQ0FBQzs7S0FDdEQ7O2dCQWxCSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGtFQUFrRTtpQkFDL0U7Ozs7Z0JBSlEsd0JBQXdCO2dCQURQLGdCQUFnQjtnQkFKdEIsVUFBVTtnQkFBRSxNQUFNO2dCQUFFLFNBQVM7Z0JBR3hDLFdBQVc7O3VDQUhwQjtFQVVrRCxhQUFhO1NBQWxELDRCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgTmdab25lLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERyYWdEaXJlY3RpdmUgfSBmcm9tICcuLi8uLi8uLi9kaXJlY3RpdmVzL2RyYWcvZHJhZy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRHJhZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9kaXJlY3RpdmVzL2RyYWcvaW5kZXgnO1xuaW1wb3J0IHsgQWN0aW9uRGlyZWN0aW9uLCBEYXNoYm9hcmRTZXJ2aWNlIH0gZnJvbSAnLi4vZGFzaGJvYXJkLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi4vd2lkZ2V0L2Rhc2hib2FyZC13aWRnZXQuY29tcG9uZW50JztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdXhEYXNoYm9hcmRXaWRnZXREcmFnSGFuZGxlXSwgW3V4LWRhc2hib2FyZC13aWRnZXQtZHJhZy1oYW5kbGVdJ1xufSlcbmV4cG9ydCBjbGFzcyBEYXNoYm9hcmREcmFnSGFuZGxlRGlyZWN0aXZlIGV4dGVuZHMgRHJhZ0RpcmVjdGl2ZSB7XG5cbiAgICBjb25zdHJ1Y3Rvcih3aWRnZXQ6IERhc2hib2FyZFdpZGdldENvbXBvbmVudCwgZGFzaGJvYXJkU2VydmljZTogRGFzaGJvYXJkU2VydmljZSwgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgbmdab25lOiBOZ1pvbmUsIHJlbmRlcmVyOiBSZW5kZXJlcjIsIGRyYWc6IERyYWdTZXJ2aWNlKSB7XG5cbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZiwgbmdab25lLCByZW5kZXJlciwgZHJhZyk7XG5cbiAgICAgICAgdGhpcy5vbkRyYWdTdGFydC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IGRhc2hib2FyZFNlcnZpY2Uub25EcmFnU3RhcnQoeyB3aWRnZXQ6IHdpZGdldCwgZGlyZWN0aW9uOiBBY3Rpb25EaXJlY3Rpb24uTW92ZSwgZXZlbnQ6IGV2ZW50IH0pKTtcblxuICAgICAgICB0aGlzLm9uRHJhZy5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IGRhc2hib2FyZFNlcnZpY2Uub25EcmFnKHsgd2lkZ2V0OiB3aWRnZXQsIGRpcmVjdGlvbjogQWN0aW9uRGlyZWN0aW9uLk1vdmUsIGV2ZW50OiBldmVudCB9KSk7XG5cbiAgICAgICAgdGhpcy5vbkRyYWdFbmQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gZGFzaGJvYXJkU2VydmljZS5vbkRyYWdFbmQoKSk7XG4gICAgfVxufSJdfQ==