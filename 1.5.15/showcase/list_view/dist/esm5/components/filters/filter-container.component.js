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
                    template: "<ng-content></ng-content>\n\n<!-- Add a Clear Button -->\n<div class=\"filter-selected-clear-button\" *ngIf=\"filters.length > 0\" [uxTooltip]=\"clearTooltip || 'Clear All'\" (click)=\"removeAll()\">\n\n    <svg class=\"filter-selected-clear-graphic\" width=\"19\" height=\"12\" viewBox=\"0 0 19 12\" shape-rendering=\"geometricPrecision\">\n        <rect class=\"light-grey\" x=\"0\" y=\"2\" width=\"7\" height=\"2\"></rect>\n        <rect class=\"dark-grey\" x=\"0\" y=\"5\" width=\"9\" height=\"2\"></rect>\n        <rect class=\"light-grey\" x=\"0\" y=\"8\" width=\"7\" height=\"2\"></rect>\n        <path class=\"dark-grey\" d=\"M9,1 h1 l9,9 v1 h-1 l-9,-9 v-1 Z\"></path>\n        <path class=\"dark-grey\" d=\"M9,11 v-1 l9,-9 h1 v1 l-9,9 h-1 Z\"></path>\n    </svg>\n\n</div>"
                },] },
    ];
    /** @nocollapse */
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9maWx0ZXJzL2ZpbHRlci1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7dUJBcUJ0QyxFQUFFOzZCQUVtQixJQUFJLFlBQVksRUFBWTtzQkFDaEMsSUFBSSxZQUFZLEVBQWU7Ozs7OztJQUc3RSw0Q0FBUzs7OztJQUFULFVBQVUsTUFBYztRQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUN6Qzs7Ozs7SUFFRCwrQ0FBWTs7OztJQUFaLFVBQWEsTUFBYztRQUN2QixxQkFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLEtBQUssTUFBTSxFQUFsQixDQUFrQixDQUFDLENBQUM7UUFFaEUsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3pDO0tBQ0o7Ozs7SUFFRCw0Q0FBUzs7O0lBQVQ7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLG9CQUFvQixFQUFFLENBQUMsQ0FBQztLQUNoRDs7Z0JBM0NKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixRQUFRLEVBQUUsK3dCQWFQO2lCQUNOOzs7OzRCQUdJLEtBQUs7aUNBQ0wsS0FBSztrQ0FDTCxNQUFNOzJCQUNOLE1BQU07O21DQXhCWDs7U0FtQmEsd0JBQXdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUNyQyxJQUFBO0lBQ0ksd0JBQW1CLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO0tBQUk7eUJBekR6QztJQTBEQyxDQUFBO0FBRkQsMEJBRUM7Ozs7O0FBRUQsSUFBQTtJQUNJLDJCQUFtQixNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtLQUFJOzRCQTdEekM7SUE4REMsQ0FBQTtBQUZELDZCQUVDOzs7OztBQUVELElBQUE7OzsrQkFoRUE7SUFpRUMsQ0FBQTtBQURELGdDQUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1maWx0ZXItY29udGFpbmVyJyxcbiAgICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50PjwvbmctY29udGVudD5cblxuPCEtLSBBZGQgYSBDbGVhciBCdXR0b24gLS0+XG48ZGl2IGNsYXNzPVwiZmlsdGVyLXNlbGVjdGVkLWNsZWFyLWJ1dHRvblwiICpuZ0lmPVwiZmlsdGVycy5sZW5ndGggPiAwXCIgW3V4VG9vbHRpcF09XCJjbGVhclRvb2x0aXAgfHwgJ0NsZWFyIEFsbCdcIiAoY2xpY2spPVwicmVtb3ZlQWxsKClcIj5cblxuICAgIDxzdmcgY2xhc3M9XCJmaWx0ZXItc2VsZWN0ZWQtY2xlYXItZ3JhcGhpY1wiIHdpZHRoPVwiMTlcIiBoZWlnaHQ9XCIxMlwiIHZpZXdCb3g9XCIwIDAgMTkgMTJcIiBzaGFwZS1yZW5kZXJpbmc9XCJnZW9tZXRyaWNQcmVjaXNpb25cIj5cbiAgICAgICAgPHJlY3QgY2xhc3M9XCJsaWdodC1ncmV5XCIgeD1cIjBcIiB5PVwiMlwiIHdpZHRoPVwiN1wiIGhlaWdodD1cIjJcIj48L3JlY3Q+XG4gICAgICAgIDxyZWN0IGNsYXNzPVwiZGFyay1ncmV5XCIgeD1cIjBcIiB5PVwiNVwiIHdpZHRoPVwiOVwiIGhlaWdodD1cIjJcIj48L3JlY3Q+XG4gICAgICAgIDxyZWN0IGNsYXNzPVwibGlnaHQtZ3JleVwiIHg9XCIwXCIgeT1cIjhcIiB3aWR0aD1cIjdcIiBoZWlnaHQ9XCIyXCI+PC9yZWN0PlxuICAgICAgICA8cGF0aCBjbGFzcz1cImRhcmstZ3JleVwiIGQ9XCJNOSwxIGgxIGw5LDkgdjEgaC0xIGwtOSwtOSB2LTEgWlwiPjwvcGF0aD5cbiAgICAgICAgPHBhdGggY2xhc3M9XCJkYXJrLWdyZXlcIiBkPVwiTTksMTEgdi0xIGw5LC05IGgxIHYxIGwtOSw5IGgtMSBaXCI+PC9wYXRoPlxuICAgIDwvc3ZnPlxuXG48L2Rpdj5gXG59KVxuZXhwb3J0IGNsYXNzIEZpbHRlckNvbnRhaW5lckNvbXBvbmVudCB7XG5cbiAgICBASW5wdXQoKSBmaWx0ZXJzOiBGaWx0ZXJbXSA9IFtdO1xuICAgIEBJbnB1dCgpIGNsZWFyVG9vbHRpcDogc3RyaW5nO1xuICAgIEBPdXRwdXQoKSBmaWx0ZXJzQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RmlsdGVyW10+ID0gbmV3IEV2ZW50RW1pdHRlcjxGaWx0ZXJbXT4oKTtcbiAgICBAT3V0cHV0KCkgZXZlbnRzOiBFdmVudEVtaXR0ZXI8RmlsdGVyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxGaWx0ZXJFdmVudD4oKTtcblxuXG4gICAgYWRkRmlsdGVyKGZpbHRlcjogRmlsdGVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZmlsdGVycy5wdXNoKGZpbHRlcik7XG4gICAgICAgIHRoaXMuZXZlbnRzLm5leHQobmV3IEZpbHRlckFkZEV2ZW50KGZpbHRlcikpO1xuICAgICAgICB0aGlzLmZpbHRlcnNDaGFuZ2UuZW1pdCh0aGlzLmZpbHRlcnMpO1xuICAgIH1cblxuICAgIHJlbW92ZUZpbHRlcihmaWx0ZXI6IEZpbHRlcik6IHZvaWQge1xuICAgICAgICBsZXQgaWR4ID0gdGhpcy5maWx0ZXJzLmZpbmRJbmRleChmaWx0ZXJzID0+IGZpbHRlcnMgPT09IGZpbHRlcik7XG5cbiAgICAgICAgaWYgKGlkeCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVycy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLm5leHQobmV3IEZpbHRlclJlbW92ZUV2ZW50KGZpbHRlcikpO1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJzQ2hhbmdlLmVtaXQodGhpcy5maWx0ZXJzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZUFsbCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ldmVudHMubmV4dChuZXcgRmlsdGVyUmVtb3ZlQWxsRXZlbnQoKSk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmlsdGVyIHtcbiAgICBncm91cDogc3RyaW5nO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGluaXRpYWw/OiBib29sZWFuO1xufVxuXG5leHBvcnQgY2xhc3MgRmlsdGVyQWRkRXZlbnQge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBmaWx0ZXI6IEZpbHRlcikge31cbn1cblxuZXhwb3J0IGNsYXNzIEZpbHRlclJlbW92ZUV2ZW50IHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZmlsdGVyOiBGaWx0ZXIpIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBGaWx0ZXJSZW1vdmVBbGxFdmVudCB7XG59XG5cbmV4cG9ydCB0eXBlIEZpbHRlckV2ZW50ID0gRmlsdGVyQWRkRXZlbnQgfCBGaWx0ZXJSZW1vdmVFdmVudCB8IEZpbHRlclJlbW92ZUFsbEV2ZW50OyJdfQ==