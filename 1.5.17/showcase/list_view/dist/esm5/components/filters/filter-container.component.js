/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
var FilterContainerComponent = (function () {
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
                },] },
    ];
    /** @nocollapse */
    FilterContainerComponent.ctorParameters = function () { return []; };
    FilterContainerComponent.propDecorators = {
        "filters": [{ type: Input },],
        "clearTooltip": [{ type: Input },],
        "filtersChange": [{ type: Output },],
        "events": [{ type: Output },],
    };
    return FilterContainerComponent;
}());
export { FilterContainerComponent };
function FilterContainerComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FilterContainerComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FilterContainerComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    FilterContainerComponent.propDecorators;
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
var FilterAddEvent = (function () {
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
var FilterRemoveEvent = (function () {
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
var FilterRemoveAllEvent = (function () {
    function FilterRemoveAllEvent() {
    }
    return FilterRemoveAllEvent;
}());
export { FilterRemoveAllEvent };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9maWx0ZXJzL2ZpbHRlci1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7dUJBMkJ0QyxFQUFFOzZCQUVtQixJQUFJLFlBQVksRUFBWTtzQkFDaEMsSUFBSSxZQUFZLEVBQWU7Ozs7OztJQUc3RSw0Q0FBUzs7OztJQUFULFVBQVUsTUFBYztRQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUN6Qzs7Ozs7SUFFRCwrQ0FBWTs7OztJQUFaLFVBQWEsTUFBYztRQUN2QixxQkFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLEtBQUssTUFBTSxFQUFsQixDQUFrQixDQUFDLENBQUM7UUFFaEUsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3pDO0tBQ0o7Ozs7SUFFRCw0Q0FBUzs7O0lBQVQ7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLG9CQUFvQixFQUFFLENBQUMsQ0FBQztLQUNoRDs7Z0JBakRKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixRQUFRLEVBQUUscTNCQW1CSjtpQkFDVDs7Ozs7NEJBR0ksS0FBSztpQ0FDTCxLQUFLO2tDQUNMLE1BQU07MkJBQ04sTUFBTTs7bUNBOUJYOztTQXlCYSx3QkFBd0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQ3JDLElBQUE7SUFDSSx3QkFBbUIsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7S0FBSTt5QkEvRHpDO0lBZ0VDLENBQUE7QUFGRCwwQkFFQzs7Ozs7QUFFRCxJQUFBO0lBQ0ksMkJBQW1CLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO0tBQUk7NEJBbkV6QztJQW9FQyxDQUFBO0FBRkQsNkJBRUM7Ozs7O0FBRUQsSUFBQTs7OytCQXRFQTtJQXVFQyxDQUFBO0FBREQsZ0NBQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LWZpbHRlci1jb250YWluZXInLFxuICAgIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuXG48IS0tIEFkZCBhIENsZWFyIEJ1dHRvbiAtLT5cbjxidXR0b24gY2xhc3M9XCJidG4gYnRuLWxpbmsgYnRuLWljb24gYnRuLXNlY29uZGFyeSBtLWwteHNcIlxuICAgIHRhYmluZGV4PVwiMFwiXG4gICAgYXJpYS1sYWJlbD1cIkNsZWFyIGFsbCBmaWx0ZXJzXCJcbiAgICBpMThuLWFyaWEtbGFiZWxcbiAgICAqbmdJZj1cImZpbHRlcnMubGVuZ3RoID4gMFwiXG4gICAgW3V4VG9vbHRpcF09XCJjbGVhclRvb2x0aXAgfHwgJ0NsZWFyIEFsbCdcIlxuICAgIChjbGljayk9XCJyZW1vdmVBbGwoKVwiPlxuXG4gICAgPHN2ZyBjbGFzcz1cImZpbHRlci1zZWxlY3RlZC1jbGVhci1ncmFwaGljXCIgd2lkdGg9XCIxMDAlXCIgdmlld0JveD1cIjAgMCAxOSAxMlwiIHNoYXBlLXJlbmRlcmluZz1cImdlb21ldHJpY1ByZWNpc2lvblwiPlxuICAgICAgICA8cmVjdCBjbGFzcz1cImxpZ2h0LWdyZXlcIiB4PVwiMFwiIHk9XCIyXCIgd2lkdGg9XCI3XCIgaGVpZ2h0PVwiMlwiPjwvcmVjdD5cbiAgICAgICAgPHJlY3QgY2xhc3M9XCJkYXJrLWdyZXlcIiB4PVwiMFwiIHk9XCI1XCIgd2lkdGg9XCI5XCIgaGVpZ2h0PVwiMlwiPjwvcmVjdD5cbiAgICAgICAgPHJlY3QgY2xhc3M9XCJsaWdodC1ncmV5XCIgeD1cIjBcIiB5PVwiOFwiIHdpZHRoPVwiN1wiIGhlaWdodD1cIjJcIj48L3JlY3Q+XG4gICAgICAgIDxwYXRoIGNsYXNzPVwiZGFyay1ncmV5XCIgZD1cIk05LDEgaDEgbDksOSB2MSBoLTEgbC05LC05IHYtMSBaXCI+PC9wYXRoPlxuICAgICAgICA8cGF0aCBjbGFzcz1cImRhcmstZ3JleVwiIGQ9XCJNOSwxMSB2LTEgbDksLTkgaDEgdjEgbC05LDkgaC0xIFpcIj48L3BhdGg+XG4gICAgPC9zdmc+XG5cbjwvYnV0dG9uPmBcbn0pXG5leHBvcnQgY2xhc3MgRmlsdGVyQ29udGFpbmVyQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpIGZpbHRlcnM6IEZpbHRlcltdID0gW107XG4gICAgQElucHV0KCkgY2xlYXJUb29sdGlwOiBzdHJpbmc7XG4gICAgQE91dHB1dCgpIGZpbHRlcnNDaGFuZ2U6IEV2ZW50RW1pdHRlcjxGaWx0ZXJbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPEZpbHRlcltdPigpO1xuICAgIEBPdXRwdXQoKSBldmVudHM6IEV2ZW50RW1pdHRlcjxGaWx0ZXJFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEZpbHRlckV2ZW50PigpO1xuXG5cbiAgICBhZGRGaWx0ZXIoZmlsdGVyOiBGaWx0ZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5maWx0ZXJzLnB1c2goZmlsdGVyKTtcbiAgICAgICAgdGhpcy5ldmVudHMubmV4dChuZXcgRmlsdGVyQWRkRXZlbnQoZmlsdGVyKSk7XG4gICAgICAgIHRoaXMuZmlsdGVyc0NoYW5nZS5lbWl0KHRoaXMuZmlsdGVycyk7XG4gICAgfVxuXG4gICAgcmVtb3ZlRmlsdGVyKGZpbHRlcjogRmlsdGVyKTogdm9pZCB7XG4gICAgICAgIGxldCBpZHggPSB0aGlzLmZpbHRlcnMuZmluZEluZGV4KGZpbHRlcnMgPT4gZmlsdGVycyA9PT0gZmlsdGVyKTtcblxuICAgICAgICBpZiAoaWR4ICE9PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgdGhpcy5ldmVudHMubmV4dChuZXcgRmlsdGVyUmVtb3ZlRXZlbnQoZmlsdGVyKSk7XG4gICAgICAgICAgICB0aGlzLmZpbHRlcnNDaGFuZ2UuZW1pdCh0aGlzLmZpbHRlcnMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlQWxsKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmV2ZW50cy5uZXh0KG5ldyBGaWx0ZXJSZW1vdmVBbGxFdmVudCgpKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBGaWx0ZXIge1xuICAgIGdyb3VwOiBzdHJpbmc7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgaW5pdGlhbD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBGaWx0ZXJBZGRFdmVudCB7XG4gICAgY29uc3RydWN0b3IocHVibGljIGZpbHRlcjogRmlsdGVyKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgRmlsdGVyUmVtb3ZlRXZlbnQge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBmaWx0ZXI6IEZpbHRlcikge31cbn1cblxuZXhwb3J0IGNsYXNzIEZpbHRlclJlbW92ZUFsbEV2ZW50IHtcbn1cblxuZXhwb3J0IHR5cGUgRmlsdGVyRXZlbnQgPSBGaWx0ZXJBZGRFdmVudCB8IEZpbHRlclJlbW92ZUV2ZW50IHwgRmlsdGVyUmVtb3ZlQWxsRXZlbnQ7Il19