/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, NgZone, Renderer2 } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { DragDirective } from '../../../directives/drag/drag.directive';
import { ActionDirection, DashboardService } from '../dashboard.service';
import { DashboardWidgetComponent } from '../widget/dashboard-widget.component';
export class DashboardDragHandleDirective extends DragDirective {
    /**
     * @param {?} widget
     * @param {?} dashboardService
     * @param {?} elementRef
     * @param {?} ngZone
     * @param {?} renderer
     */
    constructor(widget, dashboardService, elementRef, ngZone, renderer) {
        super(elementRef, ngZone, renderer);
        this.dragstart.pipe(takeUntil(this._onDestroy))
            .subscribe((event) => dashboardService.onDragStart({ widget: widget, direction: ActionDirection.Move, event: event }));
        this.drag.pipe(takeUntil(this._onDestroy))
            .subscribe((event) => dashboardService.onDrag({ widget: widget, direction: ActionDirection.Move, event: event }));
        this.dragend.pipe(takeUntil(this._onDestroy))
            .subscribe(() => dashboardService.onDragEnd());
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
    { type: Renderer2, },
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1oYW5kbGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZGFzaGJvYXJkL2RyYWctaGFuZGxlL2RyYWctaGFuZGxlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUtoRixNQUFNLG1DQUFvQyxTQUFRLGFBQWE7Ozs7Ozs7O0lBRTNELFlBQVksTUFBZ0MsRUFBRSxnQkFBa0MsRUFBRSxVQUFzQixFQUFFLE1BQWMsRUFBRSxRQUFtQjtRQUN6SSxLQUFLLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUVwQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQzFDLFNBQVMsQ0FBQyxDQUFDLEtBQWlCLEtBQUssZ0JBQWdCLENBQUMsV0FBVyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsZUFBZSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXZJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDckMsU0FBUyxDQUFDLENBQUMsS0FBaUIsS0FBSyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxlQUFlLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFbEksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUN4QyxTQUFTLENBQUMsTUFBTSxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO0tBQ3REOzs7WUFoQkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxrRUFBa0U7YUFDL0U7Ozs7WUFKUSx3QkFBd0I7WUFEUCxnQkFBZ0I7WUFIdEIsVUFBVTtZQUFFLE1BQU07WUFBRSxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBOZ1pvbmUsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRHJhZ0RpcmVjdGl2ZSB9IGZyb20gJy4uLy4uLy4uL2RpcmVjdGl2ZXMvZHJhZy9kcmFnLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBBY3Rpb25EaXJlY3Rpb24sIERhc2hib2FyZFNlcnZpY2UgfSBmcm9tICcuLi9kYXNoYm9hcmQuc2VydmljZSc7XG5pbXBvcnQgeyBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuLi93aWRnZXQvZGFzaGJvYXJkLXdpZGdldC5jb21wb25lbnQnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t1eERhc2hib2FyZFdpZGdldERyYWdIYW5kbGVdLCBbdXgtZGFzaGJvYXJkLXdpZGdldC1kcmFnLWhhbmRsZV0nXG59KVxuZXhwb3J0IGNsYXNzIERhc2hib2FyZERyYWdIYW5kbGVEaXJlY3RpdmUgZXh0ZW5kcyBEcmFnRGlyZWN0aXZlIHtcblxuICAgIGNvbnN0cnVjdG9yKHdpZGdldDogRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50LCBkYXNoYm9hcmRTZXJ2aWNlOiBEYXNoYm9hcmRTZXJ2aWNlLCBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBuZ1pvbmU6IE5nWm9uZSwgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmLCBuZ1pvbmUsIHJlbmRlcmVyKTtcblxuICAgICAgICB0aGlzLmRyYWdzdGFydC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IGRhc2hib2FyZFNlcnZpY2Uub25EcmFnU3RhcnQoeyB3aWRnZXQ6IHdpZGdldCwgZGlyZWN0aW9uOiBBY3Rpb25EaXJlY3Rpb24uTW92ZSwgZXZlbnQ6IGV2ZW50IH0pKTtcblxuICAgICAgICB0aGlzLmRyYWcucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiBkYXNoYm9hcmRTZXJ2aWNlLm9uRHJhZyh7IHdpZGdldDogd2lkZ2V0LCBkaXJlY3Rpb246IEFjdGlvbkRpcmVjdGlvbi5Nb3ZlLCBldmVudDogZXZlbnQgfSkpO1xuXG4gICAgICAgIHRoaXMuZHJhZ2VuZC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiBkYXNoYm9hcmRTZXJ2aWNlLm9uRHJhZ0VuZCgpKTtcbiAgICB9XG59Il19