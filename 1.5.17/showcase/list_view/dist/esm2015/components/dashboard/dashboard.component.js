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
                template: `<div #dashboard class="dashboard-container" [style.height.px]="dashboardService.height$ | async">
    <div (uxResize)="onResize($event)" [throttle]="16" class="dashboard">
        <ng-content></ng-content>
    </div>
    
    <div class="position-indicator" *ngIf="(dashboardService.placeholder$ | async).visible" 
        [style.left.px]="(dashboardService.placeholder$ | async).x" 
        [style.top.px]="(dashboardService.placeholder$ | async).y" 
        [style.width.px]="(dashboardService.placeholder$ | async).width"
        [style.height.px]="(dashboardService.placeholder$ | async).height"></div>
</div>`,
                providers: [DashboardService],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
DashboardComponent.ctorParameters = () => [
    { type: DashboardService, },
];
DashboardComponent.propDecorators = {
    "layout": [{ type: Input },],
    "options": [{ type: Input },],
    "layoutChange": [{ type: Output },],
    "dashboardElement": [{ type: ViewChild, args: ['dashboard',] },],
};
function DashboardComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    DashboardComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    DashboardComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    DashboardComponent.propDecorators;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWlCLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXRJLE9BQU8sRUFBdUIsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFrQjVGLE1BQU07Ozs7SUFnQkYsWUFBbUIsZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7NEJBSjVCLElBQUksWUFBWSxFQUF5QjtRQUs5RCxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0tBQ2hGOzs7OztRQWhCWSxNQUFNLENBQUMsTUFBNkI7UUFDN0MsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNULElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzlDOzs7Ozs7UUFHUSxPQUFPLENBQUMsT0FBeUI7UUFDMUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLG1CQUFNLGNBQWMsRUFBSyxPQUFPLEVBQUcsQ0FBQzs7Ozs7O0lBYzNFLGVBQWU7UUFDWCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDMUk7Ozs7O0lBRUQsUUFBUSxDQUFDLEtBQXVCO1FBQzVCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDbEU7OztZQTdDSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLFFBQVEsRUFBRTs7Ozs7Ozs7OztPQVVQO2dCQUNILFNBQVMsRUFBRSxDQUFDLGdCQUFnQixDQUFDO2dCQUM3QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNsRDs7OztZQWpCNkIsZ0JBQWdCOzs7dUJBb0J6QyxLQUFLO3dCQU1MLEtBQUs7NkJBSUwsTUFBTTtpQ0FFTixTQUFTLFNBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZXNpemVEaW1lbnNpb25zIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9yZXNpemUvcmVzaXplLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGFzaGJvYXJkTGF5b3V0RGF0YSwgRGFzaGJvYXJkU2VydmljZSwgZGVmYXVsdE9wdGlvbnMgfSBmcm9tICcuL2Rhc2hib2FyZC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1kYXNoYm9hcmQnLFxuICAgIHRlbXBsYXRlOiBgPGRpdiAjZGFzaGJvYXJkIGNsYXNzPVwiZGFzaGJvYXJkLWNvbnRhaW5lclwiIFtzdHlsZS5oZWlnaHQucHhdPVwiZGFzaGJvYXJkU2VydmljZS5oZWlnaHQkIHwgYXN5bmNcIj5cbiAgICA8ZGl2ICh1eFJlc2l6ZSk9XCJvblJlc2l6ZSgkZXZlbnQpXCIgW3Rocm90dGxlXT1cIjE2XCIgY2xhc3M9XCJkYXNoYm9hcmRcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICAgIFxuICAgIDxkaXYgY2xhc3M9XCJwb3NpdGlvbi1pbmRpY2F0b3JcIiAqbmdJZj1cIihkYXNoYm9hcmRTZXJ2aWNlLnBsYWNlaG9sZGVyJCB8IGFzeW5jKS52aXNpYmxlXCIgXG4gICAgICAgIFtzdHlsZS5sZWZ0LnB4XT1cIihkYXNoYm9hcmRTZXJ2aWNlLnBsYWNlaG9sZGVyJCB8IGFzeW5jKS54XCIgXG4gICAgICAgIFtzdHlsZS50b3AucHhdPVwiKGRhc2hib2FyZFNlcnZpY2UucGxhY2Vob2xkZXIkIHwgYXN5bmMpLnlcIiBcbiAgICAgICAgW3N0eWxlLndpZHRoLnB4XT1cIihkYXNoYm9hcmRTZXJ2aWNlLnBsYWNlaG9sZGVyJCB8IGFzeW5jKS53aWR0aFwiXG4gICAgICAgIFtzdHlsZS5oZWlnaHQucHhdPVwiKGRhc2hib2FyZFNlcnZpY2UucGxhY2Vob2xkZXIkIHwgYXN5bmMpLmhlaWdodFwiPjwvZGl2PlxuPC9kaXY+YCxcbiAgICBwcm92aWRlcnM6IFtEYXNoYm9hcmRTZXJ2aWNlXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBEYXNoYm9hcmRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICAgIEBJbnB1dCgpIHNldCBsYXlvdXQobGF5b3V0OiBEYXNoYm9hcmRMYXlvdXREYXRhW10pIHtcbiAgICAgICAgaWYgKGxheW91dCkge1xuICAgICAgICAgICAgdGhpcy5kYXNoYm9hcmRTZXJ2aWNlLmxheW91dCQubmV4dChsYXlvdXQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQElucHV0KCkgc2V0IG9wdGlvbnMob3B0aW9uczogRGFzaGJvYXJkT3B0aW9ucykge1xuICAgICAgICB0aGlzLmRhc2hib2FyZFNlcnZpY2Uub3B0aW9ucyQubmV4dCh7IC4uLmRlZmF1bHRPcHRpb25zLCAuLi5vcHRpb25zIH0pO1xuICAgIH1cblxuICAgIEBPdXRwdXQoKSBsYXlvdXRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPERhc2hib2FyZExheW91dERhdGFbXT4oKTtcblxuICAgIEBWaWV3Q2hpbGQoJ2Rhc2hib2FyZCcpIGRhc2hib2FyZEVsZW1lbnQ6IEVsZW1lbnRSZWY7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZGFzaGJvYXJkU2VydmljZTogRGFzaGJvYXJkU2VydmljZSkge1xuICAgICAgICBkYXNoYm9hcmRTZXJ2aWNlLmxheW91dCQuc3Vic2NyaWJlKGxheW91dCA9PiB0aGlzLmxheW91dENoYW5nZS5lbWl0KGxheW91dCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgaW5pdGlhbCBkaW1lbnNpb25zXG4gICAgICovXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRhc2hib2FyZFNlcnZpY2Uuc2V0RGltZW5zaW9ucyh0aGlzLmRhc2hib2FyZEVsZW1lbnQubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCwgdGhpcy5kYXNoYm9hcmRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0KTtcbiAgICB9XG5cbiAgICBvblJlc2l6ZShldmVudDogUmVzaXplRGltZW5zaW9ucyk6IHZvaWQge1xuICAgICAgICB0aGlzLmRhc2hib2FyZFNlcnZpY2Uuc2V0RGltZW5zaW9ucyhldmVudC53aWR0aCwgZXZlbnQuaGVpZ2h0KTtcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGFzaGJvYXJkT3B0aW9ucyB7XG4gICAgY29sdW1ucz86IG51bWJlcjtcbiAgICBwYWRkaW5nPzogbnVtYmVyO1xuICAgIG1pbldpZHRoPzogbnVtYmVyO1xuICAgIG1pbkhlaWdodD86IG51bWJlcjtcbiAgICByb3dIZWlnaHQ/OiBudW1iZXI7XG4gICAgZW1wdHlSb3c/OiBib29sZWFuO1xufSJdfQ==