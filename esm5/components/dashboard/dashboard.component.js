/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component, ContentChildren, ElementRef, EventEmitter, HostBinding, Input, Output, QueryList, ViewChild } from '@angular/core';
import { map, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { DashboardService, defaultOptions } from './dashboard.service';
import { DashboardGrabHandleDirective } from './grab-handle/grab-handle.directive';
import { DashboardGrabHandleService } from './grab-handle/grab-handle.service';
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(dashboardService, _grabHandleService) {
        var _this = this;
        this.dashboardService = dashboardService;
        this._grabHandleService = _grabHandleService;
        this.isGrabbing = false;
        this.customAriaLabel = this.getDefaultAriaLabel;
        this.layoutChange = new EventEmitter();
        /**
         * Ensure we unsubscribe from all observables
         */
        this._onDestroy = new Subject();
        dashboardService.layout$.pipe(takeUntil(this._onDestroy), tap(function () { return _this.ariaLabel = _this.getAriaLabel(); }))
            .subscribe(function (layout) { return _this.layoutChange.emit(layout); });
        // subscribe to changes to the grab mode
        dashboardService.isGrabbing$.pipe(takeUntil(this._onDestroy), map(function (widget) { return !!widget; }))
            .subscribe(function (isGrabbing) { return _this.isGrabbing = isGrabbing; });
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
        // set the initial dimensions
        this.dashboardService.setDimensions(this.dashboardElement.nativeElement.offsetWidth, this.dashboardElement.nativeElement.offsetHeight);
        // supply the grab handle query list
        this._grabHandleService.setHandles(this.handles);
    };
    /**
     * @return {?}
     */
    DashboardComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
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
    /**
     * @return {?}
     */
    DashboardComponent.prototype.getAriaLabel = /**
     * @return {?}
     */
    function () {
        if (this.customAriaLabel && typeof this.customAriaLabel === 'string') {
            return this.customAriaLabel;
        }
        else if (this.customAriaLabel && typeof this.customAriaLabel === 'function') {
            return this.customAriaLabel(this.dashboardService.widgets, this.dashboardService.options);
        }
        return this.ariaLabel;
    };
    /**
     * @param {?} widgets
     * @param {?} options
     * @return {?}
     */
    DashboardComponent.prototype.getDefaultAriaLabel = /**
     * @param {?} widgets
     * @param {?} options
     * @return {?}
     */
    function (widgets, options) {
        return "Dashboard with " + options.columns + " columns, containing " + widgets.length + " panels. " + widgets.map(this.getWidgetAriaLabel).join(' ');
    };
    /**
     * @param {?} widget
     * @return {?}
     */
    DashboardComponent.prototype.getWidgetAriaLabel = /**
     * @param {?} widget
     * @return {?}
     */
    function (widget) {
        return widget.name + " panel in row " + widget.getRow() + ", column " + widget.getColumn() + ", is " + widget.getColumnSpan() + " columns wide and " + widget.getRowSpan() + " rows high.";
    };
    DashboardComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-dashboard',
                    template: "<div #dashboard class=\"dashboard-container\" [style.height.px]=\"dashboardService.height$ | async\">\n    <div (uxResize)=\"onResize($event)\" [throttle]=\"16\" class=\"dashboard\">\n        <ng-content></ng-content>\n    </div>\n\n    <!-- Wrap with ngIf so we only have one subscription rather than one for each property -->\n    <ng-container *ngIf=\"dashboardService.placeholder$ | async; let placeholder\">\n        <div class=\"position-indicator\"\n            *ngIf=\"placeholder.visible\"\n            [style.left.px]=\"placeholder.x\"\n            [style.top.px]=\"placeholder.y\"\n            [style.width.px]=\"placeholder.width\"\n            [style.height.px]=\"placeholder.height\">\n        </div>\n    </ng-container>\n</div>",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        DashboardService,
                        DashboardGrabHandleService
                    ]
                }] }
    ];
    /** @nocollapse */
    DashboardComponent.ctorParameters = function () { return [
        { type: DashboardService },
        { type: DashboardGrabHandleService }
    ]; };
    DashboardComponent.propDecorators = {
        customAriaLabel: [{ type: Input, args: ['aria-label',] }],
        layout: [{ type: Input }],
        options: [{ type: Input }],
        layoutChange: [{ type: Output }],
        ariaLabel: [{ type: HostBinding, args: ['attr.aria-label',] }],
        dashboardElement: [{ type: ViewChild, args: ['dashboard',] }],
        handles: [{ type: ContentChildren, args: [DashboardGrabHandleDirective, { descendants: true },] }]
    };
    return DashboardComponent;
}());
export { DashboardComponent };
function DashboardComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    DashboardComponent.prototype.isGrabbing;
    /** @type {?} */
    DashboardComponent.prototype.customAriaLabel;
    /** @type {?} */
    DashboardComponent.prototype.layoutChange;
    /** @type {?} */
    DashboardComponent.prototype.ariaLabel;
    /** @type {?} */
    DashboardComponent.prototype.dashboardElement;
    /**
     * Find all grab handles used in the dashboard
     * @type {?}
     */
    DashboardComponent.prototype.handles;
    /**
     * Ensure we unsubscribe from all observables
     * @type {?}
     */
    DashboardComponent.prototype._onDestroy;
    /** @type {?} */
    DashboardComponent.prototype.dashboardService;
    /** @type {?} */
    DashboardComponent.prototype._grabHandleService;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFpQix1QkFBdUIsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxTCxPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXZDLE9BQU8sRUFBdUIsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDNUYsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDbkYsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7O0lBd0MzRSw0QkFBbUIsZ0JBQWtDLEVBQVUsa0JBQThDO1FBQTdHLGlCQVFDO1FBUmtCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQTRCOzBCQTFCdkYsS0FBSzsrQkFFaUcsSUFBSSxDQUFDLG1CQUFtQjs0QkFZM0gsSUFBSSxZQUFZLEVBQXlCOzs7OzBCQVU3QyxJQUFJLE9BQU8sRUFBUTtRQUlwQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUksQ0FBQyxZQUFZLEVBQUUsRUFBcEMsQ0FBb0MsQ0FB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LDBCQUFxQixNQUFNLENBQUMsVUFBVSxFQUFFLGdCQUFhLENBQUM7OztnQkFsRjlLLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsY0FBYztvQkFDeEIsbXZCQUF5QztvQkFDekMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLFNBQVMsRUFBRTt3QkFDUCxnQkFBZ0I7d0JBQ2hCLDBCQUEwQjtxQkFDN0I7aUJBQ0o7Ozs7Z0JBYjZCLGdCQUFnQjtnQkFFckMsMEJBQTBCOzs7a0NBZ0I5QixLQUFLLFNBQUMsWUFBWTt5QkFFbEIsS0FBSzswQkFNTCxLQUFLOytCQUlMLE1BQU07NEJBRU4sV0FBVyxTQUFDLGlCQUFpQjttQ0FFN0IsU0FBUyxTQUFDLFdBQVc7MEJBR3JCLGVBQWUsU0FBQyw0QkFBNEIsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUU7OzZCQXpDeEU7O1NBa0JhLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0QmluZGluZywgSW5wdXQsIE9uRGVzdHJveSwgT3V0cHV0LCBRdWVyeUxpc3QsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgbWFwLCB0YWtlVW50aWwsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgUmVzaXplRGltZW5zaW9ucyB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvcmVzaXplL3Jlc2l6ZS5zZXJ2aWNlJztcbmltcG9ydCB7IERhc2hib2FyZExheW91dERhdGEsIERhc2hib2FyZFNlcnZpY2UsIGRlZmF1bHRPcHRpb25zIH0gZnJvbSAnLi9kYXNoYm9hcmQuc2VydmljZSc7XG5pbXBvcnQgeyBEYXNoYm9hcmRHcmFiSGFuZGxlRGlyZWN0aXZlIH0gZnJvbSAnLi9ncmFiLWhhbmRsZS9ncmFiLWhhbmRsZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGFzaGJvYXJkR3JhYkhhbmRsZVNlcnZpY2UgfSBmcm9tICcuL2dyYWItaGFuZGxlL2dyYWItaGFuZGxlLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50IH0gZnJvbSAnLi93aWRnZXQvZGFzaGJvYXJkLXdpZGdldC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LWRhc2hib2FyZCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2Rhc2hib2FyZC5jb21wb25lbnQuaHRtbCcsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIERhc2hib2FyZFNlcnZpY2UsXG4gICAgICAgIERhc2hib2FyZEdyYWJIYW5kbGVTZXJ2aWNlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBEYXNoYm9hcmRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgaXNHcmFiYmluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCdhcmlhLWxhYmVsJykgY3VzdG9tQXJpYUxhYmVsOiAod2lkZ2V0czogRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50W10sIG9wdGlvbnM6IERhc2hib2FyZE9wdGlvbnMpID0+IHN0cmluZyB8IHN0cmluZyA9IHRoaXMuZ2V0RGVmYXVsdEFyaWFMYWJlbDtcblxuICAgIEBJbnB1dCgpIHNldCBsYXlvdXQobGF5b3V0OiBEYXNoYm9hcmRMYXlvdXREYXRhW10pIHtcbiAgICAgICAgaWYgKGxheW91dCkge1xuICAgICAgICAgICAgdGhpcy5kYXNoYm9hcmRTZXJ2aWNlLmxheW91dCQubmV4dChsYXlvdXQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQElucHV0KCkgc2V0IG9wdGlvbnMob3B0aW9uczogRGFzaGJvYXJkT3B0aW9ucykge1xuICAgICAgICB0aGlzLmRhc2hib2FyZFNlcnZpY2Uub3B0aW9ucyQubmV4dCh7IC4uLmRlZmF1bHRPcHRpb25zLCAuLi5vcHRpb25zIH0pO1xuICAgIH1cblxuICAgIEBPdXRwdXQoKSBsYXlvdXRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPERhc2hib2FyZExheW91dERhdGFbXT4oKTtcblxuICAgIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLWxhYmVsJykgYXJpYUxhYmVsOiBzdHJpbmc7XG5cbiAgICBAVmlld0NoaWxkKCdkYXNoYm9hcmQnKSBkYXNoYm9hcmRFbGVtZW50OiBFbGVtZW50UmVmO1xuXG4gICAgLyoqIEZpbmQgYWxsIGdyYWIgaGFuZGxlcyB1c2VkIGluIHRoZSBkYXNoYm9hcmQgKi9cbiAgICBAQ29udGVudENoaWxkcmVuKERhc2hib2FyZEdyYWJIYW5kbGVEaXJlY3RpdmUsIHsgZGVzY2VuZGFudHM6IHRydWUgfSkgaGFuZGxlczogUXVlcnlMaXN0PERhc2hib2FyZEdyYWJIYW5kbGVEaXJlY3RpdmU+O1xuXG4gICAgLyoqIEVuc3VyZSB3ZSB1bnN1YnNjcmliZSBmcm9tIGFsbCBvYnNlcnZhYmxlcyAqL1xuICAgIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZGFzaGJvYXJkU2VydmljZTogRGFzaGJvYXJkU2VydmljZSwgcHJpdmF0ZSBfZ3JhYkhhbmRsZVNlcnZpY2U6IERhc2hib2FyZEdyYWJIYW5kbGVTZXJ2aWNlKSB7XG5cbiAgICAgICAgZGFzaGJvYXJkU2VydmljZS5sYXlvdXQkLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSksIHRhcCgoKSA9PiB0aGlzLmFyaWFMYWJlbCA9IHRoaXMuZ2V0QXJpYUxhYmVsKCkpKVxuICAgICAgICAgICAgLnN1YnNjcmliZShsYXlvdXQgPT4gdGhpcy5sYXlvdXRDaGFuZ2UuZW1pdChsYXlvdXQpKTtcblxuICAgICAgICAvLyBzdWJzY3JpYmUgdG8gY2hhbmdlcyB0byB0aGUgZ3JhYiBtb2RlXG4gICAgICAgIGRhc2hib2FyZFNlcnZpY2UuaXNHcmFiYmluZyQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSwgbWFwKHdpZGdldCA9PiAhIXdpZGdldCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGlzR3JhYmJpbmcgPT4gdGhpcy5pc0dyYWJiaW5nID0gaXNHcmFiYmluZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBpbml0aWFsIGRpbWVuc2lvbnNcbiAgICAgKi9cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIC8vIHNldCB0aGUgaW5pdGlhbCBkaW1lbnNpb25zXG4gICAgICAgIHRoaXMuZGFzaGJvYXJkU2VydmljZS5zZXREaW1lbnNpb25zKHRoaXMuZGFzaGJvYXJkRWxlbWVudC5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoLCB0aGlzLmRhc2hib2FyZEVsZW1lbnQubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQpO1xuXG4gICAgICAgIC8vIHN1cHBseSB0aGUgZ3JhYiBoYW5kbGUgcXVlcnkgbGlzdFxuICAgICAgICB0aGlzLl9ncmFiSGFuZGxlU2VydmljZS5zZXRIYW5kbGVzKHRoaXMuaGFuZGxlcyk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIG9uUmVzaXplKGV2ZW50OiBSZXNpemVEaW1lbnNpb25zKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGFzaGJvYXJkU2VydmljZS5zZXREaW1lbnNpb25zKGV2ZW50LndpZHRoLCBldmVudC5oZWlnaHQpO1xuICAgIH1cblxuICAgIGdldEFyaWFMYWJlbCgpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5jdXN0b21BcmlhTGFiZWwgJiYgdHlwZW9mIHRoaXMuY3VzdG9tQXJpYUxhYmVsID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3VzdG9tQXJpYUxhYmVsO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3VzdG9tQXJpYUxhYmVsICYmIHR5cGVvZiB0aGlzLmN1c3RvbUFyaWFMYWJlbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3VzdG9tQXJpYUxhYmVsKHRoaXMuZGFzaGJvYXJkU2VydmljZS53aWRnZXRzLCB0aGlzLmRhc2hib2FyZFNlcnZpY2Uub3B0aW9ucyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5hcmlhTGFiZWw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXREZWZhdWx0QXJpYUxhYmVsKHdpZGdldHM6IERhc2hib2FyZFdpZGdldENvbXBvbmVudFtdLCBvcHRpb25zOiBEYXNoYm9hcmRPcHRpb25zKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGBEYXNoYm9hcmQgd2l0aCAke29wdGlvbnMuY29sdW1uc30gY29sdW1ucywgY29udGFpbmluZyAke3dpZGdldHMubGVuZ3RofSBwYW5lbHMuICR7d2lkZ2V0cy5tYXAodGhpcy5nZXRXaWRnZXRBcmlhTGFiZWwpLmpvaW4oJyAnKX1gO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0V2lkZ2V0QXJpYUxhYmVsKHdpZGdldDogRGFzaGJvYXJkV2lkZ2V0Q29tcG9uZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3dpZGdldC5uYW1lfSBwYW5lbCBpbiByb3cgJHt3aWRnZXQuZ2V0Um93KCl9LCBjb2x1bW4gJHt3aWRnZXQuZ2V0Q29sdW1uKCl9LCBpcyAke3dpZGdldC5nZXRDb2x1bW5TcGFuKCl9IGNvbHVtbnMgd2lkZSBhbmQgJHt3aWRnZXQuZ2V0Um93U3BhbigpfSByb3dzIGhpZ2guYDtcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGFzaGJvYXJkT3B0aW9ucyB7XG4gICAgY29sdW1ucz86IG51bWJlcjtcbiAgICBwYWRkaW5nPzogbnVtYmVyO1xuICAgIG1pbldpZHRoPzogbnVtYmVyO1xuICAgIG1pbkhlaWdodD86IG51bWJlcjtcbiAgICByb3dIZWlnaHQ/OiBudW1iZXI7XG4gICAgZW1wdHlSb3c/OiBib29sZWFuO1xufSJdfQ==