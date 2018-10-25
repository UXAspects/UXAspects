/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { FilterService } from './filter.service';
var FilterContainerComponent = /** @class */ (function () {
    function FilterContainerComponent(filterService) {
        var _this = this;
        this.filterService = filterService;
        /**
         * Emit when the active filters chance
         */
        this.filtersChange = new EventEmitter();
        /**
         * Emit when a specific event occurs
         */
        this.events = new EventEmitter();
        /**
         * Unsubscribe from the subscriptions on destroy
         */
        this._onDestroy = new Subject();
        // subscribe to changes to the active filters
        filterService.filters$.pipe(takeUntil(this._onDestroy), distinctUntilChanged())
            .subscribe(function (filters) { return _this.filtersChange.emit(filters); });
        // relay any events to the event emitter
        this.filterService.events$.pipe(takeUntil(this._onDestroy))
            .subscribe(function (event) { return _this.events.emit(event); });
    }
    Object.defineProperty(FilterContainerComponent.prototype, "filters", {
        /** Allow filters to set from outside the component */
        set: /**
         * Allow filters to set from outside the component
         * @param {?} filters
         * @return {?}
         */
        function (filters) { this.filterService.filters$.next(filters); },
        enumerable: true,
        configurable: true
    });
    /** Destroy all subscriptions */
    /**
     * Destroy all subscriptions
     * @return {?}
     */
    FilterContainerComponent.prototype.ngOnDestroy = /**
     * Destroy all subscriptions
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    FilterContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-filter-container',
                    template: "<ng-content></ng-content>\n\n<!-- Add a Clear Button -->\n<button class=\"btn btn-link btn-icon btn-secondary m-l-xs\"\n    tabindex=\"0\"\n    aria-label=\"Clear all filters\"\n    i18n-aria-label\n    *ngIf=\"(filterService.filters$ | async).length > 0\"\n    [uxTooltip]=\"clearTooltip || 'Clear All'\"\n    (click)=\"filterService.removeAll()\">\n\n    <svg class=\"filter-selected-clear-graphic\" width=\"100%\" viewBox=\"0 0 19 12\" shape-rendering=\"geometricPrecision\">\n        <rect class=\"light-grey\" x=\"0\" y=\"2\" width=\"7\" height=\"2\"></rect>\n        <rect class=\"dark-grey\" x=\"0\" y=\"5\" width=\"9\" height=\"2\"></rect>\n        <rect class=\"light-grey\" x=\"0\" y=\"8\" width=\"7\" height=\"2\"></rect>\n        <path class=\"dark-grey\" d=\"M9,1 h1 l9,9 v1 h-1 l-9,-9 v-1 Z\"></path>\n        <path class=\"dark-grey\" d=\"M9,11 v-1 l9,-9 h1 v1 l-9,9 h-1 Z\"></path>\n    </svg>\n\n</button>",
                    providers: [FilterService]
                }] }
    ];
    /** @nocollapse */
    FilterContainerComponent.ctorParameters = function () { return [
        { type: FilterService }
    ]; };
    FilterContainerComponent.propDecorators = {
        filters: [{ type: Input }],
        clearTooltip: [{ type: Input }],
        filtersChange: [{ type: Output }],
        events: [{ type: Output }]
    };
    return FilterContainerComponent;
}());
export { FilterContainerComponent };
function FilterContainerComponent_tsickle_Closure_declarations() {
    /**
     * Define the tooltip text
     * @type {?}
     */
    FilterContainerComponent.prototype.clearTooltip;
    /**
     * Emit when the active filters chance
     * @type {?}
     */
    FilterContainerComponent.prototype.filtersChange;
    /**
     * Emit when a specific event occurs
     * @type {?}
     */
    FilterContainerComponent.prototype.events;
    /**
     * Unsubscribe from the subscriptions on destroy
     * @type {?}
     */
    FilterContainerComponent.prototype._onDestroy;
    /** @type {?} */
    FilterContainerComponent.prototype.filterService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9maWx0ZXJzL2ZpbHRlci1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXZDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7SUF5QjdDLGtDQUFtQixhQUE0QjtRQUEvQyxpQkFTQztRQVRrQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTs7Ozs2QkFSckIsSUFBSSxZQUFZLEVBQVk7Ozs7c0JBR25DLElBQUksWUFBWSxFQUFlOzs7OzBCQUc3QixJQUFJLE9BQU8sRUFBUTs7UUFLcEMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxvQkFBb0IsRUFBRSxDQUFDO2FBQzFFLFNBQVMsQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFoQyxDQUFnQyxDQUFDLENBQUM7O1FBRzVELElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3RELFNBQVMsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUF2QixDQUF1QixDQUFDLENBQUM7S0FDcEQ7SUF2QkQsc0JBQWEsNkNBQU87UUFEcEIsc0RBQXNEOzs7Ozs7UUFDdEQsVUFBcUIsT0FBaUIsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRTs7O09BQUE7SUF5QnRGLGdDQUFnQzs7Ozs7SUFDaEMsOENBQVc7Ozs7SUFBWDtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUM5Qjs7Z0JBckNKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixzNkJBQWdEO29CQUNoRCxTQUFTLEVBQUUsQ0FBRSxhQUFhLENBQUU7aUJBQy9COzs7O2dCQVBRLGFBQWE7OzswQkFXakIsS0FBSzsrQkFHTCxLQUFLO2dDQUdMLE1BQU07eUJBR04sTUFBTTs7bUNBeEJYOztTQVlhLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IEZpbHRlckV2ZW50IH0gZnJvbSAnLi9ldmVudHMvZmlsdGVyLWV2ZW50JztcbmltcG9ydCB7IEZpbHRlclNlcnZpY2UgfSBmcm9tICcuL2ZpbHRlci5zZXJ2aWNlJztcbmltcG9ydCB7IEZpbHRlciB9IGZyb20gJy4vaW50ZXJmYWNlcy9maWx0ZXIuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1maWx0ZXItY29udGFpbmVyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZmlsdGVyLWNvbnRhaW5lci5jb21wb25lbnQuaHRtbCcsXG4gICAgcHJvdmlkZXJzOiBbIEZpbHRlclNlcnZpY2UgXVxufSlcbmV4cG9ydCBjbGFzcyBGaWx0ZXJDb250YWluZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgLyoqIEFsbG93IGZpbHRlcnMgdG8gc2V0IGZyb20gb3V0c2lkZSB0aGUgY29tcG9uZW50ICovXG4gICAgQElucHV0KCkgc2V0IGZpbHRlcnMoZmlsdGVyczogRmlsdGVyW10pIHsgdGhpcy5maWx0ZXJTZXJ2aWNlLmZpbHRlcnMkLm5leHQoZmlsdGVycyk7IH1cblxuICAgIC8qKiBEZWZpbmUgdGhlIHRvb2x0aXAgdGV4dCAqL1xuICAgIEBJbnB1dCgpIGNsZWFyVG9vbHRpcDogc3RyaW5nO1xuXG4gICAgLyoqIEVtaXQgd2hlbiB0aGUgYWN0aXZlIGZpbHRlcnMgY2hhbmNlICovXG4gICAgQE91dHB1dCgpIGZpbHRlcnNDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPEZpbHRlcltdPigpO1xuXG4gICAgLyoqIEVtaXQgd2hlbiBhIHNwZWNpZmljIGV2ZW50IG9jY3VycyAqL1xuICAgIEBPdXRwdXQoKSBldmVudHMgPSBuZXcgRXZlbnRFbWl0dGVyPEZpbHRlckV2ZW50PigpO1xuXG4gICAgLyoqIFVuc3Vic2NyaWJlIGZyb20gdGhlIHN1YnNjcmlwdGlvbnMgb24gZGVzdHJveSAqL1xuICAgIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZmlsdGVyU2VydmljZTogRmlsdGVyU2VydmljZSkge1xuXG4gICAgICAgIC8vIHN1YnNjcmliZSB0byBjaGFuZ2VzIHRvIHRoZSBhY3RpdmUgZmlsdGVyc1xuICAgICAgICBmaWx0ZXJTZXJ2aWNlLmZpbHRlcnMkLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSksIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGZpbHRlcnMgPT4gdGhpcy5maWx0ZXJzQ2hhbmdlLmVtaXQoZmlsdGVycykpO1xuXG4gICAgICAgIC8vIHJlbGF5IGFueSBldmVudHMgdG8gdGhlIGV2ZW50IGVtaXR0ZXJcbiAgICAgICAgdGhpcy5maWx0ZXJTZXJ2aWNlLmV2ZW50cyQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoZXZlbnQgPT4gdGhpcy5ldmVudHMuZW1pdChldmVudCkpO1xuICAgIH1cblxuICAgIC8qKiBEZXN0cm95IGFsbCBzdWJzY3JpcHRpb25zICovXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICAgIH1cbn0iXX0=