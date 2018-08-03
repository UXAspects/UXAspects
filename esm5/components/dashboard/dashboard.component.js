/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DashboardService, defaultOptions } from './dashboard.service';
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(dashboardService) {
        var _this = this;
        this.dashboardService = dashboardService;
        this.layoutChange = new EventEmitter();
        dashboardService.layout$.subscribe(function (layout) { return _this.layoutChange.emit(layout); });
    }
    Object.defineProperty(DashboardComponent.prototype, "layout", {
        set: /**
         * @param {?} layout
         * @return {?}
         */
        function (layout) {
            if (layout) {
                this.dashboardService.layout$.next(layout);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DashboardComponent.prototype, "options", {
        set: /**
         * @param {?} options
         * @return {?}
         */
        function (options) {
            this.dashboardService.options$.next(tslib_1.__assign({}, defaultOptions, options));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Set the initial dimensions
     */
    /**
     * Set the initial dimensions
     * @return {?}
     */
    DashboardComponent.prototype.ngAfterViewInit = /**
     * Set the initial dimensions
     * @return {?}
     */
    function () {
        this.dashboardService.setDimensions(this.dashboardElement.nativeElement.offsetWidth, this.dashboardElement.nativeElement.offsetHeight);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DashboardComponent.prototype.onResize = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.dashboardService.setDimensions(event.width, event.height);
    };
    DashboardComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-dashboard',
                    template: "<div #dashboard class=\"dashboard-container\" [style.height.px]=\"dashboardService.height$ | async\">\n    <div (uxResize)=\"onResize($event)\" [throttle]=\"16\" class=\"dashboard\">\n        <ng-content></ng-content>\n    </div>\n    \n    <div class=\"position-indicator\" *ngIf=\"(dashboardService.placeholder$ | async).visible\" \n        [style.left.px]=\"(dashboardService.placeholder$ | async).x\" \n        [style.top.px]=\"(dashboardService.placeholder$ | async).y\" \n        [style.width.px]=\"(dashboardService.placeholder$ | async).width\"\n        [style.height.px]=\"(dashboardService.placeholder$ | async).height\"></div>\n</div>",
                    providers: [DashboardService],
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    DashboardComponent.ctorParameters = function () { return [
        { type: DashboardService }
    ]; };
    DashboardComponent.propDecorators = {
        layout: [{ type: Input }],
        options: [{ type: Input }],
        layoutChange: [{ type: Output }],
        dashboardElement: [{ type: ViewChild, args: ['dashboard',] }]
    };
    return DashboardComponent;
}());
export { DashboardComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFpQix1QkFBdUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV0SSxPQUFPLEVBQXVCLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDOztJQXdCeEYsNEJBQW1CLGdCQUFrQztRQUFyRCxpQkFFQztRQUZrQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCOzRCQUo1QixJQUFJLFlBQVksRUFBeUI7UUFLOUQsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUE5QixDQUE4QixDQUFDLENBQUM7S0FDaEY7SUFoQkQsc0JBQWEsc0NBQU07Ozs7O1FBQW5CLFVBQW9CLE1BQTZCO1lBQzdDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ1QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDOUM7U0FDSjs7O09BQUE7SUFFRCxzQkFBYSx1Q0FBTzs7Ozs7UUFBcEIsVUFBcUIsT0FBeUI7WUFDMUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLHNCQUFNLGNBQWMsRUFBSyxPQUFPLEVBQUcsQ0FBQztTQUMxRTs7O09BQUE7SUFVRDs7T0FFRzs7Ozs7SUFDSCw0Q0FBZTs7OztJQUFmO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQzFJOzs7OztJQUVELHFDQUFROzs7O0lBQVIsVUFBUyxLQUF1QjtRQUM1QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ2xFOztnQkFuQ0osU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxjQUFjO29CQUN4QixpcEJBQXlDO29CQUN6QyxTQUFTLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztvQkFDN0IsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2xEOzs7O2dCQVA2QixnQkFBZ0I7Ozt5QkFVekMsS0FBSzswQkFNTCxLQUFLOytCQUlMLE1BQU07bUNBRU4sU0FBUyxTQUFDLFdBQVc7OzZCQXhCMUI7O1NBVWEsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlc2l6ZURpbWVuc2lvbnMgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3Jlc2l6ZS9yZXNpemUuc2VydmljZSc7XG5pbXBvcnQgeyBEYXNoYm9hcmRMYXlvdXREYXRhLCBEYXNoYm9hcmRTZXJ2aWNlLCBkZWZhdWx0T3B0aW9ucyB9IGZyb20gJy4vZGFzaGJvYXJkLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LWRhc2hib2FyZCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2Rhc2hib2FyZC5jb21wb25lbnQuaHRtbCcsXG4gICAgcHJvdmlkZXJzOiBbRGFzaGJvYXJkU2VydmljZV0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgRGFzaGJvYXJkQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgICBASW5wdXQoKSBzZXQgbGF5b3V0KGxheW91dDogRGFzaGJvYXJkTGF5b3V0RGF0YVtdKSB7XG4gICAgICAgIGlmIChsYXlvdXQpIHtcbiAgICAgICAgICAgIHRoaXMuZGFzaGJvYXJkU2VydmljZS5sYXlvdXQkLm5leHQobGF5b3V0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBJbnB1dCgpIHNldCBvcHRpb25zKG9wdGlvbnM6IERhc2hib2FyZE9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5kYXNoYm9hcmRTZXJ2aWNlLm9wdGlvbnMkLm5leHQoeyAuLi5kZWZhdWx0T3B0aW9ucywgLi4ub3B0aW9ucyB9KTtcbiAgICB9XG5cbiAgICBAT3V0cHV0KCkgbGF5b3V0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxEYXNoYm9hcmRMYXlvdXREYXRhW10+KCk7XG5cbiAgICBAVmlld0NoaWxkKCdkYXNoYm9hcmQnKSBkYXNoYm9hcmRFbGVtZW50OiBFbGVtZW50UmVmO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGRhc2hib2FyZFNlcnZpY2U6IERhc2hib2FyZFNlcnZpY2UpIHtcbiAgICAgICAgZGFzaGJvYXJkU2VydmljZS5sYXlvdXQkLnN1YnNjcmliZShsYXlvdXQgPT4gdGhpcy5sYXlvdXRDaGFuZ2UuZW1pdChsYXlvdXQpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGluaXRpYWwgZGltZW5zaW9uc1xuICAgICAqL1xuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kYXNoYm9hcmRTZXJ2aWNlLnNldERpbWVuc2lvbnModGhpcy5kYXNoYm9hcmRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGgsIHRoaXMuZGFzaGJvYXJkRWxlbWVudC5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCk7XG4gICAgfVxuXG4gICAgb25SZXNpemUoZXZlbnQ6IFJlc2l6ZURpbWVuc2lvbnMpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kYXNoYm9hcmRTZXJ2aWNlLnNldERpbWVuc2lvbnMoZXZlbnQud2lkdGgsIGV2ZW50LmhlaWdodCk7XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIERhc2hib2FyZE9wdGlvbnMge1xuICAgIGNvbHVtbnM/OiBudW1iZXI7XG4gICAgcGFkZGluZz86IG51bWJlcjtcbiAgICBtaW5XaWR0aD86IG51bWJlcjtcbiAgICBtaW5IZWlnaHQ/OiBudW1iZXI7XG4gICAgcm93SGVpZ2h0PzogbnVtYmVyO1xuICAgIGVtcHR5Um93PzogYm9vbGVhbjtcbn0iXX0=