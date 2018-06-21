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
import { weekdaysShort } from './date-time-picker.utils';
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
        this.timezones = [
            { name: 'GMT-11', offset: 660 },
            { name: 'GMT-10', offset: 600 },
            { name: 'GMT-9', offset: 540 },
            { name: 'GMT-8', offset: 480 },
            { name: 'GMT-7', offset: 420 },
            { name: 'GMT-6', offset: 360 },
            { name: 'GMT-5', offset: 300 },
            { name: 'GMT-4', offset: 240 },
            { name: 'GMT-3', offset: 180 },
            { name: 'GMT-2', offset: 120 },
            { name: 'GMT-1', offset: 60 },
            { name: 'GMT', offset: 0 },
            { name: 'GMT+1', offset: -60 },
            { name: 'GMT+2', offset: -120 },
            { name: 'GMT+3', offset: -180 },
            { name: 'GMT+4', offset: -240 },
            { name: 'GMT+5', offset: -300 },
            { name: 'GMT+6', offset: -360 },
            { name: 'GMT+7', offset: -420 },
            { name: 'GMT+8', offset: -480 },
            { name: 'GMT+9', offset: -540 },
            { name: 'GMT+10', offset: -600 },
            { name: 'GMT+11', offset: -660 },
            { name: 'GMT+12', offset: -720 }
        ];
    }
}
DateTimePickerConfig.decorators = [
    { type: Injectable },
];
function DateTimePickerConfig_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    DateTimePickerConfig.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    DateTimePickerConfig.ctorParameters;
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
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci5jb25maWcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXRlLXRpbWUtcGlja2VyL2RhdGUtdGltZS1waWNrZXIuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBSXpELE1BQU07O3dCQUVrQixJQUFJO3dCQUNKLElBQUk7NEJBQ0EsSUFBSTsyQkFDTCxLQUFLOzRCQUNKLElBQUk7NEJBQ0osSUFBSTt3QkFDUCxhQUFhOzBCQUNiLE9BQU87eUJBRVU7WUFDbEMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUU7WUFDL0IsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUU7WUFDL0IsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUU7WUFDOUIsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUU7WUFDOUIsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUU7WUFDOUIsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUU7WUFDOUIsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUU7WUFDOUIsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUU7WUFDOUIsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUU7WUFDOUIsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUU7WUFDOUIsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7WUFDN0IsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUU7WUFDMUIsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM5QixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFO1lBQy9CLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUU7WUFDL0IsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRTtZQUMvQixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFO1lBQy9CLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUU7WUFDL0IsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRTtZQUMvQixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFO1lBQy9CLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUU7WUFDL0IsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRTtZQUNoQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFO1lBQ2hDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUU7U0FDbkM7Ozs7WUFyQ0osVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQWRkIGEgY29uZmlnIHNlcnZpY2UgdG8gYWxsb3cgYW4gYXBwbGljYXRpb25cbiAqIHRvIGN1c3RvbWl6ZSB0aGUgZGF0ZSB0aW1lIHBpY2tlciBkZWZhdWx0IHNldHRpbmdzXG4gKiBhY3Jvc3MgdGhlIGVudGlyZSBhcHBsaWNhdGlvblxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHdlZWtkYXlzU2hvcnQgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXIudXRpbHMnO1xuaW1wb3J0IHsgRGF0ZVRpbWVQaWNrZXJUaW1lem9uZSB9IGZyb20gJy4vZGF0ZS10aW1lLXBpY2tlci5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhdGVUaW1lUGlja2VyQ29uZmlnIHtcblxuICAgIHNob3dEYXRlOiBib29sZWFuID0gdHJ1ZTtcbiAgICBzaG93VGltZTogYm9vbGVhbiA9IHRydWU7XG4gICAgc2hvd1RpbWV6b25lOiBib29sZWFuID0gdHJ1ZTtcbiAgICBzaG93U2Vjb25kczogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHNob3dNZXJpZGlhbjogYm9vbGVhbiA9IHRydWU7XG4gICAgc2hvd1NwaW5uZXJzOiBib29sZWFuID0gdHJ1ZTtcbiAgICB3ZWVrZGF5czogc3RyaW5nW10gPSB3ZWVrZGF5c1Nob3J0O1xuICAgIG5vd0J0blRleHQ6IHN0cmluZyA9ICdUb2RheSc7XG5cbiAgICB0aW1lem9uZXM6IERhdGVUaW1lUGlja2VyVGltZXpvbmVbXSA9IFtcbiAgICAgICAgeyBuYW1lOiAnR01ULTExJywgb2Zmc2V0OiA2NjAgfSxcbiAgICAgICAgeyBuYW1lOiAnR01ULTEwJywgb2Zmc2V0OiA2MDAgfSxcbiAgICAgICAgeyBuYW1lOiAnR01ULTknLCBvZmZzZXQ6IDU0MCB9LFxuICAgICAgICB7IG5hbWU6ICdHTVQtOCcsIG9mZnNldDogNDgwIH0sXG4gICAgICAgIHsgbmFtZTogJ0dNVC03Jywgb2Zmc2V0OiA0MjAgfSxcbiAgICAgICAgeyBuYW1lOiAnR01ULTYnLCBvZmZzZXQ6IDM2MCB9LFxuICAgICAgICB7IG5hbWU6ICdHTVQtNScsIG9mZnNldDogMzAwIH0sXG4gICAgICAgIHsgbmFtZTogJ0dNVC00Jywgb2Zmc2V0OiAyNDAgfSxcbiAgICAgICAgeyBuYW1lOiAnR01ULTMnLCBvZmZzZXQ6IDE4MCB9LFxuICAgICAgICB7IG5hbWU6ICdHTVQtMicsIG9mZnNldDogMTIwIH0sXG4gICAgICAgIHsgbmFtZTogJ0dNVC0xJywgb2Zmc2V0OiA2MCB9LFxuICAgICAgICB7IG5hbWU6ICdHTVQnLCBvZmZzZXQ6IDAgfSxcbiAgICAgICAgeyBuYW1lOiAnR01UKzEnLCBvZmZzZXQ6IC02MCB9LFxuICAgICAgICB7IG5hbWU6ICdHTVQrMicsIG9mZnNldDogLTEyMCB9LFxuICAgICAgICB7IG5hbWU6ICdHTVQrMycsIG9mZnNldDogLTE4MCB9LFxuICAgICAgICB7IG5hbWU6ICdHTVQrNCcsIG9mZnNldDogLTI0MCB9LFxuICAgICAgICB7IG5hbWU6ICdHTVQrNScsIG9mZnNldDogLTMwMCB9LFxuICAgICAgICB7IG5hbWU6ICdHTVQrNicsIG9mZnNldDogLTM2MCB9LFxuICAgICAgICB7IG5hbWU6ICdHTVQrNycsIG9mZnNldDogLTQyMCB9LFxuICAgICAgICB7IG5hbWU6ICdHTVQrOCcsIG9mZnNldDogLTQ4MCB9LFxuICAgICAgICB7IG5hbWU6ICdHTVQrOScsIG9mZnNldDogLTU0MCB9LFxuICAgICAgICB7IG5hbWU6ICdHTVQrMTAnLCBvZmZzZXQ6IC02MDAgfSxcbiAgICAgICAgeyBuYW1lOiAnR01UKzExJywgb2Zmc2V0OiAtNjYwIH0sXG4gICAgICAgIHsgbmFtZTogJ0dNVCsxMicsIG9mZnNldDogLTcyMCB9XG4gICAgXTtcbn0iXX0=