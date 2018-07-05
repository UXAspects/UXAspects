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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9maWx0ZXJzL2ZpbHRlci1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7dUJBcUJ0QyxFQUFFOzZCQUVtQixJQUFJLFlBQVksRUFBWTtzQkFDaEMsSUFBSSxZQUFZLEVBQWU7Ozs7OztJQUc3RSw0Q0FBUzs7OztJQUFULFVBQVUsTUFBYztRQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUN6Qzs7Ozs7SUFFRCwrQ0FBWTs7OztJQUFaLFVBQWEsTUFBYztRQUN2QixxQkFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLEtBQUssTUFBTSxFQUFsQixDQUFrQixDQUFDLENBQUM7UUFFaEUsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3pDO0tBQ0o7Ozs7SUFFRCw0Q0FBUzs7O0lBQVQ7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLG9CQUFvQixFQUFFLENBQUMsQ0FBQztLQUNoRDs7Z0JBM0NKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixRQUFRLEVBQUUsK3dCQWFQO2lCQUNOOzs7Ozs0QkFHSSxLQUFLO2lDQUNMLEtBQUs7a0NBQ0wsTUFBTTsyQkFDTixNQUFNOzttQ0F4Qlg7O1NBbUJhLHdCQUF3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFDckMsSUFBQTtJQUNJLHdCQUFtQixNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtLQUFJO3lCQXpEekM7SUEwREMsQ0FBQTtBQUZELDBCQUVDOzs7OztBQUVELElBQUE7SUFDSSwyQkFBbUIsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7S0FBSTs0QkE3RHpDO0lBOERDLENBQUE7QUFGRCw2QkFFQzs7Ozs7QUFFRCxJQUFBOzs7K0JBaEVBO0lBaUVDLENBQUE7QUFERCxnQ0FDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtZmlsdGVyLWNvbnRhaW5lcicsXG4gICAgdGVtcGxhdGU6IGA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG5cbjwhLS0gQWRkIGEgQ2xlYXIgQnV0dG9uIC0tPlxuPGRpdiBjbGFzcz1cImZpbHRlci1zZWxlY3RlZC1jbGVhci1idXR0b25cIiAqbmdJZj1cImZpbHRlcnMubGVuZ3RoID4gMFwiIFt1eFRvb2x0aXBdPVwiY2xlYXJUb29sdGlwIHx8ICdDbGVhciBBbGwnXCIgKGNsaWNrKT1cInJlbW92ZUFsbCgpXCI+XG5cbiAgICA8c3ZnIGNsYXNzPVwiZmlsdGVyLXNlbGVjdGVkLWNsZWFyLWdyYXBoaWNcIiB3aWR0aD1cIjE5XCIgaGVpZ2h0PVwiMTJcIiB2aWV3Qm94PVwiMCAwIDE5IDEyXCIgc2hhcGUtcmVuZGVyaW5nPVwiZ2VvbWV0cmljUHJlY2lzaW9uXCI+XG4gICAgICAgIDxyZWN0IGNsYXNzPVwibGlnaHQtZ3JleVwiIHg9XCIwXCIgeT1cIjJcIiB3aWR0aD1cIjdcIiBoZWlnaHQ9XCIyXCI+PC9yZWN0PlxuICAgICAgICA8cmVjdCBjbGFzcz1cImRhcmstZ3JleVwiIHg9XCIwXCIgeT1cIjVcIiB3aWR0aD1cIjlcIiBoZWlnaHQ9XCIyXCI+PC9yZWN0PlxuICAgICAgICA8cmVjdCBjbGFzcz1cImxpZ2h0LWdyZXlcIiB4PVwiMFwiIHk9XCI4XCIgd2lkdGg9XCI3XCIgaGVpZ2h0PVwiMlwiPjwvcmVjdD5cbiAgICAgICAgPHBhdGggY2xhc3M9XCJkYXJrLWdyZXlcIiBkPVwiTTksMSBoMSBsOSw5IHYxIGgtMSBsLTksLTkgdi0xIFpcIj48L3BhdGg+XG4gICAgICAgIDxwYXRoIGNsYXNzPVwiZGFyay1ncmV5XCIgZD1cIk05LDExIHYtMSBsOSwtOSBoMSB2MSBsLTksOSBoLTEgWlwiPjwvcGF0aD5cbiAgICA8L3N2Zz5cblxuPC9kaXY+YFxufSlcbmV4cG9ydCBjbGFzcyBGaWx0ZXJDb250YWluZXJDb21wb25lbnQge1xuXG4gICAgQElucHV0KCkgZmlsdGVyczogRmlsdGVyW10gPSBbXTtcbiAgICBASW5wdXQoKSBjbGVhclRvb2x0aXA6IHN0cmluZztcbiAgICBAT3V0cHV0KCkgZmlsdGVyc0NoYW5nZTogRXZlbnRFbWl0dGVyPEZpbHRlcltdPiA9IG5ldyBFdmVudEVtaXR0ZXI8RmlsdGVyW10+KCk7XG4gICAgQE91dHB1dCgpIGV2ZW50czogRXZlbnRFbWl0dGVyPEZpbHRlckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8RmlsdGVyRXZlbnQ+KCk7XG5cblxuICAgIGFkZEZpbHRlcihmaWx0ZXI6IEZpbHRlcik6IHZvaWQge1xuICAgICAgICB0aGlzLmZpbHRlcnMucHVzaChmaWx0ZXIpO1xuICAgICAgICB0aGlzLmV2ZW50cy5uZXh0KG5ldyBGaWx0ZXJBZGRFdmVudChmaWx0ZXIpKTtcbiAgICAgICAgdGhpcy5maWx0ZXJzQ2hhbmdlLmVtaXQodGhpcy5maWx0ZXJzKTtcbiAgICB9XG5cbiAgICByZW1vdmVGaWx0ZXIoZmlsdGVyOiBGaWx0ZXIpOiB2b2lkIHtcbiAgICAgICAgbGV0IGlkeCA9IHRoaXMuZmlsdGVycy5maW5kSW5kZXgoZmlsdGVycyA9PiBmaWx0ZXJzID09PSBmaWx0ZXIpO1xuXG4gICAgICAgIGlmIChpZHggIT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmZpbHRlcnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICB0aGlzLmV2ZW50cy5uZXh0KG5ldyBGaWx0ZXJSZW1vdmVFdmVudChmaWx0ZXIpKTtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyc0NoYW5nZS5lbWl0KHRoaXMuZmlsdGVycyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmVBbGwoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZXZlbnRzLm5leHQobmV3IEZpbHRlclJlbW92ZUFsbEV2ZW50KCkpO1xuICAgIH1cblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZpbHRlciB7XG4gICAgZ3JvdXA6IHN0cmluZztcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBpbml0aWFsPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNsYXNzIEZpbHRlckFkZEV2ZW50IHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZmlsdGVyOiBGaWx0ZXIpIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBGaWx0ZXJSZW1vdmVFdmVudCB7XG4gICAgY29uc3RydWN0b3IocHVibGljIGZpbHRlcjogRmlsdGVyKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgRmlsdGVyUmVtb3ZlQWxsRXZlbnQge1xufVxuXG5leHBvcnQgdHlwZSBGaWx0ZXJFdmVudCA9IEZpbHRlckFkZEV2ZW50IHwgRmlsdGVyUmVtb3ZlRXZlbnQgfCBGaWx0ZXJSZW1vdmVBbGxFdmVudDsiXX0=