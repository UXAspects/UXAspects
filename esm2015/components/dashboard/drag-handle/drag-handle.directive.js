/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, NgZone, Renderer2 } from '@angular/core';
import { takeUntil, tap } from 'rxjs/operators';
import { DragDirective } from '../../../directives/drag/drag.directive';
import { DragService } from '../../../directives/drag/index';
import { ActionDirection, DashboardService } from '../dashboard.service';
import { DashboardWidgetComponent } from '../widget/dashboard-widget.component';
export class DashboardDragHandleDirective extends DragDirective {
    /**
     * @param {?} widget
     * @param {?} dashboardService
     * @param {?} elementRef
     * @param {?} ngZone
     * @param {?} renderer
     * @param {?} drag
     */
    constructor(widget, dashboardService, elementRef, ngZone, renderer, drag) {
        super(elementRef, ngZone, renderer, drag);
        // inform the widget that it can be dragged
        widget.isDraggable = true;
        this.onDragStart.pipe(takeUntil(this._onDestroy), tap(() => dashboardService.isGrabbing$.next(null)))
            .subscribe((event) => dashboardService.onDragStart({ widget: widget, direction: ActionDirection.Move, event: event }));
        this.onDrag.pipe(takeUntil(this._onDestroy))
            .subscribe((event) => dashboardService.onDrag({ widget: widget, direction: ActionDirection.Move, event: event }));
        this.onDragEnd.pipe(takeUntil(this._onDestroy))
            .subscribe(() => dashboardService.onDragEnd());
    }
}
DashboardDragHandleDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxDashboardWidgetDragHandle], [ux-dashboard-widget-drag-handle]'
            },] }
];
/** @nocollapse */
DashboardDragHandleDirective.ctorParameters = () => [
    { type: DashboardWidgetComponent },
    { type: DashboardService },
    { type: ElementRef },
    { type: NgZone },
    { type: Renderer2 },
    { type: DragService }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1oYW5kbGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZGFzaGJvYXJkL2RyYWctaGFuZGxlL2RyYWctaGFuZGxlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RSxPQUFPLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDN0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBS2hGLE1BQU0sbUNBQW9DLFNBQVEsYUFBYTs7Ozs7Ozs7O0lBRTNELFlBQVksTUFBZ0MsRUFBRSxnQkFBa0MsRUFBRSxVQUFzQixFQUNwRyxNQUFjLEVBQUUsUUFBbUIsRUFBRSxJQUFpQjtRQUV0RCxLQUFLLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7O1FBRzFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBRTFCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUNoRyxTQUFTLENBQUMsQ0FBQyxLQUFpQixFQUFFLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxlQUFlLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFdkksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUN2QyxTQUFTLENBQUMsQ0FBQyxLQUFpQixFQUFFLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxlQUFlLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFbEksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUMxQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztLQUN0RDs7O1lBckJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsa0VBQWtFO2FBQy9FOzs7O1lBSlEsd0JBQXdCO1lBRFAsZ0JBQWdCO1lBSnRCLFVBQVU7WUFBRSxNQUFNO1lBQUUsU0FBUztZQUd4QyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBOZ1pvbmUsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdGFrZVVudGlsLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEcmFnRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vLi4vZGlyZWN0aXZlcy9kcmFnL2RyYWcuZGlyZWN0aXZlJztcbmltcG9ydCB7IERyYWdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vZGlyZWN0aXZlcy9kcmFnL2luZGV4JztcbmltcG9ydCB7IEFjdGlvbkRpcmVjdGlvbiwgRGFzaGJvYXJkU2VydmljZSB9IGZyb20gJy4uL2Rhc2hib2FyZC5zZXJ2aWNlJztcbmltcG9ydCB7IERhc2hib2FyZFdpZGdldENvbXBvbmVudCB9IGZyb20gJy4uL3dpZGdldC9kYXNoYm9hcmQtd2lkZ2V0LmNvbXBvbmVudCc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3V4RGFzaGJvYXJkV2lkZ2V0RHJhZ0hhbmRsZV0sIFt1eC1kYXNoYm9hcmQtd2lkZ2V0LWRyYWctaGFuZGxlXSdcbn0pXG5leHBvcnQgY2xhc3MgRGFzaGJvYXJkRHJhZ0hhbmRsZURpcmVjdGl2ZSBleHRlbmRzIERyYWdEaXJlY3RpdmUge1xuXG4gICAgY29uc3RydWN0b3Iod2lkZ2V0OiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQsIGRhc2hib2FyZFNlcnZpY2U6IERhc2hib2FyZFNlcnZpY2UsIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIG5nWm9uZTogTmdab25lLCByZW5kZXJlcjogUmVuZGVyZXIyLCBkcmFnOiBEcmFnU2VydmljZSkge1xuXG4gICAgICAgIHN1cGVyKGVsZW1lbnRSZWYsIG5nWm9uZSwgcmVuZGVyZXIsIGRyYWcpO1xuXG4gICAgICAgIC8vIGluZm9ybSB0aGUgd2lkZ2V0IHRoYXQgaXQgY2FuIGJlIGRyYWdnZWRcbiAgICAgICAgd2lkZ2V0LmlzRHJhZ2dhYmxlID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLm9uRHJhZ1N0YXJ0LnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSksIHRhcCgoKSA9PiBkYXNoYm9hcmRTZXJ2aWNlLmlzR3JhYmJpbmckLm5leHQobnVsbCkpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IGRhc2hib2FyZFNlcnZpY2Uub25EcmFnU3RhcnQoeyB3aWRnZXQ6IHdpZGdldCwgZGlyZWN0aW9uOiBBY3Rpb25EaXJlY3Rpb24uTW92ZSwgZXZlbnQ6IGV2ZW50IH0pKTtcblxuICAgICAgICB0aGlzLm9uRHJhZy5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IGRhc2hib2FyZFNlcnZpY2Uub25EcmFnKHsgd2lkZ2V0OiB3aWRnZXQsIGRpcmVjdGlvbjogQWN0aW9uRGlyZWN0aW9uLk1vdmUsIGV2ZW50OiBldmVudCB9KSk7XG5cbiAgICAgICAgdGhpcy5vbkRyYWdFbmQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gZGFzaGJvYXJkU2VydmljZS5vbkRyYWdFbmQoKSk7XG4gICAgfVxufSJdfQ==