/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { filter as rxFilter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { FilterRemoveAllEvent } from '../events/filter-remove-all-event';
import { FilterService } from '../filter.service';
var FilterDropdownComponent = /** @class */ (function () {
    function FilterDropdownComponent(_filterService) {
        var _this = this;
        this._filterService = _filterService;
        /**
         * The list of items to display in the dropdown
         */
        this.filters = [];
        this._onDestroy = new Subject();
        _filterService.events$.pipe(takeUntil(this._onDestroy), rxFilter(function (event) { return event instanceof FilterRemoveAllEvent; }))
            .subscribe(function () { return _this.removeFilter(); });
        // ensure that the current selected filter is still selected when the active filters change
        _filterService.filters$.pipe(takeUntil(this._onDestroy)).subscribe(function (filters) {
            if (_this.selected && filters.indexOf(_this.selected) === -1) {
                _this.removeFilter();
            }
        });
    }
    /**
     * @return {?}
     */
    FilterDropdownComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.selected = this.initial;
        // check to see if any of the filters have been preselected or changes to selected filters
        this._filterService.filters$.pipe(takeUntil(this._onDestroy)).subscribe(function (filters) {
            filters.forEach(function (filter) {
                if (_this.filters.indexOf(filter) !== -1) {
                    _this.selected = filter;
                }
            });
        });
    };
    /**
     * @return {?}
     */
    FilterDropdownComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    /**
     * @param {?} filter
     * @param {?} event
     * @return {?}
     */
    FilterDropdownComponent.prototype.selectFilter = /**
     * @param {?} filter
     * @param {?} event
     * @return {?}
     */
    function (filter, event) {
        this.removeFilter();
        this.selected = filter;
        this._filterService.add(this.selected);
        event.stopPropagation();
        event.preventDefault();
    };
    /**
     * @return {?}
     */
    FilterDropdownComponent.prototype.removeFilter = /**
     * @return {?}
     */
    function () {
        this._filterService.remove(this.selected);
        this.selected = this.initial;
    };
    FilterDropdownComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-filter-dropdown',
                    template: "<div class=\"btn-group\" dropdown [autoClose]=\"true\" #dropdown=\"bs-dropdown\">\n\n    <button\n        type=\"button\"\n        tabindex=\"0\"\n        dropdownToggle\n        uxMenuNavigationToggle\n        #menuNavigationToggle=\"uxMenuNavigationToggle\"\n        [(menuOpen)]=\"dropdown.isOpen\"\n        aria-haspopup=\"true\"\n        [attr.aria-expanded]=\"dropdown.isOpen\"\n        class=\"filter-dropdown btn dropdown-toggle\"\n        [class.active]=\"selected !== initial\">\n        {{ selected?.title }}\n        <span class=\"hpe-icon hpe-down\"></span>\n    </button>\n\n    <ul *dropdownMenu\n        uxMenuNavigation\n        [toggleButton]=\"menuNavigationToggle\"\n        class=\"dropdown-menu\" role=\"menu\">\n\n        <li class=\"dropdown-list-item\"\n            *ngFor=\"let filter of filters\"\n            role=\"none\">\n\n            <a class=\"dropdown-item\"\n                role=\"listitem\"\n                tabindex=\"-1\"\n                uxMenuNavigationItem\n                [attr.aria-selected]=\"filter === selected\"\n                (click)=\"selectFilter(filter, $event); dropdown.hide(); menuNavigationToggle.focus()\"\n                (keydown.enter)=\"selectFilter(filter, $event); dropdown.hide(); menuNavigationToggle.focus()\"\n                (keydown.escape)=\"menuNavigationToggle.focus()\">\n\n                <i class=\"hpe-icon\" [class.hpe-checkmark]=\"filter === selected\"></i>\n                <span class=\"filter-dropdown-title\">{{ filter.name }}</span>\n            </a>\n        </li>\n    </ul>\n</div>"
                }] }
    ];
    /** @nocollapse */
    FilterDropdownComponent.ctorParameters = function () { return [
        { type: FilterService }
    ]; };
    FilterDropdownComponent.propDecorators = {
        filters: [{ type: Input }],
        initial: [{ type: Input }]
    };
    return FilterDropdownComponent;
}());
export { FilterDropdownComponent };
function FilterDropdownComponent_tsickle_Closure_declarations() {
    /**
     * The list of items to display in the dropdown
     * @type {?}
     */
    FilterDropdownComponent.prototype.filters;
    /**
     * Define an initial item to select
     * @type {?}
     */
    FilterDropdownComponent.prototype.initial;
    /** @type {?} */
    FilterDropdownComponent.prototype.selected;
    /** @type {?} */
    FilterDropdownComponent.prototype._onDestroy;
    /** @type {?} */
    FilterDropdownComponent.prototype._filterService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLWRyb3Bkb3duLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2ZpbHRlcnMvZmlsdGVyLWRyb3Bkb3duL2ZpbHRlci1kcm9wZG93bi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUNwRSxPQUFPLEVBQUUsTUFBTSxJQUFJLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMvRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7SUFtQjlDLGlDQUFvQixjQUE2QjtRQUFqRCxpQkFVQztRQVZtQixtQkFBYyxHQUFkLGNBQWMsQ0FBZTs7Ozt1QkFUcEIsRUFBRTswQkFPVixJQUFJLE9BQU8sRUFBUTtRQUdwQyxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssWUFBWSxvQkFBb0IsRUFBckMsQ0FBcUMsQ0FBQyxDQUFDO2FBQzVHLFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFlBQVksRUFBRSxFQUFuQixDQUFtQixDQUFDLENBQUM7O1FBRzFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxPQUFPO1lBQ3RFLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxRQUFRLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6RCxLQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7YUFDdkI7U0FDSixDQUFDLENBQUM7S0FDTjs7OztJQUVELDBDQUFROzs7SUFBUjtRQUFBLGlCQVdDO1FBVkcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDOztRQUc3QixJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLE9BQU87WUFDM0UsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFBLE1BQU07Z0JBQ2xCLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdEMsS0FBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7aUJBQzFCO2FBQ0osQ0FBQyxDQUFDO1NBQ04sQ0FBQyxDQUFDO0tBQ047Ozs7SUFFRCw2Q0FBVzs7O0lBQVg7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDOUI7Ozs7OztJQUVELDhDQUFZOzs7OztJQUFaLFVBQWEsTUFBYyxFQUFFLEtBQWlCO1FBQzFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztRQUN2QixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFdkMsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3hCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUMxQjs7OztJQUVELDhDQUFZOzs7SUFBWjtRQUNJLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7S0FDaEM7O2dCQTFESixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsK2lEQUErQztpQkFDbEQ7Ozs7Z0JBTlEsYUFBYTs7OzBCQVVqQixLQUFLOzBCQUdMLEtBQUs7O2tDQWpCVjs7U0FXYSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZmlsdGVyIGFzIHJ4RmlsdGVyLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IEZpbHRlclJlbW92ZUFsbEV2ZW50IH0gZnJvbSAnLi4vZXZlbnRzL2ZpbHRlci1yZW1vdmUtYWxsLWV2ZW50JztcbmltcG9ydCB7IEZpbHRlclNlcnZpY2UgfSBmcm9tICcuLi9maWx0ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBGaWx0ZXIgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2ZpbHRlci5pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LWZpbHRlci1kcm9wZG93bicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2ZpbHRlci1kcm9wZG93bi5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIEZpbHRlckRyb3Bkb3duQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgLyoqIFRoZSBsaXN0IG9mIGl0ZW1zIHRvIGRpc3BsYXkgaW4gdGhlIGRyb3Bkb3duICovXG4gICAgQElucHV0KCkgZmlsdGVyczogRmlsdGVyW10gPSBbXTtcblxuICAgIC8qKiBEZWZpbmUgYW4gaW5pdGlhbCBpdGVtIHRvIHNlbGVjdCAqL1xuICAgIEBJbnB1dCgpIGluaXRpYWw6IEZpbHRlcjtcblxuICAgIHNlbGVjdGVkOiBGaWx0ZXI7XG5cbiAgICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZmlsdGVyU2VydmljZTogRmlsdGVyU2VydmljZSkge1xuICAgICAgICBfZmlsdGVyU2VydmljZS5ldmVudHMkLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSksIHJ4RmlsdGVyKGV2ZW50ID0+IGV2ZW50IGluc3RhbmNlb2YgRmlsdGVyUmVtb3ZlQWxsRXZlbnQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLnJlbW92ZUZpbHRlcigpKTtcblxuICAgICAgICAvLyBlbnN1cmUgdGhhdCB0aGUgY3VycmVudCBzZWxlY3RlZCBmaWx0ZXIgaXMgc3RpbGwgc2VsZWN0ZWQgd2hlbiB0aGUgYWN0aXZlIGZpbHRlcnMgY2hhbmdlXG4gICAgICAgIF9maWx0ZXJTZXJ2aWNlLmZpbHRlcnMkLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZShmaWx0ZXJzID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkICYmIGZpbHRlcnMuaW5kZXhPZih0aGlzLnNlbGVjdGVkKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUZpbHRlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuaW5pdGlhbDtcblxuICAgICAgICAvLyBjaGVjayB0byBzZWUgaWYgYW55IG9mIHRoZSBmaWx0ZXJzIGhhdmUgYmVlbiBwcmVzZWxlY3RlZCBvciBjaGFuZ2VzIHRvIHNlbGVjdGVkIGZpbHRlcnNcbiAgICAgICAgdGhpcy5fZmlsdGVyU2VydmljZS5maWx0ZXJzJC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoZmlsdGVycyA9PiB7XG4gICAgICAgICAgICBmaWx0ZXJzLmZvckVhY2goZmlsdGVyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5maWx0ZXJzLmluZGV4T2YoZmlsdGVyKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGZpbHRlcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIHNlbGVjdEZpbHRlcihmaWx0ZXI6IEZpbHRlciwgZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVGaWx0ZXIoKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGZpbHRlcjtcbiAgICAgICAgdGhpcy5fZmlsdGVyU2VydmljZS5hZGQodGhpcy5zZWxlY3RlZCk7XG5cbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlRmlsdGVyKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9maWx0ZXJTZXJ2aWNlLnJlbW92ZSh0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuaW5pdGlhbDtcbiAgICB9XG5cbn0iXX0=