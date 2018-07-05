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
FilterContainerComponent.ctorParameters = () => [];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9maWx0ZXJzL2ZpbHRlci1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBbUJ2RSxNQUFNOzt1QkFFMkIsRUFBRTs2QkFFbUIsSUFBSSxZQUFZLEVBQVk7c0JBQ2hDLElBQUksWUFBWSxFQUFlOzs7Ozs7SUFHN0UsU0FBUyxDQUFDLE1BQWM7UUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDekM7Ozs7O0lBRUQsWUFBWSxDQUFDLE1BQWM7UUFDdkIscUJBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sSUFBSSxPQUFPLEtBQUssTUFBTSxDQUFDLENBQUM7UUFFaEUsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3pDO0tBQ0o7Ozs7SUFFRCxTQUFTO1FBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxvQkFBb0IsRUFBRSxDQUFDLENBQUM7S0FDaEQ7OztZQTNDSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7O09BYVA7YUFDTjs7Ozs7d0JBR0ksS0FBSzs2QkFDTCxLQUFLOzhCQUNMLE1BQU07dUJBQ04sTUFBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQ1gsTUFBTTs7OztJQUNGLFlBQW1CLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO0tBQUk7Q0FDeEM7Ozs7O0FBRUQsTUFBTTs7OztJQUNGLFlBQW1CLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO0tBQUk7Q0FDeEM7Ozs7O0FBRUQsTUFBTTtDQUNMIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1maWx0ZXItY29udGFpbmVyJyxcbiAgICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD5cblxuPCEtLSBBZGQgYSBDbGVhciBCdXR0b24gLS0+XG48ZGl2IGNsYXNzPVwiZmlsdGVyLXNlbGVjdGVkLWNsZWFyLWJ1dHRvblwiICpuZ0lmPVwiZmlsdGVycy5sZW5ndGggPiAwXCIgW3V4VG9vbHRpcF09XCJjbGVhclRvb2x0aXAgfHwgJ0NsZWFyIEFsbCdcIiAoY2xpY2spPVwicmVtb3ZlQWxsKClcIj5cblxuICAgIDxzdmcgY2xhc3M9XCJmaWx0ZXItc2VsZWN0ZWQtY2xlYXItZ3JhcGhpY1wiIHdpZHRoPVwiMTlcIiBoZWlnaHQ9XCIxMlwiIHZpZXdCb3g9XCIwIDAgMTkgMTJcIiBzaGFwZS1yZW5kZXJpbmc9XCJnZW9tZXRyaWNQcmVjaXNpb25cIj5cbiAgICAgICAgPHJlY3QgY2xhc3M9XCJsaWdodC1ncmV5XCIgeD1cIjBcIiB5PVwiMlwiIHdpZHRoPVwiN1wiIGhlaWdodD1cIjJcIj48L3JlY3Q+XG4gICAgICAgIDxyZWN0IGNsYXNzPVwiZGFyay1ncmV5XCIgeD1cIjBcIiB5PVwiNVwiIHdpZHRoPVwiOVwiIGhlaWdodD1cIjJcIj48L3JlY3Q+XG4gICAgICAgIDxyZWN0IGNsYXNzPVwibGlnaHQtZ3JleVwiIHg9XCIwXCIgeT1cIjhcIiB3aWR0aD1cIjdcIiBoZWlnaHQ9XCIyXCI+PC9yZWN0PlxuICAgICAgICA8cGF0aCBjbGFzcz1cImRhcmstZ3JleVwiIGQ9XCJNOSwxIGgxIGw5LDkgdjEgaC0xIGwtOSwtOSB2LTEgWlwiPjwvcGF0aD5cbiAgICAgICAgPHBhdGggY2xhc3M9XCJkYXJrLWdyZXlcIiBkPVwiTTksMTEgdi0xIGw5LC05IGgxIHYxIGwtOSw5IGgtMSBaXCI+PC9wYXRoPlxuICAgIDwvc3ZnPlxuXG48L2Rpdj5gXG59KVxuZXhwb3J0IGNsYXNzIEZpbHRlckNvbnRhaW5lckNvbXBvbmVudCB7XG5cbiAgICBASW5wdXQoKSBmaWx0ZXJzOiBGaWx0ZXJbXSA9IFtdO1xuICAgIEBJbnB1dCgpIGNsZWFyVG9vbHRpcDogc3RyaW5nO1xuICAgIEBPdXRwdXQoKSBmaWx0ZXJzQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RmlsdGVyW10+ID0gbmV3IEV2ZW50RW1pdHRlcjxGaWx0ZXJbXT4oKTtcbiAgICBAT3V0cHV0KCkgZXZlbnRzOiBFdmVudEVtaXR0ZXI8RmlsdGVyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxGaWx0ZXJFdmVudD4oKTtcblxuXG4gICAgYWRkRmlsdGVyKGZpbHRlcjogRmlsdGVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZmlsdGVycy5wdXNoKGZpbHRlcik7XG4gICAgICAgIHRoaXMuZXZlbnRzLm5leHQobmV3IEZpbHRlckFkZEV2ZW50KGZpbHRlcikpO1xuICAgICAgICB0aGlzLmZpbHRlcnNDaGFuZ2UuZW1pdCh0aGlzLmZpbHRlcnMpO1xuICAgIH1cblxuICAgIHJlbW92ZUZpbHRlcihmaWx0ZXI6IEZpbHRlcik6IHZvaWQge1xuICAgICAgICBsZXQgaWR4ID0gdGhpcy5maWx0ZXJzLmZpbmRJbmRleChmaWx0ZXJzID0+IGZpbHRlcnMgPT09IGZpbHRlcik7XG5cbiAgICAgICAgaWYgKGlkeCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVycy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLm5leHQobmV3IEZpbHRlclJlbW92ZUV2ZW50KGZpbHRlcikpO1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJzQ2hhbmdlLmVtaXQodGhpcy5maWx0ZXJzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZUFsbCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ldmVudHMubmV4dChuZXcgRmlsdGVyUmVtb3ZlQWxsRXZlbnQoKSk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmlsdGVyIHtcbiAgICBncm91cDogc3RyaW5nO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGluaXRpYWw/OiBib29sZWFuO1xufVxuXG5leHBvcnQgY2xhc3MgRmlsdGVyQWRkRXZlbnQge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBmaWx0ZXI6IEZpbHRlcikge31cbn1cblxuZXhwb3J0IGNsYXNzIEZpbHRlclJlbW92ZUV2ZW50IHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZmlsdGVyOiBGaWx0ZXIpIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBGaWx0ZXJSZW1vdmVBbGxFdmVudCB7XG59XG5cbmV4cG9ydCB0eXBlIEZpbHRlckV2ZW50ID0gRmlsdGVyQWRkRXZlbnQgfCBGaWx0ZXJSZW1vdmVFdmVudCB8IEZpbHRlclJlbW92ZUFsbEV2ZW50OyJdfQ==