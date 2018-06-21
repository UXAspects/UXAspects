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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1yYW5nZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9zZWFyY2gtYnVpbGRlci9zZWFyY2gtY29tcG9uZW50cy9kYXRlLXJhbmdlL2RhdGUtcmFuZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7SUE4Q2pCLG9EQUFtQjs7O3FCQUU5QyxZQUFZOzs7SUFFM0Isc0JBQUksMkNBQUs7Ozs7UUFBVDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUM1Qjs7O09BQUE7SUFFRCxzQkFBSSwwQ0FBSTs7OztRQUFSOztZQUdJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO2FBQzFCOztZQUdELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxZQUFZLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUM1QyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQy9DO1lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1NBQzFCOzs7OztRQUVELFVBQVMsU0FBYzs7WUFHbkIscUJBQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FB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ZDs7bUNBOUNEO0VBK0M4QyxtQkFBbUI7U0FBcEQsd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCYXNlU2VhcmNoQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS1zZWFyY2guY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1zZWFyY2gtZGF0ZS1yYW5nZScsXG4gICAgdGVtcGxhdGU6IGA8bGFiZWwgY2xhc3M9XCJmb3JtLWxhYmVsXCIgKm5nSWY9XCJsYWJlbFwiPnt7IGxhYmVsIH19PC9sYWJlbD5cblxuPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMTJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0taW5saW5lXCIgW2NsYXNzLmhhcy1lcnJvcl09XCIhdmFsaWRcIj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgcC1yLW1kXCI+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiZm9ybS1sYWJlbCBtLXIteHNcIj57eyBmcm9tTGFiZWwgfX08L2xhYmVsPlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwIGRhdGUgbS1uaWxcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvbiBwLXIteHNcIiB0YWJpbmRleD1cIjFcIiAoY2xpY2spPVwiZnJvbVBvcG92ZXIuc2hvdygpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImhwZS1pY29uIGhwZS1jYWxlbmRhclwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiAjZnJvbVBvcG92ZXI9XCJ1eC1wb3BvdmVyXCIgW25nTW9kZWxdPVwiZnJvbSB8IGRhdGU6J2RkIE1NTU0geXl5eSdcIiBbdXhQb3BvdmVyXT1cImZyb21Qb3BvdmVyVGVtcGxhdGVcIiBwbGFjZW1lbnQ9XCJib3R0b21cIlxuICAgICAgICAgICAgICAgICAgICAgICAgcG9wb3ZlckNsYXNzPVwiZGF0ZS10aW1lLXBpY2tlci1wb3BvdmVyXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBhcmlhLWxhYmVsPVwiU2VsZWN0ZWQgZGF0ZVwiIFtwbGFjZWhvbGRlcl09XCJmcm9tUGxhY2Vob2xkZXJcIj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBwLXIteHNcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJmb3JtLWxhYmVsIG0tci14c1wiPnt7IHRvTGFiZWwgfX08L2xhYmVsPlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwIGRhdGUgbS1uaWxcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvblwiIHRhYmluZGV4PVwiMVwiIChjbGljayk9XCJ0b1BvcG92ZXIuc2hvdygpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImhwZS1pY29uIGhwZS1jYWxlbmRhclwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiAjdG9Qb3BvdmVyPVwidXgtcG9wb3ZlclwiIFtuZ01vZGVsXT1cInRvIHwgZGF0ZTonZGQgTU1NTSB5eXl5J1wiIFt1eFBvcG92ZXJdPVwidG9Qb3BvdmVyVGVtcGxhdGVcIiBwbGFjZW1lbnQ9XCJib3R0b21cIlxuICAgICAgICAgICAgICAgICAgICAgICAgcG9wb3ZlckNsYXNzPVwiZGF0ZS10aW1lLXBpY2tlci1wb3BvdmVyXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBhcmlhLWxhYmVsPVwiU2VsZWN0ZWQgZGF0ZVwiIFtwbGFjZWhvbGRlcl09XCJ0b1BsYWNlaG9sZGVyXCI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuXG48bmctdGVtcGxhdGUgI2Zyb21Qb3BvdmVyVGVtcGxhdGU+XG4gICAgPHV4LWRhdGUtdGltZS1waWNrZXIgWyhkYXRlKV09XCJmcm9tXCIgW3Nob3dUaW1lXT1cImZhbHNlXCI+PC91eC1kYXRlLXRpbWUtcGlja2VyPlxuPC9uZy10ZW1wbGF0ZT5cblxuPG5nLXRlbXBsYXRlICN0b1BvcG92ZXJUZW1wbGF0ZT5cbiAgICA8dXgtZGF0ZS10aW1lLXBpY2tlciBbKGRhdGUpXT1cInRvXCIgW3Nob3dUaW1lXT1cImZhbHNlXCI+PC91eC1kYXRlLXRpbWUtcGlja2VyPlxuPC9uZy10ZW1wbGF0ZT5gXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaERhdGVSYW5nZUNvbXBvbmVudCBleHRlbmRzIEJhc2VTZWFyY2hDb21wb25lbnQge1xuXG4gICAgdHlwZTogc3RyaW5nID0gJ2RhdGUtcmFuZ2UnO1xuXG4gICAgZ2V0IGxhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5sYWJlbDtcbiAgICB9XG5cbiAgICBnZXQgZnJvbSgpIHtcblxuICAgICAgICAvLyBpZiB2YWx1ZSBkb2VzIG5vdCBleGlzdCB0aGUgc2V0IGl0XG4gICAgICAgIGlmICghdGhpcy52YWx1ZSB8fCAhdGhpcy52YWx1ZS5mcm9tKSB7XG4gICAgICAgICAgICB0aGlzLmZyb20gPSBuZXcgRGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZW5zdXJlIHRoYXQgdGhlIGZyb20gdmFsdWUgaXMgYSBkYXRlIG9iamVjdFxuICAgICAgICBpZiAodGhpcy52YWx1ZS5mcm9tIGluc3RhbmNlb2YgRGF0ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUuZnJvbSA9IG5ldyBEYXRlKHRoaXMudmFsdWUuZnJvbSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZS5mcm9tO1xuICAgIH1cblxuICAgIHNldCBmcm9tKGZyb21WYWx1ZTogYW55KSB7XG5cbiAgICAgICAgLy8gY3JlYXRlIG5ldyBvYmplY3QgYmFzZWQgb24gdGhlIGN1cnJlbnQgdmFsdWVcbiAgICAgICAgY29uc3QgdmFsdWUgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnZhbHVlKTtcblxuICAgICAgICAvLyBlbnN1cmUgdGhhdCB0aGUgZnJvbSB2YWx1ZSBpcyBhIGRhdGVcbiAgICAgICAgaWYgKGZyb21WYWx1ZSBpbnN0YW5jZW9mIERhdGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBmcm9tVmFsdWUgPSBuZXcgRGF0ZShmcm9tVmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2V0IHRoZSBsYXRlc3QgdmFsdWVcbiAgICAgICAgdmFsdWUuZnJvbSA9IGZyb21WYWx1ZTtcblxuICAgICAgICAvLyB1cGRhdGUgdGhlIHZhbHVlIG9iamVjdCB3aGlsZSBlbnN1cmluZyBpbW11dGFiaWxpdHlcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCB0bygpIHtcblxuICAgICAgICAvLyBpZiB2YWx1ZSBkb2VzIG5vdCBleGlzdCB0aGUgc2V0IGl0XG4gICAgICAgIGlmICghdGhpcy52YWx1ZSB8fCAhdGhpcy52YWx1ZS50bykge1xuICAgICAgICAgICAgdGhpcy50byA9IG5ldyBEYXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBlbnN1cmUgdGhhdCB0aGUgdG8gdmFsdWUgaXMgYSBkYXRlIG9iamVjdFxuICAgICAgICBpZiAodGhpcy52YWx1ZS50byBpbnN0YW5jZW9mIERhdGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlLnRvID0gbmV3IERhdGUodGhpcy52YWx1ZS50byk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZS50bztcbiAgICB9XG5cbiAgICBzZXQgdG8odG9WYWx1ZTogYW55KSB7XG5cbiAgICAgICAgLy8gY3JlYXRlIG5ldyBvYmplY3QgYmFzZWQgb24gdGhlIGN1cnJlbnQgdmFsdWVcbiAgICAgICAgY29uc3QgdmFsdWUgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnZhbHVlKTtcblxuICAgICAgICAvLyBlbnN1cmUgdGhhdCB0aGUgdG8gdmFsdWUgaXMgYSBkYXRlXG4gICAgICAgIGlmICh0b1ZhbHVlIGluc3RhbmNlb2YgRGF0ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRvVmFsdWUgPSBuZXcgRGF0ZSh0b1ZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNldCB0aGUgbGF0ZXN0IHZhbHVlXG4gICAgICAgIHZhbHVlLnRvID0gdG9WYWx1ZTtcblxuICAgICAgICAvLyB1cGRhdGUgdGhlIHZhbHVlIG9iamVjdCB3aGlsZSBlbnN1cmluZyBpbW11dGFiaWxpdHlcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCBmcm9tTGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmZyb21MYWJlbCB8fCAnRnJvbSc7XG4gICAgfVxuXG4gICAgZ2V0IHRvTGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLnRvTGFiZWwgfHwgJ1RvJztcbiAgICB9XG5cbiAgICBnZXQgZnJvbVBsYWNlaG9sZGVyKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5mcm9tUGxhY2Vob2xkZXI7XG4gICAgfVxuXG4gICAgZ2V0IHRvUGxhY2Vob2xkZXIoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLnRvUGxhY2Vob2xkZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhlIGRlZmF1bHQgdmFsaWRhdGlvblxuICAgICAqL1xuICAgIHZhbGlkYXRlKCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZXJlIGlzIGEgY29uZmlnIHZhbGlkYXRpb24gZnVuY3Rpb25cbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLnZhbGlkYXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybiBzdXBlci52YWxpZGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY3JlYXRlIGNvcGllcyBvZiB0aGUgZGF0ZXMgc28gd2UgY2FuIG1vZGlmeSB0aW1lIHZhbHVlICh0byBpZ25vcmUgaXQpXG4gICAgICAgIGNvbnN0IGZyb20gPSBuZXcgRGF0ZSh0aGlzLnZhbHVlLmZyb20pO1xuICAgICAgICBjb25zdCB0byA9IG5ldyBEYXRlKHRoaXMudmFsdWUudG8pO1xuXG4gICAgICAgIC8vIHNldCB0aGUgdGltZSB0byB0aGUgc2FtZSBzbyB3ZSBkb250IGNvbXBhcmUgaXRcbiAgICAgICAgZnJvbS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICAgICAgdG8uc2V0SG91cnMoMCwgMCwgMCwgMCk7XG5cbiAgICAgICAgLy8gdmFsaWQgaWYgdGhlIGZyb20gZGF0ZSBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gdGhlIHRvIGRhdGVcbiAgICAgICAgdGhpcy52YWxpZCA9IGZyb20gPD0gdG87XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNlYXJjaERhdGVSYW5nZUNvbmZpZyB7XG4gICAgbGFiZWw/OiBzdHJpbmc7XG4gICAgZnJvbUxhYmVsPzogc3RyaW5nO1xuICAgIHRvTGFiZWw/OiBzdHJpbmc7XG4gICAgZnJvbVBsYWNlaG9sZGVyPzogc3RyaW5nO1xuICAgIHRvUGxhY2Vob2xkZXI/OiBzdHJpbmc7XG4gICAgdmFsaWRhdGlvbjogKHZhbHVlOiBhbnkpID0+IGJvb2xlYW47XG59Il19