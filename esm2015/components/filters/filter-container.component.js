/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
export class FilterContainerComponent {
    constructor() {
        this.filters = [];
        this.filtersChange = new EventEmitter();
        this.events = new EventEmitter();
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    addFilter(filter) {
        this.filters.push(filter);
        this.events.next(new FilterAddEvent(filter));
        this.filtersChange.emit(this.filters);
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    removeFilter(filter) {
        let /** @type {?} */ idx = this.filters.findIndex(filters => filters === filter);
        if (idx !== -1) {
            this.filters.splice(idx, 1);
            this.events.next(new FilterRemoveEvent(filter));
            this.filtersChange.emit(this.filters);
        }
    }
    /**
     * @return {?}
     */
    removeAll() {
        this.events.next(new FilterRemoveAllEvent());
    }
}
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
export class FilterAddEvent {
    /**
     * @param {?} filter
     */
    constructor(filter) {
        this.filter = filter;
    }
}
function FilterAddEvent_tsickle_Closure_declarations() {
    /** @type {?} */
    FilterAddEvent.prototype.filter;
}
export class FilterRemoveEvent {
    /**
     * @param {?} filter
     */
    constructor(filter) {
        this.filter = filter;
    }
}
function FilterRemoveEvent_tsickle_Closure_declarations() {
    /** @type {?} */
    FilterRemoveEvent.prototype.filter;
}
export class FilterRemoveAllEvent {
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9maWx0ZXJzL2ZpbHRlci1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBTXZFLE1BQU07O3VCQUUyQixFQUFFOzZCQUVtQixJQUFJLFlBQVksRUFBWTtzQkFDaEMsSUFBSSxZQUFZLEVBQWU7Ozs7OztJQUc3RSxTQUFTLENBQUMsTUFBYztRQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUN6Qzs7Ozs7SUFFRCxZQUFZLENBQUMsTUFBYztRQUN2QixxQkFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEtBQUssTUFBTSxDQUFDLENBQUM7UUFFaEUsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3pDO0tBQ0o7Ozs7SUFFRCxTQUFTO1FBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxvQkFBb0IsRUFBRSxDQUFDLENBQUM7S0FDaEQ7OztZQTlCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsKzNCQUFnRDthQUNuRDs7O3NCQUdJLEtBQUs7MkJBQ0wsS0FBSzs0QkFDTCxNQUFNO3FCQUNOLE1BQU07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZ0NYLE1BQU07Ozs7SUFDRixZQUFtQixNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtLQUFJO0NBQ3hDOzs7OztBQUVELE1BQU07Ozs7SUFDRixZQUFtQixNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtLQUFJO0NBQ3hDOzs7OztBQUVELE1BQU07Q0FDTCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtZmlsdGVyLWNvbnRhaW5lcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2ZpbHRlci1jb250YWluZXIuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIEZpbHRlckNvbnRhaW5lckNvbXBvbmVudCB7XG5cbiAgICBASW5wdXQoKSBmaWx0ZXJzOiBGaWx0ZXJbXSA9IFtdO1xuICAgIEBJbnB1dCgpIGNsZWFyVG9vbHRpcDogc3RyaW5nO1xuICAgIEBPdXRwdXQoKSBmaWx0ZXJzQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RmlsdGVyW10+ID0gbmV3IEV2ZW50RW1pdHRlcjxGaWx0ZXJbXT4oKTtcbiAgICBAT3V0cHV0KCkgZXZlbnRzOiBFdmVudEVtaXR0ZXI8RmlsdGVyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxGaWx0ZXJFdmVudD4oKTtcblxuXG4gICAgYWRkRmlsdGVyKGZpbHRlcjogRmlsdGVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZmlsdGVycy5wdXNoKGZpbHRlcik7XG4gICAgICAgIHRoaXMuZXZlbnRzLm5leHQobmV3IEZpbHRlckFkZEV2ZW50KGZpbHRlcikpO1xuICAgICAgICB0aGlzLmZpbHRlcnNDaGFuZ2UuZW1pdCh0aGlzLmZpbHRlcnMpO1xuICAgIH1cblxuICAgIHJlbW92ZUZpbHRlcihmaWx0ZXI6IEZpbHRlcik6IHZvaWQge1xuICAgICAgICBsZXQgaWR4ID0gdGhpcy5maWx0ZXJzLmZpbmRJbmRleChmaWx0ZXJzID0+IGZpbHRlcnMgPT09IGZpbHRlcik7XG5cbiAgICAgICAgaWYgKGlkeCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVycy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLm5leHQobmV3IEZpbHRlclJlbW92ZUV2ZW50KGZpbHRlcikpO1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJzQ2hhbmdlLmVtaXQodGhpcy5maWx0ZXJzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZUFsbCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ldmVudHMubmV4dChuZXcgRmlsdGVyUmVtb3ZlQWxsRXZlbnQoKSk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmlsdGVyIHtcbiAgICBncm91cDogc3RyaW5nO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGluaXRpYWw/OiBib29sZWFuO1xufVxuXG5leHBvcnQgY2xhc3MgRmlsdGVyQWRkRXZlbnQge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBmaWx0ZXI6IEZpbHRlcikge31cbn1cblxuZXhwb3J0IGNsYXNzIEZpbHRlclJlbW92ZUV2ZW50IHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZmlsdGVyOiBGaWx0ZXIpIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBGaWx0ZXJSZW1vdmVBbGxFdmVudCB7XG59XG5cbmV4cG9ydCB0eXBlIEZpbHRlckV2ZW50ID0gRmlsdGVyQWRkRXZlbnQgfCBGaWx0ZXJSZW1vdmVFdmVudCB8IEZpbHRlclJlbW92ZUFsbEV2ZW50OyJdfQ==