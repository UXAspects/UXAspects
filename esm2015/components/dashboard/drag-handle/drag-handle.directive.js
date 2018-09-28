/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, NgZone, Renderer2 } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
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
        this.onDragStart.pipe(takeUntil(this._onDestroy))
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1oYW5kbGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZGFzaGJvYXJkL2RyYWctaGFuZGxlL2RyYWctaGFuZGxlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM3RCxPQUFPLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDekUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFLaEYsTUFBTSxtQ0FBb0MsU0FBUSxhQUFhOzs7Ozs7Ozs7SUFFM0QsWUFBWSxNQUFnQyxFQUFFLGdCQUFrQyxFQUFFLFVBQXNCLEVBQ3BHLE1BQWMsRUFBRSxRQUFtQixFQUFFLElBQWlCO1FBRXRELEtBQUssQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUUxQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQzVDLFNBQVMsQ0FBQyxDQUFDLEtBQWlCLEVBQUUsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLGVBQWUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUV2SSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3ZDLFNBQVMsQ0FBQyxDQUFDLEtBQWlCLEVBQUUsRUFBRSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLGVBQWUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVsSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQzFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO0tBQ3REOzs7WUFsQkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxrRUFBa0U7YUFDL0U7Ozs7WUFKUSx3QkFBd0I7WUFEUCxnQkFBZ0I7WUFKdEIsVUFBVTtZQUFFLE1BQU07WUFBRSxTQUFTO1lBR3hDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIE5nWm9uZSwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEcmFnRGlyZWN0aXZlIH0gZnJvbSAnLi4vLi4vLi4vZGlyZWN0aXZlcy9kcmFnL2RyYWcuZGlyZWN0aXZlJztcbmltcG9ydCB7IERyYWdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vZGlyZWN0aXZlcy9kcmFnL2luZGV4JztcbmltcG9ydCB7IEFjdGlvbkRpcmVjdGlvbiwgRGFzaGJvYXJkU2VydmljZSB9IGZyb20gJy4uL2Rhc2hib2FyZC5zZXJ2aWNlJztcbmltcG9ydCB7IERhc2hib2FyZFdpZGdldENvbXBvbmVudCB9IGZyb20gJy4uL3dpZGdldC9kYXNoYm9hcmQtd2lkZ2V0LmNvbXBvbmVudCc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3V4RGFzaGJvYXJkV2lkZ2V0RHJhZ0hhbmRsZV0sIFt1eC1kYXNoYm9hcmQtd2lkZ2V0LWRyYWctaGFuZGxlXSdcbn0pXG5leHBvcnQgY2xhc3MgRGFzaGJvYXJkRHJhZ0hhbmRsZURpcmVjdGl2ZSBleHRlbmRzIERyYWdEaXJlY3RpdmUge1xuXG4gICAgY29uc3RydWN0b3Iod2lkZ2V0OiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQsIGRhc2hib2FyZFNlcnZpY2U6IERhc2hib2FyZFNlcnZpY2UsIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIG5nWm9uZTogTmdab25lLCByZW5kZXJlcjogUmVuZGVyZXIyLCBkcmFnOiBEcmFnU2VydmljZSkge1xuXG4gICAgICAgIHN1cGVyKGVsZW1lbnRSZWYsIG5nWm9uZSwgcmVuZGVyZXIsIGRyYWcpO1xuXG4gICAgICAgIHRoaXMub25EcmFnU3RhcnQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiBkYXNoYm9hcmRTZXJ2aWNlLm9uRHJhZ1N0YXJ0KHsgd2lkZ2V0OiB3aWRnZXQsIGRpcmVjdGlvbjogQWN0aW9uRGlyZWN0aW9uLk1vdmUsIGV2ZW50OiBldmVudCB9KSk7XG5cbiAgICAgICAgdGhpcy5vbkRyYWcucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiBkYXNoYm9hcmRTZXJ2aWNlLm9uRHJhZyh7IHdpZGdldDogd2lkZ2V0LCBkaXJlY3Rpb246IEFjdGlvbkRpcmVjdGlvbi5Nb3ZlLCBldmVudDogZXZlbnQgfSkpO1xuXG4gICAgICAgIHRoaXMub25EcmFnRW5kLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IGRhc2hib2FyZFNlcnZpY2Uub25EcmFnRW5kKCkpO1xuICAgIH1cbn0iXX0=