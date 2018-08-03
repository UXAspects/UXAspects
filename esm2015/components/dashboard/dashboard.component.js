/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DashboardService, defaultOptions } from './dashboard.service';
export class DashboardComponent {
    /**
     * @param {?} dashboardService
     */
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
        this.layoutChange = new EventEmitter();
        dashboardService.layout$.subscribe(layout => this.layoutChange.emit(layout));
    }
    /**
     * @param {?} layout
     * @return {?}
     */
    set layout(layout) {
        if (layout) {
            this.dashboardService.layout$.next(layout);
        }
    }
    /**
     * @param {?} options
     * @return {?}
     */
    set options(options) {
        this.dashboardService.options$.next(Object.assign({}, defaultOptions, options));
    }
    /**
     * Set the initial dimensions
     * @return {?}
     */
    ngAfterViewInit() {
        this.dashboardService.setDimensions(this.dashboardElement.nativeElement.offsetWidth, this.dashboardElement.nativeElement.offsetHeight);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onResize(event) {
        this.dashboardService.setDimensions(event.width, event.height);
    }
}
DashboardComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-dashboard',
                template: "<div #dashboard class=\"dashboard-container\" [style.height.px]=\"dashboardService.height$ | async\">\n    <div (uxResize)=\"onResize($event)\" [throttle]=\"16\" class=\"dashboard\">\n        <ng-content></ng-content>\n    </div>\n    \n    <div class=\"position-indicator\" *ngIf=\"(dashboardService.placeholder$ | async).visible\" \n        [style.left.px]=\"(dashboardService.placeholder$ | async).x\" \n        [style.top.px]=\"(dashboardService.placeholder$ | async).y\" \n        [style.width.px]=\"(dashboardService.placeholder$ | async).width\"\n        [style.height.px]=\"(dashboardService.placeholder$ | async).height\"></div>\n</div>",
                providers: [DashboardService],
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
DashboardComponent.ctorParameters = () => [
    { type: DashboardService }
];
DashboardComponent.propDecorators = {
    layout: [{ type: Input }],
    options: [{ type: Input }],
    layoutChange: [{ type: Output }],
    dashboardElement: [{ type: ViewChild, args: ['dashboard',] }]
};
function DashboardComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    DashboardComponent.prototype.layoutChange;
    /** @type {?} */
    DashboardComponent.prototype.dashboardElement;
    /** @type {?} */
    DashboardComponent.prototype.dashboardService;
}
/**
 * @record
 */
export function DashboardOptions() { }
function DashboardOptions_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    DashboardOptions.prototype.columns;
    /** @type {?|undefined} */
    DashboardOptions.prototype.padding;
    /** @type {?|undefined} */
    DashboardOptions.prototype.minWidth;
    /** @type {?|undefined} */
    DashboardOptions.prototype.minHeight;
    /** @type {?|undefined} */
    DashboardOptions.prototype.rowHeight;
    /** @type {?|undefined} */
    DashboardOptions.prototype.emptyRow;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWlCLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXRJLE9BQU8sRUFBdUIsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFRNUYsTUFBTTs7OztJQWdCRixZQUFtQixnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjs0QkFKNUIsSUFBSSxZQUFZLEVBQXlCO1FBSzlELGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0tBQ2hGOzs7OztJQWhCRCxJQUFhLE1BQU0sQ0FBQyxNQUE2QjtRQUM3QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDOUM7S0FDSjs7Ozs7SUFFRCxJQUFhLE9BQU8sQ0FBQyxPQUF5QjtRQUMxQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksbUJBQU0sY0FBYyxFQUFLLE9BQU8sRUFBRyxDQUFDO0tBQzFFOzs7OztJQWFELGVBQWU7UUFDWCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDMUk7Ozs7O0lBRUQsUUFBUSxDQUFDLEtBQXVCO1FBQzVCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDbEU7OztZQW5DSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLGlwQkFBeUM7Z0JBQ3pDLFNBQVMsRUFBRSxDQUFDLGdCQUFnQixDQUFDO2dCQUM3QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNsRDs7OztZQVA2QixnQkFBZ0I7OztxQkFVekMsS0FBSztzQkFNTCxLQUFLOzJCQUlMLE1BQU07K0JBRU4sU0FBUyxTQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVzaXplRGltZW5zaW9ucyB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvcmVzaXplL3Jlc2l6ZS5zZXJ2aWNlJztcbmltcG9ydCB7IERhc2hib2FyZExheW91dERhdGEsIERhc2hib2FyZFNlcnZpY2UsIGRlZmF1bHRPcHRpb25zIH0gZnJvbSAnLi9kYXNoYm9hcmQuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtZGFzaGJvYXJkJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZGFzaGJvYXJkLmNvbXBvbmVudC5odG1sJyxcbiAgICBwcm92aWRlcnM6IFtEYXNoYm9hcmRTZXJ2aWNlXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBEYXNoYm9hcmRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICAgIEBJbnB1dCgpIHNldCBsYXlvdXQobGF5b3V0OiBEYXNoYm9hcmRMYXlvdXREYXRhW10pIHtcbiAgICAgICAgaWYgKGxheW91dCkge1xuICAgICAgICAgICAgdGhpcy5kYXNoYm9hcmRTZXJ2aWNlLmxheW91dCQubmV4dChsYXlvdXQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQElucHV0KCkgc2V0IG9wdGlvbnMob3B0aW9uczogRGFzaGJvYXJkT3B0aW9ucykge1xuICAgICAgICB0aGlzLmRhc2hib2FyZFNlcnZpY2Uub3B0aW9ucyQubmV4dCh7IC4uLmRlZmF1bHRPcHRpb25zLCAuLi5vcHRpb25zIH0pO1xuICAgIH1cblxuICAgIEBPdXRwdXQoKSBsYXlvdXRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPERhc2hib2FyZExheW91dERhdGFbXT4oKTtcblxuICAgIEBWaWV3Q2hpbGQoJ2Rhc2hib2FyZCcpIGRhc2hib2FyZEVsZW1lbnQ6IEVsZW1lbnRSZWY7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZGFzaGJvYXJkU2VydmljZTogRGFzaGJvYXJkU2VydmljZSkge1xuICAgICAgICBkYXNoYm9hcmRTZXJ2aWNlLmxheW91dCQuc3Vic2NyaWJlKGxheW91dCA9PiB0aGlzLmxheW91dENoYW5nZS5lbWl0KGxheW91dCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgaW5pdGlhbCBkaW1lbnNpb25zXG4gICAgICovXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRhc2hib2FyZFNlcnZpY2Uuc2V0RGltZW5zaW9ucyh0aGlzLmRhc2hib2FyZEVsZW1lbnQubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCwgdGhpcy5kYXNoYm9hcmRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0KTtcbiAgICB9XG5cbiAgICBvblJlc2l6ZShldmVudDogUmVzaXplRGltZW5zaW9ucyk6IHZvaWQge1xuICAgICAgICB0aGlzLmRhc2hib2FyZFNlcnZpY2Uuc2V0RGltZW5zaW9ucyhldmVudC53aWR0aCwgZXZlbnQuaGVpZ2h0KTtcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGFzaGJvYXJkT3B0aW9ucyB7XG4gICAgY29sdW1ucz86IG51bWJlcjtcbiAgICBwYWRkaW5nPzogbnVtYmVyO1xuICAgIG1pbldpZHRoPzogbnVtYmVyO1xuICAgIG1pbkhlaWdodD86IG51bWJlcjtcbiAgICByb3dIZWlnaHQ/OiBudW1iZXI7XG4gICAgZW1wdHlSb3c/OiBib29sZWFuO1xufSJdfQ==