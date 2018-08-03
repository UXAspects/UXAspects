/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef, NgZone, Renderer2 } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { DragDirective } from '../../../directives/drag/drag.directive';
import { ActionDirection, DashboardService } from '../dashboard.service';
import { DashboardWidgetComponent } from '../widget/dashboard-widget.component';
var DashboardDragHandleDirective = /** @class */ (function (_super) {
    tslib_1.__extends(DashboardDragHandleDirective, _super);
    function DashboardDragHandleDirective(widget, dashboardService, elementRef, ngZone, renderer) {
        var _this = _super.call(this, elementRef, ngZone, renderer) || this;
        _this.dragstart.pipe(takeUntil(_this._onDestroy))
            .subscribe(function (event) { return dashboardService.onDragStart({ widget: widget, direction: ActionDirection.Move, event: event }); });
        _this.drag.pipe(takeUntil(_this._onDestroy))
            .subscribe(function (event) { return dashboardService.onDrag({ widget: widget, direction: ActionDirection.Move, event: event }); });
        _this.dragend.pipe(takeUntil(_this._onDestroy))
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
        { type: Renderer2 }
    ]; };
    return DashboardDragHandleDirective;
}(DragDirective));
export { DashboardDragHandleDirective };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1oYW5kbGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZGFzaGJvYXJkL2RyYWctaGFuZGxlL2RyYWctaGFuZGxlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDekUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7O0lBSzlCLHdEQUFhO0lBRTNELHNDQUFZLE1BQWdDLEVBQUUsZ0JBQWtDLEVBQUUsVUFBc0IsRUFBRSxNQUFjLEVBQUUsUUFBbUI7UUFBN0ksWUFDSSxrQkFBTSxVQUFVLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxTQVV0QztRQVJHLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDMUMsU0FBUyxDQUFDLFVBQUMsS0FBaUIsSUFBSyxPQUFBLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLGVBQWUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQS9GLENBQStGLENBQUMsQ0FBQztRQUV2SSxLQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3JDLFNBQVMsQ0FBQyxVQUFDLEtBQWlCLElBQUssT0FBQSxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxlQUFlLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUExRixDQUEwRixDQUFDLENBQUM7UUFFbEksS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUN4QyxTQUFTLENBQUMsY0FBTSxPQUFBLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxFQUE1QixDQUE0QixDQUFDLENBQUM7O0tBQ3REOztnQkFoQkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxrRUFBa0U7aUJBQy9FOzs7O2dCQUpRLHdCQUF3QjtnQkFEUCxnQkFBZ0I7Z0JBSHRCLFVBQVU7Z0JBQUUsTUFBTTtnQkFBRSxTQUFTOzt1Q0FBakQ7RUFTa0QsYUFBYTtTQUFsRCw0QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIE5nWm9uZSwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEcmFnRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vLi4vZGlyZWN0aXZlcy9kcmFnL2RyYWcuZGlyZWN0aXZlJztcbmltcG9ydCB7IEFjdGlvbkRpcmVjdGlvbiwgRGFzaGJvYXJkU2VydmljZSB9IGZyb20gJy4uL2Rhc2hib2FyZC5zZXJ2aWNlJztcbmltcG9ydCB7IERhc2hib2FyZFdpZGdldENvbXBvbmVudCB9IGZyb20gJy4uL3dpZGdldC9kYXNoYm9hcmQtd2lkZ2V0LmNvbXBvbmVudCc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3V4RGFzaGJvYXJkV2lkZ2V0RHJhZ0hhbmRsZV0sIFt1eC1kYXNoYm9hcmQtd2lkZ2V0LWRyYWctaGFuZGxlXSdcbn0pXG5leHBvcnQgY2xhc3MgRGFzaGJvYXJkRHJhZ0hhbmRsZURpcmVjdGl2ZSBleHRlbmRzIERyYWdEaXJlY3RpdmUge1xuXG4gICAgY29uc3RydWN0b3Iod2lkZ2V0OiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQsIGRhc2hib2FyZFNlcnZpY2U6IERhc2hib2FyZFNlcnZpY2UsIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIG5nWm9uZTogTmdab25lLCByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnRSZWYsIG5nWm9uZSwgcmVuZGVyZXIpO1xuXG4gICAgICAgIHRoaXMuZHJhZ3N0YXJ0LnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChldmVudDogTW91c2VFdmVudCkgPT4gZGFzaGJvYXJkU2VydmljZS5vbkRyYWdTdGFydCh7IHdpZGdldDogd2lkZ2V0LCBkaXJlY3Rpb246IEFjdGlvbkRpcmVjdGlvbi5Nb3ZlLCBldmVudDogZXZlbnQgfSkpO1xuXG4gICAgICAgIHRoaXMuZHJhZy5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IGRhc2hib2FyZFNlcnZpY2Uub25EcmFnKHsgd2lkZ2V0OiB3aWRnZXQsIGRpcmVjdGlvbjogQWN0aW9uRGlyZWN0aW9uLk1vdmUsIGV2ZW50OiBldmVudCB9KSk7XG5cbiAgICAgICAgdGhpcy5kcmFnZW5kLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IGRhc2hib2FyZFNlcnZpY2Uub25EcmFnRW5kKCkpO1xuICAgIH1cbn0iXX0=