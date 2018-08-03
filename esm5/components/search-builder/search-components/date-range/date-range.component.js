/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BaseSearchComponent } from '../base-search.component';
var SearchDateRangeComponent = /** @class */ (function (_super) {
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
                }] }
    ];
    return SearchDateRangeComponent;
}(BaseSearchComponent));
export { SearchDateRangeComponent };
function SearchDateRangeComponent_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1yYW5nZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9zZWFyY2gtYnVpbGRlci9zZWFyY2gtY29tcG9uZW50cy9kYXRlLXJhbmdlL2RhdGUtcmFuZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7SUFNakIsb0RBQW1COzs7cUJBRTlDLFlBQVk7OztJQUUzQixzQkFBSSwyQ0FBSzs7OztRQUFUO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1NBQzVCOzs7T0FBQTtJQUVELHNCQUFJLDBDQUFJOzs7O1FBQVI7O1lBR0ksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7YUFDMUI7O1lBR0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLFlBQVksSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQzVDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDL0M7WUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7U0FDMUI7Ozs7O1FBRUQsVUFBUyxTQUFjOztZQUduQixxQkFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFD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QU84QyxtQkFBbUI7U0FBcEQsd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCYXNlU2VhcmNoQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS1zZWFyY2guY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1zZWFyY2gtZGF0ZS1yYW5nZScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2RhdGUtcmFuZ2UuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaERhdGVSYW5nZUNvbXBvbmVudCBleHRlbmRzIEJhc2VTZWFyY2hDb21wb25lbnQge1xuXG4gICAgdHlwZTogc3RyaW5nID0gJ2RhdGUtcmFuZ2UnO1xuXG4gICAgZ2V0IGxhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5sYWJlbDtcbiAgICB9XG5cbiAgICBnZXQgZnJvbSgpIHtcblxuICAgICAgICAvLyBpZiB2YWx1ZSBkb2VzIG5vdCBleGlzdCB0aGUgc2V0IGl0XG4gICAgICAgIGlmICghdGhpcy52YWx1ZSB8fCAhdGhpcy52YWx1ZS5mcm9tKSB7XG4gICAgICAgICAgICB0aGlzLmZyb20gPSBuZXcgRGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZW5zdXJlIHRoYXQgdGhlIGZyb20gdmFsdWUgaXMgYSBkYXRlIG9iamVjdFxuICAgICAgICBpZiAodGhpcy52YWx1ZS5mcm9tIGluc3RhbmNlb2YgRGF0ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUuZnJvbSA9IG5ldyBEYXRlKHRoaXMudmFsdWUuZnJvbSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZS5mcm9tO1xuICAgIH1cblxuICAgIHNldCBmcm9tKGZyb21WYWx1ZTogYW55KSB7XG5cbiAgICAgICAgLy8gY3JlYXRlIG5ldyBvYmplY3QgYmFzZWQgb24gdGhlIGN1cnJlbnQgdmFsdWVcbiAgICAgICAgY29uc3QgdmFsdWUgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnZhbHVlKTtcblxuICAgICAgICAvLyBlbnN1cmUgdGhhdCB0aGUgZnJvbSB2YWx1ZSBpcyBhIGRhdGVcbiAgICAgICAgaWYgKGZyb21WYWx1ZSBpbnN0YW5jZW9mIERhdGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBmcm9tVmFsdWUgPSBuZXcgRGF0ZShmcm9tVmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2V0IHRoZSBsYXRlc3QgdmFsdWVcbiAgICAgICAgdmFsdWUuZnJvbSA9IGZyb21WYWx1ZTtcblxuICAgICAgICAvLyB1cGRhdGUgdGhlIHZhbHVlIG9iamVjdCB3aGlsZSBlbnN1cmluZyBpbW11dGFiaWxpdHlcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCB0bygpIHtcblxuICAgICAgICAvLyBpZiB2YWx1ZSBkb2VzIG5vdCBleGlzdCB0aGUgc2V0IGl0XG4gICAgICAgIGlmICghdGhpcy52YWx1ZSB8fCAhdGhpcy52YWx1ZS50bykge1xuICAgICAgICAgICAgdGhpcy50byA9IG5ldyBEYXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBlbnN1cmUgdGhhdCB0aGUgdG8gdmFsdWUgaXMgYSBkYXRlIG9iamVjdFxuICAgICAgICBpZiAodGhpcy52YWx1ZS50byBpbnN0YW5jZW9mIERhdGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlLnRvID0gbmV3IERhdGUodGhpcy52YWx1ZS50byk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZS50bztcbiAgICB9XG5cbiAgICBzZXQgdG8odG9WYWx1ZTogYW55KSB7XG5cbiAgICAgICAgLy8gY3JlYXRlIG5ldyBvYmplY3QgYmFzZWQgb24gdGhlIGN1cnJlbnQgdmFsdWVcbiAgICAgICAgY29uc3QgdmFsdWUgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnZhbHVlKTtcblxuICAgICAgICAvLyBlbnN1cmUgdGhhdCB0aGUgdG8gdmFsdWUgaXMgYSBkYXRlXG4gICAgICAgIGlmICh0b1ZhbHVlIGluc3RhbmNlb2YgRGF0ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRvVmFsdWUgPSBuZXcgRGF0ZSh0b1ZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNldCB0aGUgbGF0ZXN0IHZhbHVlXG4gICAgICAgIHZhbHVlLnRvID0gdG9WYWx1ZTtcblxuICAgICAgICAvLyB1cGRhdGUgdGhlIHZhbHVlIG9iamVjdCB3aGlsZSBlbnN1cmluZyBpbW11dGFiaWxpdHlcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCBmcm9tTGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmZyb21MYWJlbCB8fCAnRnJvbSc7XG4gICAgfVxuXG4gICAgZ2V0IHRvTGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLnRvTGFiZWwgfHwgJ1RvJztcbiAgICB9XG5cbiAgICBnZXQgZnJvbVBsYWNlaG9sZGVyKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5mcm9tUGxhY2Vob2xkZXI7XG4gICAgfVxuXG4gICAgZ2V0IHRvUGxhY2Vob2xkZXIoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLnRvUGxhY2Vob2xkZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhlIGRlZmF1bHQgdmFsaWRhdGlvblxuICAgICAqL1xuICAgIHZhbGlkYXRlKCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZXJlIGlzIGEgY29uZmlnIHZhbGlkYXRpb24gZnVuY3Rpb25cbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLnZhbGlkYXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybiBzdXBlci52YWxpZGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY3JlYXRlIGNvcGllcyBvZiB0aGUgZGF0ZXMgc28gd2UgY2FuIG1vZGlmeSB0aW1lIHZhbHVlICh0byBpZ25vcmUgaXQpXG4gICAgICAgIGNvbnN0IGZyb20gPSBuZXcgRGF0ZSh0aGlzLnZhbHVlLmZyb20pO1xuICAgICAgICBjb25zdCB0byA9IG5ldyBEYXRlKHRoaXMudmFsdWUudG8pO1xuXG4gICAgICAgIC8vIHNldCB0aGUgdGltZSB0byB0aGUgc2FtZSBzbyB3ZSBkb250IGNvbXBhcmUgaXRcbiAgICAgICAgZnJvbS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICAgICAgdG8uc2V0SG91cnMoMCwgMCwgMCwgMCk7XG5cbiAgICAgICAgLy8gdmFsaWQgaWYgdGhlIGZyb20gZGF0ZSBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gdGhlIHRvIGRhdGVcbiAgICAgICAgdGhpcy52YWxpZCA9IGZyb20gPD0gdG87XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNlYXJjaERhdGVSYW5nZUNvbmZpZyB7XG4gICAgbGFiZWw/OiBzdHJpbmc7XG4gICAgZnJvbUxhYmVsPzogc3RyaW5nO1xuICAgIHRvTGFiZWw/OiBzdHJpbmc7XG4gICAgZnJvbVBsYWNlaG9sZGVyPzogc3RyaW5nO1xuICAgIHRvUGxhY2Vob2xkZXI/OiBzdHJpbmc7XG4gICAgdmFsaWRhdGlvbjogKHZhbHVlOiBhbnkpID0+IGJvb2xlYW47XG59Il19