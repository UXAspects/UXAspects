/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BaseSearchComponent } from '../base-search.component';
var SearchDateRangeComponent = (function (_super) {
    tslib_1.__extends(SearchDateRangeComponent, _super);
    function SearchDateRangeComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'date-range';
        return _this;
    }
    Object.defineProperty(SearchDateRangeComponent.prototype, "label", {
        get: /**
         * @return {?}
         */
        function () {
            return this.config.label;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchDateRangeComponent.prototype, "from", {
        get: /**
         * @return {?}
         */
        function () {
            // if value does not exist the set it
            if (!this.value || !this.value.from) {
                this.from = new Date();
            }
            // ensure that the from value is a date object
            if (this.value.from instanceof Date === false) {
                this.value.from = new Date(this.value.from);
            }
            return this.value.from;
        },
        set: /**
         * @param {?} fromValue
         * @return {?}
         */
        function (fromValue) {
            // create new object based on the current value
            var /** @type {?} */ value = Object.assign({}, this.value);
            // ensure that the from value is a date
            if (fromValue instanceof Date === false) {
                fromValue = new Date(fromValue);
            }
            // set the latest value
            value.from = fromValue;
            // update the value object while ensuring immutability
            this.value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchDateRangeComponent.prototype, "to", {
        get: /**
         * @return {?}
         */
        function () {
            // if value does not exist the set it
            if (!this.value || !this.value.to) {
                this.to = new Date();
            }
            // ensure that the to value is a date object
            if (this.value.to instanceof Date === false) {
                this.value.to = new Date(this.value.to);
            }
            return this.value.to;
        },
        set: /**
         * @param {?} toValue
         * @return {?}
         */
        function (toValue) {
            // create new object based on the current value
            var /** @type {?} */ value = Object.assign({}, this.value);
            // ensure that the to value is a date
            if (toValue instanceof Date === false) {
                toValue = new Date(toValue);
            }
            // set the latest value
            value.to = toValue;
            // update the value object while ensuring immutability
            this.value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchDateRangeComponent.prototype, "fromLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return this.config.fromLabel || 'From';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchDateRangeComponent.prototype, "toLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return this.config.toLabel || 'To';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchDateRangeComponent.prototype, "fromPlaceholder", {
        get: /**
         * @return {?}
         */
        function () {
            return this.config.fromPlaceholder;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchDateRangeComponent.prototype, "toPlaceholder", {
        get: /**
         * @return {?}
         */
        function () {
            return this.config.toPlaceholder;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Override the default validation
     */
    /**
     * Override the default validation
     * @return {?}
     */
    SearchDateRangeComponent.prototype.validate = /**
     * Override the default validation
     * @return {?}
     */
    function () {
        // check if there is a config validation function
        if (this.config.validation) {
            return _super.prototype.validate.call(this);
        }
        // create copies of the dates so we can modify time value (to ignore it)
        var /** @type {?} */ from = new Date(this.value.from);
        var /** @type {?} */ to = new Date(this.value.to);
        // set the time to the same so we dont compare it
        from.setHours(0, 0, 0, 0);
        to.setHours(0, 0, 0, 0);
        // valid if the from date is less than or equal to the to date
        this.valid = from <= to;
    };
    SearchDateRangeComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-search-date-range',
                    template: "<label class=\"form-label\" *ngIf=\"label\">{{ label }}</label>\n\n<div class=\"row\">\n    <div class=\"col-sm-12\">\n        <div class=\"form-inline\" [class.has-error]=\"!valid\">\n\n            <div class=\"form-group p-r-md\">\n                <label class=\"form-label m-r-xs\">{{ fromLabel }}</label>\n\n                <div class=\"input-group date m-nil\">\n                    <span class=\"input-group-addon p-r-xs\" tabindex=\"1\" (click)=\"fromPopover.show()\">\n                        <i class=\"hpe-icon hpe-calendar\" aria-hidden=\"true\"></i>\n                    </span>\n                    <input type=\"text\" #fromPopover=\"ux-popover\" [ngModel]=\"from | date:'dd MMMM yyyy'\" [uxPopover]=\"fromPopoverTemplate\" placement=\"bottom\"\n                        popoverClass=\"date-time-picker-popover\" class=\"form-control\" aria-label=\"Selected date\" [placeholder]=\"fromPlaceholder\">\n                </div>\n            </div>\n\n            <div class=\"form-group p-r-xs\">\n                <label class=\"form-label m-r-xs\">{{ toLabel }}</label>\n\n                <div class=\"input-group date m-nil\">\n                    <span class=\"input-group-addon\" tabindex=\"1\" (click)=\"toPopover.show()\">\n                        <i class=\"hpe-icon hpe-calendar\" aria-hidden=\"true\"></i>\n                    </span>\n                    <input type=\"text\" #toPopover=\"ux-popover\" [ngModel]=\"to | date:'dd MMMM yyyy'\" [uxPopover]=\"toPopoverTemplate\" placement=\"bottom\"\n                        popoverClass=\"date-time-picker-popover\" class=\"form-control\" aria-label=\"Selected date\" [placeholder]=\"toPlaceholder\">\n                </div>\n            </div>\n\n        </div>\n    </div>\n</div>\n\n<ng-template #fromPopoverTemplate>\n    <ux-date-time-picker [(date)]=\"from\" [showTime]=\"false\"></ux-date-time-picker>\n</ng-template>\n\n<ng-template #toPopoverTemplate>\n    <ux-date-time-picker [(date)]=\"to\" [showTime]=\"false\"></ux-date-time-picker>\n</ng-template>"
                },] },
    ];
    /** @nocollapse */
    SearchDateRangeComponent.ctorParameters = function () { return []; };
    return SearchDateRangeComponent;
}(BaseSearchComponent));
export { SearchDateRangeComponent };
function SearchDateRangeComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    SearchDateRangeComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    SearchDateRangeComponent.ctorParameters;
    /** @type {?} */
    SearchDateRangeComponent.prototype.type;
}
/**
 * @record
 */
export function SearchDateRangeConfig() { }
function SearchDateRangeConfig_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    SearchDateRangeConfig.prototype.label;
    /** @type {?|undefined} */
    SearchDateRangeConfig.prototype.fromLabel;
    /** @type {?|undefined} */
    SearchDateRangeConfig.prototype.toLabel;
    /** @type {?|undefined} */
    SearchDateRangeConfig.prototype.fromPlaceholder;
    /** @type {?|undefined} */
    SearchDateRangeConfig.prototype.toPlaceholder;
    /** @type {?} */
    SearchDateRangeConfig.prototype.validation;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1yYW5nZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9zZWFyY2gtYnVpbGRlci9zZWFyY2gtY29tcG9uZW50cy9kYXRlLXJhbmdlL2RhdGUtcmFuZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7SUE4Q2pCLG9EQUFtQjs7O3FCQUU5QyxZQUFZOzs7SUFFM0Isc0JBQUksMkNBQUs7Ozs7UUFBVDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUM1Qjs7O09BQUE7SUFFRCxzQkFBSSwwQ0FBSTs7OztRQUFSOztZQUdJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO2FBQzFCOztZQUdELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxZQUFZLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUM1QyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQy9DO1lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1NBQzFCOzs7OztRQUVELFVBQVMsU0FBYzs7WUFHbkIscUJBQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FB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ZDs7OzttQ0E5Q0Q7RUErQzhDLG1CQUFtQjtTQUFwRCx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJhc2VTZWFyY2hDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlLXNlYXJjaC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LXNlYXJjaC1kYXRlLXJhbmdlJyxcbiAgICB0ZW1wbGF0ZTogYDxsYWJlbCBjbGFzcz1cImZvcm0tbGFiZWxcIiAqbmdJZj1cImxhYmVsXCI+e3sgbGFiZWwgfX08L2xhYmVsPlxuXG48ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgPGRpdiBjbGFzcz1cImNvbC1zbS0xMlwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1pbmxpbmVcIiBbY2xhc3MuaGFzLWVycm9yXT1cIiF2YWxpZFwiPlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBwLXItbWRcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJmb3JtLWxhYmVsIG0tci14c1wiPnt7IGZyb21MYWJlbCB9fTwvbGFiZWw+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAgZGF0ZSBtLW5pbFwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLWFkZG9uIHAtci14c1wiIHRhYmluZGV4PVwiMVwiIChjbGljayk9XCJmcm9tUG9wb3Zlci5zaG93KClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiaHBlLWljb24gaHBlLWNhbGVuZGFyXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiICNmcm9tUG9wb3Zlcj1cInV4LXBvcG92ZXJcIiBbbmdNb2RlbF09XCJmcm9tIHwgZGF0ZTonZGQgTU1NTSB5eXl5J1wiIFt1eFBvcG92ZXJdPVwiZnJvbVBvcG92ZXJUZW1wbGF0ZVwiIHBsYWNlbWVudD1cImJvdHRvbVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3BvdmVyQ2xhc3M9XCJkYXRlLXRpbWUtcGlja2VyLXBvcG92ZXJcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIGFyaWEtbGFiZWw9XCJTZWxlY3RlZCBkYXRlXCIgW3BsYWNlaG9sZGVyXT1cImZyb21QbGFjZWhvbGRlclwiPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIHAtci14c1wiPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImZvcm0tbGFiZWwgbS1yLXhzXCI+e3sgdG9MYWJlbCB9fTwvbGFiZWw+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAgZGF0ZSBtLW5pbFwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLWFkZG9uXCIgdGFiaW5kZXg9XCIxXCIgKGNsaWNrKT1cInRvUG9wb3Zlci5zaG93KClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiaHBlLWljb24gaHBlLWNhbGVuZGFyXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiICN0b1BvcG92ZXI9XCJ1eC1wb3BvdmVyXCIgW25nTW9kZWxdPVwidG8gfCBkYXRlOidkZCBNTU1NIHl5eXknXCIgW3V4UG9wb3Zlcl09XCJ0b1BvcG92ZXJUZW1wbGF0ZVwiIHBsYWNlbWVudD1cImJvdHRvbVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3BvdmVyQ2xhc3M9XCJkYXRlLXRpbWUtcGlja2VyLXBvcG92ZXJcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIGFyaWEtbGFiZWw9XCJTZWxlY3RlZCBkYXRlXCIgW3BsYWNlaG9sZGVyXT1cInRvUGxhY2Vob2xkZXJcIj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+XG5cbjxuZy10ZW1wbGF0ZSAjZnJvbVBvcG92ZXJUZW1wbGF0ZT5cbiAgICA8dXgtZGF0ZS10aW1lLXBpY2tlciBbKGRhdGUpXT1cImZyb21cIiBbc2hvd1RpbWVdPVwiZmFsc2VcIj48L3V4LWRhdGUtdGltZS1waWNrZXI+XG48L25nLXRlbXBsYXRlPlxuXG48bmctdGVtcGxhdGUgI3RvUG9wb3ZlclRlbXBsYXRlPlxuICAgIDx1eC1kYXRlLXRpbWUtcGlja2VyIFsoZGF0ZSldPVwidG9cIiBbc2hvd1RpbWVdPVwiZmFsc2VcIj48L3V4LWRhdGUtdGltZS1waWNrZXI+XG48L25nLXRlbXBsYXRlPmBcbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoRGF0ZVJhbmdlQ29tcG9uZW50IGV4dGVuZHMgQmFzZVNlYXJjaENvbXBvbmVudCB7XG5cbiAgICB0eXBlOiBzdHJpbmcgPSAnZGF0ZS1yYW5nZSc7XG5cbiAgICBnZXQgbGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmxhYmVsO1xuICAgIH1cblxuICAgIGdldCBmcm9tKCkge1xuXG4gICAgICAgIC8vIGlmIHZhbHVlIGRvZXMgbm90IGV4aXN0IHRoZSBzZXQgaXRcbiAgICAgICAgaWYgKCF0aGlzLnZhbHVlIHx8ICF0aGlzLnZhbHVlLmZyb20pIHtcbiAgICAgICAgICAgIHRoaXMuZnJvbSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBlbnN1cmUgdGhhdCB0aGUgZnJvbSB2YWx1ZSBpcyBhIGRhdGUgb2JqZWN0XG4gICAgICAgIGlmICh0aGlzLnZhbHVlLmZyb20gaW5zdGFuY2VvZiBEYXRlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZS5mcm9tID0gbmV3IERhdGUodGhpcy52YWx1ZS5mcm9tKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlLmZyb207XG4gICAgfVxuXG4gICAgc2V0IGZyb20oZnJvbVZhbHVlOiBhbnkpIHtcblxuICAgICAgICAvLyBjcmVhdGUgbmV3IG9iamVjdCBiYXNlZCBvbiB0aGUgY3VycmVudCB2YWx1ZVxuICAgICAgICBjb25zdCB2YWx1ZSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMudmFsdWUpO1xuXG4gICAgICAgIC8vIGVuc3VyZSB0aGF0IHRoZSBmcm9tIHZhbHVlIGlzIGEgZGF0ZVxuICAgICAgICBpZiAoZnJvbVZhbHVlIGluc3RhbmNlb2YgRGF0ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGZyb21WYWx1ZSA9IG5ldyBEYXRlKGZyb21WYWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzZXQgdGhlIGxhdGVzdCB2YWx1ZVxuICAgICAgICB2YWx1ZS5mcm9tID0gZnJvbVZhbHVlO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgdmFsdWUgb2JqZWN0IHdoaWxlIGVuc3VyaW5nIGltbXV0YWJpbGl0eVxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IHRvKCkge1xuXG4gICAgICAgIC8vIGlmIHZhbHVlIGRvZXMgbm90IGV4aXN0IHRoZSBzZXQgaXRcbiAgICAgICAgaWYgKCF0aGlzLnZhbHVlIHx8ICF0aGlzLnZhbHVlLnRvKSB7XG4gICAgICAgICAgICB0aGlzLnRvID0gbmV3IERhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGVuc3VyZSB0aGF0IHRoZSB0byB2YWx1ZSBpcyBhIGRhdGUgb2JqZWN0XG4gICAgICAgIGlmICh0aGlzLnZhbHVlLnRvIGluc3RhbmNlb2YgRGF0ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUudG8gPSBuZXcgRGF0ZSh0aGlzLnZhbHVlLnRvKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlLnRvO1xuICAgIH1cblxuICAgIHNldCB0byh0b1ZhbHVlOiBhbnkpIHtcblxuICAgICAgICAvLyBjcmVhdGUgbmV3IG9iamVjdCBiYXNlZCBvbiB0aGUgY3VycmVudCB2YWx1ZVxuICAgICAgICBjb25zdCB2YWx1ZSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMudmFsdWUpO1xuXG4gICAgICAgIC8vIGVuc3VyZSB0aGF0IHRoZSB0byB2YWx1ZSBpcyBhIGRhdGVcbiAgICAgICAgaWYgKHRvVmFsdWUgaW5zdGFuY2VvZiBEYXRlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdG9WYWx1ZSA9IG5ldyBEYXRlKHRvVmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2V0IHRoZSBsYXRlc3QgdmFsdWVcbiAgICAgICAgdmFsdWUudG8gPSB0b1ZhbHVlO1xuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgdmFsdWUgb2JqZWN0IHdoaWxlIGVuc3VyaW5nIGltbXV0YWJpbGl0eVxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IGZyb21MYWJlbCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuZnJvbUxhYmVsIHx8ICdGcm9tJztcbiAgICB9XG5cbiAgICBnZXQgdG9MYWJlbCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcudG9MYWJlbCB8fCAnVG8nO1xuICAgIH1cblxuICAgIGdldCBmcm9tUGxhY2Vob2xkZXIoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmZyb21QbGFjZWhvbGRlcjtcbiAgICB9XG5cbiAgICBnZXQgdG9QbGFjZWhvbGRlcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcudG9QbGFjZWhvbGRlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPdmVycmlkZSB0aGUgZGVmYXVsdCB2YWxpZGF0aW9uXG4gICAgICovXG4gICAgdmFsaWRhdGUoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlcmUgaXMgYSBjb25maWcgdmFsaWRhdGlvbiBmdW5jdGlvblxuICAgICAgICBpZiAodGhpcy5jb25maWcudmFsaWRhdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIHN1cGVyLnZhbGlkYXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjcmVhdGUgY29waWVzIG9mIHRoZSBkYXRlcyBzbyB3ZSBjYW4gbW9kaWZ5IHRpbWUgdmFsdWUgKHRvIGlnbm9yZSBpdClcbiAgICAgICAgY29uc3QgZnJvbSA9IG5ldyBEYXRlKHRoaXMudmFsdWUuZnJvbSk7XG4gICAgICAgIGNvbnN0IHRvID0gbmV3IERhdGUodGhpcy52YWx1ZS50byk7XG5cbiAgICAgICAgLy8gc2V0IHRoZSB0aW1lIHRvIHRoZSBzYW1lIHNvIHdlIGRvbnQgY29tcGFyZSBpdFxuICAgICAgICBmcm9tLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgICAgICB0by5zZXRIb3VycygwLCAwLCAwLCAwKTtcblxuICAgICAgICAvLyB2YWxpZCBpZiB0aGUgZnJvbSBkYXRlIGlzIGxlc3MgdGhhbiBvciBlcXVhbCB0byB0aGUgdG8gZGF0ZVxuICAgICAgICB0aGlzLnZhbGlkID0gZnJvbSA8PSB0bztcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VhcmNoRGF0ZVJhbmdlQ29uZmlnIHtcbiAgICBsYWJlbD86IHN0cmluZztcbiAgICBmcm9tTGFiZWw/OiBzdHJpbmc7XG4gICAgdG9MYWJlbD86IHN0cmluZztcbiAgICBmcm9tUGxhY2Vob2xkZXI/OiBzdHJpbmc7XG4gICAgdG9QbGFjZWhvbGRlcj86IHN0cmluZztcbiAgICB2YWxpZGF0aW9uOiAodmFsdWU6IGFueSkgPT4gYm9vbGVhbjtcbn0iXX0=