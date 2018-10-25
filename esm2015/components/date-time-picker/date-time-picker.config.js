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
export class DateTimePickerConfig {
    constructor() {
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
}
DateTimePickerConfig.decorators = [
    { type: Injectable }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci5jb25maWcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXRlLXRpbWUtcGlja2VyL2RhdGUtdGltZS1waWNrZXIuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUEwQixXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUdqSCxNQUFNOzt3QkFFa0IsSUFBSTt3QkFDSixJQUFJOzRCQUNBLElBQUk7MkJBQ0wsS0FBSzs0QkFDSixJQUFJOzRCQUNKLElBQUk7d0JBQ1AsYUFBYTswQkFDYixPQUFPO3lCQUNVLFNBQVM7c0JBQzVCLE1BQU07MkJBQ0QsV0FBVzs7OztZQWJ0QyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBBZGQgYSBjb25maWcgc2VydmljZSB0byBhbGxvdyBhbiBhcHBsaWNhdGlvblxuICogdG8gY3VzdG9taXplIHRoZSBkYXRlIHRpbWUgcGlja2VyIGRlZmF1bHQgc2V0dGluZ3NcbiAqIGFjcm9zcyB0aGUgZW50aXJlIGFwcGxpY2F0aW9uXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgd2Vla2RheXNTaG9ydCwgdGltZXpvbmVzLCBtb250aHMsIERhdGVUaW1lUGlja2VyVGltZXpvbmUsIG1vbnRoc1Nob3J0IH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLnV0aWxzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhdGVUaW1lUGlja2VyQ29uZmlnIHtcblxuICAgIHNob3dEYXRlOiBib29sZWFuID0gdHJ1ZTtcbiAgICBzaG93VGltZTogYm9vbGVhbiA9IHRydWU7XG4gICAgc2hvd1RpbWV6b25lOiBib29sZWFuID0gdHJ1ZTtcbiAgICBzaG93U2Vjb25kczogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHNob3dNZXJpZGlhbjogYm9vbGVhbiA9IHRydWU7XG4gICAgc2hvd1NwaW5uZXJzOiBib29sZWFuID0gdHJ1ZTtcbiAgICB3ZWVrZGF5czogc3RyaW5nW10gPSB3ZWVrZGF5c1Nob3J0O1xuICAgIG5vd0J0blRleHQ6IHN0cmluZyA9ICdUb2RheSc7XG4gICAgdGltZXpvbmVzOiBEYXRlVGltZVBpY2tlclRpbWV6b25lW10gPSB0aW1lem9uZXM7XG4gICAgbW9udGhzOiBzdHJpbmdbXSA9IG1vbnRocztcbiAgICBtb250aHNTaG9ydDogc3RyaW5nW10gPSBtb250aHNTaG9ydDtcbn0iXX0=