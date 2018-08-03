/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
var FilterContainerComponent = /** @class */ (function () {
    function FilterContainerComponent() {
        this.filters = [];
        this.filtersChange = new EventEmitter();
        this.events = new EventEmitter();
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    FilterContainerComponent.prototype.addFilter = /**
     * @param {?} filter
     * @return {?}
     */
    function (filter) {
        this.filters.push(filter);
        this.events.next(new FilterAddEvent(filter));
        this.filtersChange.emit(this.filters);
    };
    /**
     * @param {?} filter
     * @return {?}
     */
    FilterContainerComponent.prototype.removeFilter = /**
     * @param {?} filter
     * @return {?}
     */
    function (filter) {
        var /** @type {?} */ idx = this.filters.findIndex(function (filters) { return filters === filter; });
        if (idx !== -1) {
            this.filters.splice(idx, 1);
            this.events.next(new FilterRemoveEvent(filter));
            this.filtersChange.emit(this.filters);
        }
    };
    /**
     * @return {?}
     */
    FilterContainerComponent.prototype.removeAll = /**
     * @return {?}
     */
    function () {
        this.events.next(new FilterRemoveAllEvent());
    };
    FilterContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-filter-container',
                    template: "<ng-content></ng-content>\n\n<!-- Add a Clear Button -->\n<button class=\"btn btn-link btn-icon btn-secondary m-l-xs\"\n    tabindex=\"0\"\n    aria-label=\"Clear all filters\"\n    i18n-aria-label\n    *ngIf=\"filters.length > 0\"\n    [uxTooltip]=\"clearTooltip || 'Clear All'\"\n    (click)=\"removeAll()\">\n\n    <svg class=\"filter-selected-clear-graphic\" width=\"100%\" viewBox=\"0 0 19 12\" shape-rendering=\"geometricPrecision\">\n        <rect class=\"light-grey\" x=\"0\" y=\"2\" width=\"7\" height=\"2\"></rect>\n        <rect class=\"dark-grey\" x=\"0\" y=\"5\" width=\"9\" height=\"2\"></rect>\n        <rect class=\"light-grey\" x=\"0\" y=\"8\" width=\"7\" height=\"2\"></rect>\n        <path class=\"dark-grey\" d=\"M9,1 h1 l9,9 v1 h-1 l-9,-9 v-1 Z\"></path>\n        <path class=\"dark-grey\" d=\"M9,11 v-1 l9,-9 h1 v1 l-9,9 h-1 Z\"></path>\n    </svg>\n\n</button>"
                }] }
    ];
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
    /** @type {?} */
    FilterContainerComponent.prototype.filters;
    /** @type {?} */
    FilterContainerComponent.prototype.clearTooltip;
    /** @type {?} */
    FilterContainerComponent.prototype.filtersChange;
    /** @type {?} */
    FilterContainerComponent.prototype.events;
}
/**
 * @record
 */
export function Filter() { }
function Filter_tsickle_Closure_declarations() {
    /** @type {?} */
    Filter.prototype.group;
    /** @type {?} */
    Filter.prototype.title;
    /** @type {?} */
    Filter.prototype.name;
    /** @type {?|undefined} */
    Filter.prototype.initial;
}
var FilterAddEvent = /** @class */ (function () {
    function FilterAddEvent(filter) {
        this.filter = filter;
    }
    return FilterAddEvent;
}());
export { FilterAddEvent };
function FilterAddEvent_tsickle_Closure_declarations() {
    /** @type {?} */
    FilterAddEvent.prototype.filter;
}
var FilterRemoveEvent = /** @class */ (function () {
    function FilterRemoveEvent(filter) {
        this.filter = filter;
    }
    return FilterRemoveEvent;
}());
export { FilterRemoveEvent };
function FilterRemoveEvent_tsickle_Closure_declarations() {
    /** @type {?} */
    FilterRemoveEvent.prototype.filter;
}
var FilterRemoveAllEvent = /** @class */ (function () {
    function FilterRemoveAllEvent() {
    }
    return FilterRemoveAllEvent;
}());
export { FilterRemoveAllEvent };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9maWx0ZXJzL2ZpbHRlci1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7dUJBUXRDLEVBQUU7NkJBRW1CLElBQUksWUFBWSxFQUFZO3NCQUNoQyxJQUFJLFlBQVksRUFBZTs7Ozs7O0lBRzdFLDRDQUFTOzs7O0lBQVQsVUFBVSxNQUFjO1FBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3pDOzs7OztJQUVELCtDQUFZOzs7O0lBQVosVUFBYSxNQUFjO1FBQ3ZCLHFCQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sS0FBSyxNQUFNLEVBQWxCLENBQWtCLENBQUMsQ0FBQztRQUVoRSxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNoRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDekM7S0FDSjs7OztJQUVELDRDQUFTOzs7SUFBVDtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO0tBQ2hEOztnQkE5QkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLCszQkFBZ0Q7aUJBQ25EOzs7MEJBR0ksS0FBSzsrQkFDTCxLQUFLO2dDQUNMLE1BQU07eUJBQ04sTUFBTTs7bUNBWFg7O1NBTWEsd0JBQXdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUNyQyxJQUFBO0lBQ0ksd0JBQW1CLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO0tBQUk7eUJBNUN6QztJQTZDQyxDQUFBO0FBRkQsMEJBRUM7Ozs7O0FBRUQsSUFBQTtJQUNJLDJCQUFtQixNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtLQUFJOzRCQWhEekM7SUFpREMsQ0FBQTtBQUZELDZCQUVDOzs7OztBQUVELElBQUE7OzsrQkFuREE7SUFvREMsQ0FBQTtBQURELGdDQUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1maWx0ZXItY29udGFpbmVyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZmlsdGVyLWNvbnRhaW5lci5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgRmlsdGVyQ29udGFpbmVyQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpIGZpbHRlcnM6IEZpbHRlcltdID0gW107XG4gICAgQElucHV0KCkgY2xlYXJUb29sdGlwOiBzdHJpbmc7XG4gICAgQE91dHB1dCgpIGZpbHRlcnNDaGFuZ2U6IEV2ZW50RW1pdHRlcjxGaWx0ZXJbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPEZpbHRlcltdPigpO1xuICAgIEBPdXRwdXQoKSBldmVudHM6IEV2ZW50RW1pdHRlcjxGaWx0ZXJFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEZpbHRlckV2ZW50PigpO1xuXG5cbiAgICBhZGRGaWx0ZXIoZmlsdGVyOiBGaWx0ZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5maWx0ZXJzLnB1c2goZmlsdGVyKTtcbiAgICAgICAgdGhpcy5ldmVudHMubmV4dChuZXcgRmlsdGVyQWRkRXZlbnQoZmlsdGVyKSk7XG4gICAgICAgIHRoaXMuZmlsdGVyc0NoYW5nZS5lbWl0KHRoaXMuZmlsdGVycyk7XG4gICAgfVxuXG4gICAgcmVtb3ZlRmlsdGVyKGZpbHRlcjogRmlsdGVyKTogdm9pZCB7XG4gICAgICAgIGxldCBpZHggPSB0aGlzLmZpbHRlcnMuZmluZEluZGV4KGZpbHRlcnMgPT4gZmlsdGVycyA9PT0gZmlsdGVyKTtcblxuICAgICAgICBpZiAoaWR4ICE9PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgdGhpcy5ldmVudHMubmV4dChuZXcgRmlsdGVyUmVtb3ZlRXZlbnQoZmlsdGVyKSk7XG4gICAgICAgICAgICB0aGlzLmZpbHRlcnNDaGFuZ2UuZW1pdCh0aGlzLmZpbHRlcnMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlQWxsKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmV2ZW50cy5uZXh0KG5ldyBGaWx0ZXJSZW1vdmVBbGxFdmVudCgpKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBGaWx0ZXIge1xuICAgIGdyb3VwOiBzdHJpbmc7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgaW5pdGlhbD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBGaWx0ZXJBZGRFdmVudCB7XG4gICAgY29uc3RydWN0b3IocHVibGljIGZpbHRlcjogRmlsdGVyKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgRmlsdGVyUmVtb3ZlRXZlbnQge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBmaWx0ZXI6IEZpbHRlcikge31cbn1cblxuZXhwb3J0IGNsYXNzIEZpbHRlclJlbW92ZUFsbEV2ZW50IHtcbn1cblxuZXhwb3J0IHR5cGUgRmlsdGVyRXZlbnQgPSBGaWx0ZXJBZGRFdmVudCB8IEZpbHRlclJlbW92ZUV2ZW50IHwgRmlsdGVyUmVtb3ZlQWxsRXZlbnQ7Il19