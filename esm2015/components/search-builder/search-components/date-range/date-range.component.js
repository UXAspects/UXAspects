/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component } from '@angular/core';
import { BaseSearchComponent } from '../base-search.component';
export class SearchDateRangeComponent extends BaseSearchComponent {
    constructor() {
        super(...arguments);
        this.type = 'date-range';
    }
    /**
     * @return {?}
     */
    get label() {
        return this.config.label;
    }
    /**
     * @return {?}
     */
    get from() {
        // if value does not exist the set it
        if (!this.value || !this.value.from) {
            this.from = new Date();
        }
        // ensure that the from value is a date object
        if (this.value.from instanceof Date === false) {
            this.value.from = new Date(this.value.from);
        }
        return this.value.from;
    }
    /**
     * @param {?} fromValue
     * @return {?}
     */
    set from(fromValue) {
        // create new object based on the current value
        const /** @type {?} */ value = Object.assign({}, this.value);
        // ensure that the from value is a date
        if (fromValue instanceof Date === false) {
            fromValue = new Date(fromValue);
        }
        // set the latest value
        value.from = fromValue;
        // update the value object while ensuring immutability
        this.value = value;
    }
    /**
     * @return {?}
     */
    get to() {
        // if value does not exist the set it
        if (!this.value || !this.value.to) {
            this.to = new Date();
        }
        // ensure that the to value is a date object
        if (this.value.to instanceof Date === false) {
            this.value.to = new Date(this.value.to);
        }
        return this.value.to;
    }
    /**
     * @param {?} toValue
     * @return {?}
     */
    set to(toValue) {
        // create new object based on the current value
        const /** @type {?} */ value = Object.assign({}, this.value);
        // ensure that the to value is a date
        if (toValue instanceof Date === false) {
            toValue = new Date(toValue);
        }
        // set the latest value
        value.to = toValue;
        // update the value object while ensuring immutability
        this.value = value;
    }
    /**
     * @return {?}
     */
    get fromLabel() {
        return this.config.fromLabel || 'From';
    }
    /**
     * @return {?}
     */
    get toLabel() {
        return this.config.toLabel || 'To';
    }
    /**
     * @return {?}
     */
    get fromPlaceholder() {
        return this.config.fromPlaceholder;
    }
    /**
     * @return {?}
     */
    get toPlaceholder() {
        return this.config.toPlaceholder;
    }
    /**
     * Override the default validation
     * @return {?}
     */
    validate() {
        // check if there is a config validation function
        if (this.config.validation) {
            return super.validate();
        }
        // create copies of the dates so we can modify time value (to ignore it)
        const /** @type {?} */ from = new Date(this.value.from);
        const /** @type {?} */ to = new Date(this.value.to);
        // set the time to the same so we dont compare it
        from.setHours(0, 0, 0, 0);
        to.setHours(0, 0, 0, 0);
        // valid if the from date is less than or equal to the to date
        this.valid = from <= to;
    }
}
SearchDateRangeComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-search-date-range',
                template: "<label class=\"form-label\" *ngIf=\"label\">{{ label }}</label>\n\n<div class=\"row\">\n    <div class=\"col-sm-12\">\n        <div class=\"form-inline\" [class.has-error]=\"!valid\">\n\n            <div class=\"form-group p-r-md\">\n                <label class=\"form-label m-r-xs\">{{ fromLabel }}</label>\n\n                <div class=\"input-group date m-nil\">\n                    <span class=\"input-group-addon p-r-xs\" tabindex=\"1\" (click)=\"fromPopover.show()\">\n                        <i class=\"hpe-icon hpe-calendar\" aria-hidden=\"true\"></i>\n                    </span>\n                    <input type=\"text\" #fromPopover=\"ux-popover\" [ngModel]=\"from | date:'dd MMMM yyyy'\"\n                        [uxPopover]=\"fromPopoverTemplate\" placement=\"bottom\" popoverClass=\"date-time-picker-popover\"\n                        class=\"form-control\" aria-label=\"Selected date\" [placeholder]=\"fromPlaceholder\" [focusIf]=\"focus\">\n                </div>\n            </div>\n\n            <div class=\"form-group p-r-xs\">\n                <label class=\"form-label m-r-xs\">{{ toLabel }}</label>\n\n                <div class=\"input-group date m-nil\">\n                    <span class=\"input-group-addon\" tabindex=\"1\" (click)=\"toPopover.show()\">\n                        <i class=\"hpe-icon hpe-calendar\" aria-hidden=\"true\"></i>\n                    </span>\n                    <input type=\"text\" #toPopover=\"ux-popover\" [ngModel]=\"to | date:'dd MMMM yyyy'\"\n                        [uxPopover]=\"toPopoverTemplate\" placement=\"bottom\" popoverClass=\"date-time-picker-popover\"\n                        class=\"form-control\" aria-label=\"Selected date\" [placeholder]=\"toPlaceholder\">\n                </div>\n            </div>\n\n        </div>\n    </div>\n</div>\n\n<ng-template #fromPopoverTemplate>\n    <ux-date-time-picker [(date)]=\"from\" [showTime]=\"false\"></ux-date-time-picker>\n</ng-template>\n\n<ng-template #toPopoverTemplate>\n    <ux-date-time-picker [(date)]=\"to\" [showTime]=\"false\"></ux-date-time-picker>\n</ng-template>"
            }] }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1yYW5nZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9zZWFyY2gtYnVpbGRlci9zZWFyY2gtY29tcG9uZW50cy9kYXRlLXJhbmdlL2RhdGUtcmFuZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBTS9ELE1BQU0sK0JBQWdDLFNBQVEsbUJBQW1COzs7b0JBRTlDLFlBQVk7Ozs7O0lBRTNCLElBQUksS0FBSztRQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztLQUM1Qjs7OztJQUVELElBQUksSUFBSTs7UUFHSixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1NBQzFCOztRQUdELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxZQUFZLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDL0M7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7S0FDMUI7Ozs7O0lBRUQsSUFBSSxJQUFJLENBQUMsU0FBYzs7UUFHbkIsdUJBQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7UUFHNUMsRUFBRSxDQUFDLENBQUMsU0FBUyxZQUFZLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLFNBQVMsR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNuQzs7UUFHRCxLQUFLLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQzs7UUFHdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7S0FDdEI7Ozs7SUFFRCxJQUFJLEVBQUU7O1FBR0YsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztTQUN4Qjs7UUFHRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsWUFBWSxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzNDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO0tBQ3hCOzs7OztJQUVELElBQUksRUFBRSxDQUFDLE9BQVk7O1FBR2YsdUJBQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7UUFHNUMsRUFBRSxDQUFDLENBQUMsT0FBTyxZQUFZLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLE9BQU8sR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUMvQjs7UUFHRCxLQUFLLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQzs7UUFHbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7S0FDdEI7Ozs7SUFFRCxJQUFJLFNBQVM7UUFDVCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDO0tBQzFDOzs7O0lBRUQsSUFBSSxPQUFPO1FBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQztLQUN0Qzs7OztJQUVELElBQUksZUFBZTtRQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQztLQUN0Qzs7OztJQUVELElBQUksYUFBYTtRQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQztLQUNwQzs7Ozs7SUFLRCxRQUFROztRQUdKLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUN6QixNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQzNCOztRQUdELHVCQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLHVCQUFNLEVBQUUsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDOztRQUduQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzFCLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7O1FBR3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztLQUMzQjs7O1lBaEhKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQyw4akVBQTBDO2FBQzdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCYXNlU2VhcmNoQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS1zZWFyY2guY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1zZWFyY2gtZGF0ZS1yYW5nZScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2RhdGUtcmFuZ2UuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaERhdGVSYW5nZUNvbXBvbmVudCBleHRlbmRzIEJhc2VTZWFyY2hDb21wb25lbnQge1xuXG4gICAgdHlwZTogc3RyaW5nID0gJ2RhdGUtcmFuZ2UnO1xuXG4gICAgZ2V0IGxhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5sYWJlbDtcbiAgICB9XG5cbiAgICBnZXQgZnJvbSgpIHtcblxuICAgICAgICAvLyBpZiB2YWx1ZSBkb2VzIG5vdCBleGlzdCB0aGUgc2V0IGl0XG4gICAgICAgIGlmICghdGhpcy52YWx1ZSB8fCAhdGhpcy52YWx1ZS5mcm9tKSB7XG4gICAgICAgICAgICB0aGlzLmZyb20gPSBuZXcgRGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZW5zdXJlIHRoYXQgdGhlIGZyb20gdmFsdWUgaXMgYSBkYXRlIG9iamVjdFxuICAgICAgICBpZiAodGhpcy52YWx1ZS5mcm9tIGluc3RhbmNlb2YgRGF0ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUuZnJvbSA9IG5ldyBEYXRlKHRoaXMudmFsdWUuZnJvbSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZS5mcm9tO1xuICAgIH1cblxuICAgIHNldCBmcm9tKGZyb21WYWx1ZTogYW55KSB7XG5cbiAgICAgICAgLy8gY3JlYXRlIG5ldyBvYmplY3QgYmFzZWQgb24gdGhlIGN1cnJlbnQgdmFsdWVcbiAgICAgICAgY29uc3QgdmFsdWUgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnZhbHVlKTtcblxuICAgICAgICAvLyBlbnN1cmUgdGhhdCB0aGUgZnJvbSB2YWx1ZSBpcyBhIGRhdGVcbiAgICAgICAgaWYgKGZyb21WYWx1ZSBpbnN0YW5jZW9mIERhdGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBmcm9tVmFsdWUgPSBuZXcgRGF0ZShmcm9tVmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2V0IHRoZSBsYXRlc3QgdmFsdWVcbiAgICAgICAgdmFsdWUuZnJvbSA9IGZyb21WYWx1ZTtcblxuICAgICAgICAvLyB1cGRhdGUgdGhlIHZhbHVlIG9iamVjdCB3aGlsZSBlbnN1cmluZyBpbW11dGFiaWxpdHlcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCB0bygpIHtcblxuICAgICAgICAvLyBpZiB2YWx1ZSBkb2VzIG5vdCBleGlzdCB0aGUgc2V0IGl0XG4gICAgICAgIGlmICghdGhpcy52YWx1ZSB8fCAhdGhpcy52YWx1ZS50bykge1xuICAgICAgICAgICAgdGhpcy50byA9IG5ldyBEYXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBlbnN1cmUgdGhhdCB0aGUgdG8gdmFsdWUgaXMgYSBkYXRlIG9iamVjdFxuICAgICAgICBpZiAodGhpcy52YWx1ZS50byBpbnN0YW5jZW9mIERhdGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlLnRvID0gbmV3IERhdGUodGhpcy52YWx1ZS50byk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZS50bztcbiAgICB9XG5cbiAgICBzZXQgdG8odG9WYWx1ZTogYW55KSB7XG5cbiAgICAgICAgLy8gY3JlYXRlIG5ldyBvYmplY3QgYmFzZWQgb24gdGhlIGN1cnJlbnQgdmFsdWVcbiAgICAgICAgY29uc3QgdmFsdWUgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnZhbHVlKTtcblxuICAgICAgICAvLyBlbnN1cmUgdGhhdCB0aGUgdG8gdmFsdWUgaXMgYSBkYXRlXG4gICAgICAgIGlmICh0b1ZhbHVlIGluc3RhbmNlb2YgRGF0ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRvVmFsdWUgPSBuZXcgRGF0ZSh0b1ZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNldCB0aGUgbGF0ZXN0IHZhbHVlXG4gICAgICAgIHZhbHVlLnRvID0gdG9WYWx1ZTtcblxuICAgICAgICAvLyB1cGRhdGUgdGhlIHZhbHVlIG9iamVjdCB3aGlsZSBlbnN1cmluZyBpbW11dGFiaWxpdHlcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCBmcm9tTGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmZyb21MYWJlbCB8fCAnRnJvbSc7XG4gICAgfVxuXG4gICAgZ2V0IHRvTGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLnRvTGFiZWwgfHwgJ1RvJztcbiAgICB9XG5cbiAgICBnZXQgZnJvbVBsYWNlaG9sZGVyKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5mcm9tUGxhY2Vob2xkZXI7XG4gICAgfVxuXG4gICAgZ2V0IHRvUGxhY2Vob2xkZXIoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLnRvUGxhY2Vob2xkZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgdGhlIGRlZmF1bHQgdmFsaWRhdGlvblxuICAgICAqL1xuICAgIHZhbGlkYXRlKCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZXJlIGlzIGEgY29uZmlnIHZhbGlkYXRpb24gZnVuY3Rpb25cbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLnZhbGlkYXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybiBzdXBlci52YWxpZGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY3JlYXRlIGNvcGllcyBvZiB0aGUgZGF0ZXMgc28gd2UgY2FuIG1vZGlmeSB0aW1lIHZhbHVlICh0byBpZ25vcmUgaXQpXG4gICAgICAgIGNvbnN0IGZyb20gPSBuZXcgRGF0ZSh0aGlzLnZhbHVlLmZyb20pO1xuICAgICAgICBjb25zdCB0byA9IG5ldyBEYXRlKHRoaXMudmFsdWUudG8pO1xuXG4gICAgICAgIC8vIHNldCB0aGUgdGltZSB0byB0aGUgc2FtZSBzbyB3ZSBkb250IGNvbXBhcmUgaXRcbiAgICAgICAgZnJvbS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICAgICAgdG8uc2V0SG91cnMoMCwgMCwgMCwgMCk7XG5cbiAgICAgICAgLy8gdmFsaWQgaWYgdGhlIGZyb20gZGF0ZSBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gdGhlIHRvIGRhdGVcbiAgICAgICAgdGhpcy52YWxpZCA9IGZyb20gPD0gdG87XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNlYXJjaERhdGVSYW5nZUNvbmZpZyB7XG4gICAgbGFiZWw/OiBzdHJpbmc7XG4gICAgZnJvbUxhYmVsPzogc3RyaW5nO1xuICAgIHRvTGFiZWw/OiBzdHJpbmc7XG4gICAgZnJvbVBsYWNlaG9sZGVyPzogc3RyaW5nO1xuICAgIHRvUGxhY2Vob2xkZXI/OiBzdHJpbmc7XG4gICAgdmFsaWRhdGlvbjogKHZhbHVlOiBhbnkpID0+IGJvb2xlYW47XG59Il19