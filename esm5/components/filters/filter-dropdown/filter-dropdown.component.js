/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { FilterBaseComponent } from '../filter-base/filter-base.component';
var FilterDropdownComponent = (function (_super) {
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
     * @return {?}
     */
    FilterDropdownComponent.prototype.selectFilter = /**
     * @param {?} filter
     * @return {?}
     */
    function (filter) {
        this.removeFilter();
        this.selected = filter;
        this.addFilter(this.selected);
    };
    FilterDropdownComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-filter-dropdown',
                    template: "<div class=\"btn-group\" dropdown>\n    <button dropdownToggle type=\"button\" class=\"filter-dropdown btn dropdown-toggle\" [class.active]=\"selected !== initial\">{{ selected?.title }} \n        <span class=\"hpe-icon hpe-down\"></span>\n    </button>\n    <ul *dropdownMenu class=\"dropdown-menu\" role=\"menu\">\n        <li class=\"dropdown-list-item\" *ngFor=\"let filter of filters\" role=\"menuitem\">\n            <a class=\"dropdown-item\" (click)=\"selectFilter(filter)\">\n                <i class=\"hpe-icon\" [class.hpe-checkmark]=\"filter === selected\"></i>\n                <span class=\"filter-dropdown-title\">{{ filter.name }}</span>\n            </a>\n        </li>\n    </ul>\n</div>",
                },] },
    ];
    /** @nocollapse */
    FilterDropdownComponent.propDecorators = {
        "initial": [{ type: Input },],
    };
    return FilterDropdownComponent;
}(FilterBaseComponent));
export { FilterDropdownComponent };
function FilterDropdownComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FilterDropdownComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FilterDropdownComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    FilterDropdownComponent.propDecorators;
    /** @type {?} */
    FilterDropdownComponent.prototype.initial;
    /** @type {?} */
    FilterDropdownComponent.prototype.selected;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLWRyb3Bkb3duLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2ZpbHRlcnMvZmlsdGVyLWRyb3Bkb3duL2ZpbHRlci1kcm9wZG93bi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQzs7SUFtQjlCLG1EQUFtQjs7Ozs7OztJQU01RCw4Q0FBWTs7O0lBQVo7UUFDSSxpQkFBTSxZQUFZLFlBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztLQUNoQzs7OztJQUVELDBDQUFROzs7SUFBUjtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztLQUNoQzs7Ozs7SUFFRCw4Q0FBWTs7OztJQUFaLFVBQWEsTUFBYztRQUN2QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDakM7O2dCQW5DSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsUUFBUSxFQUFFLG1zQkFZUDtpQkFDTjs7Ozs0QkFHSSxLQUFLOztrQ0F0QlY7RUFvQjZDLG1CQUFtQjtTQUFuRCx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWx0ZXJCYXNlQ29tcG9uZW50IH0gZnJvbSAnLi4vZmlsdGVyLWJhc2UvZmlsdGVyLWJhc2UuY29tcG9uZW50JztcbmltcG9ydCB7IEZpbHRlciB9IGZyb20gJy4uL2ZpbHRlci1jb250YWluZXIuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1maWx0ZXItZHJvcGRvd24nLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiIGRyb3Bkb3duPlxuICAgIDxidXR0b24gZHJvcGRvd25Ub2dnbGUgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiZmlsdGVyLWRyb3Bkb3duIGJ0biBkcm9wZG93bi10b2dnbGVcIiBbY2xhc3MuYWN0aXZlXT1cInNlbGVjdGVkICE9PSBpbml0aWFsXCI+e3sgc2VsZWN0ZWQ/LnRpdGxlIH19IFxuICAgICAgICA8c3BhbiBjbGFzcz1cImhwZS1pY29uIGhwZS1kb3duXCI+PC9zcGFuPlxuICAgIDwvYnV0dG9uPlxuICAgIDx1bCAqZHJvcGRvd25NZW51IGNsYXNzPVwiZHJvcGRvd24tbWVudVwiIHJvbGU9XCJtZW51XCI+XG4gICAgICAgIDxsaSBjbGFzcz1cImRyb3Bkb3duLWxpc3QtaXRlbVwiICpuZ0Zvcj1cImxldCBmaWx0ZXIgb2YgZmlsdGVyc1wiIHJvbGU9XCJtZW51aXRlbVwiPlxuICAgICAgICAgICAgPGEgY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgKGNsaWNrKT1cInNlbGVjdEZpbHRlcihmaWx0ZXIpXCI+XG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJocGUtaWNvblwiIFtjbGFzcy5ocGUtY2hlY2ttYXJrXT1cImZpbHRlciA9PT0gc2VsZWN0ZWRcIj48L2k+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmaWx0ZXItZHJvcGRvd24tdGl0bGVcIj57eyBmaWx0ZXIubmFtZSB9fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9saT5cbiAgICA8L3VsPlxuPC9kaXY+YCxcbn0pXG5leHBvcnQgY2xhc3MgRmlsdGVyRHJvcGRvd25Db21wb25lbnQgZXh0ZW5kcyBGaWx0ZXJCYXNlQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpIGluaXRpYWw6IEZpbHRlcjtcblxuICAgIHNlbGVjdGVkOiBGaWx0ZXI7XG5cbiAgICByZW1vdmVGaWx0ZXIoKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLnJlbW92ZUZpbHRlcih0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuaW5pdGlhbDtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuaW5pdGlhbDtcbiAgICB9XG5cbiAgICBzZWxlY3RGaWx0ZXIoZmlsdGVyOiBGaWx0ZXIpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVGaWx0ZXIoKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGZpbHRlcjtcbiAgICAgICAgdGhpcy5hZGRGaWx0ZXIodGhpcy5zZWxlY3RlZCk7XG4gICAgfVxuXG59Il19