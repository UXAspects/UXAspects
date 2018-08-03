/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DateTimePickerService } from '../date-time-picker.service';
export class TimeViewComponent {
    /**
     * @param {?} datepicker
     */
    constructor(datepicker) {
        this.datepicker = datepicker;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    selectTimezone(name) {
        const /** @type {?} */ timezones = this.datepicker.timezones$.value;
        // find matching timezone
        const /** @type {?} */ timezone = timezones.find(_timezone => _timezone.name === name);
        if (timezone) {
            this.datepicker.setTimezone(timezone);
        }
    }
    /**
     * @return {?}
     */
    incrementTimezone() {
        const /** @type {?} */ timezone = this.datepicker.timezone$.value;
        const /** @type {?} */ timezones = this.datepicker.timezones$.value;
        const /** @type {?} */ currentZone = timezones.findIndex(zone => zone.name === timezone.name && zone.offset === timezone.offset);
        // try to get the previous zone
        this.datepicker.setTimezone(timezones[currentZone + 1] ? timezones[currentZone + 1] : timezones[currentZone]);
    }
    /**
     * @return {?}
     */
    decrementTimezone() {
        const /** @type {?} */ timezone = this.datepicker.timezone$.value;
        const /** @type {?} */ timezones = this.datepicker.timezones$.value;
        const /** @type {?} */ currentZone = timezones.findIndex(zone => zone.name === timezone.name && zone.offset === timezone.offset);
        // try to get the previous zone
        this.datepicker.setTimezone(timezones[currentZone - 1] ? timezones[currentZone - 1] : timezones[currentZone]);
    }
}
TimeViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-date-time-picker-time-view',
                template: "<ux-time-picker *ngIf=\"datepicker.showTime$ | async\"\n    [value]=\"datepicker.selected$ | async\"\n    (valueChange)=\"datepicker.selected$.next($event)\"\n    [showSeconds]=\"datepicker.showSeconds$ | async\"\n    [showMeridian]=\"datepicker.showMeridian$ | async\"\n    [showSpinners]=\"datepicker.showSpinners$ | async\">\n</ux-time-picker>\n\n<ng-container *ngIf=\"datepicker.showTimezone$ | async\">\n\n    <div class=\"time-zone-picker\" *ngIf=\"datepicker.showSpinners$ | async\">\n\n        <ux-spin-button\n            class=\"time-zone-spinner\"\n            [value]=\"(datepicker.timezone$ | async).name\"\n            [readOnly]=\"true\"\n            (increment)=\"incrementTimezone()\"\n            (decrement)=\"decrementTimezone()\"\n            inputAriaLabel=\"Time Zone\"\n            incrementAriaLabel=\"Switch to the next time zone\"\n            decrementAriaLabel=\"Switch to the previous time zone\">\n        </ux-spin-button>\n    </div>\n\n    <div class=\"time-zone-picker\" *ngIf=\"!(datepicker.showSpinners$ | async)\">\n\n        <select class=\"form-control time-zone-select\"\n                tabindex=\"0\"\n                [ngModel]=\"(datepicker.timezone$ | async).name\"\n                (ngModelChange)=\"selectTimezone($event)\"\n                aria-label=\"Timezone\"\n                [attr.aria-valuenow]=\"(datepicker.timezone$ | async).name\">\n\n            <option *ngFor=\"let zone of datepicker.timezones$ | async\"\n                    [selected]=\"zone.name === (datepicker.timezone$ | async).name\"\n                    [value]=\"zone.name\">\n                {{ zone?.name }}\n            </option>\n\n        </select>\n    </div>\n\n</ng-container>\n",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
TimeViewComponent.ctorParameters = () => [
    { type: DateTimePickerService }
];
function TimeViewComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    TimeViewComponent.prototype.datepicker;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2RhdGUtdGltZS1waWNrZXIvdGltZS12aWV3L3RpbWUtdmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFPcEUsTUFBTTs7OztJQUVGLFlBQW1CLFVBQWlDO1FBQWpDLGVBQVUsR0FBVixVQUFVLENBQXVCO0tBQUs7Ozs7O0lBRXpELGNBQWMsQ0FBQyxJQUFZO1FBQ3ZCLHVCQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7O1FBR25ELHVCQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQztRQUV0RSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ1gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDekM7S0FDSjs7OztJQUVELGlCQUFpQjtRQUNiLHVCQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7UUFDakQsdUJBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztRQUVuRCx1QkFBTSxXQUFXLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7UUFHaEgsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7S0FDakg7Ozs7SUFFRCxpQkFBaUI7UUFDYix1QkFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1FBQ2pELHVCQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFFbkQsdUJBQU0sV0FBVyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7O1FBR2hILElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0tBQ2pIOzs7WUF0Q0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSwrQkFBK0I7Z0JBQ3pDLHVyREFBeUM7Z0JBQ3pDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2xEOzs7O1lBTlEscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0ZVRpbWVQaWNrZXJTZXJ2aWNlIH0gZnJvbSAnLi4vZGF0ZS10aW1lLXBpY2tlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1kYXRlLXRpbWUtcGlja2VyLXRpbWUtdmlldycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3RpbWUtdmlldy5jb21wb25lbnQuaHRtbCcsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgVGltZVZpZXdDb21wb25lbnQge1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGRhdGVwaWNrZXI6IERhdGVUaW1lUGlja2VyU2VydmljZSkgeyB9XG5cbiAgICBzZWxlY3RUaW1lem9uZShuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgdGltZXpvbmVzID0gdGhpcy5kYXRlcGlja2VyLnRpbWV6b25lcyQudmFsdWU7XG4gICAgICAgIFxuICAgICAgICAvLyBmaW5kIG1hdGNoaW5nIHRpbWV6b25lXG4gICAgICAgIGNvbnN0IHRpbWV6b25lID0gdGltZXpvbmVzLmZpbmQoX3RpbWV6b25lID0+IF90aW1lem9uZS5uYW1lID09PSBuYW1lKTtcblxuICAgICAgICBpZiAodGltZXpvbmUpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0ZXBpY2tlci5zZXRUaW1lem9uZSh0aW1lem9uZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbmNyZW1lbnRUaW1lem9uZSgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgdGltZXpvbmUgPSB0aGlzLmRhdGVwaWNrZXIudGltZXpvbmUkLnZhbHVlO1xuICAgICAgICBjb25zdCB0aW1lem9uZXMgPSB0aGlzLmRhdGVwaWNrZXIudGltZXpvbmVzJC52YWx1ZTtcblxuICAgICAgICBjb25zdCBjdXJyZW50Wm9uZSA9IHRpbWV6b25lcy5maW5kSW5kZXgoem9uZSA9PiB6b25lLm5hbWUgPT09IHRpbWV6b25lLm5hbWUgJiYgem9uZS5vZmZzZXQgPT09IHRpbWV6b25lLm9mZnNldCk7XG5cbiAgICAgICAgLy8gdHJ5IHRvIGdldCB0aGUgcHJldmlvdXMgem9uZVxuICAgICAgICB0aGlzLmRhdGVwaWNrZXIuc2V0VGltZXpvbmUodGltZXpvbmVzW2N1cnJlbnRab25lICsgMV0gPyB0aW1lem9uZXNbY3VycmVudFpvbmUgKyAxXSA6IHRpbWV6b25lc1tjdXJyZW50Wm9uZV0pO1xuICAgIH1cblxuICAgIGRlY3JlbWVudFRpbWV6b25lKCk6IHZvaWQge1xuICAgICAgICBjb25zdCB0aW1lem9uZSA9IHRoaXMuZGF0ZXBpY2tlci50aW1lem9uZSQudmFsdWU7XG4gICAgICAgIGNvbnN0IHRpbWV6b25lcyA9IHRoaXMuZGF0ZXBpY2tlci50aW1lem9uZXMkLnZhbHVlO1xuXG4gICAgICAgIGNvbnN0IGN1cnJlbnRab25lID0gdGltZXpvbmVzLmZpbmRJbmRleCh6b25lID0+IHpvbmUubmFtZSA9PT0gdGltZXpvbmUubmFtZSAmJiB6b25lLm9mZnNldCA9PT0gdGltZXpvbmUub2Zmc2V0KTtcblxuICAgICAgICAvLyB0cnkgdG8gZ2V0IHRoZSBwcmV2aW91cyB6b25lXG4gICAgICAgIHRoaXMuZGF0ZXBpY2tlci5zZXRUaW1lem9uZSh0aW1lem9uZXNbY3VycmVudFpvbmUgLSAxXSA/IHRpbWV6b25lc1tjdXJyZW50Wm9uZSAtIDFdIDogdGltZXpvbmVzW2N1cnJlbnRab25lXSk7XG4gICAgfVxufSJdfQ==