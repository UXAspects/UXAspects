/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Add a config service to allow an application
 * to customize the date time picker default settings
 * across the entire application
 */
import { Injectable } from '@angular/core';
import { weekdaysShort, timezones, months, monthsShort } from './date-time-picker.utils';
var DateTimePickerConfig = /** @class */ (function () {
    function DateTimePickerConfig() {
        this.showDate = true;
        this.showTime = true;
        this.showTimezone = true;
        this.showSeconds = false;
        this.showMeridian = true;
        this.showSpinners = true;
        this.weekdays = weekdaysShort;
        this.nowBtnText = 'Today';
        this.timezones = timezones;
        this.months = months;
        this.monthsShort = monthsShort;
    }
    DateTimePickerConfig.decorators = [
        { type: Injectable }
    ];
    return DateTimePickerConfig;
}());
export { DateTimePickerConfig };
function DateTimePickerConfig_tsickle_Closure_declarations() {
    /** @type {?} */
    DateTimePickerConfig.prototype.showDate;
    /** @type {?} */
    DateTimePickerConfig.prototype.showTime;
    /** @type {?} */
    DateTimePickerConfig.prototype.showTimezone;
    /** @type {?} */
    DateTimePickerConfig.prototype.showSeconds;
    /** @type {?} */
    DateTimePickerConfig.prototype.showMeridian;
    /** @type {?} */
    DateTimePickerConfig.prototype.showSpinners;
    /** @type {?} */
    DateTimePickerConfig.prototype.weekdays;
    /** @type {?} */
    DateTimePickerConfig.prototype.nowBtnText;
    /** @type {?} */
    DateTimePickerConfig.prototype.timezones;
    /** @type {?} */
    DateTimePickerConfig.prototype.months;
    /** @type {?} */
    DateTimePickerConfig.prototype.monthsShort;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci5jb25maWcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXRlLXRpbWUtcGlja2VyL2RhdGUtdGltZS1waWNrZXIuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUEwQixXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7O3dCQUt6RixJQUFJO3dCQUNKLElBQUk7NEJBQ0EsSUFBSTsyQkFDTCxLQUFLOzRCQUNKLElBQUk7NEJBQ0osSUFBSTt3QkFDUCxhQUFhOzBCQUNiLE9BQU87eUJBQ1UsU0FBUztzQkFDNUIsTUFBTTsyQkFDRCxXQUFXOzs7Z0JBYnRDLFVBQVU7OytCQVRYOztTQVVhLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQWRkIGEgY29uZmlnIHNlcnZpY2UgdG8gYWxsb3cgYW4gYXBwbGljYXRpb25cbiAqIHRvIGN1c3RvbWl6ZSB0aGUgZGF0ZSB0aW1lIHBpY2tlciBkZWZhdWx0IHNldHRpbmdzXG4gKiBhY3Jvc3MgdGhlIGVudGlyZSBhcHBsaWNhdGlvblxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHdlZWtkYXlzU2hvcnQsIHRpbWV6b25lcywgbW9udGhzLCBEYXRlVGltZVBpY2tlclRpbWV6b25lLCBtb250aHNTaG9ydCB9IGZyb20gJy4vZGF0ZS10aW1lLXBpY2tlci51dGlscyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEYXRlVGltZVBpY2tlckNvbmZpZyB7XG5cbiAgICBzaG93RGF0ZTogYm9vbGVhbiA9IHRydWU7XG4gICAgc2hvd1RpbWU6IGJvb2xlYW4gPSB0cnVlO1xuICAgIHNob3dUaW1lem9uZTogYm9vbGVhbiA9IHRydWU7XG4gICAgc2hvd1NlY29uZHM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBzaG93TWVyaWRpYW46IGJvb2xlYW4gPSB0cnVlO1xuICAgIHNob3dTcGlubmVyczogYm9vbGVhbiA9IHRydWU7XG4gICAgd2Vla2RheXM6IHN0cmluZ1tdID0gd2Vla2RheXNTaG9ydDtcbiAgICBub3dCdG5UZXh0OiBzdHJpbmcgPSAnVG9kYXknO1xuICAgIHRpbWV6b25lczogRGF0ZVRpbWVQaWNrZXJUaW1lem9uZVtdID0gdGltZXpvbmVzO1xuICAgIG1vbnRoczogc3RyaW5nW10gPSBtb250aHM7XG4gICAgbW9udGhzU2hvcnQ6IHN0cmluZ1tdID0gbW9udGhzU2hvcnQ7XG59Il19