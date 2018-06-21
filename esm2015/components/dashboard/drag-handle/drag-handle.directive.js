/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, NgZone, ElementRef } from '@angular/core';
import { DashboardWidgetComponent } from '../widget/dashboard-widget.component';
import { DashboardService, ActionDirection } from '../dashboard.service';
import { DragDirective } from '../../../directives/drag/drag.directive';
export class DashboardDragHandleDirective extends DragDirective {
    /**
     * @param {?} widget
     * @param {?} dashboardService
     * @param {?} elementRef
     * @param {?} ngZone
     */
    constructor(widget, dashboardService, elementRef, ngZone) {
        super(elementRef, ngZone);
        this.dragstart.subscribe((event) => dashboardService.onDragStart({ widget: widget, direction: ActionDirection.Move, event: event }));
        this.drag.subscribe((event) => dashboardService.onDrag({ widget: widget, direction: ActionDirection.Move, event: event }));
        this.dragend.subscribe(() => dashboardService.onDragEnd());
    }
}
DashboardDragHandleDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxDashboardWidgetDragHandle], [ux-dashboard-widget-drag-handle]'
            },] },
];
/** @nocollapse */
DashboardDragHandleDirective.ctorParameters = () => [
    { type: DashboardWidgetComponent, },
    { type: DashboardService, },
    { type: ElementRef, },
    { type: NgZone, },
];
function DashboardDragHandleDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    DashboardDragHandleDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    DashboardDragHandleDirective.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1oYW5kbGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZGFzaGJvYXJkL2RyYWctaGFuZGxlL2RyYWctaGFuZGxlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTlELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFLeEUsTUFBTSxtQ0FBb0MsU0FBUSxhQUFhOzs7Ozs7O0lBRTNELFlBQVksTUFBZ0MsRUFBRSxnQkFBa0MsRUFBRSxVQUFzQixFQUFFLE1BQWM7UUFDcEgsS0FBSyxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUUxQixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQWlCLEtBQUssZ0JBQWdCLENBQUMsV0FBVyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsZUFBZSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2pKLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBaUIsS0FBSyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxlQUFlLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO0tBQzlEOzs7WUFYSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGtFQUFrRTthQUMvRTs7OztZQU5RLHdCQUF3QjtZQUN4QixnQkFBZ0I7WUFIRyxVQUFVO1lBQWxCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIE5nWm9uZSwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuLi93aWRnZXQvZGFzaGJvYXJkLXdpZGdldC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGFzaGJvYXJkU2VydmljZSwgQWN0aW9uRGlyZWN0aW9uIH0gZnJvbSAnLi4vZGFzaGJvYXJkLnNlcnZpY2UnO1xuaW1wb3J0IHsgRHJhZ0RpcmVjdGl2ZSB9IGZyb20gJy4uLy4uLy4uL2RpcmVjdGl2ZXMvZHJhZy9kcmFnLmRpcmVjdGl2ZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3V4RGFzaGJvYXJkV2lkZ2V0RHJhZ0hhbmRsZV0sIFt1eC1kYXNoYm9hcmQtd2lkZ2V0LWRyYWctaGFuZGxlXSdcbn0pXG5leHBvcnQgY2xhc3MgRGFzaGJvYXJkRHJhZ0hhbmRsZURpcmVjdGl2ZSBleHRlbmRzIERyYWdEaXJlY3RpdmUge1xuXG4gICAgY29uc3RydWN0b3Iod2lkZ2V0OiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQsIGRhc2hib2FyZFNlcnZpY2U6IERhc2hib2FyZFNlcnZpY2UsIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIG5nWm9uZTogTmdab25lKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnRSZWYsIG5nWm9uZSk7XG5cbiAgICAgICAgdGhpcy5kcmFnc3RhcnQuc3Vic2NyaWJlKChldmVudDogTW91c2VFdmVudCkgPT4gZGFzaGJvYXJkU2VydmljZS5vbkRyYWdTdGFydCh7IHdpZGdldDogd2lkZ2V0LCBkaXJlY3Rpb246IEFjdGlvbkRpcmVjdGlvbi5Nb3ZlLCBldmVudDogZXZlbnQgfSkpO1xuICAgICAgICB0aGlzLmRyYWcuc3Vic2NyaWJlKChldmVudDogTW91c2VFdmVudCkgPT4gZGFzaGJvYXJkU2VydmljZS5vbkRyYWcoeyB3aWRnZXQ6IHdpZGdldCwgZGlyZWN0aW9uOiBBY3Rpb25EaXJlY3Rpb24uTW92ZSwgZXZlbnQ6IGV2ZW50IH0pKTtcbiAgICAgICAgdGhpcy5kcmFnZW5kLnN1YnNjcmliZSgoKSA9PiBkYXNoYm9hcmRTZXJ2aWNlLm9uRHJhZ0VuZCgpKTtcbiAgICB9XG59Il19