/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { FilterBaseComponent } from '../filter-base/filter-base.component';
var FilterDropdownComponent = /** @class */ (function (_super) {
    tslib_1.__extends(FilterDropdownComponent, _super);
    function FilterDropdownComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @return {?}
     */
    FilterDropdownComponent.prototype.removeFilter = /**
     * @return {?}
     */
    function () {
        _super.prototype.removeFilter.call(this, this.selected);
        this.selected = this.initial;
    };
    /**
     * @return {?}
     */
    FilterDropdownComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.selected = this.initial;
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
        this.addFilter(this.selected);
        event.stopPropagation();
        event.preventDefault();
    };
    FilterDropdownComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-filter-dropdown',
                    template: "<div class=\"btn-group\" dropdown [autoClose]=\"true\" #dropdown=\"bs-dropdown\">\n\n    <button\n        type=\"button\"\n        tabindex=\"0\"\n        dropdownToggle\n        uxMenuNavigationToggle\n        #menuNavigationToggle=\"uxMenuNavigationToggle\"\n        [(menuOpen)]=\"dropdown.isOpen\"\n        aria-haspopup=\"true\"\n        [attr.aria-expanded]=\"dropdown.isOpen\"\n        class=\"filter-dropdown btn dropdown-toggle\"\n        [class.active]=\"selected !== initial\">\n        {{ selected?.title }}\n        <span class=\"hpe-icon hpe-down\"></span>\n    </button>\n\n    <ul *dropdownMenu\n        uxMenuNavigation\n        [toggleButton]=\"menuNavigationToggle\"\n        class=\"dropdown-menu\" role=\"menu\">\n\n        <li class=\"dropdown-list-item\"\n            *ngFor=\"let filter of filters\"\n            role=\"none\">\n\n            <a class=\"dropdown-item\"\n                role=\"listitem\"\n                tabindex=\"-1\"\n                uxMenuNavigationItem\n                [attr.aria-selected]=\"filter === selected\"\n                (click)=\"selectFilter(filter, $event); dropdown.hide(); menuNavigationToggle.focus()\"\n                (keydown.enter)=\"selectFilter(filter, $event); dropdown.hide(); menuNavigationToggle.focus()\">\n\n                <i class=\"hpe-icon\" [class.hpe-checkmark]=\"filter === selected\"></i>\n                <span class=\"filter-dropdown-title\">{{ filter.name }}</span>\n            </a>\n        </li>\n    </ul>\n</div>"
                }] }
    ];
    FilterDropdownComponent.propDecorators = {
        initial: [{ type: Input }]
    };
    return FilterDropdownComponent;
}(FilterBaseComponent));
export { FilterDropdownComponent };
function FilterDropdownComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    FilterDropdownComponent.prototype.initial;
    /** @type {?} */
    FilterDropdownComponent.prototype.selected;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLWRyb3Bkb3duLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2ZpbHRlcnMvZmlsdGVyLWRyb3Bkb3duL2ZpbHRlci1kcm9wZG93bi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQzs7SUFPOUIsbURBQW1COzs7Ozs7O0lBTTVELDhDQUFZOzs7SUFBWjtRQUNJLGlCQUFNLFlBQVksWUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO0tBQ2hDOzs7O0lBRUQsMENBQVE7OztJQUFSO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO0tBQ2hDOzs7Ozs7SUFFRCw4Q0FBWTs7Ozs7SUFBWixVQUFhLE1BQWMsRUFBRSxLQUFpQjtRQUMxQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFOUIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3hCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUMxQjs7Z0JBMUJKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5Qiw0K0NBQStDO2lCQUNsRDs7OzBCQUdJLEtBQUs7O2tDQVZWO0VBUTZDLG1CQUFtQjtTQUFuRCx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWx0ZXJCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vZmlsdGVyLWJhc2UvZmlsdGVyLWJhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IEZpbHRlciB9IGZyb20gJy4uL2ZpbHRlci1jb250YWluZXIuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1maWx0ZXItZHJvcGRvd24nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9maWx0ZXItZHJvcGRvd24uY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBGaWx0ZXJEcm9wZG93bkNvbXBvbmVudCBleHRlbmRzIEZpbHRlckJhc2VDb21wb25lbnQge1xuXG4gICAgQElucHV0KCkgaW5pdGlhbDogRmlsdGVyO1xuXG4gICAgc2VsZWN0ZWQ6IEZpbHRlcjtcblxuICAgIHJlbW92ZUZpbHRlcigpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIucmVtb3ZlRmlsdGVyKHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy5pbml0aWFsO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy5pbml0aWFsO1xuICAgIH1cblxuICAgIHNlbGVjdEZpbHRlcihmaWx0ZXI6IEZpbHRlciwgZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVGaWx0ZXIoKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGZpbHRlcjtcbiAgICAgICAgdGhpcy5hZGRGaWx0ZXIodGhpcy5zZWxlY3RlZCk7XG5cbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG59Il19