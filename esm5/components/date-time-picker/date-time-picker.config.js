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
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci5jb25maWcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXRlLXRpbWUtcGlja2VyL2RhdGUtdGltZS1waWNrZXIuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7d0JBTWpDLElBQUk7d0JBQ0osSUFBSTs0QkFDQSxJQUFJOzJCQUNMLEtBQUs7NEJBQ0osSUFBSTs0QkFDSixJQUFJO3dCQUNQLGFBQWE7MEJBQ2IsT0FBTzt5QkFFVTtZQUNsQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtZQUMvQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtZQUMvQixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtZQUM5QixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtZQUM5QixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtZQUM5QixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtZQUM5QixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtZQUM5QixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtZQUM5QixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtZQUM5QixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtZQUM5QixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtZQUM3QixFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTtZQUMxQixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzlCLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUU7WUFDL0IsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRTtZQUMvQixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFO1lBQy9CLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUU7WUFDL0IsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRTtZQUMvQixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFO1lBQy9CLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUU7WUFDL0IsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRTtZQUMvQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFO1lBQ2hDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUU7WUFDaEMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRTtTQUNuQzs7O2dCQXJDSixVQUFVOzsrQkFWWDs7U0FXYSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEFkZCBhIGNvbmZpZyBzZXJ2aWNlIHRvIGFsbG93IGFuIGFwcGxpY2F0aW9uXG4gKiB0byBjdXN0b21pemUgdGhlIGRhdGUgdGltZSBwaWNrZXIgZGVmYXVsdCBzZXR0aW5nc1xuICogYWNyb3NzIHRoZSBlbnRpcmUgYXBwbGljYXRpb25cbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB3ZWVrZGF5c1Nob3J0IH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLnV0aWxzJztcbmltcG9ydCB7IERhdGVUaW1lUGlja2VyVGltZXpvbmUgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXIuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEYXRlVGltZVBpY2tlckNvbmZpZyB7XG5cbiAgICBzaG93RGF0ZTogYm9vbGVhbiA9IHRydWU7XG4gICAgc2hvd1RpbWU6IGJvb2xlYW4gPSB0cnVlO1xuICAgIHNob3dUaW1lem9uZTogYm9vbGVhbiA9IHRydWU7XG4gICAgc2hvd1NlY29uZHM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBzaG93TWVyaWRpYW46IGJvb2xlYW4gPSB0cnVlO1xuICAgIHNob3dTcGlubmVyczogYm9vbGVhbiA9IHRydWU7XG4gICAgd2Vla2RheXM6IHN0cmluZ1tdID0gd2Vla2RheXNTaG9ydDtcbiAgICBub3dCdG5UZXh0OiBzdHJpbmcgPSAnVG9kYXknO1xuXG4gICAgdGltZXpvbmVzOiBEYXRlVGltZVBpY2tlclRpbWV6b25lW10gPSBbXG4gICAgICAgIHsgbmFtZTogJ0dNVC0xMScsIG9mZnNldDogNjYwIH0sXG4gICAgICAgIHsgbmFtZTogJ0dNVC0xMCcsIG9mZnNldDogNjAwIH0sXG4gICAgICAgIHsgbmFtZTogJ0dNVC05Jywgb2Zmc2V0OiA1NDAgfSxcbiAgICAgICAgeyBuYW1lOiAnR01ULTgnLCBvZmZzZXQ6IDQ4MCB9LFxuICAgICAgICB7IG5hbWU6ICdHTVQtNycsIG9mZnNldDogNDIwIH0sXG4gICAgICAgIHsgbmFtZTogJ0dNVC02Jywgb2Zmc2V0OiAzNjAgfSxcbiAgICAgICAgeyBuYW1lOiAnR01ULTUnLCBvZmZzZXQ6IDMwMCB9LFxuICAgICAgICB7IG5hbWU6ICdHTVQtNCcsIG9mZnNldDogMjQwIH0sXG4gICAgICAgIHsgbmFtZTogJ0dNVC0zJywgb2Zmc2V0OiAxODAgfSxcbiAgICAgICAgeyBuYW1lOiAnR01ULTInLCBvZmZzZXQ6IDEyMCB9LFxuICAgICAgICB7IG5hbWU6ICdHTVQtMScsIG9mZnNldDogNjAgfSxcbiAgICAgICAgeyBuYW1lOiAnR01UJywgb2Zmc2V0OiAwIH0sXG4gICAgICAgIHsgbmFtZTogJ0dNVCsxJywgb2Zmc2V0OiAtNjAgfSxcbiAgICAgICAgeyBuYW1lOiAnR01UKzInLCBvZmZzZXQ6IC0xMjAgfSxcbiAgICAgICAgeyBuYW1lOiAnR01UKzMnLCBvZmZzZXQ6IC0xODAgfSxcbiAgICAgICAgeyBuYW1lOiAnR01UKzQnLCBvZmZzZXQ6IC0yNDAgfSxcbiAgICAgICAgeyBuYW1lOiAnR01UKzUnLCBvZmZzZXQ6IC0zMDAgfSxcbiAgICAgICAgeyBuYW1lOiAnR01UKzYnLCBvZmZzZXQ6IC0zNjAgfSxcbiAgICAgICAgeyBuYW1lOiAnR01UKzcnLCBvZmZzZXQ6IC00MjAgfSxcbiAgICAgICAgeyBuYW1lOiAnR01UKzgnLCBvZmZzZXQ6IC00ODAgfSxcbiAgICAgICAgeyBuYW1lOiAnR01UKzknLCBvZmZzZXQ6IC01NDAgfSxcbiAgICAgICAgeyBuYW1lOiAnR01UKzEwJywgb2Zmc2V0OiAtNjAwIH0sXG4gICAgICAgIHsgbmFtZTogJ0dNVCsxMScsIG9mZnNldDogLTY2MCB9LFxuICAgICAgICB7IG5hbWU6ICdHTVQrMTInLCBvZmZzZXQ6IC03MjAgfVxuICAgIF07XG59Il19