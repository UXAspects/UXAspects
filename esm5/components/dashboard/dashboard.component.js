/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DashboardService, defaultOptions } from './dashboard.service';
var DashboardComponent = (function () {
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
                },] },
    ];
    /** @nocollapse */
    DashboardComponent.ctorParameters = function () { return [
        { type: DashboardService, },
    ]; };
    DashboardComponent.propDecorators = {
        "layout": [{ type: Input },],
        "options": [{ type: Input },],
        "layoutChange": [{ type: Output },],
        "dashboardElement": [{ type: ViewChild, args: ['dashboard',] },],
    };
    return DashboardComponent;
}());
export { DashboardComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFpQix1QkFBdUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV0SSxPQUFPLEVBQXVCLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDOztJQWtDeEYsNEJBQW1CLGdCQUFrQztRQUFyRCxpQkFFQztRQUZrQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCOzRCQUo1QixJQUFJLFlBQVksRUFBeUI7UUFLOUQsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUE5QixDQUE4QixDQUFDLENBQUM7S0FDaEY7MEJBaEJZLHNDQUFNOzs7OztrQkFBQyxNQUE2QjtZQUM3QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNULElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzlDOzs7OzswQkFHUSx1Q0FBTzs7Ozs7a0JBQUMsT0FBeUI7WUFDMUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLHNCQUFNLGNBQWMsRUFBSyxPQUFPLEVBQUcsQ0FBQzs7Ozs7SUFXM0U7O09BRUc7Ozs7O0lBQ0gsNENBQWU7Ozs7SUFBZjtRQUNJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUMxSTs7Ozs7SUFFRCxxQ0FBUTs7OztJQUFSLFVBQVMsS0FBdUI7UUFDNUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNsRTs7Z0JBN0NKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsY0FBYztvQkFDeEIsUUFBUSxFQUFFLHVvQkFVUDtvQkFDSCxTQUFTLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztvQkFDN0IsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2xEOzs7O2dCQWpCNkIsZ0JBQWdCOzs7MkJBb0J6QyxLQUFLOzRCQU1MLEtBQUs7aUNBSUwsTUFBTTtxQ0FFTixTQUFTLFNBQUMsV0FBVzs7NkJBbEMxQjs7U0FvQmEsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlc2l6ZURpbWVuc2lvbnMgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3Jlc2l6ZS9yZXNpemUuc2VydmljZSc7XG5pbXBvcnQgeyBEYXNoYm9hcmRMYXlvdXREYXRhLCBEYXNoYm9hcmRTZXJ2aWNlLCBkZWZhdWx0T3B0aW9ucyB9IGZyb20gJy4vZGFzaGJvYXJkLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LWRhc2hib2FyZCcsXG4gICAgdGVtcGxhdGU6IGA8ZGl2ICNkYXNoYm9hcmQgY2xhc3M9XCJkYXNoYm9hcmQtY29udGFpbmVyXCIgW3N0eWxlLmhlaWdodC5weF09XCJkYXNoYm9hcmRTZXJ2aWNlLmhlaWdodCQgfCBhc3luY1wiPlxuICAgIDxkaXYgKHV4UmVzaXplKT1cIm9uUmVzaXplKCRldmVudClcIiBbdGhyb3R0bGVdPVwiMTZcIiBjbGFzcz1cImRhc2hib2FyZFwiPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG4gICAgXG4gICAgPGRpdiBjbGFzcz1cInBvc2l0aW9uLWluZGljYXRvclwiICpuZ0lmPVwiKGRhc2hib2FyZFNlcnZpY2UucGxhY2Vob2xkZXIkIHwgYXN5bmMpLnZpc2libGVcIiBcbiAgICAgICAgW3N0eWxlLmxlZnQucHhdPVwiKGRhc2hib2FyZFNlcnZpY2UucGxhY2Vob2xkZXIkIHwgYXN5bmMpLnhcIiBcbiAgICAgICAgW3N0eWxlLnRvcC5weF09XCIoZGFzaGJvYXJkU2VydmljZS5wbGFjZWhvbGRlciQgfCBhc3luYykueVwiIFxuICAgICAgICBbc3R5bGUud2lkdGgucHhdPVwiKGRhc2hib2FyZFNlcnZpY2UucGxhY2Vob2xkZXIkIHwgYXN5bmMpLndpZHRoXCJcbiAgICAgICAgW3N0eWxlLmhlaWdodC5weF09XCIoZGFzaGJvYXJkU2VydmljZS5wbGFjZWhvbGRlciQgfCBhc3luYykuaGVpZ2h0XCI+PC9kaXY+XG48L2Rpdj5gLFxuICAgIHByb3ZpZGVyczogW0Rhc2hib2FyZFNlcnZpY2VdLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIERhc2hib2FyZENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gICAgQElucHV0KCkgc2V0IGxheW91dChsYXlvdXQ6IERhc2hib2FyZExheW91dERhdGFbXSkge1xuICAgICAgICBpZiAobGF5b3V0KSB7XG4gICAgICAgICAgICB0aGlzLmRhc2hib2FyZFNlcnZpY2UubGF5b3V0JC5uZXh0KGxheW91dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASW5wdXQoKSBzZXQgb3B0aW9ucyhvcHRpb25zOiBEYXNoYm9hcmRPcHRpb25zKSB7XG4gICAgICAgIHRoaXMuZGFzaGJvYXJkU2VydmljZS5vcHRpb25zJC5uZXh0KHsgLi4uZGVmYXVsdE9wdGlvbnMsIC4uLm9wdGlvbnMgfSk7XG4gICAgfVxuXG4gICAgQE91dHB1dCgpIGxheW91dENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8RGFzaGJvYXJkTGF5b3V0RGF0YVtdPigpO1xuXG4gICAgQFZpZXdDaGlsZCgnZGFzaGJvYXJkJykgZGFzaGJvYXJkRWxlbWVudDogRWxlbWVudFJlZjtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkYXNoYm9hcmRTZXJ2aWNlOiBEYXNoYm9hcmRTZXJ2aWNlKSB7XG4gICAgICAgIGRhc2hib2FyZFNlcnZpY2UubGF5b3V0JC5zdWJzY3JpYmUobGF5b3V0ID0+IHRoaXMubGF5b3V0Q2hhbmdlLmVtaXQobGF5b3V0KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBpbml0aWFsIGRpbWVuc2lvbnNcbiAgICAgKi9cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGFzaGJvYXJkU2VydmljZS5zZXREaW1lbnNpb25zKHRoaXMuZGFzaGJvYXJkRWxlbWVudC5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoLCB0aGlzLmRhc2hib2FyZEVsZW1lbnQubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQpO1xuICAgIH1cblxuICAgIG9uUmVzaXplKGV2ZW50OiBSZXNpemVEaW1lbnNpb25zKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGFzaGJvYXJkU2VydmljZS5zZXREaW1lbnNpb25zKGV2ZW50LndpZHRoLCBldmVudC5oZWlnaHQpO1xuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBEYXNoYm9hcmRPcHRpb25zIHtcbiAgICBjb2x1bW5zPzogbnVtYmVyO1xuICAgIHBhZGRpbmc/OiBudW1iZXI7XG4gICAgbWluV2lkdGg/OiBudW1iZXI7XG4gICAgbWluSGVpZ2h0PzogbnVtYmVyO1xuICAgIHJvd0hlaWdodD86IG51bWJlcjtcbiAgICBlbXB0eVJvdz86IGJvb2xlYW47XG59Il19