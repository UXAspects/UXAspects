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
                template: `<ng-content></ng-content>

<!-- Add a Clear Button -->
<div class="filter-selected-clear-button" *ngIf="filters.length > 0" [uxTooltip]="clearTooltip || 'Clear All'" (click)="removeAll()">

    <svg class="filter-selected-clear-graphic" width="19" height="12" viewBox="0 0 19 12" shape-rendering="geometricPrecision">
        <rect class="light-grey" x="0" y="2" width="7" height="2"></rect>
        <rect class="dark-grey" x="0" y="5" width="9" height="2"></rect>
        <rect class="light-grey" x="0" y="8" width="7" height="2"></rect>
        <path class="dark-grey" d="M9,1 h1 l9,9 v1 h-1 l-9,-9 v-1 Z"></path>
        <path class="dark-grey" d="M9,11 v-1 l9,-9 h1 v1 l-9,9 h-1 Z"></path>
    </svg>

</div>`
            },] },
];
/** @nocollapse */
FilterContainerComponent.propDecorators = {
    "filters": [{ type: Input },],
    "clearTooltip": [{ type: Input },],
    "filtersChange": [{ type: Output },],
    "events": [{ type: Output },],
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9maWx0ZXJzL2ZpbHRlci1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBbUJ2RSxNQUFNOzt1QkFFMkIsRUFBRTs2QkFFbUIsSUFBSSxZQUFZLEVBQVk7c0JBQ2hDLElBQUksWUFBWSxFQUFlOzs7Ozs7SUFHN0UsU0FBUyxDQUFDLE1BQWM7UUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDekM7Ozs7O0lBRUQsWUFBWSxDQUFDLE1BQWM7UUFDdkIscUJBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sSUFBSSxPQUFPLEtBQUssTUFBTSxDQUFDLENBQUM7UUFFaEUsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3pDO0tBQ0o7Ozs7SUFFRCxTQUFTO1FBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxvQkFBb0IsRUFBRSxDQUFDLENBQUM7S0FDaEQ7OztZQTNDSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7O09BYVA7YUFDTjs7Ozt3QkFHSSxLQUFLOzZCQUNMLEtBQUs7OEJBQ0wsTUFBTTt1QkFDTixNQUFNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWdDWCxNQUFNOzs7O0lBQ0YsWUFBbUIsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7S0FBSTtDQUN4Qzs7Ozs7QUFFRCxNQUFNOzs7O0lBQ0YsWUFBbUIsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7S0FBSTtDQUN4Qzs7Ozs7QUFFRCxNQUFNO0NBQ0wiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LWZpbHRlci1jb250YWluZXInLFxuICAgIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuXG48IS0tIEFkZCBhIENsZWFyIEJ1dHRvbiAtLT5cbjxkaXYgY2xhc3M9XCJmaWx0ZXItc2VsZWN0ZWQtY2xlYXItYnV0dG9uXCIgKm5nSWY9XCJmaWx0ZXJzLmxlbmd0aCA+IDBcIiBbdXhUb29sdGlwXT1cImNsZWFyVG9vbHRpcCB8fCAnQ2xlYXIgQWxsJ1wiIChjbGljayk9XCJyZW1vdmVBbGwoKVwiPlxuXG4gICAgPHN2ZyBjbGFzcz1cImZpbHRlci1zZWxlY3RlZC1jbGVhci1ncmFwaGljXCIgd2lkdGg9XCIxOVwiIGhlaWdodD1cIjEyXCIgdmlld0JveD1cIjAgMCAxOSAxMlwiIHNoYXBlLXJlbmRlcmluZz1cImdlb21ldHJpY1ByZWNpc2lvblwiPlxuICAgICAgICA8cmVjdCBjbGFzcz1cImxpZ2h0LWdyZXlcIiB4PVwiMFwiIHk9XCIyXCIgd2lkdGg9XCI3XCIgaGVpZ2h0PVwiMlwiPjwvcmVjdD5cbiAgICAgICAgPHJlY3QgY2xhc3M9XCJkYXJrLWdyZXlcIiB4PVwiMFwiIHk9XCI1XCIgd2lkdGg9XCI5XCIgaGVpZ2h0PVwiMlwiPjwvcmVjdD5cbiAgICAgICAgPHJlY3QgY2xhc3M9XCJsaWdodC1ncmV5XCIgeD1cIjBcIiB5PVwiOFwiIHdpZHRoPVwiN1wiIGhlaWdodD1cIjJcIj48L3JlY3Q+XG4gICAgICAgIDxwYXRoIGNsYXNzPVwiZGFyay1ncmV5XCIgZD1cIk05LDEgaDEgbDksOSB2MSBoLTEgbC05LC05IHYtMSBaXCI+PC9wYXRoPlxuICAgICAgICA8cGF0aCBjbGFzcz1cImRhcmstZ3JleVwiIGQ9XCJNOSwxMSB2LTEgbDksLTkgaDEgdjEgbC05LDkgaC0xIFpcIj48L3BhdGg+XG4gICAgPC9zdmc+XG5cbjwvZGl2PmBcbn0pXG5leHBvcnQgY2xhc3MgRmlsdGVyQ29udGFpbmVyQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpIGZpbHRlcnM6IEZpbHRlcltdID0gW107XG4gICAgQElucHV0KCkgY2xlYXJUb29sdGlwOiBzdHJpbmc7XG4gICAgQE91dHB1dCgpIGZpbHRlcnNDaGFuZ2U6IEV2ZW50RW1pdHRlcjxGaWx0ZXJbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPEZpbHRlcltdPigpO1xuICAgIEBPdXRwdXQoKSBldmVudHM6IEV2ZW50RW1pdHRlcjxGaWx0ZXJFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEZpbHRlckV2ZW50PigpO1xuXG5cbiAgICBhZGRGaWx0ZXIoZmlsdGVyOiBGaWx0ZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5maWx0ZXJzLnB1c2goZmlsdGVyKTtcbiAgICAgICAgdGhpcy5ldmVudHMubmV4dChuZXcgRmlsdGVyQWRkRXZlbnQoZmlsdGVyKSk7XG4gICAgICAgIHRoaXMuZmlsdGVyc0NoYW5nZS5lbWl0KHRoaXMuZmlsdGVycyk7XG4gICAgfVxuXG4gICAgcmVtb3ZlRmlsdGVyKGZpbHRlcjogRmlsdGVyKTogdm9pZCB7XG4gICAgICAgIGxldCBpZHggPSB0aGlzLmZpbHRlcnMuZmluZEluZGV4KGZpbHRlcnMgPT4gZmlsdGVycyA9PT0gZmlsdGVyKTtcblxuICAgICAgICBpZiAoaWR4ICE9PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgdGhpcy5ldmVudHMubmV4dChuZXcgRmlsdGVyUmVtb3ZlRXZlbnQoZmlsdGVyKSk7XG4gICAgICAgICAgICB0aGlzLmZpbHRlcnNDaGFuZ2UuZW1pdCh0aGlzLmZpbHRlcnMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlQWxsKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmV2ZW50cy5uZXh0KG5ldyBGaWx0ZXJSZW1vdmVBbGxFdmVudCgpKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBGaWx0ZXIge1xuICAgIGdyb3VwOiBzdHJpbmc7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgaW5pdGlhbD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBGaWx0ZXJBZGRFdmVudCB7XG4gICAgY29uc3RydWN0b3IocHVibGljIGZpbHRlcjogRmlsdGVyKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgRmlsdGVyUmVtb3ZlRXZlbnQge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBmaWx0ZXI6IEZpbHRlcikge31cbn1cblxuZXhwb3J0IGNsYXNzIEZpbHRlclJlbW92ZUFsbEV2ZW50IHtcbn1cblxuZXhwb3J0IHR5cGUgRmlsdGVyRXZlbnQgPSBGaWx0ZXJBZGRFdmVudCB8IEZpbHRlclJlbW92ZUV2ZW50IHwgRmlsdGVyUmVtb3ZlQWxsRXZlbnQ7Il19